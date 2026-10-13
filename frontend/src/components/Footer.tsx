
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Link to="/" className="brand footer-brand">
          <span className="brand-icon">J</span>
          <span>JobFlow</span>
        </Link>

        <p>
          Make your next career move with confidence.
          Keep your job search organised, one step at a time.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
     
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JobFlow</span>
        <span>Built for your next career move.</span>
      </div>
    </footer>
  )
}