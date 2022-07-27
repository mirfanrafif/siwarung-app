import { EXT_API } from './constants'

export const MenuService = () => {
  const getMenu = async () => {
    return fetch(`${EXT_API}/products`).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject(res.statusText)
      }
    })
  }

  const addMenu = async (values) => {
    return fetch(`${EXT_API}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  const detailMenu = async (id) => {
    return fetch(`${EXT_API}/menu/${id}`).then((res) => {
      return res.json()
    })
  }

  const updateMenu = async (id, values) => {
    return fetch(`${EXT_API}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  return { getMenu, addMenu, detailMenu, updateMenu }
}
