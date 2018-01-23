import { isEmpty } from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
  role: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
    // console.log(action.user.role[0].role);
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        role: action.user.role ? action.user.role[0].role : ''
      };
    default:
      return state;
  }
};
