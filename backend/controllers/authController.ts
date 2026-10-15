
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../config/db.js'

type UserRole = 'user' | 'admin'

type UserRow = {
  id: number
  name: string
  email: string
  password_hash: string
  role: UserRole
}

function createToken(user: UserRow) {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is missing from .env')
  }

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '1d' },
  )
}

function setAuthCookie(res: Response, token: string) {
  res.cookie('jobflow_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/',
  })
}

function publicUser(user: UserRow) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function register(req: Request, res: Response) {
  try {
    const name = String(req.body.name ?? '').trim()
    const email = String(req.body.email ?? '').trim().toLowerCase()
    const password = req.body.password

    if (
      !name ||
      !email ||
      typeof password !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        message: 'Enter a valid name, email and password.',
      })
    }

    if (name.length > 100 || email.length > 255) {
      return res.status(400).json({
        message: 'Name or email is too long.',
      })
    }

    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({
        message: 'Password must be between 8 and 72 characters.',
      })
    }

    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email],
    )

    if ((existing as { id: number }[]).length > 0) {
      return res.status(409).json({
        message: 'An account with this email already exists.',
      })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Public registration always creates a normal user.
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'user')`,
      [name, email, passwordHash],
    )

    const insertId = (result as { insertId: number }).insertId

    const user: UserRow = {
      id: insertId,
      name,
      email,
      password_hash: passwordHash,
      role: 'user',
    }

    const token = createToken(user)
    setAuthCookie(res, token)

    return res.status(201).json({
      message: 'Registration successful.',
      user: publicUser(user),
    })
  } catch (error) {
    console.error('Registration failed:', error)
    return res.status(500).json({
      message: 'Registration failed. Please try again.',
    })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const email = String(req.body.email ?? '').trim().toLowerCase()
    const password = req.body.password

    if (!email || typeof password !== 'string' || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      })
    }

    const [rows] = await pool.execute(
      `SELECT id, name, email, password_hash, role
       FROM users WHERE email = ? LIMIT 1`,
      [email],
    )

    const users = rows as UserRow[]
    const user = users[0]

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    const token = createToken(user)
    setAuthCookie(res, token)

    return res.json({
      message: 'Login successful.',
      user: publicUser(user),
    })
  } catch (error) {
    console.error('Login failed:', error)
    return res.status(500).json({
      message: 'Login failed. Please try again.',
    })
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('jobflow_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return res.json({ message: 'Logged out successfully.' })
}

export function me(req: Request, res: Response) {
  return res.json({ user: req.user })
}
