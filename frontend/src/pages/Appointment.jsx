import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AppointmentForm from '../components/AppointmentForm.jsx'
import { doctorService } from '../services/doctorService.js'
import { appointmentService } from '../services/appointmentService.js'
import { useToast } from '../contexts/ToastContext.jsx'

export default function Appointment() {
  const [doctors, setDoctors] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()

  useEffect(() => {
    doctorService.list({ page_size: 100 }).then((res) => setDoctors(res.data.results || res.data))
  }, [])

  const handleSubmit = async (form) => {
    setSubmitting(true)
    try {
      await appointmentService.book(form)
      showToast('Appointment booked successfully!', 'success')
      navigate('/dashboard')
    } catch (err) {
      const message = err.response?.data?.detail || 'Could not book appointment. Please try a different time slot.'
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-16">
      <div className="container-custom max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-slate-500">Choose your doctor and preferred time — we'll confirm shortly after.</p>
        </div>
        <div className="card p-8">
          <AppointmentForm
            doctors={doctors}
            onSubmit={handleSubmit}
            submitting={submitting}
            defaultDoctorId={location.state?.doctorId}
          />
        </div>
      </div>
    </div>
  )
}
