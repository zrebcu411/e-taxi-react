import React, { Component } from 'react';
import Stomp from 'stompjs';


class PassengerDashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.ws = Stomp.over(new WebSocket('ws://85.255.11.29:8080/ws'));

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.ws.connect(
      null,
      () => {
        this.ws.subscribe('/pat/s/10', (payload) => {
          this.setState({ messages: [...this.state.messages, JSON.stringify(payload)] });
        });
      },
      (err) => {
        console.log('STOMP error:', err);
      }
    );
  }

  sendMessage() {
    this.ws.send('siezka/do/socketa/serwera', {}, 'TESTOWA WIADOMOSC');
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
        <button onClick={this.sendMessage}>Send message</button>
      </div>
    );
  }
}

export default PassengerDashboardPage;
