
import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { apiRequest } from '../api'

type User = {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

type Props = {
  children: ReactNode
  role?: 'user' | 'admin'
}

export default function ProtectedRoute({ children, role }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    apiRequest<{ user: User }>('/auth/me')
      .then((data) => {
        if (active) {
          setUser(data.user)
        }
      })
      .catch(() => {
        if (active) {
          setUser(null)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Checking your session...</p>
  }

  if (!user) {
    return <Navigate to="/user/login" replace />
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={
          user.role === 'admin'
            ? '/admin/dashboard'
            : '/user/dashboard'
        }
        replace
      />
    )
  }

  return children
}
