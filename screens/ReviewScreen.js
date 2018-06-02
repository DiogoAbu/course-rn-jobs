import React from 'react'
import { Linking, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { Button, Card, Icon } from 'react-native-elements'
import { MapView } from 'expo' // eslint-disable-line import/named

import { removeDislikedJobs } from '../actions'

class ReviewScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <Button
      backgroundColor='rgba(0,0,0,0)'
      color='rgba(0,122,255,1)'
      onPress={() => navigation.navigate('SettingsScreen')}
      title='Settings'
    />,
    title: 'Review Jobs',
  })

  state = {
    dislikes: [],
  }

  componentDidMount() {
    this.props.navigation.addListener('willBlur', this._willBlur)
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('willBlur', this._willBlur)
  }

  _willBlur = () => this.props.removeDislikedJobs({ dislikes: this.state.dislikes })

  _onPressIcon = ({ jobkey }) => {
    const dislikes = [ ...this.state.dislikes ]

    const index = dislikes.indexOf(jobkey)
    // Remove if has index
    if (index > -1) {
      dislikes.splice(index, 1)
    }
    // Add otherwise
    else {
      dislikes.push(jobkey)
    }

    this.setState({ dislikes })
  }

  _renderLikedJobs = () => this.props.likes.map(job => (
    <Card
      key={job.jobkey}
      title={job.jobtitle}
    >
      <View style={styles.innerView}>
        <MapView
          cacheEnabled={Platform === 'android'}
          initialRegion={{ latitude: job.latitude, latitudeDelta: 0.045, longitude: job.longitude, longitudeDelta: 0.02 }}
          scrollEnabled={false}
          style={styles.mapView}
        />
        <View style={styles.details}>
          <Text style={styles.italic}>{job.company}</Text>
          <Text style={styles.italic}>{job.formattedRelativeTime}</Text>
        </View>
        <View style={styles.details}>
          <Icon
            color={this.state.dislikes.includes(job.jobkey) ? '#777777' : '#f50'}
            name={this.state.dislikes.includes(job.jobkey) ? 'favorite-border' : 'favorite'}
            onPress={() => this._onPressIcon({ jobkey: job.jobkey })}
            size={36}
          />
          <Button
            backgroundColor='#03A9F4'
            containerViewStyle={styles.buttonContainer}
            onPress={() => Linking.openURL(job.url)}
            title='Apply Now!'
          />
        </View>
      </View>
    </Card>
  ))
  
  render() {
    return (
      <ScrollView>
        {this._renderLikedJobs()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft : 0,
    marginRight: 0,
  },
  
  details: {
    alignItems    : 'center',
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginTop     : 12,
  },

  innerView: {
    height: 200,
  },

  italic: {
    fontStyle: 'italic',
  },

  mapView: {
    flex: 1,
  },

  title: {
    fontWeight: 'bold',
  },
})

const mapStateToProps = ({ likes }) => ({
  likes,
})

export default connect(mapStateToProps, { removeDislikedJobs })(ReviewScreen)