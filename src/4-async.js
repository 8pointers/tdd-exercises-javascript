import React, { Component } from 'react';

class MyIp extends Component {
  state = {};

  componentDidMount = () =>
    fetch('/api/ipify?format=json')
      .then((response) => response.json())
      .then(({ ip }) => this.setState({ ip }));

  render = () => <div>{this.state.ip}</div>;
}

export default MyIp;
