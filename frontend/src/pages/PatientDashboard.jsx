import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCalendar, FiFileText, FiUser, FiPlus, FiX } from 'react-icons/fi'
import Sidebar from '../components/Sidebar.jsx'
import StatCard from '../components/StatCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { appointmentService } from '../services/appointmentService.js'
import { medicalRecordService } from '../services/medicalRecordService.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useToast } from '../contexts/ToastContext.jsx'

const sidebarItems = [
  { key: 'overview', to: '/dashboard', label: 'Overview', icon: FiUser, end: true },
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [appointments, setAppointments] = useState([])
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)
    Promise.all([appointmentService.list(), medicalRecordService.list()])
      .then(([appRes, recRes]) => {
        setAppointments(appRes.data.results || appRes.data)
        setRecords(recRes.data.results || recRes.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const handleCancel = async (id) => {
    try {
      await appointmentService.cancel(id)
      showToast('Appointment cancelled.', 'success')
      loadData()
    } catch {
      showToast('Could not cancel appointment.', 'error')
    }
  }

  const upcoming = appointments.filter((a) => a.status !== 'CANCELLED' && a.status !== 'COMPLETED')

  return (
    <div className="py-10">
      <div className="container-custom flex flex-col md:flex-row gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-2xl font-bold">Welcome, {user?.first_name || user?.username} 👋</h1>
            <Link to="/appointment" className="btn-primary"><FiPlus /> New Appointment</Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <StatCard icon={FiCalendar} label="Upcoming Appointments" value={upcoming.length} accent="primary" />
            <StatCard icon={FiFileText} label="Medical Records" value={records.length} accent="accent" />
            <StatCard icon={FiUser} label="Account Type" value={user?.role} accent="primary" />
          </div>

          {loading ? (
            <LoadingSpinner full />
          ) : (
            <>
              <div className="card p-6">
                <h2 className="font-semibold text-lg mb-4">My Appointments</h2>
                {appointments.length === 0 ? (
                  <p className="text-sm text-slate-400">No appointments yet. Book your first one!</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-4">
                        <div>
                          <p className="font-medium">
                            Dr. {a.doctor_detail?.user?.first_name} {a.doctor_detail?.user?.last_name}
                          </p>
                          <p className="text-sm text-slate-400">{a.appointment_date} at {a.appointment_time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            a.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' :
                            a.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
                            a.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {a.status}
                          </span>
                          {a.status === 'PENDING' || a.status === 'CONFIRMED' ? (
                            <button onClick={() => handleCancel(a.id)} className="text-slate-400 hover:text-red-600" title="Cancel">
                              <FiX />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card p-6">
                <h2 className="font-semibold text-lg mb-4">Medical Records</h2>
                {records.length === 0 ? (
                  <p className="text-sm text-slate-400">No medical records on file yet.</p>
                ) : (
                  <div className="space-y-3">
                    {records.map((r) => (
                      <div key={r.id} className="border border-slate-100 rounded-xl p-4">
                        <p className="font-medium">{r.diagnosis}</p>
                        <p className="text-sm text-slate-400">{r.record_date} · Dr. {r.doctor_name}</p>
                        {r.prescription && <p className="text-sm text-slate-500 mt-1">Rx: {r.prescription}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
