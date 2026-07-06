import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

export default function Register() {
  const [form, setForm] = useState({
    username: '', email: '', first_name: '', last_name: '',
    phone_number: '', password: '', password2: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await register(form)
      showToast('Account created! Please log in.', 'success')
      navigate('/login')
    } catch (err) {
      const data = err.response?.data
      const message = data ? Object.values(data).flat().join(' ') : 'Registration failed.'
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="card p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-2">Create Your Account</h1>
        <p className="text-sm text-slate-500 text-center mb-8">Join MediCare to book appointments and manage your health records.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required className="input-field" />
            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required className="input-field" />
          </div>
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="input-field" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="input-field" />
          <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="input-field" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required className="input-field" />
            <input name="password2" type="password" value={form.password2} onChange={handleChange} placeholder="Confirm Password" required className="input-field" />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account? <Link to="/login" className="text-primary-600 font-medium">Log in</Link>
        </p>
      </div>
    </div>
  )
}
