import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/types'

const initialState = {
  error  : '',
  loading: false,
  token  : null,
}

export default (state = initialState, { type, payload }) => {
  if (type === LOGIN_REQUEST){
    return { ...state, ...initialState, loading: true }
  }
  if (type === LOGIN_SUCCESS){
    return { ...state, ...initialState, token: payload }
  }
  if (type === LOGIN_FAIL){
    return { ...state, ...initialState, error: payload }
  }

  return state
}