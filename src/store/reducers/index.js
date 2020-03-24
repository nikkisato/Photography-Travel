import { combineReducers } from 'redux';
import authReducers from './authReducers';
import { firebaseReducer } from 'react-redux-firebase';

import todosReducer from './todoReducers'

export default combineReducers({
  auth: authReducers,
  todos: todosReducer,
  firebase: firebaseReducer
});
