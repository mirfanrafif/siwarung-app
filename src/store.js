import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import keranjangReducer, { keranjangInitialState } from './utils/redux/reducers/menureducers'
import AuthReducers, { authInitialState } from './utils/redux/reducers/authreducers'

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
    AuthReducers,
  }),
  preloadedState: {
    changeState: initialState,
    keranjangReducer: keranjangInitialState,
    AuthReducers: authInitialState,
  },
  devTools: true,
})

export default AppStore
