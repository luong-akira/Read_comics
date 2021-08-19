import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import comment from './comment';
export default combineReducers({
  auth,
  alert,
  comment,
});
