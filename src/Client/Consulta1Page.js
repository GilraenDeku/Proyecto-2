import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Button } from 'reactstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Redirect }                              from 'react-router-dom';
import './WelcomeClient.css';
import './Consulta1Page.css';
import logo from '../images/logo.png';

class Consulta1Page extends Component {

  constructor(props){
    super(props)
    this.state ={ 
      generalLanguage:[
        {name: '',
        count: ''}
      ],
      items: [],
      error: null,
      isLoaded: false,
      loginFlag: false
    }
  }

  clickPresionado = (event) =>{
    this.setState({
      loginFlag: true
  })
  }

  renderRedirect = () => {
    if (this.state.loginFlag) {
      return <Redirect to='/IntroPage' />
    }
  }

  render () {
    return (
      <div className="Consulta1Page">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
                <Navbar.Brand href="./WelcomeClient">Bienvenido</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                    <Nav.Link href="./Consulta2Page">Búsqueda idiomas que Enseño</Nav.Link>
                    <Nav.Link href="./Consulta3Page">Búsqueda idiomas que Enseño y que me enseñen</Nav.Link>
                    <Nav.Link href="./Consulta4Page">Búsqueda idiomas que Enseño y que me enseñen por País</Nav.Link>
                    <Nav.Link href="./Consulta5Page">Búsqueda idiomas que Enseño y que me enseñen por País y rango Edad</Nav.Link>
                    <Nav.Link href="./Consulta1Page">Modificar mis datos</Nav.Link>
                    <Nav.Link onClick={this.clickPresionado}>LogOut</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
                {this.renderRedirect()};
                <Container>
              <Row>
                <Col>
                <Jumbotron fluid>
                    <h1>Consulta #5 Modificar mis datos</h1>
                    <p>
                    Un usuario puede modificar los siguientes datos:
                    hobbies, medio por el cual desea ser contactado para practicar el
                    idioma
                    </p>
                </Jumbotron>
                </Col>
              </Row>
            </Container>
      </div>
    );
  }
  
}

export default  Consulta1Page;