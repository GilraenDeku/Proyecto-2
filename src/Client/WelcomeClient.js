import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Redirect }                              from 'react-router-dom';
import './WelcomeClient.css';
import logo from '../images/logo.png';

class WelcomeClient extends Component {

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
    
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    console.log('Region que el usuario escogió');
    console.log(userInfo);

    console.log('URL con la region');
    console.log(`http://localhost:5000/get?continent=${userInfo.region}&collection=level`);
    return (
      <div className="WelcomeClient">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                
                <Navbar.Brand href="./WelcomeClient">Bienvenido</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                    <Nav.Link href="./Consulta1Page">Modificar mis datos</Nav.Link>
                    <Nav.Link href="./Consulta2Page">Búsqueda idiomas que Enseño</Nav.Link>
                    <Nav.Link href="./Consulta3Page">Búsqueda idiomas que Enseño y que me enseñen</Nav.Link>
                    <Nav.Link href="./Consulta4Page">Búsqueda idiomas que Enseño y que me enseñen por País</Nav.Link>
                    <Nav.Link href="./Consulta5Page">Búsqueda idiomas que Enseño y que me enseñen por País y rango Edad</Nav.Link>
                    <Nav.Link onClick={this.clickPresionado}>LogOut</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
                </Navbar>
                {this.renderRedirect()};
          <Container>
            <Row>
              <Col>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <Image src={logo} fluid />
              <br/>
              <br/>
              <br/>
                  <h1>Bienvenido {userInfo.name}</h1>
                  <p>
                  Esperamos que disfrute las búsquedas
                  </p>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
  
}

export default  WelcomeClient;