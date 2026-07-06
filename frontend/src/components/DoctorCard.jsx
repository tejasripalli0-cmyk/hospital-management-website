import { Link } from 'react-router-dom'
import { FiStar, FiBriefcase } from 'react-icons/fi'

export default function DoctorCard({ doctor }) {
  const name = doctor.user?.get_full_name || `${doctor.user?.first_name || ''} ${doctor.user?.last_name || ''}`.trim() || doctor.user?.username

  return (
    <div className="card p-6 flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-full bg-primary-50 text-primary-600 grid place-items-center text-2xl font-bold mb-4 overflow-hidden">
        {doctor.user?.profile_picture ? (
          <img src={doctor.user.profile_picture} alt={name} className="h-full w-full object-cover" />
        ) : (
          name?.charAt(0)?.toUpperCase() || 'D'
        )}
      </div>
      <h3 className="font-semibold text-lg">Dr. {name}</h3>
      <p className="text-primary-600 text-sm font-medium mb-1">{doctor.specialization}</p>
      <p className="text-slate-400 text-xs mb-3">{doctor.department_name}</p>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <span className="flex items-center gap-1"><FiStar className="text-amber-400" /> {doctor.rating || '4.8'}</span>
        <span className="flex items-center gap-1"><FiBriefcase /> {doctor.experience_years}+ yrs</span>
      </div>
      <Link to={`/doctors/${doctor.id}`} className="btn-outline w-full !py-2 text-sm">View Profile</Link>
    </div>
  )
}
