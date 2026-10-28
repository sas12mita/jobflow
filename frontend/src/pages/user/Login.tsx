import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../api'

type AuthResponse = {
  message: string
  user: {
    id: number
    name: string
    email: string
    role: 'user' | 'admin'
  }
}

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Fixed: Added '/api' prefix to match backend route /api/auth/login
      const data = await apiRequest<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      })

      if (data.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/user/dashboard', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Log in to your JobFlow account.</p>

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          style={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          style={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <p role="alert" style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p style={styles.footer}>
          Don't have an account? <Link to="/user/register">Register</Link>
        </p>
      </form>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    background: '#f5f7fb',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '32px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  title: { margin: 0, color: '#172554', fontSize: '26px' },
  subtitle: { marginTop: 0, color: '#64748b' },
  input: {
    padding: '12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '15px',
  },
  button: {
    padding: '13px',
    border: 'none',
    borderRadius: '6px',
    background: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: { color: '#dc2626', fontSize: '14px' },
  footer: { textAlign: 'center' as const, fontSize: '14px' },
}