import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, Button, withStyles } from 'material-ui';
import '../../styles/css/components/LoginForm.css';

const styles = {
  loginFormButton: {
    marginTop: 20
  }
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      login: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.onSubmit} noValidate autoComplete="off">
        <p className="login-form__title">
          Korzystając z poniższego formularza możesz zalogować się jako pasażer lub kierowca.
        </p>
        <TextField
          id="login"
          name="login"
          label="Nazwa użytkownika"
          margin="normal"
          fullWidth
          onChange={this.onChange}
        />
        <TextField
          id="password"
          name="password"
          label="Hasło"
          margin="normal"
          type="password"
          fullWidth
          onChange={this.onChange}
        />
        <div className="login-form__buttons-wrapper">
          <Button className={this.classes.loginFormButton} raised color="primary" type="submit">
            Zaloguj się
          </Button>
          <Button
            component={Link}
            to="/register"
            className={this.classes.loginFormButton}
            raised
            color="default"
          >
            Utwórz konto
          </Button>
          <a href="/" className="login-form__forgot-password-link">Nie pamiętasz hasła?</a>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: propTypes.shape.isRequired
};

export default withStyles(styles)(LoginForm);
