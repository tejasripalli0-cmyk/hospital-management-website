import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import DepartmentCard from '../components/DepartmentCard.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import TestimonialSlider from '../components/TestimonialSlider.jsx'
import FAQ from '../components/FAQ.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { doctorService } from '../services/doctorService.js'

export default function Home() {
  const { data: departments, loading: loadingDepts } = useFetch(() => doctorService.departments())
  const { data: doctors, loading: loadingDocs } = useFetch(() => doctorService.list({ page_size: 4 }))

  const departmentList = departments?.results || departments || []
  const doctorList = doctors?.results || doctors || []

  return (
    <div>
      <Hero />

      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">Our Departments</h2>
          <p className="section-subtitle">
            Comprehensive care across every specialty, delivered by dedicated teams.
          </p>
          {loadingDepts ? (
            <LoadingSpinner full />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentList.slice(0, 8).map((d) => (
                <DepartmentCard key={d.id} department={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Meet Our Doctors</h2>
          <p className="section-subtitle">Highly qualified specialists dedicated to your wellbeing.</p>
          {loadingDocs ? (
            <LoadingSpinner full />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctorList.slice(0, 4).map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/doctors" className="btn-primary">View All Doctors</Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title">What Our Patients Say</h2>
          <TestimonialSlider />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to take the next step in your care?</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">Book an appointment with one of our specialists today.</p>
          <Link to="/appointment" className="btn bg-white text-primary-700 hover:bg-slate-100 font-semibold">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
