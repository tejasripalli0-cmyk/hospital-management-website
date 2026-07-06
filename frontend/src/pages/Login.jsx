import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const user = await login(form.username, form.password)
      showToast(`Welcome back, ${user.first_name || user.username}!`, 'success')
      navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch {
      showToast('Invalid username or password.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-sm text-slate-500 text-center mb-8">Log in to manage your appointments and records.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="input-field" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="input-field" />
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-6">
          Don't have an account? <Link to="/register" className="text-primary-600 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
