import React from 'react';
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Link to="/passenger">User after login</Link>
      </div>
    );
  }
}

export default Homepage;
