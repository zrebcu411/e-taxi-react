import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { isEmpty } from 'lodash';
import { TextField, Button, withStyles, Select, FormControl, MenuItem, Input, InputLabel, FormHelperText } from 'material-ui';
import { signUp } from '../actions/signUp';
import validateRequiredFields from '../helpers/formHelper';
import '../../styles/css/common/taxi-form.css';
import '../../styles/css/components/DriverSignUpForm.css';

const styles = {
  formButton: {
    marginTop: 20
  },
  formInputHalfLeft: {
    marginRight: 10
  },
  formInputHalfRight: {
    marginLeft: 10
  },
  formSelectWrapper: {
    marginBottom: 7
  }
};

class DriverSignUpForm extends React.Component {
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
        matchingPassword: '',
        serviceKind: '',
        carModel: '',
        manufactureYear: '',
        color: '',
        numberOfSeats: '',
        pricePerKilometer: ''
      },
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    let parsedTargetValue;

    switch (targetName) {
      case 'pricePerKilometer':
      case 'numberOfSeats':
        parsedTargetValue = parseInt(targetValue, 10);
        break;
      default:
        parsedTargetValue = targetValue;
        break;
    }

    this.setState({
      inputs: {
        ...this.state.inputs,
        [targetName]: parsedTargetValue
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });

    if (this.isValid()) {
      this.props.signUp(this.state.inputs, 'driver')
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

    if (validator.isEmpty(data.numberOfSeats.toString())) {
      errors.numberOfSeats = 'To pole jest wymagane';
    }

    if (validator.isEmpty(data.pricePerKilometer.toString())) {
      errors.pricePerKilometer = 'To pole jest wymagane';
    }

    errors = { ...errors, ...validateRequiredFields(data, ['numberOfSeats', 'pricePerKilometer']) };

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <form className="taxi-form driver-sign-up-form" onSubmit={this.onSubmit} noValidate autoComplete="off">
        <p className="taxi-form__title">
          Rejestrując się jako kierowca będziesz miał dostęp do panelu
          w którym odbierzesz zamówienia oraz zobaczysz trasę przejazdu.
        </p>
        <div className="driver-sign-up-form__inputs-wrapper">
          <div className="driver-sign-up-form__left">
            <TextField
              id="username"
              name="username"
              label="Nazwa użytkownika"
              margin="normal"
              onChange={this.onChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
            />
            <div className="taxi-form__input-wrapper">
              <TextField
                id="firstName"
                name="firstName"
                label="Imię"
                margin="normal"
                onChange={this.onChange}
                className={this.classes.formInputHalfLeft}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                id="lastName"
                name="lastName"
                label="Nazwisko"
                margin="normal"
                onChange={this.onChange}
                className={this.classes.formInputHalfRight}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
            <TextField
              id="email"
              name="email"
              label="E-mail"
              margin="normal"
              onChange={this.onChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
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
                error={!!errors.password}
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
                error={!!errors.matchingPassword}
                helperText={errors.matchingPassword}
              />
            </div>
          </div>
          <div className="driver-sign-up-form__right">
            <FormControl className={this.classes.formSelectWrapper} error={!!errors.serviceKind}>
              <InputLabel htmlFor="serviceKind">Rodzaj usług</InputLabel>
              <Select
                value={this.state.inputs.serviceKind}
                onChange={this.onChange}
                displayEmpty
                input={<Input name="serviceKind" id="serviceKind" />}
              >
                <MenuItem value="STANDARD">Standard</MenuItem>
                <MenuItem value="PREMIUM">Premium</MenuItem>
              </Select>
              { errors.serviceKind && <FormHelperText>{errors.serviceKind}</FormHelperText> }
            </FormControl>
            <div className="taxi-form__input-wrapper">
              <TextField
                id="carModel"
                name="carModel"
                label="Marka samochodu"
                margin="normal"
                onChange={this.onChange}
                className={this.classes.formInputHalfLeft}
                error={!!errors.carModel}
                helperText={errors.carModel}
              />
              <TextField
                id="manufactureYear"
                name="manufactureYear"
                label="Rok produkcji"
                margin="normal"
                type="number"
                onChange={this.onChange}
                className={this.classes.formInputHalfRight}
                error={!!errors.manufactureYear}
                helperText={errors.manufactureYear}
              />
            </div>
            <div className="taxi-form__input-wrapper">
              <TextField
                id="color"
                name="color"
                label="Kolor samochodu"
                margin="normal"
                onChange={this.onChange}
                className={this.classes.formInputHalfLeft}
                error={!!errors.color}
                helperText={errors.color}
              />
              <TextField
                id="numberOfSeats"
                name="numberOfSeats"
                label="Liczba miejsc"
                margin="normal"
                type="number"
                onChange={this.onChange}
                className={this.classes.formInputHalfRight}
                error={!!errors.numberOfSeats}
                helperText={errors.numberOfSeats}
              />
            </div>
            <TextField
              id="pricePerKilometer"
              name="pricePerKilometer"
              label="Cena za kilometr (zł)"
              margin="normal"
              type="number"
              onChange={this.onChange}
              error={!!errors.pricePerKilometer}
              helperText={errors.pricePerKilometer}
            />
          </div>
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

DriverSignUpForm = connect(state => state, { signUp })(DriverSignUpForm);

DriverSignUpForm.propTypes = {
  classes: PropTypes.shape.isRequired
};

export default withStyles(styles)(DriverSignUpForm);
