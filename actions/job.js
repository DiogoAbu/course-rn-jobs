//import qs from 'qs'
import { NavigationActions } from 'react-navigation'

import jobData from './job_data'
import { CLEAR_LIKED_JOBS, JOBS_FAIL, JOBS_REQUEST, JOBS_SUCCESS, LIKE_JOB, REMOVE_DISLIKED_JOBS } from './types'

/*const ZIP = {
  city          : 'Santa Cruz',
  country       : 'USA',
  isoCountryCode: 'US',
  name          : '1840a',
  postalCode    : '95062',
  region        : 'California',
  street        : '17th Avenue',
}

const JOB_URL = 'http://api.indeed.com/ads/apisearch?'
const JOB_QUERY = {
  format   : 'json',
  latlong  : 1,
  publisher: 4201738803816157,
  q        : 'javascript',
  radius   : 10,
  v        : '2',
}*/

const timeout = ms => new Promise(res => setTimeout(res, ms))

export const fetchJobs = ({ region }) => async dispatch => {
  dispatch({ type: JOBS_REQUEST })

  try {
    //const url = `${JOB_URL}${qs.stringify({ ...JOB_QUERY, l: ZIP })}`
    //const jobs = await fetch(url).then(res => res.json())
    const jobs = jobData(region)

    await timeout(1000)

    await dispatch({ payload: jobs.results, type: JOBS_SUCCESS })
    dispatch(NavigationActions.navigate({ routeName: 'DeckScreen' }))
  }
  catch (e) {
    dispatch({ payload: e.message || 'Failed to fetch jobs', type: JOBS_FAIL })
  }
}

export const likeJob = ({ job }) => ({
  payload: job,
  type   : LIKE_JOB,
})

export const removeDislikedJobs = ({ dislikes }) => ({
  payload: dislikes,
  type   : REMOVE_DISLIKED_JOBS,
})

export const clearLikedJobs = () => dispatch => {
  dispatch({ type: CLEAR_LIKED_JOBS })
  dispatch(NavigationActions.back())
}