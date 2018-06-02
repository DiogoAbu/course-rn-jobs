import { createNavigationReducer } from 'react-navigation-redux-helpers'

import AppNavigator from '../navigators/AppNavigator'

export const nav = createNavigationReducer(AppNavigator)
export { default as auth } from './auth'
export { default as job } from './job'
export { default as likes } from './likes'
