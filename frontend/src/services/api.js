import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: API_BASE })

export async function sendQuery(query) {
  const res = await api.post('/chat', { query })
  return res.data
}

export async function fetchStudies() {
  const res = await api.get('/studies')
  return res.data
}

export async function fetchMemory() {
  const res = await api.get('/memory')
  return res.data
}

export async function clearMemory() {
  const res = await api.delete('/memory')
  return res.data
}
