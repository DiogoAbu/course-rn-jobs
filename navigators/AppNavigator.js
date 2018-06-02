import React from 'react'

import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AuthScreen from '../screens/AuthScreen'
import DeckScreen from '../screens/DeckScreen'
import MapScreen from '../screens/MapScreen'
import ReviewScreen from '../screens/ReviewScreen'
import SettingsScreen from '../screens/SettingsScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

/* eslint-disable sort-keys */
const ReviewNavigator = createStackNavigator({
  ReviewScreen,
  SettingsScreen,
}, {
  initialRouteName: 'ReviewScreen',
  transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
})

const tabBarIcon = ({ tintColor }) => (
  <MaterialIcon
    color={tintColor}
    name='favorite'
    size={24}
  />
)

ReviewNavigator.navigationOptions = {
  tabBarIcon,
  title: 'Review Jobs',
}

const MainNavigator = createBottomTabNavigator({
  MapScreen,
  DeckScreen,
  ReviewNavigator,
}, {
  initialRouteName: 'MapScreen',
  tabBarOptions   : {
    labelStyle: { fontSize: 12 },
  },
})

export default createSwitchNavigator({
  AuthScreen,
  WelcomeScreen,
  MainNavigator,
}, {
  initialRouteName: 'WelcomeScreen',
})