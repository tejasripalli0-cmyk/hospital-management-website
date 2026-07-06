import ServiceCard from '../components/ServiceCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { doctorService } from '../services/doctorService.js'

export default function Services() {
  const { data, loading } = useFetch(() => doctorService.services())
  const services = data?.results || data || []

  return (
    <div className="py-14">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Comprehensive diagnostic, treatment, and wellness services under one roof.
          </p>
        </div>
        {loading ? (
          <LoadingSpinner full />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        )}
      </div>
    </div>
  )
}
