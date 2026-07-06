import { Link } from 'react-router-dom'
import { FiCalendar, FiPhoneCall, FiShield, FiUsers, FiAward } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="container-custom relative py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
            Trusted care since 1998
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Your Health, <br /> Our Priority.
          </h1>
          <p className="text-white/85 text-lg mb-8 max-w-md">
            Book appointments with expert doctors, access your medical records, and get
            the care you deserve — all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/appointment" className="btn bg-white text-primary-700 hover:bg-slate-100 font-semibold">
              <FiCalendar /> Book Appointment
            </Link>
            <Link to="/emergency" className="btn border-2 border-white/70 text-white hover:bg-white/10">
              <FiPhoneCall /> Emergency Line
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-2xl"><FiUsers />120+</div>
              <p className="text-xs text-white/70 mt-1">Expert Doctors</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-2xl"><FiAward />25+</div>
              <p className="text-xs text-white/70 mt-1">Years Experience</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-2xl"><FiShield />50k+</div>
              <p className="text-xs text-white/70 mt-1">Happy Patients</p>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="aspect-square rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
            <span className="text-white/40 text-sm">Hero illustration placeholder</span>
          </div>
        </div>
      </div>
    </section>
  )
}
