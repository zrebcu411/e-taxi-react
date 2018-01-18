import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase, Typography, withStyles } from 'material-ui';
import '../../styles/css/components/RegisterFormSwitcher.css';
import formImage1 from '../../static/passenger-form-image.jpg';
import formImage2 from '../../static/driver-form-image.jpg';

const styles = theme => ({
  image: {
    position: 'relative',
    height: 250,
    flex: 1,
    margin: '0 2.5px',
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    marginTop: 130,
    fontSize: 20,
    textTransform: 'uppercase',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
});

const images = [
  {
    url: formImage1,
    title: 'Pasażer',
    path: 'passenger'
  },
  {
    url: formImage2,
    title: 'Kierowca',
    path: 'driver'
  }
];

const RegisterFormSwitcher = ({ classes, match }) =>
  (
    <div>
      <div className="form-switcher">
        { images.map(image => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            component={Link}
            to={`${match.url}/${image.path}`}
          >
            <div
              className={classes.imageSrc}
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                type="subheading"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
      ))}
      </div>
    </div>
  );

export default withStyles(styles)(RegisterFormSwitcher);
