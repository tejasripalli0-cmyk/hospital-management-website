import api from './api'

export const medicalRecordService = {
  list: () => api.get('/medical-records/records/'),
  get: (id) => api.get(`/medical-records/records/${id}/`),
  create: (payload) => api.post('/medical-records/records/', payload),
}
