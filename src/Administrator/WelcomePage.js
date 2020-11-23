import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Welcome.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import logo from '../images/logo.png';


class WelcomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      generalLanguage: [
        {
          name: '',
          count: ''
        }
      ],
      items: [],
      error: null,
      isLoaded: false,
      loginFlag: false
    }
  }

  clickPresionado = (event) => {
    this.setState({
      loginFlag: true
    })
  }

  renderRedirect = () => {
    if (this.state.loginFlag) {
      return <Redirect to='/IntroPage' />
    }
  }

  render() {
    return (
      <div className="WelcomePage">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Brand href="./WelcomePage">Welcome</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <Nav.Link href="./Register">People Register</Nav.Link>
              <Nav.Link href="./Country">People Register by Country</Nav.Link>
              <Nav.Link href="./Teaching">People Register by Teaching Language</Nav.Link>
              <Nav.Link href="./Learning">People Register by Learning Language</Nav.Link>
              <Nav.Link onClick={this.clickPresionado}>LogOut</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
        {this.renderRedirect()};
        <Container>
          <Row>
            <Col>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <Image src={logo} fluid />
              <br />
              <br />
              <br />
              <h1>Welcome Administrator</h1>
              <p>
                Hope you have a nice time
                  </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default WelcomePage;