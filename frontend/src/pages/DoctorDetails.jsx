import { useParams, Link } from 'react-router-dom'
import { FiStar, FiBriefcase, FiCalendar, FiDollarSign } from 'react-icons/fi'
import { useFetch } from '../hooks/useFetch.js'
import { doctorService } from '../services/doctorService.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function DoctorDetails() {
  const { id } = useParams()
  const { data: doctor, loading } = useFetch(() => doctorService.get(id), [id])

  if (loading) return <LoadingSpinner full />
  if (!doctor) return <p className="text-center py-20 text-slate-400">Doctor not found.</p>

  const name = `${doctor.user?.first_name || ''} ${doctor.user?.last_name || ''}`.trim()

  return (
    <div className="py-14">
      <div className="container-custom grid md:grid-cols-3 gap-10">
        <div className="card p-8 text-center md:col-span-1 h-fit">
          <div className="h-28 w-28 rounded-full bg-primary-50 text-primary-600 grid place-items-center text-3xl font-bold mx-auto mb-4">
            {name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold">Dr. {name}</h1>
          <p className="text-primary-600 font-medium">{doctor.specialization}</p>
          <p className="text-sm text-slate-400 mb-4">{doctor.department_name}</p>
          <Link to="/appointment" state={{ doctorId: doctor.id }} className="btn-primary w-full">
            <FiCalendar /> Book Appointment
          </Link>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4 text-center">
              <FiStar className="mx-auto text-amber-400 mb-1" />
              <p className="font-semibold">{doctor.rating || '4.8'}</p>
              <p className="text-xs text-slate-400">Rating</p>
            </div>
            <div className="card p-4 text-center">
              <FiBriefcase className="mx-auto text-primary-600 mb-1" />
              <p className="font-semibold">{doctor.experience_years}+ yrs</p>
              <p className="text-xs text-slate-400">Experience</p>
            </div>
            <div className="card p-4 text-center">
              <FiDollarSign className="mx-auto text-accent-600 mb-1" />
              <p className="font-semibold">${doctor.consultation_fee}</p>
              <p className="text-xs text-slate-400">Consultation</p>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-slate-500">{doctor.bio || 'No biography provided yet.'}</p>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">Qualifications</h3>
            <p className="text-sm text-slate-500">{doctor.qualification}</p>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">Availability</h3>
            <p className="text-sm text-slate-500">
              {doctor.available_days} · {doctor.available_time_start} – {doctor.available_time_end}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
