import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

class Slides extends React.PureComponent {
  _renderSlides = () => this.props.data.map((slide, index) => (
    <View
      key={slide.text}
      style={[ styles.slideView, { backgroundColor: slide.color } ]}
    >
      <Text style={styles.slideText}>{slide.text}</Text>
      
      {index === this.props.data.length -1 ? (
        <Button
          buttonStyle={styles.slideButton}
          containerViewStyle={styles.slideButtonView}
          onPress={this.props.onComplete}
          raised
          title='Onwards!'
        />
      ) : null}
    </View>
  ))

  render() {
    return (
      <ScrollView
        horizontal
        overScrollMode='never'
        pagingEnabled
        style={styles.scrollView}
      >
        {this._renderSlides()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  slideButton: {
    backgroundColor: '#0288D1',
  },

  slideButtonView: {
    marginTop: 24,
  },

  slideText: {
    color    : '#FFFFFF',
    fontSize : 30,
    textAlign: 'center',
  },

  slideView: {
    alignItems    : 'center',
    flex          : 1,
    justifyContent: 'center',
    width         : SCREEN_WIDTH,
  },
})

export default Slides