
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">J</span>
        <span>JobFlow</span>
      </Link>

      <nav className="nav-links">
        <a href="/#features">Features</a>
        <a href="/#how-it-works">How it works</a>

        <NavLink to="/login" className="nav-login">
          Log in
        </NavLink>

        <Link to="/register" className="nav-cta">
          Get started <span>→</span>
        </Link>
      </nav>
    </header>
  )
}