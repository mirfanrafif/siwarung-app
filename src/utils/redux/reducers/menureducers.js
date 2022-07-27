import { ADD_CART, DELETE_CART, SET_CART, CLEAR_CART } from '../actionconstants'

export var keranjangInitialState = {
  keranjang: [],
  total: 0,
}
if (typeof localStorage !== 'undefined') {
  const keranjangLocal = localStorage.getItem('cart')
  if (keranjangLocal) {
    keranjangInitialState = JSON.parse(keranjangLocal)
  }
}

const countTotal = (keranjangList) => {
  //count total
  var newTotal = 0
  keranjangList.forEach((value) => {
    newTotal += value.menu.price * value.jumlah
  })
  return newTotal
}

const keranjangReducer = (state = keranjangInitialState, action) => {
  switch (action.type) {
    case ADD_CART:
      var newKeranjangList = [...state.keranjang]

      //add to keranjang
      const menuIndex = newKeranjangList.findIndex((keranjang) => {
        return keranjang.menu.id === action.payload.id
      })
      if (menuIndex > -1) {
        const newKeranjang = { ...newKeranjangList[menuIndex] }
        newKeranjang.jumlah += 1
        newKeranjangList[menuIndex] = newKeranjang
      } else {
        newKeranjangList.push({ menu: action.payload, jumlah: 1 })
      }

      const newKeranjangState = {
        ...state,
        keranjang: newKeranjangList,
        total: countTotal(newKeranjangList),
      }

      localStorage.setItem('cart', JSON.stringify(newKeranjangState))
      return newKeranjangState

    case DELETE_CART:
      const newKeranjangListDelete = [...state.keranjang]
      const deleteIndex = newKeranjangListDelete.findIndex((element) => {
        return element.menu.id === action.payload.menu.id
      })
      newKeranjangListDelete.splice(deleteIndex, 1)
      const newKeranjangStateDelete = {
        ...state,
        keranjang: newKeranjangListDelete,
        total: countTotal(newKeranjangListDelete),
      }
      localStorage.setItem('cart', JSON.stringify(newKeranjangStateDelete))
      return newKeranjangStateDelete

    case SET_CART:
      const newKeranjangEdit = action.payload
      const newKeranjangListEdit = [...state.keranjang]
      const editIndex = newKeranjangListEdit.findIndex(
        (keranjang) => keranjang.menu.id === newKeranjangEdit.menu.id,
      )
      if (editIndex > -1) {
        newKeranjangListEdit[editIndex] = newKeranjangEdit
      }

      if (newKeranjangEdit.jumlah === 0) {
        newKeranjangListEdit.splice(editIndex, 1)
      }

      const newKeranjangStateEdit = {
        ...state,
        keranjang: newKeranjangListEdit,
        total: countTotal(newKeranjangListEdit),
      }
      localStorage.setItem('cart', JSON.stringify(newKeranjangStateEdit))
      return newKeranjangStateEdit

    case CLEAR_CART:
      const newKeranjang = {
        ...state,
        total: 0,
        keranjang: [],
      }
      localStorage.setItem('cart', JSON.stringify(newKeranjang))
      return newKeranjang
    default:
      return state
  }
}

export default keranjangReducer
