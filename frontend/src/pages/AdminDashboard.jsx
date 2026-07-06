import { useEffect, useState } from 'react'
import { FiUsers, FiCalendar, FiGrid, FiMessageSquare, FiCheck, FiX } from 'react-icons/fi'
import Sidebar from '../components/Sidebar.jsx'
import StatCard from '../components/StatCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { appointmentService } from '../services/appointmentService.js'
import { doctorService } from '../services/doctorService.js'
import { useToast } from '../contexts/ToastContext.jsx'

const sidebarItems = [
  { key: 'overview', to: '/admin', label: 'Overview', icon: FiGrid, end: true },
]

export default function AdminDashboard() {
  const { showToast } = useToast()
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)
    Promise.all([appointmentService.list(), doctorService.list({ page_size: 100 })])
      .then(([appRes, docRes]) => {
        setAppointments(appRes.data.results || appRes.data)
        setDoctors(docRes.data.results || docRes.data)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadData() }, [])

  const updateStatus = async (id, status) => {
    try {
      await appointmentService.update(id, { status })
      showToast(`Appointment marked as ${status.toLowerCase()}.`, 'success')
      loadData()
    } catch {
      showToast('Could not update appointment.', 'error')
    }
  }

  const pending = appointments.filter((a) => a.status === 'PENDING')

  return (
    <div className="py-10">
      <div className="container-custom flex flex-col md:flex-row gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>

          <div className="grid sm:grid-cols-4 gap-5">
            <StatCard icon={FiCalendar} label="Total Appointments" value={appointments.length} accent="primary" />
            <StatCard icon={FiUsers} label="Doctors" value={doctors.length} accent="accent" />
            <StatCard icon={FiCalendar} label="Pending Requests" value={pending.length} accent="primary" />
            <StatCard icon={FiMessageSquare} label="Departments" value={new Set(doctors.map((d) => d.department)).size} accent="accent" />
          </div>

          {loading ? (
            <LoadingSpinner full />
          ) : (
            <div className="card p-6">
              <h2 className="font-semibold text-lg mb-4">Manage Appointments</h2>
              {appointments.length === 0 ? (
                <p className="text-sm text-slate-400">No appointments yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-400 border-b border-slate-100">
                        <th className="py-2 pr-4">Patient</th>
                        <th className="py-2 pr-4">Doctor</th>
                        <th className="py-2 pr-4">Date</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a.id} className="border-b border-slate-50">
                          <td className="py-3 pr-4">{a.patient_detail?.first_name} {a.patient_detail?.last_name}</td>
                          <td className="py-3 pr-4">Dr. {a.doctor_detail?.user?.last_name}</td>
                          <td className="py-3 pr-4">{a.appointment_date} {a.appointment_time}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              a.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' :
                              a.status === 'CANCELLED' ? 'bg-red-50 text-red-600' :
                              a.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            {a.status === 'PENDING' && (
                              <div className="flex gap-2">
                                <button onClick={() => updateStatus(a.id, 'CONFIRMED')} className="text-emerald-600 hover:text-emerald-700" title="Confirm"><FiCheck /></button>
                                <button onClick={() => updateStatus(a.id, 'CANCELLED')} className="text-red-500 hover:text-red-600" title="Cancel"><FiX /></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
