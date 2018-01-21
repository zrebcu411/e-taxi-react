import React, { Component } from 'react';
import Stomp from 'stompjs';

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
    this.sendGlobal = this.sendGlobal.bind(this);
  }

  onConnect() {
    this.ws = Stomp.over(new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/ws`));
    this.ws.connect(
      {},
      () => {
        console.log('succed');
        this.ws.subscribe('/topic/reply', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.parse(payload.body).message] });
          console.log(payload);
        });

        this.ws.subscribe('/user/queue/reply', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload.body)] });
        });

        this.ws.subscribe('/user/queue/errors', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload.body)] });
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
    this.ws.send('/message', {}, JSON.stringify({
      name: this.state.reveiverUser,
      message: `MESSAGE_TO: ${this.state.receiverUser}`
    }));
  }

  sendGlobal() {
    this.ws.send('/global', {}, JSON.stringify({ message: 'GLOBAL_MESSAGE' }));
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
            { this.state.receiverUser && <button onClick={this.sendMessage}>{`Send to ${this.state.receiverUser}`}</button>}
            <button onClick={this.sendGlobal}>Send to global</button>
          </div>}
      </div>
    );
  }
}

export default PassengerDashboardPage;
