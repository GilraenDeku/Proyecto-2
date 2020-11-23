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

          <Navbar.Brand href="./WelcomePage">Bienvenid@</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <Nav.Link href="./Register">Personas registradas</Nav.Link>
              <Nav.Link href="./Country">Personas registradas por país</Nav.Link>
              <Nav.Link href="./Teaching">Personas registradas por lenguajes que enseñan</Nav.Link>
              <Nav.Link href="./Learning">Personas registradas por lenguajes que aprenden</Nav.Link>
              <Nav.Link onClick={this.clickPresionado}>Salir</Nav.Link>
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
              <h1>Bienvenido Administrador</h1>
              <p>
                Esperamos que disfrute las búsquedas
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