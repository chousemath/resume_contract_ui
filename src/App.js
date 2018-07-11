import React, { Component } from 'react';
import './App.css';
import web3 from './web3.js';
import resume from './resume';
import {
  Button, Input, InputGroup, InputGroupAddon,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const emptyBytes32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
const waitingMessage = 'Waiting on transaction...';
const messageResetDelay = 3000;
const successMessage = (attributeName) => `Your new ${attributeName} has been successfully saved on the blockchain!`;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const genders = ['unspecified', 'male', 'female', 'other'];
const cities = ['unspecified', 'CityA', 'CityB', 'CityC'];
const regions = ['unspecified', 'RegionA', 'RegionB', 'RegionC'];

const styles = {
  columnSpacing: {
    marginTop: '16px'
  },
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
    newAddressZipcode: 0,
    phone: '',
    newPhone: ''
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

  async getUsers() {
    return await resume.methods.getUsers().call();
  }

  async componentDidMount() {
    const manager = await resume.methods.manager().call();
    const users = await this.getUsers();
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
      position,
      users,
      phone
    });
  }

  onSubmitNewName = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setName(web3.utils.utf8ToHex(this.state.newName)).send({ from: await this.account() });
    this.setState({ message: successMessage('name') });
    const name = await this.getName();
    const users = await this.getUsers();
    const newName = '';
    this.setState({ name, users, newName });
    setTimeout(() => this.setState({ message: '' }), messageResetDelay);
  }

  onSubmitNewPhone = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setPhone(web3.utils.utf8ToHex(this.state.newPhone)).send({ from: await this.account() });
    this.setState({ message: successMessage('phone number') });
    const phone = await this.getPhone();
    const users = await this.getUsers();
    const newPhone = '';
    this.setState({ phone, users, newPhone });
    setTimeout(() => this.setState({ message: '' }), messageResetDelay);
  }

  onSubmitNewPosition = async (event) => {
    event.preventDefault();
    this.setState({ message: waitingMessage });
    await resume.methods.setPosition(web3.utils.utf8ToHex(this.state.newPosition)).send({ from: await this.account() });
    this.setState({ message: successMessage('position (job)') });
    const position = await this.getPosition();
    const users = await this.getUsers();
    const newPosition = '';
    this.setState({ position, users, newPosition });
    setTimeout(() => this.setState({ message: '' }), messageResetDelay);
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
    const users = await this.getUsers();
    this.setState({ dateOfBirth, users });
    setTimeout(() => this.setState({ message: '' }), messageResetDelay);
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
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Resume Contract</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/chousemath/resume_contract">Contract-Repo</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/chousemath/resume_contract_ui">UI-Repo</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Details
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Manager: {this.state.manager}
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="container" style={{ marginTop: '16px' }}>
          {message}

          <div className="row">
            <div className="col-md-3">
              <div style={{ width: '200px', height: '200px', backgroundColor: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: '#fff' }}><b>?</b></h1>
              </div>
            </div>
            <div className="col-md-9">
              <p>{this.state.name}</p>
              <p>{this.state.position}</p>
              <p>Your date of birth: {this.state.dateOfBirth}</p>
              <p>Your gender: {this.state.gender}</p>
              <p>Your address: {this.state.address}</p>
              <p>Your phone number: {this.state.phone}</p>
            </div>
          </div>

          <div className="row" style={styles.columnSpacing}>
            <div className="col-md-6">
              <form onSubmit={this.onSubmitNewName}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Full Name:</InputGroupAddon>
                  <Input
                    placeholder="Enter your new name here"
                    type="text"
                    value={this.state.newName}
                    onChange={event => this.setState({ newName: event.target.value })}
                    step="1" />
                  <Button type="submit" color="primary">Save</Button>
                </InputGroup>
              </form>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.onSubmitNewPosition}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Current Position:</InputGroupAddon>
                  <Input
                    placeholder="Enter your new position here"
                    type="text"
                    value={this.state.newPosition}
                    onChange={event => this.setState({ newPosition: event.target.value })}
                    step="1"
                  />
                  <Button type="submit" color="secondary">Save</Button>
                </InputGroup>
              </form>
            </div>
          </div>
          <div className="row" style={styles.columnSpacing}>
            <div className="col-md-6">
              <form onSubmit={this.onSubmitNewDateOfBirth}>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">Date of Birth:</InputGroupAddon>
                  <Input
                    placeholder="Select your date of birth"
                    type="date"
                    value={this.state.newDateOfBirth}
                    onChange={event => this.setState({ newDateOfBirth: event.target.value })}
                    step="1"
                  />
                  <Button type="submit" color="warning">Save</Button>
                </InputGroup>

              </form>
            </div>
            <div className="col-md-6">
              <form onSubmit={this.onSubmitNewPhone}>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">Phone Number:</InputGroupAddon>
                  <Input
                    placeholder="Enter your phone number"
                    type="text"
                    value={this.state.newPhone}
                    onChange={event => this.setState({ newPhone: event.target.value })}
                    step="1"
                  />
                  <Button type="submit" color="info">Save</Button>
                </InputGroup>

              </form>
            </div>
          </div>
          <hr />
          <div className="well well-lg">
            <p>Currently <span className="badge">{this.state.users.length}</span> users participating</p>
            <p>{users}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
