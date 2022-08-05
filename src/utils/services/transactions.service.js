import { apiClient, EXT_API } from './constants'

export const TransactionService = () => {
  const saveTransaction = async (data, token) => {
    return apiClient.post(`/transactions`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
  }
  return { saveTransaction }
}
