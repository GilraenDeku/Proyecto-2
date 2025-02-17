import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Country.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationfactory from 'react-bootstrap-table2-paginator';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';



class Country extends Component {

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

  componentDidMount = async (e) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    console.log('Region que el usuario escogió');
    console.log(`https://bda-p2-server.azurewebsites.net/people_by_country?continent=${userInfo.region}`);

    await fetch(`https://bda-p2-server.azurewebsites.net/people_by_country?continent=${userInfo.region}`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.loginAttempt(response))
      .catch(err => this.errorHandler(err))
  }

  loginAttempt = (res) => {

    this.setState({
      items: res
    })

    console.log(this.state.items);
  }

  renderRedirect = () => {
    if (this.state.loginFlag) {
      return <Redirect to='/IntroPage' />
    }
  }

  clickPresionado = (event) => {
    this.setState({
      loginFlag: true
    })
  }

  render() {
    const columnsMeansPractice = [
      { dataField: '_id', text: 'Pais' },
      { dataField: 'count', text: 'Cantidad de personas' }
    ];
    return (
      <div className="Country">
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
        <br />
        <br />
        <Container>
          <Row>
            <Col>
              <Jumbotron fluid>
                <h1>Personas registradas por país</h1>
                <p>
                  Ver cantidad de usuarios registrados por país de origen. Mostrar el nombre
                  de cada país y la cantidad correspondiente.
                  </p>
              </Jumbotron>
              <br />
              <BootstrapTable
                keyField="_id"
                data={this.state.items}
                columns={columnsMeansPractice}
                pagination={paginationfactory()} />
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
        <br />
      </div>
    );
  }

}

export default Country;