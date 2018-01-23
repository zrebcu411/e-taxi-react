import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { signOut } from '../actions/signIn';
import { AppBar, Toolbar, Typography } from '../vendor/material-ui';
import '../../styles/css/components/Header.css';

const styles = {
  header: {
    backgroundColor: '#FFD954'
  },
  header__logo: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick(e) {
    e.preventDefault();
    this.props.signOut();
    this.props.history.push('/');
  }

  render() {
    const { classes, user } = this.props;
    const { isAuthenticated } = user;

    const questLinks = (
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <Link to="/login" className="header__nav-link">Zaloguj</Link>
        </li>
        <li className="header__nav-item">
          <Link to="/register" className="header__nav-link">Zarejestruj</Link>
        </li>
      </ul>
    );

    const userLinks = (
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <a href="/" onClick={this.onSignOutClick} className="header__nav-link">Wyloguj</a>
        </li>
      </ul>
    );

    return (
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.header__logo}>
            <Link to="/" className="header__logo-link">eTaxi</Link>
          </Typography>
          <nav className="header__nav">
            { isAuthenticated ? userLinks : questLinks }
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const HeaderStyled = withStyles(styles)(Header);
export default connect(mapStateToProps, { signOut })(HeaderStyled);
