import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { setAxiosAuthorizationHeader } from '../helpers/authHelper';
import { setCurrentUser } from '../actions/initializeUser';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const basicToken = localStorage.getItem('basicToken');
const user = localStorage.getItem('user');

if (basicToken && user) {
  setAxiosAuthorizationHeader(basicToken);
  store.dispatch(setCurrentUser(JSON.parse(user)));
}

export default store;
