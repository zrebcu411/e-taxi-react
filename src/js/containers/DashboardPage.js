import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import PassengerDashboardPage from './PassengerDashboardPage';
import { isAuthenticated, getUserRole } from '../helpers/authHelper';

const DashboardPage = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      if (isAuthenticated()) {
        return getUserRole() === 'DRIVER_USER' ? (
          <div>
            <Header />
            <span>Driver</span>
          </div>
        ) : (
          <div>
            <Header />
            <PassengerDashboardPage />
          </div>
        );
      }

      return (
        <Redirect to={{
          pathname: '/login'
          // state: { from: matchProps.location }
        }}
        />
      );
    }}
  />
);

export default DashboardPage;
