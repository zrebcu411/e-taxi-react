import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { isEmpty } from 'lodash';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import loadingSpinner from '../../static/loading-spinner.gif';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  resetContainer: {
    marginTop: 0,
    padding: theme.spacing.unit * 3 // TODO: See TODO note on Stepper
  }
});

function getSteps() {
  return [
    'Wybierz swoją lokalizację',
    'Rozpocznij pracę'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Kliknij w wybranym miejscu na mapie i wskaż klientom swoją lokalizację';
    case 1:
      return `Potwierdź rozpoczęcie. Od tego momenu klientci będą widzieć Cię na mapie,
              a Ty otrzymasz powiadomienie jeśli ktoś Cię wybierze.`;
    default:
      return 'Unknown step';
  }
}

class TaxiActivateStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      isLocationSelected: false
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleNext() {
    switch (this.state.activeStep) {
      case 0:
        this.setState({ activeStep: this.state.activeStep + 1 }, () => {
          this.props.onStepChange(this.state.activeStep);
          this.props.onConnect();
        });
        break;
      case 1:
        this.props.sendActivate();
        this.setState({ activeStep: this.state.activeStep + 1 });
        break;
      default:
        break;
    }
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 }, () => {
      this.props.onStepChange(this.state.activeStep);
    });
  }

  handleReset() {
    this.setState({
      activeStep: 0
    });
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) =>
            (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={this.props.isLocationSelected}
                        raised
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && this.props.isLoading && (
          <div>
            <img src={loadingSpinner} alt="Oczekiwanie na połączenie z klientem" />
            <Typography>Oczekiwanie na połączenie z klientem...</Typography>
          </div>
        )}
        {this.props.driverSocketSessionId && (
          <div>
            <Button
              raised
              color="primary"
              onClick={this.props.sendOrderConfirmation}
              className={classes.button}
            >
              Potwierdź zlecenie
            </Button>
          </div>
        )}
      </div>
    );
  }
}

// VerticalLinearStepper.propTypes = {
//   classes: PropTypes.object,
// };

const mapStateToProps = state => ({
  isLocationSelected: isEmpty(state.map.driverLocation)
});

export default withStyles(styles)(connect(mapStateToProps)(TaxiActivateStepper));
