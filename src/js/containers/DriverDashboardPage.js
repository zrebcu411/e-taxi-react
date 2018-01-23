import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stomp from 'stompjs';

class DriverDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      receiverUser: '',
      isConnected: false,
      socketSessionId: '',
      latitude: 50.063971,
      longitude: 19.970151,
      userId: this.props.user.user.id
    };

    this.onConnect = this.onConnect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendDeactivate = this.sendDeactivate.bind(this);
    this.sendActivate = this.sendActivate.bind(this);
    this.sendOrderConfirmation = this.sendOrderConfirmation.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      (frame) => {
        this.ws.subscribe('/topic/reply', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.ws.subscribe('/user/queue/driver', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
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
    this.ws.send('/taxi.activate', {}, JSON.stringify({
      id: this.state.userId,
      socketSessionId: this.state.socketSessionId,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }));
  }

  sendOrderConfirmation() {
    this.ws.send('/taxi.orderConfirmation', {}, JSON.stringify({
      receiverId: this.state.receiverUser,
      localization: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
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

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div>
        <h1>Driver</h1>
        <ul>
          {messages}
        </ul>
        <div>
          <button onClick={this.onConnect}>Connect</button><br /><br />
        </div>
        { this.state.isConnected &&
          <div>
            <label htmlFor="receiverUser">
              Lat:
              <input type="text" id="latitude" name="latitude" onChange={this.onChange} />
            </label>
            <label htmlFor="receiverUser">
              Lang:
              <input type="text" id="longitude" name="longitude" onChange={this.onChange} />
            </label>
            <label htmlFor="receiverUser">
              Lang:
              <input type="text" id="receiverUser" name="receiverUser" onChange={this.onChange} />
            </label>
            <button onClick={this.sendActivate}>Activate</button>
            <button onClick={this.sendOrderConfirmation}>Confirm</button>
            <button onClick={this.sendDeactivate}>Deactivate</button>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(DriverDashboardPage);

