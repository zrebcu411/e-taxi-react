import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, MenuIcon } from '../vendor/material-ui';
import { withStyles } from 'material-ui/styles';
import '../../styles/css/components/Header.css';

const styles = {
  header: {
    backgroundColor: '#FFD954'
  },
  header__logo: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

const Header = (props) => {
  const { classes } = props;

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.header__logo}>
          <Link to="/" className="header__logo-link">Title</Link>
        </Typography>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/login" className="header__nav-link">Zaloguj</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/register" className="header__nav-link">Zarejestruj</Link>
            </li>
          </ul> 
        </nav>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
