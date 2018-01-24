import { combineReducers } from 'redux';

import user from './user';
import map from './map';

export default combineReducers({
  user,
  map
});

