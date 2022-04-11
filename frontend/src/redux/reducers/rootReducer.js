import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  // reducers go here
  auth: userReducer,
  event: eventReducer
});

export default rootReducer;