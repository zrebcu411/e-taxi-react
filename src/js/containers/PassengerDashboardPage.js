import React, { Component } from 'react';
import Stomp from 'stompjs';
import store from '../store/configureStore';

class PassengerDashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      receiverUser: '',
      isConnected: false
    };

    this.onConnect = this.onConnect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessage2 = this.sendMessage2.bind(this);
    this.sendMessage3 = this.sendMessage3.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      () => {
        this.ws.subscribe('/topic/reply', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.ws.subscribe('/user/queue/reply', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.ws.subscribe('/user/queue/errors', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });

        this.setState({ isConnected: true });
      },
      err => console.log('STOMP error:', err)
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendMessage() {
    this.ws.send('/taxi.message', {}, JSON.stringify({
      name: `${this.state.receiverUser}`,
      message: `MESSAGE_TO: ${this.state.receiverUser}`
    }));
  }

  sendMessage2() {
    const { user } = store.getState();
    this.ws.send('/taxi.activate', {}, JSON.stringify({
      id: user.user.id,
      socketSessionId: this.state.receiverUser
    }));
  }

  sendMessage3() {
    const { user } = store.getState();
    this.ws.send('/taxi.deactivate', {}, JSON.stringify({
      id: user.user.id,
      socketSessionId: this.state.receiverUser
    }));
  }

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));

    return (
      <div>
        <ul>
          {messages}
        </ul>
        <div>
          <button onClick={this.onConnect}>Connect</button><br /><br />
        </div>
        { this.state.isConnected &&
          <div>
            <label htmlFor="receiverUser">
              Send to:
              <input type="text" id="receiverUser" name="receiverUser" onChange={this.onChange} />
            </label>
            { this.state.receiverUser &&
              <div>
                <button onClick={this.sendMessage}>Send message</button>
                <button onClick={this.sendMessage2}>Send activate</button>
                <button onClick={this.sendMessage3}>Send deactivate</button>
              </div>
            }
          </div>}
      </div>
    );
  }
}

export default PassengerDashboardPage;
