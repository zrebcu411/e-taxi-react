import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { setAxiosAuthorizationHeader } from '../helpers/authHelper';
import { initializeUser } from '../actions/initializeUser';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.getItem('basicToken')) {
  console.info('hej');
  setAxiosAuthorizationHeader(localStorage.getItem('basicToken'));
  initializeUser();
  // NOTE: should be set current user
}

export default store;
