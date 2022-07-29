import { EXT_API } from './constants'

export const MenuService = () => {
  const getMenu = async (token) => {
    return fetch(`${EXT_API}/products`, {
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

  const addMenu = async (values, token) => {
    return fetch(`${EXT_API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  const detailMenu = async (id, token) => {
    return fetch(`${EXT_API}/products/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const updateMenu = async (id, values, token) => {
    return fetch(`${EXT_API}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }

  const deleteMenu = async (id, token) => {
    return fetch(`${EXT_API}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    }).then((res) => res.json())
  }

  return { getMenu, addMenu, detailMenu, updateMenu, deleteMenu }
}
