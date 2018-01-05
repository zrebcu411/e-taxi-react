import React from 'react';
import { Route } from 'react-router-dom';
import RegisterFormSwitcher from '../components/RegisterFormSwitcher';
import PassengerRegisterForm from '../components/PassengerRegisterForm';
import '../../styles/css/containers/Register.css';

const Register = ({ match }) =>
  (
    <div className="register-form-wrapper">
      <Route exact path={match.url} component={RegisterFormSwitcher} />
      <Route path={`${match.url}/passenger`} component={PassengerRegisterForm} />
    </div>
  );

export default Register;
