import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'

const testimonials = [
  { name: 'Sarah Johnson', text: 'The staff were incredibly caring and the booking process was seamless. Highly recommend!' },
  { name: 'Michael Chen', text: 'Dr. Patel took the time to explain everything clearly. Best hospital experience I have had.' },
  { name: 'Amina Yusuf', text: 'Fast, professional, and compassionate care from check-in to follow-up.' },
]

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  const next = () => setIndex((index + 1) % testimonials.length)
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center gap-1 text-amber-400 mb-4">
        {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} fill="currentColor" />)}
      </div>
      <p className="text-lg text-slate-600 italic mb-6">"{t.text}"</p>
      <p className="font-semibold text-slate-900 mb-6">{t.name}</p>
      <div className="flex justify-center gap-3">
        <button onClick={prev} className="btn-outline !p-2.5 rounded-full"><FiChevronLeft /></button>
        <button onClick={next} className="btn-outline !p-2.5 rounded-full"><FiChevronRight /></button>
      </div>
    </div>
  )
}
