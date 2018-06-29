import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import resume from './resume';

const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

class App extends Component {
  state = {
    message: '',
    manager: '',
    users: [],
    name: '',
    newName: '',
    position: ''
  };

  async account() {
    const accounts = await web3.eth.getAccounts();
    console.log('accounts:', accounts);
    return accounts[0];
  }
  hexToUtf8(value) { return value === emptyBytes32 ? 'Not yet set' : web3.utils.hexToUtf8(value); }

  async getName() {
    const name = await resume.methods.getName(await this.account()).call();
    return this.hexToUtf8(name);
  }

  async getPosition() {
    const position = await resume.methods.getPosition(await this.account()).call();
    return this.hexToUtf8(position);
  }

  async componentDidMount() {
    const manager = await resume.methods.manager().call();
    const users = await resume.methods.getUsers().call();
    const name = await this.getName();
    const position = await this.getPosition();
    this.setState({ manager, users, name, position });
  }

  onSubmitNewName = async (event) => {
    event.preventDefault();
    this.setState({ message: 'Waiting on transaction...' });
    await resume.methods.setName(web3.utils.utf8ToHex(this.state.newName)).send({ from: await this.account() });
    this.setState({ message: 'Your new name has been successfully transmitted to the blockchain!' });
    const name = await this.getName();
    const users = await resume.methods.getUsers().call();
    this.setState({ name, users });
    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  render() {
    let message;
    if (this.state.message) {
      message = <h3>{this.state.message}</h3>;
    }

    return (
      <div>
        {message}
        <h2>Resume Contract</h2>
        <hr />
        <p>This contract is managed by {this.state.manager}</p>
        <hr />
        <p>Your name: {this.state.name}</p>
        <hr />
        <p>Your position: {this.state.position}</p>
        <hr />
        <form onSubmit={this.onSubmitNewName}>
          <h3>Update your profile</h3>
          <div>
            <label>Your name</label>
            <input
              type="text"
              value={this.state.newName}
              onChange={event => this.setState({ newName: event.target.value })}
            />
          </div>
          <button type="submit">Save your name to the blockchain</button>
        </form>
        <hr />
        <p>There are currently {this.state.users.length} users participating in this contract</p>
        <p>{this.users}</p>
      </div>
    );
  }
}

export default App;
