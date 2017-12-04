import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import currentUser from '../react/sharedResources/reducers/currentUser'
import trips from '../react/src/planning/tripIndex/reducers/allTrips'

const middlewares = [thunkMiddleware]

const store = createStore(
  combineReducers({
    currentUser,
    trips,
  }),
  applyMiddleware(...middlewares)
)

import FindMyWay from '../react/src/FindMyWay';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Provider store={store}><FindMyWay /></Provider>, document.getElementById('app'));
})
