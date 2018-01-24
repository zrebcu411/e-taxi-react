const initialState = {
  selectedDriver: {},
  passengerLocation: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_DRIVER':
      return {
        ...state,
        selectedDriver: action.driver
      };
    case 'SELECT_PASSENGER_LOCATION':
      console.log(action.location);
      return {
        ...state,
        passengerLocation: action.location
      };
    default:
      return state;
  }
};
