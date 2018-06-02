import uniqBy from 'lodash.uniqby'
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants'

import { CLEAR_LIKED_JOBS, LIKE_JOB, REMOVE_DISLIKED_JOBS } from '../actions/types'

const initialState = []

export default (state = initialState, { type, payload }) => {
  if (type === PERSIST_REHYDRATE){
    return payload.likes || []
  }
  if (type === LIKE_JOB){
    return uniqBy([ ...state, payload ], 'jobkey')
  }
  if (type === REMOVE_DISLIKED_JOBS){
    return state.filter(({ jobkey }) => !payload.includes(jobkey))
  }
  if (type === CLEAR_LIKED_JOBS){
    return []
  }

  return state
}