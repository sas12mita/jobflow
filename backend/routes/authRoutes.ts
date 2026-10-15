import { Router } from 'express'
import {
  login,
  register,
  logout,
  me,
} from '../controllers/authController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = Router()

// Register a new account
router.post('/register', register)

// Log in to an account
router.post('/login', login)

// Log out of the current account
router.post('/logout', logout)

// Get the currently logged-in user's information
router.get('/me', requireAuth, me)

export default router