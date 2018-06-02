import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Button } from 'react-native-elements'

import { clearLikedJobs } from '../actions'

class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View>
        <Button
          backgroundColor='#F44336'
          containerViewStyle={styles.button}
          icon={{ name: 'delete-forever' }}
          large
          onPress={this.props.clearLikedJobs}
          title='Clear All Liked Jobs'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
})

export default connect(null, { clearLikedJobs })(SettingsScreen)