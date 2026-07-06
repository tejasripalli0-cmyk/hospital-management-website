import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  { q: 'How do I book an appointment?', a: 'Create an account, browse our doctors, and select a convenient time slot on the Appointment page.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes — visit your dashboard to cancel or update any upcoming appointment.' },
  { q: 'Is my medical data secure?', a: 'All records are encrypted and only accessible to you and your treating doctor.' },
  { q: 'Do you accept walk-ins for emergencies?', a: 'Yes, our emergency department is open 24/7 for urgent care.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="max-w-2xl mx-auto divide-y divide-slate-100">
      {faqs.map((item, i) => (
        <div key={i} className="py-4">
          <button
            className="w-full flex items-center justify-between text-left font-medium text-slate-800"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          >
            {item.q}
            <FiChevronDown className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && <p className="text-sm text-slate-500 mt-2">{item.a}</p>}
        </div>
      ))}
    </div>
  )
}
