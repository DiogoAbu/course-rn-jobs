import { JOBS_FAIL, JOBS_REQUEST, JOBS_RESET, JOBS_SUCCESS } from '../actions/types'

const initialState = {
  error  : '',
  jobs   : [],
  likes  : [],
  loading: false,
}

export default (state = initialState, { type, payload }) => {
  if (type === JOBS_REQUEST){
    return { ...state, error: '', jobs: [], loading: true }
  }
  if (type === JOBS_SUCCESS){
    return { ...state, error: '', jobs: payload, loading: false }
  }
  if (type === JOBS_FAIL){
    return { ...state, error: payload, jobs: [], loading: false }
  }
  if (type === JOBS_RESET){
    return { ...state, error: '', jobs: [], loading: false }
  }

  return state
}