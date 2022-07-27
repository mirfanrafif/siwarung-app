import { PayloadAction } from '@reduxjs/toolkit'
import { LOGIN, LOGOUT } from '../constants/AuthConstants'
import { AuthResponse } from '../../services/response/AuthResponse'

export var authInitialState = {
  access_token: '',
  user: {
    id: 0,
    email_verified_at: null,
    created_at: Date.prototype,
    updated_at: Date.prototype,
  },
}

var authData = window.localStorage.getItem('authReducers')
authInitialState = authData ? JSON.parse(authData) : authInitialState

const AuthReducers = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      const authData = action.payload
      window.localStorage.setItem('authReducers', JSON.stringify(authData))
      return authData
    case LOGOUT:
      window.localStorage.removeItem('authReducers')
      return authInitialState
    default:
      return state
  }
}

export default AuthReducers
