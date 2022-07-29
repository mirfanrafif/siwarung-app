import { LOGIN, LOGOUT } from '../actionconstants'

export var authInitialState = {
  token: '',
  user: {
    id: 0,
    name: '',
    role: '',
    username: '',
    created_at: Date.prototype,
    updated_at: Date.prototype,
    deleted_at: null,
  },
}

var authData = window.localStorage.getItem('authReducers')
authInitialState = authData ? JSON.parse(authData) : authInitialState

const AuthReducers = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN:
      const authData = action.payload.data
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
