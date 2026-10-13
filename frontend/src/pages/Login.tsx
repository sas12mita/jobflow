
import { Link } from 'react-router-dom'
import type { CSSProperties, FormEvent } from 'react'

export default function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    alert('Login is not connected yet. Authentication will be added later.')
  }

  return (
    <div style={styles.page}>
      <div style={styles.backgroundShape} />

      <main style={styles.card}>
        <Link to="/" style={styles.brand}>
          <span style={styles.logo}>J</span>
          <span>JobFlow</span>
        </Link>

        <div style={styles.headingSection}>
          <h1 style={styles.heading}>Welcome back!</h1>
          <p style={styles.subtitle}>
            Your next career move starts here.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="login-email" style={styles.label}>
              Email address
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="login-password" style={styles.label}>
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Log in <span style={styles.arrow}>→</span>
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>New to JobFlow?</span>
          <span style={styles.dividerLine} />
        </div>

        <Link to="/register" style={styles.secondaryButton}>
          Create an account
        </Link>

        <Link to="/" style={styles.backLink}>
          ← Back to homepage
        </Link>

        <p style={styles.footerText}>
          Keep your job search organised, one step at a time.
        </p>
      </main>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 20px',
    boxSizing: 'border-box',
    background: '#f7f6fc',
    fontFamily: 'Arial, Helvetica, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: '#e9e3ff',
    top: '-160px',
    right: '-100px',
    opacity: 0.7,
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '430px',
    padding: '38px',
    boxSizing: 'border-box',
    background: '#ffffff',
    border: '1px solid #ece9f5',
    borderRadius: '20px',
    boxShadow: '0 18px 55px rgba(45, 35, 90, 0.09)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color: '#292344',
    fontSize: '23px',
    fontWeight: 700,
    textDecoration: 'none',
    marginBottom: '35px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '39px',
    height: '39px',
    borderRadius: '12px',
    background: '#6c4ed9',
    color: '#ffffff',
    fontSize: '23px',
  },
  headingSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  heading: {
    color: '#292344',
    fontSize: '29px',
    margin: '0 0 10px',
    letterSpacing: '-0.7px',
  },
  subtitle: {
    color: '#817c94',
    fontSize: '14px',
    lineHeight: 1.6,
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '21px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
  },
  label: {
    color: '#39344f',
    fontSize: '14px',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px 15px',
    border: '1px solid #dedbea',
    borderRadius: '9px',
    background: '#ffffff',
    color: '#292344',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '15px',
    marginTop: '3px',
    border: 'none',
    borderRadius: '9px',
    background: '#6c4ed9',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  arrow: {
    fontSize: '19px',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '27px 0 20px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#eeecf4',
  },
  dividerText: {
    color: '#8b869b',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },
  secondaryButton: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '14px',
    border: '1px solid #dcd5f3',
    borderRadius: '9px',
    color: '#6c4ed9',
    background: '#ffffff',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
  },
  backLink: {
    display: 'block',
    marginTop: '24px',
    color: '#77718d',
    fontSize: '13px',
    textAlign: 'center',
    textDecoration: 'none',
  },
  footerText: {
    margin: '23px 0 0',
    paddingTop: '18px',
    borderTop: '1px solid #f0edf6',
    color: '#9690a5',
    fontSize: '12px',
    lineHeight: 1.6,
    textAlign: 'center',
  },
} 