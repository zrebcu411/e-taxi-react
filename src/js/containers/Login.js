import React from 'react';
import SignInForm from '../components/SignInForm';
import '../../styles/css/containers/Login.css';

// const Login = ({ props }) => (
//   <div className="login-form-wrapper">
//     <SignInForm {...props} />
//   </div>
// );

const Login = ({ history }) => {
  return (
    <div className="login-form-wrapper">
      <SignInForm history={history} />
    </div>
  );
};

export default Login;
