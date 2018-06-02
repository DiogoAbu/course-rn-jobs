import reduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import storage from 'redux-persist/lib/storage'
import { persistCombineReducers, persistStore } from 'redux-persist'

import * as reducers from '../reducers'

const persistConfig = {
  key      : 'root',
  storage,
  whitelist: [ 'likes' ],
}
const persistedReducer = persistCombineReducers(persistConfig, reducers)

const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav)
const combinedMiddleware = applyMiddleware(navMiddleware, reduxThunk)

export default () => {
  const store = createStore(persistedReducer, {}, combinedMiddleware)
  const persistor = persistStore(store)
  return { persistor, store }
}