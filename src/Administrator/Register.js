import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Register.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationfactory from 'react-bootstrap-table2-paginator';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';




class Register extends Component {

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
      nameList: [],
      countryList: [],
      lenguajesList: [],
      lenguajesListTeach: [],
      selectName: '',
      selectCounrty: '',
      error: null,
      isLoaded: false,
      loginFlag: false
    }

  }

  componentDidMount = async (e) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    console.log('Region que el usuario escogió');
    console.log(`https://bda-p2-server.azurewebsites.net/get?continent=${userInfo.region}&collection=user`);

    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=${userInfo.region}&collection=user`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.loginAttempt(response))
      .catch(err => this.errorHandler(err))
  }

  loginAttempt = (res) => {
    this.setState({
      items: res
    })
  }

  setListName = () => {
    var testlist = [];
    for (let i = 0; i < this.state.items.length; i++) {
      testlist.push(this.state.items[i].name);
    }
  }

  getSelectName = (e) => {
    /*
    this.setState({
      selectName: e
    })
    */
    this.searchCountry(e);
  }

  updateStates = (newC, newN, newL, newT) => {
    this.setState({
      selectCounrty: newC,
      selectName: newN,
      lenguajesList: newL,
      lenguajesListTeach: newT

    })
  }

  searchCountry(name) {
    var test = [];
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].name == name) {
        this.updateStates(this.state.items[i].country, name, this.state.items[i].learn, this.state.items[i].teach);
      }
      else {
      }
    }
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
      { dataField: 'language', text: 'Lenguajes' },
      { dataField: 'level', text: 'Nivel de dominio' }
    ];
    const columnsMeansPracticeTeach = [
      { dataField: 'language', text: 'Lenguajes' },
      { dataField: 'level', text: 'Nivel de dominio' }
    ];
    return (
      <div className="Register">
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
        <Container>
          <Row>
            <Col>
              <Jumbotron fluid>
                <Container>
                  <h1>Personas registradas</h1>
                  <p>
                    Ver un listado de todas las personas registradas en el sitio. Se debe
                    mostrar el nombre de la persona, su país de origen y los idiomas que
                    desea practicar.
                  </p>
                </Container>
              </Jumbotron>
              <h3>Por favor seleccione el Usuario</h3>

              {['Seleccione el Usuario'].map(
                (variant) => (
                  <DropdownButton
                    as={ButtonGroup}
                    key={variant}
                    id={`dropdown-variants-${variant}`}
                    variant={variant.toLowerCase()}
                    title={variant}
                    onSelect={this.getSelectName}
                  >
                    {this.state.items.map((catg) => (
                      <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                ),
              )}

              <Row>
                <Col>
                  <h3>Nombre: {this.state.selectName}</h3>
                </Col>
                <Col>
                  <h3>País de Origen: {this.state.selectCounrty}</h3>
                </Col>
              </Row>

              <br/>

              <h4>Lenguajes que se desea aprender</h4>

              <BootstrapTable
                keyField="_id"
                data={this.state.lenguajesList}
                columns={columnsMeansPractice}
                pagination={paginationfactory()} />


                <br/>

                <h4>Lenguajes que se desea enseñar</h4>
                <BootstrapTable
                keyField="_id"
                data={this.state.lenguajesListTeach}
                columns={columnsMeansPracticeTeach}
                pagination={paginationfactory()} />
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

}

export default Register;