import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'
import { authService } from '../services/authService.js'
import ProfileCard from '../components/ProfileCard.jsx'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    address: user?.address || '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await authService.updateProfile(form)
      updateUser(res.data)
      showToast('Profile updated successfully!', 'success')
    } catch {
      showToast('Could not update profile.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="py-14">
      <div className="container-custom max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <ProfileCard user={user} />

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" className="input-field" />
            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" className="input-field" />
          </div>
          <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="input-field" />
          <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" rows={3} className="input-field" />
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
