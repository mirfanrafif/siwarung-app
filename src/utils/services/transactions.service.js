import { EXT_API } from './constants'

export const TransactionService = () => {
  const saveTransaction = async (data, token) => {
    return fetch(`${EXT_API}/transactions`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      if (res.status < 400) {
        return res.json()
      } else {
        return Promise.reject(res.statusText)
      }
    })
  }
  return { saveTransaction }
}
