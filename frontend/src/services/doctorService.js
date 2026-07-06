import api from './api'

export const doctorService = {
  list: (params) => api.get('/hospital/doctors/', { params }),
  get: (id) => api.get(`/hospital/doctors/${id}/`),
  departments: () => api.get('/hospital/departments/'),
  services: (params) => api.get('/hospital/services/', { params }),
  emergencyContacts: () => api.get('/hospital/emergency-contacts/'),
  announcements: () => api.get('/hospital/announcements/'),
}
