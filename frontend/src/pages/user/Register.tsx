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

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      })

      navigate('/user/dashboard', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Registration failed.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Create your JobFlow account</h1>
        <p style={styles.subtitle}>Start managing your job applications.</p>

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          style={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={100}
          autoComplete="name"
          required
        />

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
          minLength={8}
          autoComplete="new-password"
          required
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          style={styles.input}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
          autoComplete="new-password"
          required
        />

        {error && <p role="alert" style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p style={styles.footer}>
          Already have an account? <Link to="/user/login">Log in</Link>
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