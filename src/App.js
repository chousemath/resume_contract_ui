import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import resume from './resume';

const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

class App extends Component {
  state = {
    manager: '',
    users: [],
    name: '',
    position: ''
  };

  account() { return web3.eth.getAccounts()[0]; }
  hexToUtf8(value) { return value === emptyBytes32 ? 'Not yet set' : web3.utils.hexToUtf8(value); }

  async getName() {
    const name = await resume.methods.getName(this.account()).call();
    return this.hexToUtf8(name);
  }

  async getPosition() {
    const position = await resume.methods.getPosition(this.account()).call();
    return this.hexToUtf8(position);
  }

  async componentDidMount() {
    const manager = await resume.methods.manager().call();
    const users = await resume.methods.getUsers().call();
    const name = await this.getName();
    const position = await this.getPosition();
    this.setState({ manager, users, name, position });
  }

  render() {
    return (
      <div>
        <h2>Resume Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>Your name: {this.state.name}</p>
        <p>Your position: {this.state.position}</p>
        <p>There are currently {this.state.users.length} users participating in this contract</p>
        <p>{this.users}</p>
      </div>
    );
  }
}

export default App;
