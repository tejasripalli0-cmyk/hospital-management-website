import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="container-custom py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <span className="h-8 w-8 rounded-lg bg-primary-600 text-white grid place-items-center text-sm">+</span>
            MediCare
          </div>
          <p className="text-sm text-slate-400">Compassionate, modern healthcare — for every stage of life.</p>
          <div className="flex gap-3 mt-4 text-lg">
            <FiFacebook className="hover:text-white cursor-pointer" />
            <FiTwitter className="hover:text-white cursor-pointer" />
            <FiInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/doctors" className="hover:text-white">Find a Doctor</Link></li>
            <li><Link to="/departments" className="hover:text-white">Departments</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/appointment" className="hover:text-white">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/emergency" className="hover:text-white">Emergency Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 shrink-0" /> 123 Wellness Ave, Health City</li>
            <li className="flex items-center gap-2"><FiPhone /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><FiMail /> care@medicare-hospital.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} MediCare Hospital. All rights reserved.
      </div>
    </footer>
  )
}
