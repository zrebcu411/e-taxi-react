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
      receiverUser: '',
      isConnected: false,
      socketSessionId: '',
      latitude: 50.063978,
      longitude: 19.970156,
      userId: this.props.user.user.id,
      activeDrivers: [],
      activeOrderStep: 0,
      isLoading: true,
      isAccepted: false
    };

    this.onConnect = this.onConnect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendGetTaxiRequest = this.sendGetTaxiRequest.bind(this);
    this.sendActivate = this.sendActivate.bind(this);
    this.sendMessage3 = this.sendMessage3.bind(this);
    this.fetchActiveDrivers = this.fetchActiveDrivers.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.renderRoute = this.renderRoute.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      (frame) => {
        this.ws.subscribe('/user/queue/passenger', (payload) => {
          this.setState({ isAccepted: true, activeDrivers: [], isLoading: false });
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
        activeDrivers: res.data
      }));
  }

  handleStepChange(step) {
    this.setState({ activeOrderStep: step });
  }

  sendGetTaxiRequest() {
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

  renderRoute() {
    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route({
      origin: new window.google.maps.LatLng(this.props.passengerLocation.lat, this.props.passengerLocation.lng),
      destination: new window.google.maps.LatLng(this.props.selectedDriver.latitude, this.props.selectedDriver.longitude),
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    return (
      <div className="passenger-dashboard">
        <div className="passenger-dashboard__map-wrapper">
          <PassengerMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBn5irZk50SfzK0UdtA1OEUCgl60eD7mEU"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            activeDrivers={this.state.activeDrivers}
            activeOrderStep={this.state.activeOrderStep}
            isAccepted={this.state.isAccepted}
            directions={this.state.directions}
          />
        </div>
        <div className="passenger-dashboard__info">
          <h1>Passenger</h1>
          <TaxiOrderStepper
            fetchActiveDrivers={this.fetchActiveDrivers}
            onStepChange={this.handleStepChange}
            sendGetTaxiRequest={this.sendGetTaxiRequest}
            onConnect={this.onConnect}
            isLoading={this.state.isLoading}
            isAccepted={this.state.isAccepted}
            renderRoute={this.renderRoute}
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

