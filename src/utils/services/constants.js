import axios from 'axios'

export const EXT_API = 'https://api.siwarung.mirfanrafif.me'

export const apiClient = axios.create({
  baseURL: EXT_API,
})
