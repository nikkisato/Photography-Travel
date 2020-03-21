import { combineReducers } from 'redux';
import authReducers from './authReducers';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducers,
  firebase: firebaseReducer
});
