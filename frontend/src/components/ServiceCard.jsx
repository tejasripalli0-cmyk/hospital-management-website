import { FiCheckCircle } from 'react-icons/fi'

export default function ServiceCard({ service }) {
  return (
    <div className="card p-6">
      <FiCheckCircle className="text-accent-500 text-2xl mb-3" />
      <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
      <p className="text-sm text-slate-500 mb-4">{service.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">{service.department_name}</span>
        <span className="font-semibold text-primary-600">${service.price}</span>
      </div>
    </div>
  )
}
