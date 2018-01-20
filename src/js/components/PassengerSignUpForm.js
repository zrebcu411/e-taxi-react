import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { TextField, Button, withStyles } from 'material-ui';
import { signUp } from '../actions/signUp';
import validateRequiredFields from '../helpers/formHelper';
import '../../styles/css/common/taxi-form.css';

const styles = {
  formButton: {
    marginTop: 20
  },
  formInputHalfLeft: {
    marginRight: 10
  },
  formInputHalfRight: {
    marginLeft: 10
  }
};

class PassengerSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      inputs: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        matchingPassword: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit(e) {
    console.log(this);
    e.preventDefault();
    this.setState({ errors: {} });

    if (this.isValid()) {
      this.props.signUp(this.state.inputs)
        .then((action) => {
          this.props.history.push('/confirmation', {
            verificationEmail: action.payload.email,
            token: action.payload.token
          });
        });
    }
  }

  isValid() {
    const { errors, isValid } = this.validateInputs(this.state.inputs);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  validateInputs(data) {
    let errors = {};

    if (!validator.isEmail(data.email)) {
      errors.email = 'Wprowadzony e-mail jest niepoprawny';
    }

    if (!validator.equals(data.password, data.matchingPassword)) {
      errors.matchingPassword = 'Wprowadzone hasła nie pasują do siebie';
    }

    errors = { ...errors, ...validateRequiredFields(data) };

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  render() {
    const { errors } = this.state;

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
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <div className="taxi-form__input-wrapper">
          <TextField
            id="firstName"
            name="firstName"
            label="Imię"
            margin="normal"
            onChange={this.onChange}
            className={this.classes.formInputHalfLeft}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Nazwisko"
            margin="normal"
            onChange={this.onChange}
            className={this.classes.formInputHalfRight}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName}
          />
        </div>
        <TextField
          id="email"
          name="email"
          label="E-mail"
          margin="normal"
          onChange={this.onChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <div className="taxi-form__input-wrapper">
          <TextField
            id="password"
            name="password"
            label="Hasło"
            margin="normal"
            type="password"
            onChange={this.onChange}
            className={this.classes.formInputHalfLeft}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <TextField
            id="matchingPassword"
            name="matchingPassword"
            label="Powtórz hasło"
            margin="normal"
            type="password"
            onChange={this.onChange}
            className={this.classes.formInputHalfRight}
            error={Boolean(errors.matchingPassword)}
            helperText={errors.matchingPassword}
          />
        </div>
        <Button
          className={this.classes.formButton}
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

PassengerSignUpForm = connect(state => state, { signUp })(PassengerSignUpForm);

PassengerSignUpForm.propTypes = {
  classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(PassengerSignUpForm);
