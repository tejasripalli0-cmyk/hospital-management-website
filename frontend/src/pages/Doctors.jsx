import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Pagination from '../components/Pagination.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { doctorService } from '../services/doctorService.js'

export default function Doctors() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState(searchParams.get('department') || '')
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    doctorService.departments().then((res) => setDepartments(res.data.results || res.data))
  }, [])

  useEffect(() => {
    setLoading(true)
    doctorService
      .list({ search, department: department || undefined, page })
      .then((res) => {
        const data = res.data
        setDoctors(data.results || data)
        setTotalPages(data.count ? Math.ceil(data.count / 10) : 1)
      })
      .finally(() => setLoading(false))
  }, [search, department, page])

  return (
    <div className="py-14">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Find a Doctor</h1>
          <p className="text-slate-500">Search by name, specialty, or department.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <SearchBar value={search} onChange={setSearch} placeholder="Search doctors..." />
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="input-field sm:max-w-xs">
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <LoadingSpinner full />
        ) : doctors.length === 0 ? (
          <p className="text-center text-slate-400">No doctors found matching your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
