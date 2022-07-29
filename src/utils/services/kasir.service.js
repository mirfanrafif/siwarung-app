import { EXT_API } from './constants'

export const KasirService = () => {
  const getKasir = async (token) => {
    return fetch(`${EXT_API}/warung_kasir`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject(res.statusText)
      }
    })
  }

  const addKasir = async (values, token) => {
    return fetch(`${EXT_API}/warung_kasir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  const detailKasir = async (id, token) => {
    return fetch(`${EXT_API}/warung_kasir/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const updateKasir = async (id, values, token) => {
    return fetch(`${EXT_API}/warung_kasir/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  const deleteKasir = async (id, token) => {
    return fetch(`${EXT_API}/warung_kasir/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    }).then((res) => res.json())
  }

  return {
    getKasir,
    addKasir,
    detailKasir,
    updateKasir,
    deleteKasir,
  }
}
