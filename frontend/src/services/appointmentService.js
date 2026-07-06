import api from './api'

export const appointmentService = {
  list: (params) => api.get('/appointments/appointments/', { params }),
  get: (id) => api.get(`/appointments/appointments/${id}/`),
  book: (payload) => api.post('/appointments/appointments/', payload),
  update: (id, payload) => api.patch(`/appointments/appointments/${id}/`, payload),
  cancel: (id) => api.patch(`/appointments/appointments/${id}/`, { status: 'CANCELLED' }),
}
