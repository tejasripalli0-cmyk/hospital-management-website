import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiLogOut, FiPhoneCall } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/departments', label: 'Departments' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const dashboardPath = user?.role === 'ADMIN' ? '/admin' : '/dashboard'

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-700">
          <span className="h-8 w-8 rounded-lg bg-primary-600 text-white grid place-items-center text-sm">+</span>
          MediCare
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/emergency" className="flex items-center gap-1.5 text-sm font-medium text-red-600">
            <FiPhoneCall /> Emergency
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className="btn-outline !py-2 !px-4 text-sm">
                <FiUser /> {user?.first_name || 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn-primary !py-2 !px-4 text-sm">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline !py-2 !px-4 text-sm">Login</Link>
              <Link to="/appointment" className="btn-primary !py-2 !px-4 text-sm">Book Appointment</Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-2xl text-slate-700" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-100 px-4 pb-4 space-y-2 bg-white">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block py-2 text-slate-600" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/emergency" className="block py-2 text-red-600 font-medium" onClick={() => setOpen(false)}>Emergency</Link>
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className="block py-2 text-slate-600" onClick={() => setOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="btn-primary w-full">Logout</button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="btn-outline flex-1" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/appointment" className="btn-primary flex-1" onClick={() => setOpen(false)}>Book</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
