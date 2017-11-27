import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import currentUser from '../react/sharedResources/reducers/currentUser'

const middlewares = [thunkMiddleware]

const store = createStore(
  combineReducers({currentUser}),
  applyMiddleware(...middlewares)
)

import FindMyWay from '../react/src/FindMyWay';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Provider store={store}><FindMyWay /></Provider>, document.getElementById('app'));
})
