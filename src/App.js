import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import resume from './resume';

const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const waitingMessage = 'Waiting on transaction...';
const successMessage = (attributeName) => `Your new ${attributeName} has been successfully saved on the blockchain!`;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const genders = ['unspecified', 'male', 'female', 'other'];
const cities = ['unspecified', 'CityA', 'CityB', 'CityC'];
const regions = ['unspecified', 'RegionA', 'RegionB', 'RegionC'];

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
    newPosition: '',
    dateOfBirth: '',
    newDateOfBirth: 0,
    email: '',
    newEmail: '',
    gender: '',
    newGender: 0,
    address: '',
    newAddressStreet: '',
    newAddressCity: 0,
    newAddressRegion: 0,
    newAddressZipcode: 0
  };

  async account() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
  hexToUtf8(value) { return value === emptyBytes32 ? 'Not yet set' : web3.utils.hexToUtf8(value); }

  async getDateOfBirth() {
    const timestamp = await resume.methods.getDateOfBirth(await this.account()).call();
    if (timestamp === '0') return 'Not yet set';
    console.log('timestamp:', timestamp);
    // const d = new Date();
    // const n = d.getTimezoneOffset() / 60.0;
    const dateOfBirth = new Date(parseInt(timestamp) * 1000);
    // dateOfBirth.setHours(dateOfBirth.getHours() + -1 * n);
    return `${months[dateOfBirth.getMonth()]} / ${dateOfBirth.getFullYear()}`;
  }

  async getAddress() {
    const street = await resume.methods.getAddressStreet(await this.account()).call();
    const city = await resume.methods.getAddressCity(await this.account()).call();
    const region = await resume.methods.getAddressRegion(await this.account()).call();
    const zipcode = await resume.methods.getAddressZipcode(await this.account()).call();
    const streetName = this.hexToUtf8(street);
    const cityName = (city >= 0 && city <= cities.length - 1) ? cities[city] : 0;
    const regionName = (region >= 0 && region < regions.length - 1) ? regions[region] : 0;
    const zipcodeName = (zipcode === 0) ? 'unspecified' : zipcode;
    return `${streetName}, ${cityName}, ${regionName}, ${zipcodeName}`;
  }

  async getEmail() {
    const email = await resume.methods.getEmail(await this.account()).call();
    return this.hexToUtf8(email);
  }

  async getGender() {
    const gender = await resume.methods.getGender(await this.account()).call();
    return genders[gender];
  }

  async getName() {
    const name = await resume.methods.getName(await this.account()).call();
    return this.hexToUtf8(name);
  }

  async getPhone() {
    const phone = await resume.methods.getPhone(await this.account()).call();
    return this.hexToUtf8(phone);
  }

  async getPosition() {
    const position = await resume.methods.getPosition(await this.account()).call();
    return this.hexToUtf8(position);
  }

  async getUniqueUsers() {
    const users = await resume.methods.getUsers().call();
    return users.filter((value, index, self) => self.indexOf(value) === index);
  }

  async componentDidMount() {
    const manager = await resume.methods.manager().call();
    const users = await this.getUniqueUsers();
    const name = await this.getName();
    const position = await this.getPosition();
    const dateOfBirth = await this.getDateOfBirth();
    const email = await this.getEmail();
    const gender = await this.getGender();
    const address = await this.getAddress();
    const phone = await this.getPhone();
    this.setState({
      address,
      dateOfBirth,
      email,
      gender,
      manager,
      name,
      phone,
      position,
      users
    });
  }

  onSubmitNewName = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setName(web3.utils.utf8ToHex(this.state.newName)).send({ from: await this.account() });
    this.setState({ message: successMessage('name') });
    const name = await this.getName();
    const users = await this.getUniqueUsers();
    const newName = '';
    this.setState({ name, users, newName });
    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  onSubmitNewPosition = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setPosition(web3.utils.utf8ToHex(this.state.newPosition)).send({ from: await this.account() });
    this.setState({ message: successMessage('position (job)') });
    const position = await this.getPosition();
    const users = await this.getUniqueUsers();
    const newPosition = '';
    this.setState({ position, users, newPosition });
    setTimeout(() => this.setState({ message: '' }), 3000);
  }

  onSubmitNewDateOfBirth = async (event) => {
    event.preventDefault();
    const dateArray = this.state.newDateOfBirth.split('-');
    this.setState({ message: waitingMessage });
    await resume.methods.setDateOfBirth(Math.floor(new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[2])
    ).getTime() / 1000)).send({ from: await this.account() });
    this.setState({ message: successMessage('date of birth') });
    const dateOfBirth = await this.getDateOfBirth();
    const users = await this.getUniqueUsers();
    this.setState({ dateOfBirth, users });
    setTimeout(() => this.setState({ message: '' }), 3000);
  }

  render() {
    let message;
    if (this.state.message) {
      message = <div className="alert alert-success" role="alert">{this.state.message}</div>;
    }
    let users;
    if (this.state.users && this.state.users.length > 0) {
      users = this.state.users.join(', ');
    }

    return (
      <div className="container">
        {message}
        <h2>Resume Contract</h2>
        <hr />
        <p>This contract is managed by {this.state.manager}</p>
        <hr />
        <p>Your name: {this.state.name}</p>
        <hr />
        <p>Your position: {this.state.position}</p>
        <hr />
        <p>Your date of birth: {this.state.dateOfBirth}</p>
        <hr />
        <p>Your gender: {this.state.gender}</p>
        <hr />
        <p>Your address: {this.state.address}</p>
        <hr />
        <p>Your phone number: {this.state.phone}</p>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmitNewName}>
              <label htmlFor="new-name">Your full name</label>
              <div className="input-group">
                <input type="text"
                  value={this.state.newName}
                  onChange={event => this.setState({ newName: event.target.value })}
                  className="form-control"
                  id="new-name"
                  placeholder="Enter your new name here..."
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">Save to the blockchain</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.onSubmitNewPosition}>
              <label htmlFor="new-position">Your current position (job)</label>
              <div className="input-group">
                <input type="text"
                  value={this.state.newPosition}
                  onChange={event => this.setState({ newPosition: event.target.value })}
                  className="form-control"
                  id="new-position"
                  placeholder="Enter your new position here..."
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-success">Save to the blockchain</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.onSubmitNewDateOfBirth}>
              <label htmlFor="new-dob">Your date of birth</label>
              <div className="input-group">
                <input type="date"
                  value={this.state.newDateOfBirth}
                  onChange={event => this.setState({ newDateOfBirth: event.target.value })}
                  className="form-control"
                  id="new-dob"
                  placeholder="Select your date of birth..."
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Save to the blockchain</button>
                </span>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
        <hr />
        <div className="well well-lg">
          <p>Currently <span className="badge">{this.state.users.length}</span> users participating</p>
          <p>{users}</p>
        </div>
      </div>
    );
  }
}

export default App;
