import { EXT_API } from './constants'

export const AuthService = () => {
  const login = async (data) => {
    return fetch(`${EXT_API}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject(res.statusText)
      }
    })
  }
  return { login }
}
