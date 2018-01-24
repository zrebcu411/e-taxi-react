import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stomp from 'stompjs';
import axios from 'axios';
import PassengerMap from '../components/PassengerMap';
import TaxiOrderStepper from '../components/TaxiOrderStepper';
import '../../styles/css/components/PassengerDashboardPage.css';

class PassengerDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      receiverUser: '',
      isConnected: false,
      socketSessionId: '',
      latitude: 50.063978,
      longitude: 19.970156,
      userId: this.props.user.user.id,
      activeDrivers: [],
      activeOrderStep: 0
    };

    this.onConnect = this.onConnect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendGetTaxiRequest = this.sendGetTaxiRequest.bind(this);
    this.sendActivate = this.sendActivate.bind(this);
    this.sendMessage3 = this.sendMessage3.bind(this);
    this.fetchActiveDrivers = this.fetchActiveDrivers.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      (frame) => {
        this.ws.subscribe('/user/queue/passenger', (payload) => {
          // console.log('dupa');
          // this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.ws.subscribe('/user/queue/errors', (payload) => {
          // this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
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

  fetchActiveDrivers() {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/geotags/drivers`)
      .then(res => this.setState({
        // activeStep: this.state.activeStep + 1,
        activeDrivers: res.data
      }));
  }

  handleStepChange(step) {
    this.setState({ activeOrderStep: step });
  }

  sendGetTaxiRequest() {
    console.log(this.props);
    this.ws.send('/taxi.orderRequest', {}, JSON.stringify({
      receiverId: this.props.selectedDriver.user.socketSessionId,
      localization: {
        latitude: this.props.passengerLocation.lat,
        longitude: this.props.passengerLocation.lng
      }
    }));
  }

  sendActivate() {
    this.ws.send('/taxi.activate', {}, JSON.stringify({
      id: this.state.userId,
      socketSessionId: this.state.socketSessionId,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }));
  }

  sendMessage3() {
    // const { user } = store.getState();
    this.ws.send('/taxi.deactivate', {}, JSON.stringify({
      // id: user.user.id,
      socketSessionId: this.state.receiverUser
    }));
  }

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div className="passenger-dashboard">
        <div className="passenger-dashboard__map-wrapper">
          <PassengerMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            activeDrivers={this.state.activeDrivers}
            activeOrderStep={this.state.activeOrderStep}
          />
        </div>
        <div className="passenger-dashboard__info">
          <h1>Passenger</h1>
          <TaxiOrderStepper
            fetchActiveDrivers={this.fetchActiveDrivers}
            onStepChange={this.handleStepChange}
            sendGetTaxiRequest={this.sendGetTaxiRequest}
            onConnect={this.onConnect}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  passengerLocation: state.map.passengerLocation,
  selectedDriver: state.map.selectedDriver
});

export default connect(mapStateToProps)(PassengerDashboardPage);

// { this.state.receiverUser &&
//   <div>
//     <button onClick={this.sendMessage}>Send message</button>
//     <button onClick={this.sendMessage2}>Send activate</button>
//     <button onClick={this.sendMessage3}>Send deactivate</button>
//   </div>
// }

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
//     <input type="text" id="latitude" name="latitude" onChange={this.onChange} />
//   </label>
//   <label htmlFor="receiverUser">
//     Lang:
//     <input type="text" id="longitude" name="longitude" onChange={this.onChange} />
//   </label>
//   <label htmlFor="receiverUser">
//     Lang:
//     <input type="text" id="receiverUser" name="receiverUser" onChange={this.onChange} />
//   </label>
//   <button onClick={this.sendActivate}>Activate</button>
//   <button onClick={this.sendGetTaxiRequest}>Get taxi</button>
// </div>}
