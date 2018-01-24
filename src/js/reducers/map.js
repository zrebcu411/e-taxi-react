const initialState = {
  selectedDriver: {},
  passengerLocation: {},
  driverLocation: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_DRIVER':
      return {
        ...state,
        selectedDriver: action.driver
      };
    case 'SELECT_PASSENGER_LOCATION':
      console.log('TUUUUU', action.location);
      return {
        ...state,
        passengerLocation: action.location
      };
    case 'SELECT_DRIVER_LOCATION':
      console.log(action.location);
      return {
        ...state,
        driverLocation: action.location
      };
    default:
      return state;
  }
};
