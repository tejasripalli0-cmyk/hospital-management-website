import DepartmentCard from '../components/DepartmentCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { doctorService } from '../services/doctorService.js'

export default function Departments() {
  const { data, loading } = useFetch(() => doctorService.departments())
  const departments = data?.results || data || []

  return (
    <div className="py-14">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Our Departments</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Specialized care teams equipped with modern technology across every major discipline.
          </p>
        </div>
        {loading ? (
          <LoadingSpinner full />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => <DepartmentCard key={d.id} department={d} />)}
          </div>
        )}
      </div>
    </div>
  )
}
