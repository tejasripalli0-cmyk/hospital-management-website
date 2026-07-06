import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'

const styles = {
  success: { bg: 'bg-emerald-600', icon: FiCheckCircle },
  error: { bg: 'bg-red-600', icon: FiAlertCircle },
  info: { bg: 'bg-primary-600', icon: FiInfo },
}

export default function Toast({ message, type = 'success' }) {
  const { bg, icon: Icon } = styles[type] || styles.info
  return (
    <div className={`${bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 min-w-[240px] animate-[fadeIn_0.2s_ease-out]`}>
      <Icon className="shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
