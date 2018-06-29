import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import resume from './resume';

const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const waitingMessage = 'Waiting on transaction...';
const styles = {
  messageStyling: {
    color: 'blue',
    fontWeight: 'bold'
  }
};

class App extends Component {
  state = {
    message: '',
    manager: '',
    users: [],
    name: '',
    newName: '',
    position: '',
    newPosition: ''
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
    this.setState({ message: waitingMessage });
    await resume.methods.setName(web3.utils.utf8ToHex(this.state.newName)).send({ from: await this.account() });
    this.setState({ message: 'Your new name has been successfully transmitted to the blockchain!' });
    const name = await this.getName();
    const users = await resume.methods.getUsers().call();
    this.setState({ name, users });
    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  onSubmitNewPosition = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setPosition(web3.utils.utf8ToHex(this.state.newPosition)).send({ from: await this.account() });
    this.setState({ message: 'Your new position has been successfully transmitted to the blockchain!' });
    const position = await this.getPosition();
    const users = await resume.methods.getUsers().call();
    this.setState({ position, users });
    setTimeout(() => this.setState({ message: '' }), 3000);
  }

  render() {
    let message;
    if (this.state.message) {
      message = <h3 style={styles.messageStyling}>{this.state.message}</h3>;
    }
    let users;
    if (this.state.users && this.state.users.length > 0) {
      users = this.state.users.join(', ');
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

        <form onSubmit={this.onSubmitNewPosition}>
          <h3>Update your current position (job)</h3>
          <div>
            <label>Your current position</label>
            <input
              type="text"
              value={this.state.newPosition}
              onChange={event => this.setState({ newPosition: event.target.value })}
            />
          </div>
          <button>Save your position to the blockchain</button>
        </form>

        <hr />
        <p>There are currently {this.state.users.length} users participating in this contract</p>
        <p>{users}</p>
      </div>
    );
  }
}

export default App;
