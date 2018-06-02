import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { facebookLogin } from '../actions'

class AuthScreen extends React.PureComponent {
  componentDidMount() {
    this.props.facebookLogin()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.navigation.navigate('MainNavigator')
    }
  }

  render() {
    return (
      <View />
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  error  : auth.error,
  loading: auth.loading,
  token  : auth.token,
})

export default connect(mapStateToProps, { facebookLogin })(AuthScreen)