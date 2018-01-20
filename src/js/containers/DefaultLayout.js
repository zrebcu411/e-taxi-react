import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

const DefaultLayout = ({ component: Component, ...rest }) =>
  (
    <Route
      {...rest}
      render={matchProps => (

        <div className="DefaultLayout">
          <Header />
          <Component {...matchProps} />
        </div>
    )}
    />
  );

export default DefaultLayout;
