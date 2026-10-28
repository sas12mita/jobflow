import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import pool from './config/db.js'
import { seedAccounts } from './scripts/seedAdmin.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = Number(process.env.PORT || 5000)

// 1. CORS Configuration (Must be before routes)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(helmet())
app.use(express.json({ limit: '20kb' }))
app.use(cookieParser())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'JobFlow API' })
})

// Rate limiter for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
})

// 2. Mount Auth Routes with the /api prefix
app.use('/api/auth', authLimiter, authRoutes)

async function startServer() {
  try {
    const connection = await pool.getConnection()
    await connection.query('SELECT 1')
    connection.release()

    console.log('MySQL connected successfully.')
    await seedAccounts()

    app.listen(PORT, () => {
      console.log(`JobFlow API running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('JobFlow startup failed:', error)
    await pool.end()
    process.exit(1)
  }
}

startServer()