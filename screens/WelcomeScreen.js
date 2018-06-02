import React from 'react'
import { AsyncStorage } from 'react-native'

import { AppLoading } from 'expo' // eslint-disable-line import/named

import Slides from '../components/Slides'

const SLIDE_DATA = [
  { color: '#03A9F4', text: 'Welcome to Jobs App' },
  { color: '#009688', text: 'Use this to get a job' },
  { color: '#03A9F4', text: 'Set your location, then swipe away' },
]

class WelcomeScreen extends React.PureComponent {
  state = { token: null }

  async componentDidMount(){
    const token = await AsyncStorage.getItem('facebookToken')
    
    if (token){
      this.setState({ token }, () => this.props.navigation.navigate('MainNavigator'))
    }
    else {
      this.setState({ token: false })
    }
  }

  _onSlidesComplete = () => this.props.navigation.navigate('AuthScreen')

  render() {
    if (this.state.token === null){
      return <AppLoading />
    }
    
    return (
      <Slides
        data={SLIDE_DATA}
        onComplete={this._onSlidesComplete}
      />
    )
  }
}

export default WelcomeScreen