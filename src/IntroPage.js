import React, { Component } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Image, InputGroup, FormControl } from 'react-bootstrap';
import logo from './images/logo.png';
import './IntroPage.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


class IntroPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginFlag: false,
      clientFlag: false,
      items: [],
      selectRegion: '',
      inputName: '',
      inputPassword: '',
      jsonFile: {
        name: '',
        age: 0,
        gender: '',
        country: '',
        learn: [],
        tearn: [],
        hobbies: [],
        media: [],
        signinFlag: false
      },
      jsonLocalStorage: {
        name: '',
        learn: null,
        teach: null,
        region: ''
      }
    }

  }

  componentDidMount = async (e) => {
    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=user`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.loginAttempt(response))
      .catch(err => this.errorHandler(err))
  }

  renderRedirect = () => {
    if (this.state.loginFlag) {
      return <Redirect to='/WelcomePage' />
    } else {
      if (this.state.signinFlag) {
        return <Redirect to='/SignInPage' />
      } else {
        if (this.state.clientFlag) {
          return <Redirect to='/WelcomeClient' />
        }
      }
    }
  }

  createJsonLocalStorage(name) {
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].name === name) {
        this.state.jsonLocalStorage.name = name;
        this.state.jsonLocalStorage.learn = this.state.items[i].learn;
        this.state.jsonLocalStorage.teach = this.state.items[i].teach;
        this.state.jsonLocalStorage.region = this.state.selectRegion;
        console.log(this.state.jsonLocalStorage);
      }
      else {
      }
    }
  }

  createJsonLocalStorageAdmin() {
    this.state.jsonLocalStorage.region = this.state.selectRegion;
  }


  writeJson = () => {

    const newlanguage = 'Dayanna';

    const newlevel = '1234';

    this.state.jsonFile.learn.push({ "language": newlanguage, "level": newlevel });

    //console.log(this.state.jsonFile);

  }

  clickPresionado = (event) => {
    this.setState({
      signinFlag: true
    })
  }

  inputPresionadoName = (event) => {
    this.setState({
      inputName: event.target.value
    })
  }

  inputPresionadoPassword = (event) => {
    this.setState({
      inputPassword: event.target.value
    })
  }

  loginAttempt = (res) => {
    this.setState({
      items: res
    })
  }

  clickSelectEstado = (res) => {
    this.setState({
      selectRegion: res
    })
  }

  clickLogInPresionado = () => {
    var res = false;
    if (this.state.inputName === '') {
      alert('Please write your UserName');
    } else {
      if (this.state.inputPassword === '') {
        alert('Please write your Password');
      } else {
        if (this.state.selectRegion === '') {
          alert('Please select your Region');
        } else {
          res = this.searchCountry(this.state.inputName);
          if (res) {
            this.setState({
              clientFlag: true
            })
          } else {
            if (this.state.inputName === 'Admin') {
              this.createJsonLocalStorageAdmin();
              this.setState({
                loginFlag: true
              })
            }
            else {
              alert('UserName or Password is incorrect');
            }
          }
        }
      }
    }
  }

  searchCountry(name) {
    var flag = false;
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].name === name) {
        flag = true
        this.createJsonLocalStorage(name);
      }
      else {
      }
    }
    return (flag);
  }

  render() {
    localStorage.clear();

    if (!localStorage.getItem('user_info')) {
      localStorage.setItem('user_info', '');
    }


    localStorage.setItem('user_info', JSON.stringify(this.state.jsonLocalStorage));

    return (
      <div className='IntroPage'>
        {this.renderRedirect()}
        <br />
        <br />
        <br />

        <h1>PROYECTO #2</h1>

        <br />

        <Image src={logo} fluid />

        <br />
        <br />

        <Container>
          <Row className="justify-content-md-center">
            <Col sm="12" md={{ size: 6, offset: 0 }}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">Nombre</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Name"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={this.inputPresionadoName}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-default">Contraseña</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="password"
                  aria-label="Password"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={this.inputPresionadoPassword}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione la región'}
                onSelect={this.clickSelectEstado}
              >
                <Dropdown.Item eventKey="AME">America</Dropdown.Item>
                <Dropdown.Item eventKey="EUR">Europe</Dropdown.Item>
                <Dropdown.Item eventKey="ASI">Asia</Dropdown.Item>
              </DropdownButton>
              <p>{this.state.selectRegion}</p>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button variant="primary" onClick={this.clickLogInPresionado}>Ingresar</Button>
              <Button variant="primary" onClick={this.clickPresionado}>Registrar</Button>
            </Col>
          </Row>
        </Container>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default IntroPage