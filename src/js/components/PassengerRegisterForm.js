import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button, withStyles } from 'material-ui';
import { signUp } from '../actions/signUp';

import '../../styles/css/common/taxi-form.css';

const styles = {
  loginFormButton: {
    marginTop: 20
  },
  formInputHalfLeft: {
    marginRight: 10
  },
  formInputHalfRight: {
    marginLeft: 10
  }
};

class PassengerRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      matchingPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {
    return (
      <form className="taxi-form passenger-register-form" onSubmit={this.onSubmit} noValidate autoComplete="off">
        <p className="taxi-form__title">
          Rejestrując się jako pasażer będziesz mógł w pełni korzystać
          z funkcjonalności eTaxi.
        </p>
        <TextField
          id="username"
          name="username"
          label="Nazwa użytkownika"
          margin="normal"
          onChange={this.onChange}
        />
        <div className="taxi-form__input-wrapper">
          <TextField
            id="firstName"
            name="firstName"
            label="Imię"
            margin="normal"
            onChange={this.onChange}
            className={this.classes.formInputHalfLeft}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Nazwisko"
            margin="normal"
            onChange={this.onChange}
            className={this.classes.formInputHalfRight}
          />
        </div>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          margin="normal"
          onChange={this.onChange}
        />
        <TextField
          id="password"
          name="password"
          label="Hasło"
          margin="normal"
          type="password"
          onChange={this.onChange}
        />
        <TextField
          id="matchingPassword"
          name="matchingPassword"
          label="Powtórz hasło"
          margin="normal"
          type="password"
          onChange={this.onChange}
        />
        <Button
          className={this.classes.loginFormButton}
          raised
          color="primary"
          type="submit"
        >
        Utwórz konto
        </Button>
        <Link to="/login" className="taxi-form__link">
          Masz konto? Zaloguj się.
        </Link>
      </form>
    );
  }
}

// eslint-disable-next-line
PassengerRegisterForm = connect(null, { signUp })(PassengerRegisterForm);

PassengerRegisterForm.propTypes = {
  classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(PassengerRegisterForm);
