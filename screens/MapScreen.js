import React from 'react'
import { ActivityIndicator, LayoutAnimation, StyleSheet, UIManager, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Button } from 'react-native-elements'
import { MapView } from 'expo' // eslint-disable-line import/named

import { JOBS_RESET } from '../actions/types'
import { fetchJobs } from '../actions'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

class MapScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcon
        color={tintColor}
        name='map'
        size={24}
      />
    ),
    title: 'Map',
  }

  state = {
    mapReady: false,
    region  : {
      latitude      : 37.78825,
      latitudeDelta : 0.0922,
      longitude     : -122.4324,
      longitudeDelta: 0.0421,
    },
  }

  componentDidMount() {
    this.setState({ mapReady: true })
  }
  
  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut()
  }
  
  _onRegionChangeComplete = region => this.setState({ region })

  _onPressSearch = () => this.props.fetchJobs({ region: this.state.region })

  _onPressError = () => this.props.dispatch({ type: JOBS_RESET })

  render() {
    if (!this.state.mapReady) {
      return (
        <View style={styles.loadingView}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={styles.view}>
        <MapView
          initialRegion={this.state.region}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.region}
          style={styles.mapView} 
        />
        <View style={styles.buttonView}>
          <Button
            backgroundColor='#009688'
            icon={this.props.loading ? null : { name: 'search' }}
            large
            loading={this.props.loading}
            onPress={this.props.loading ? null : this._onPressSearch}
            title={this.props.loading ? 'Searching...' : 'Search This Area'}
          />
          {this.props.error ? (
            <Button
              backgroundColor='#e74c3c'
              icon={{ name: 'error' }}
              onPress={this._onPressError}
              title={this.props.error}
            />
          ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    bottom  : 15,
    left    : 0,
    position: 'absolute',
    right   : 0,
  },

  loadingView: {
    alignItems    : 'center',
    flex          : 1,
    justifyContent: 'center',
  },
  
  mapView: {
    flex: 1,
  },

  view: {
    flex: 1,
  },
})

const mapStateToProps = ({ job }) => ({
  error  : job.error,
  loading: job.loading,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({ fetchJobs }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)