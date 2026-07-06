import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import { contactService } from '../services/contactService.js'
import { useToast } from '../contexts/ToastContext.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone_number: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await contactService.send(form)
      showToast('Message sent — we will get back to you soon!', 'success')
      setForm({ name: '', email: '', phone_number: '', subject: '', message: '' })
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-16">
      <div className="container-custom grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-slate-500 mb-8">
            Have a question about our services or need help with an appointment? Send us a message.
          </p>
          <ul className="space-y-5">
            <li className="flex items-center gap-3"><FiMapPin className="text-primary-600 text-xl" /> 123 Wellness Ave, Health City</li>
            <li className="flex items-center gap-3"><FiPhone className="text-primary-600 text-xl" /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-3"><FiMail className="text-primary-600 text-xl" /> care@medicare-hospital.com</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="input-field" />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="input-field" />
          </div>
          <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number (optional)" className="input-field" />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required className="input-field" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" rows={5} required className="input-field" />
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
