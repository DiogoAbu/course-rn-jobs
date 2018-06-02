import React from 'react'
import { Alert, BackHandler } from 'react-native'

import { NavigationActions } from 'react-navigation'
import { Notifications } from 'expo' // eslint-disable-line import/named
import { Provider, connect } from 'react-redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import AppNavigator from './navigators/AppNavigator'
import createStore from './constants/store'
import registerPushNotifications from './services/push'

import { PersistGate } from 'redux-persist/integration/react'

const addListener = createReduxBoundAddListener('root')
class App extends React.PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
    
    registerPushNotifications()
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification

      if (origin === 'received' && text){
        Alert.alert('New notification', text, [ { text: 'OK' } ])
      }
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  _onBackPress = () => {
    const { dispatch, nav } = this.props
    
    if (nav.index === 0) { return false }
    if (nav.index === 1) { return false }
    if (nav.index === 2 && nav.routes[2].index === 0) { return false }

    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, nav } = this.props

    return <AppNavigator navigation={{ addListener, dispatch, state: nav }} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})

const AppWithNavigationState = connect(mapStateToProps)(App)

const { persistor, store } = createStore()

const Root = () => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
)

export default Root