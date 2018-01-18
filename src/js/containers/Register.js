import React from 'react';
import { Route } from 'react-router-dom';
import SignUpFormSwitcher from '../components/SignUpFormSwitcher';
import PassengerSignUpForm from '../components/PassengerSignUpForm';
import '../../styles/css/containers/Register.css';

const Register = ({ match }) =>
  (
    <div className="register-form-wrapper">
      <Route exact path={match.url} component={SignUpFormSwitcher} />
      <Route path={`${match.url}/passenger`} component={PassengerSignUpForm} />
    </div>
  );

export default Register;
