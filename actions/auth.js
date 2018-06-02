import { AsyncStorage } from 'react-native'
//import { Facebook } from 'expo' // eslint-disable-line import/named

import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from './types'

//const FB_APP_ID = '196207057539134'
const FB_STORAGE_KEY = 'facebookToken'

export const facebookLogin = () => async dispatch => {
  dispatch({ type: LOGIN_REQUEST })

  try {
    const token = await AsyncStorage.getItem(FB_STORAGE_KEY)
    dispatch(token ? { payload: token, type: LOGIN_SUCCESS } : requestTokenFromFacebook())
  }
  catch (e) {
    dispatch({ payload: e.message || 'Failed to login', type: LOGIN_FAIL })
  }
}

const requestTokenFromFacebook = async () => {
  const { type, token } = { token: 'BGpqjkeAVNaifXSdJDYcwJAwSQ1F9ONA', type: 'success' }
  //const { type, token } = await Facebook.logInWithReadPermissionsAsync(FB_APP_ID, { permissions: [ 'public_profile' ] })

  if (type === 'success') {
    await AsyncStorage.setItem(FB_STORAGE_KEY, token)
    return { payload: token, type: LOGIN_SUCCESS }
  }
  
  return { payload: 'Facebook login failed', type: LOGIN_FAIL }
}