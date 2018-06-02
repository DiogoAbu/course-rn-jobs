import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo' // eslint-disable-line import/named

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'
const PUSH_STORAGE_KEY = 'pushtoken'

export default async () => {
  try {
    const previousToken = await AsyncStorage.getItem(PUSH_STORAGE_KEY)
    if (previousToken){
      return
    }
  
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (status !== 'granted'){
      return
    }

    const token = await Notifications.getExpoPushTokenAsync()

    const response = await fetch(PUSH_ENDPOINT, {
      body: JSON.stringify({
        token: {
          token,
        },
      }),
      headers: {
        Accept        : 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.ok){
      await AsyncStorage.setItem(PUSH_STORAGE_KEY, token)
    }
  }
  catch (e) {
    //
  }
}