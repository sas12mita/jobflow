
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Login from './pages/login'

function NotFound() {
  return (
    <div className="placeholder-page">
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find that page.</p>
      <a className="button button-primary" href="/">
        Back to home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}