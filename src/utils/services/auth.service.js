import { EXT_API } from './constants'

export const AuthService = () => {
  const login = async (data) => {
    return fetch(`${EXT_API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.status < 400) {
        return await res.json()
      } else {
        return Promise.reject(res.statusText)
      }
    })
  }
  return { login }
}
