import { ADD_CART, CLEAR_CART, SET_CART, DELETE_CART } from '../actionconstants'

export const addKeranjangAction = (item) => {
  return {
    type: ADD_CART,
    payload: item,
  }
}
export const setKeranjangAction = (item) => {
  return {
    type: SET_CART,
    payload: item,
  }
}

export const deleteKeranjangAction = (item) => {
  return {
    type: DELETE_CART,
    payload: item,
  }
}

export const cartCleanAction = () => {
  return {
    type: CLEAR_CART,
  }
}
