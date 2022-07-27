import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import keranjangReducer, { keranjangInitialState } from './utils/redux/reducers/menureducers'

const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export const AppStore = configureStore({
  reducer: combineReducers({
    changeState,
    keranjangReducer,
  }),
  preloadedState: {
    changeState: initialState,
    keranjangReducer: keranjangInitialState,
  },
  devTools: true,
})

export default AppStore
