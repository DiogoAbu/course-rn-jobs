import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Button, Card } from 'react-native-elements'
import { MapView } from 'expo' // eslint-disable-line import/named

import Swipe from '../components/Swipe'
import { likeJob } from '../actions'

class DeckScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcon
        color={tintColor}
        name='description'
        size={24}
      />
    ),
    title: 'Jobs',
  }

  _renderCard = ({ item: job }) => (
    <Card title={job.jobtitle}>
      <View style={styles.mapContainer}>
        <MapView
          cacheEnabled={Platform === 'android'}
          initialRegion={{ latitude: job.latitude, latitudeDelta: 0.045, longitude: job.longitude, longitudeDelta: 0.02 }}
          scrollEnabled={false}
          style={styles.mapView}
        />
      </View>
      <View style={styles.jobDetails}>
        <Text>{job.company}</Text>
        <Text style={{ textAlign: 'right' }}>{job.formattedRelativeTime}</Text>
      </View>
      <Text>
        {job.snippet.replace(/<\/?b>/g, '')}
      </Text>
    </Card>
  )

  _renderNoMoreCards = () => (
    <View style={styles.noMoreCards}>
      <Text style={styles.noMoreCardsText}>No Jobs to display</Text>
      <Button
        backgroundColor='#03A9F4'
        icon={{ name: 'map' }}
        large
        onPress={() => this.props.navigation.navigate('MapScreen')}
        title='Find some on Map'
      />
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <Swipe
          data={this.props.jobs}
          keyProp='jobkey'
          onSwipeRight={job => this.props.likeJob({ job })}
          renderCard={this._renderCard}
          renderNoMoreCards={this._renderNoMoreCards}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex           : 1,
    paddingTop     : 48,
  },

  jobDetails: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom  : 12,
    marginTop     : 6,
  },

  mapContainer: {
    height: 300,
  },

  mapView: {
    flex: 1,
  },

  noMoreCards: {
    alignItems    : 'center',
    flex          : 1,
    justifyContent: 'center',
  },

  noMoreCardsText: {
    fontSize    : 20,
    fontWeight  : 'bold',
    marginBottom: 12,
  },
})

const mapStateToProps = ({ job }) => ({
  jobs: job.jobs,
})

export default connect(mapStateToProps, { likeJob })(DeckScreen)