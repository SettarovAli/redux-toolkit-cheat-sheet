import { combineReducers } from 'redux';
import bugs from './bugs';
import members from './members';

export default combineReducers({
  bugs,
  members,
});
