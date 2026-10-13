
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          <span className="brand-icon">J</span>
          <span>JobFlow</span>
        </Link>

        <h1>Create your account</h1>
        <p className="auth-subtitle">
          Start organising your job applications today.
        </p>

        <form onSubmit={(event) => {
          event.preventDefault()
          alert('Registration page only. Authentication is not connected yet.')
        }}>
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Your full name"
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            minLength={6}
            required
          />

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <Link to="/" className="auth-home">← Back to home</Link>
      </div>
    </div>
  )
}