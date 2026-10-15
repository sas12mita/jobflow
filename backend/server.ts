
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import pool from './config/db.js'
import { seedAccounts } from './scripts/seedAdmin.js'

const app = express()
const PORT = Number(process.env.PORT || 5000)

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'JobFlow API' })
})

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
