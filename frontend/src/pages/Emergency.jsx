import { FiPhoneCall, FiAlertTriangle } from 'react-icons/fi'
import { useFetch } from '../hooks/useFetch.js'
import { doctorService } from '../services/doctorService.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function Emergency() {
  const { data, loading } = useFetch(() => doctorService.emergencyContacts())
  const contacts = data?.results || data || []

  return (
    <div className="py-16 bg-red-50 min-h-[70vh]">
      <div className="container-custom max-w-2xl text-center">
        <FiAlertTriangle className="text-5xl text-red-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-red-700 mb-3">Emergency Assistance</h1>
        <p className="text-slate-600 mb-10">
          If this is a life-threatening emergency, call the number below immediately or head
          to our Emergency Department, open 24/7.
        </p>

        {loading ? (
          <LoadingSpinner full />
        ) : (
          <div className="space-y-4">
            {(contacts.length ? contacts : [{ id: 1, title: 'Emergency Hotline', phone_number: '911', description: 'Available 24/7' }]).map((c) => (
              <a
                key={c.id}
                href={`tel:${c.phone_number}`}
                className="card p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
              >
                <div className="text-left">
                  <p className="font-semibold text-lg">{c.title}</p>
                  <p className="text-sm text-slate-400">{c.description}</p>
                </div>
                <span className="btn bg-red-600 text-white hover:bg-red-700">
                  <FiPhoneCall /> {c.phone_number}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
