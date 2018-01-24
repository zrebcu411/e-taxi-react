export const SELECT_DRIVER = 'SELECT_DRIVER';
export const setDriver = driver => ({
  type: SELECT_DRIVER,
  driver
});

export const SELECT_PASSENGER_LOCATION = 'SELECT_PASSENGER_LOCATION';
export const selectPassengerLocation = location => ({
  type: SELECT_PASSENGER_LOCATION,
  location
});

export const SELECT_DRIVER_LOCATION = 'SELECT_DRIVER_LOCATION';
export const selectDriverLocation = location => ({
  type: SELECT_DRIVER_LOCATION,
  location
});
