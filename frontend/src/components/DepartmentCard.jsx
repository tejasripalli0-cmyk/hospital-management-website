import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function DepartmentCard({ department }) {
  return (
    <Link
      to={`/doctors?department=${department.id}`}
      className="card p-6 flex flex-col group hover:-translate-y-1 transition-transform"
    >
      <div className="h-12 w-12 rounded-xl bg-accent-500/10 text-accent-600 grid place-items-center font-bold mb-4">
        {department.name.charAt(0)}
      </div>
      <h3 className="font-semibold text-lg mb-2">{department.name}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{department.description}</p>
      <span className="text-primary-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
        Explore <FiArrowRight />
      </span>
    </Link>
  )
}
