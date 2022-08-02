import { apiClient, EXT_API } from './constants'

export const AuthService = () => {
  const login = async (data) => {
    return apiClient.post('/auth/login', data)
    // return fetch(`${EXT_API}/auth/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(async (res) => {
    //     return await res.json()
    //   })
    //   .catch(async (error) => {
    //     var body = error.response.json()
    //     return Promise.reject(body.message)
    //   })
  }
  return { login }
}
