import React from 'react';

const SignUpConfirmationPage = (props) => {
  const { verificationEmail } = props.history.location.state;

  return (
    <div className="register-form-wrapper">
      {verificationEmail}
    </div>
  );
};

export default SignUpConfirmationPage;
