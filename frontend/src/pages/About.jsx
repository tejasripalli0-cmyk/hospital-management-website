import { FiHeart, FiUsers, FiAward, FiShield } from 'react-icons/fi'

const values = [
  { icon: FiHeart, title: 'Compassion', text: 'Every patient is treated with dignity, empathy, and respect.' },
  { icon: FiShield, title: 'Integrity', text: 'Transparent, ethical care you can always trust.' },
  { icon: FiAward, title: 'Excellence', text: 'State-of-the-art facilities and continuous training for our staff.' },
  { icon: FiUsers, title: 'Community', text: 'Committed to the health and wellbeing of the community we serve.' },
]

export default function About() {
  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About MediCare Hospital</h1>
          <p className="text-slate-500">
            For over 25 years, MediCare Hospital has been a trusted name in healthcare — combining
            advanced medical technology with a deeply human approach to treatment and recovery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <v.icon className="text-3xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-slate-500">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-video rounded-2xl bg-slate-100 grid place-items-center text-slate-400">
            Hospital building placeholder
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-500 mb-4">
              To provide accessible, high-quality healthcare that improves the lives of every patient
              who walks through our doors — supported by a multidisciplinary team of specialists and
              a culture of continuous learning.
            </p>
            <p className="text-slate-500">
              We invest in modern diagnostic and treatment technology, and in the people who use it,
              to ensure every visit meets the highest standard of care.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
