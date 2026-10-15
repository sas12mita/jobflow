import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Security
app.use(helmet())

// Allow requests from the React frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
)

// Read JSON request bodies
app.use(express.json({ limit: '20kb' }))

// Read authentication cookies
app.use(cookieParser())

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'JobFlow API',
  })
})

// Limit repeated authentication requests
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
})

// Connect authentication routes to the application
app.use('/api/auth', authLimiter, authRoutes)

export default app