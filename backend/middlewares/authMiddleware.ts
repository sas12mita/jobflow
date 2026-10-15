import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export type AuthUser = {
  id: number
  email: string
  role: 'user' | 'admin'
}

// Add the authenticated user to Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

// Check whether the user is logged in
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.jobflow_token
  const secret = process.env.JWT_SECRET

  if (!secret) {
    return res.status(500).json({
      message: 'Authentication is not configured.',
    })
  }

  if (!token) {
    return res.status(401).json({
      message: 'Please log in to continue.',
    })
  }

  try {
    const decoded = jwt.verify(token, secret)

    if (
      typeof decoded === 'string' ||
      typeof decoded.id !== 'number' ||
      typeof decoded.email !== 'string' ||
      (decoded.role !== 'user' && decoded.role !== 'admin')
    ) {
      return res.status(401).json({
        message: 'Invalid authentication token.',
      })
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    }

    return next()
  } catch {
    return res.status(401).json({
      message: 'Your session has expired. Please log in again.',
    })
  }
}

// Check whether the logged-in user is an admin
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Please log in to continue.',
    })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Admin access is required.',
    })
  }

  return next()
}