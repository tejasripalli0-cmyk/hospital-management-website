import { useState } from 'react'

export default function AppointmentForm({ doctors = [], onSubmit, submitting, defaultDoctorId }) {
  const [form, setForm] = useState({
    doctor: defaultDoctorId || '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Doctor</label>
        <select name="doctor" value={form.doctor} onChange={handleChange} required className="input-field">
          <option value="">Choose a doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.user?.first_name} {d.user?.last_name} — {d.specialization}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
          <input type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
          <input type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} required className="input-field" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason for Visit</label>
        <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} className="input-field" placeholder="Briefly describe your symptoms or reason for visit" />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? 'Booking...' : 'Confirm Appointment'}
      </button>
    </form>
  )
}
