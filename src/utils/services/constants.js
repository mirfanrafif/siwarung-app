import axios from 'axios'

export const EXT_API = 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: EXT_API,
})
