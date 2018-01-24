import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stomp from 'stompjs';
import { selectPassengerLocation } from '../actions/map';
import DriverMap from '../components/DriverMap';
import TaxiActivateStepper from '../components/TaxiActivateStepper';
import '../../styles/css/components/DriverDashboardPage.css';

class DriverDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isConnected: false,
      socketSessionId: '',
      activeActivationStep: 0,
      isLoading: true,
      driverSocketSessionId: ''
    };

    this.onConnect = this.onConnect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendDeactivate = this.sendDeactivate.bind(this);
    this.sendActivate = this.sendActivate.bind(this);
    this.sendOrderConfirmation = this.sendOrderConfirmation.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      (frame) => {
        this.ws.subscribe('/user/queue/driver/activation', (payload) => {
          console.log('act', payload);
          // if (payload.body.result)
          // this.props.selectPassengerLocation();
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.ws.subscribe('/user/queue/driver/confirmation', (payload) => {
          console.log('conf', payload);
          const location = JSON.parse(payload.body).localization;
          const driverSocketId = JSON.parse(payload.body).passengerId;
          console.log('IDDD', driverSocketId);
          this.props.selectPassengerLocation(location);
          this.setState({ isLoading: false, driverSocketSessionId: driverSocketId });
        });

        this.ws.subscribe('/user/queue/errors', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.setState({
          isConnected: true,
          socketSessionId: frame.headers['user-name']
        });
      },
      err => console.log('STOMP error:', err)
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendActivate() {
    console.log(this.props.user);
    this.ws.send('/taxi.activate', {}, JSON.stringify({
      id: this.props.user.user.id,
      socketSessionId: this.state.socketSessionId,
      latitude: this.props.driverLocation.lat,
      longitude: this.props.driverLocation.lng
    }));
  }

  sendOrderConfirmation() {
    this.ws.send('/taxi.orderConfirmation', {}, JSON.stringify({
      receiverId: this.state.driverSocketSessionId,
      localization: {
        latitude: this.props.driverLocation.lat,
        longitude: this.props.driverLocation.lng
      }
    }));
  }

  sendDeactivate() {
    this.ws.send('/taxi.deactivate', {}, JSON.stringify({
      socketSessionId: this.state.socketSessionId,
      id: this.state.userId
    }));

    this.ws.disconnect();
    this.setState({ isConnected: false });
  }

  handleStepChange(step) {
    this.setState({ activeActivationStep: step });
  }

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div className="driver-dashboard">
        <div className="driver-dashboard__map-wrapper">
          <DriverMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            activeActivationStep={this.state.activeActivationStep}
          />
        </div>

        <div className="driver-dashboard__info">
          <h1>Driver</h1>
          <TaxiActivateStepper
            onStepChange={this.handleStepChange}
            sendActivate={this.sendActivate}
            onConnect={this.onConnect}
            isLoading={this.state.isLoading}
            driverSocketSessionId={this.state.driverSocketSessionId}
            sendOrderConfirmation={this.sendOrderConfirmation}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  driverLocation: state.map.driverLocation
});

export default connect(mapStateToProps, { selectPassengerLocation })(DriverDashboardPage);

// <ul>
// {messages}
// </ul>
// <div>
// <button onClick={this.onConnect}>Connect</button><br /><br />
// </div>
// { this.state.isConnected &&
// <div>
//   <label htmlFor="receiverUser">
//     Lat:
//   <label htmlFor="receiverUser">
//     Lang:
//     <input type="text" id="longitude" name="longitude" onChange={this.onChange} />
//   </label>
//   <label htmlFor="receiverUser">
//     Lang:
//     <input type="text" id="receiverUser" name="receiverUser" onChange={this.onChange} />
//   </label>
//   <button onClick={this.sendActivate}>Activate</button>
//   <button onClick={this.sendOrderConfirmation}>Confirm</button>
//   <button onClick={this.sendDeactivate}>Deactivate</button>
// </div>}

