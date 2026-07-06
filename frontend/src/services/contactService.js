import api from './api'

export const contactService = {
  send: (payload) => api.post('/contact/messages/', payload),
}
