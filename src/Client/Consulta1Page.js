import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom';
import './WelcomeClient.css';
import './Consulta1Page.css';
import Badge from 'react-bootstrap/Badge';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationfactory from 'react-bootstrap-table2-paginator';


class Consulta1Page extends Component {

  constructor(props) {
    super(props)
    this.state = {
      generalLanguage: [
        {
          name: '',
          count: ''
        }
      ],
      error: null,
      isLoaded: false,
      loginFlag: false,
      temlist: [],
      temlistTeach: [],
      temlistLearn: [],



      guardarHobbie: [],
      guardarHobbieJson: [],
      guardarMedia: [],
      guardarMediaJson: [],
      guardarLenguageLearn: [],
      languageTeach: '',
      languageLearn: '',
      jsonFile: {
        name: '',
        hobbies: [],
        media: []
      },

      resultadosFlag: false,
      resultadoJson: null,
      resultado: [],




      hobbielist: [],
      myhobbielist: [],
      myhobbielistJson: [],
      selectHobbie: '',
      mediaList: [],
      mymediaList: [],
      mymedialistJson: [],
      selectMedia: '',
      usersList: [],

      myteachList: [],
      mylearnList: [],
      myNombre: '',
      myEdad: '',
      myPais: ''

    }
  }


  componentDidMount = async (e) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=${userInfo.region}&collection=user`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.userAttempt(response))
      .catch(err => this.errorHandler(err))


    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=${userInfo.region}&collection=hobbie`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.hobbiesAttempt(response))
      .catch(err => this.errorHandler(err))

    fetch(`https://bda-p2-server.azurewebsites.net/get?continent=${userInfo.region}&collection=media`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.mediaAttempt(response))
      .catch(err => this.errorHandler(err))
  }


  userAttempt = (res) => {
    this.setState({
      usersList: res
    })
    this.asignarMisListas();
  }


  asignarMisListas = () => {
    var temLearn = [];
    var temTeach = [];
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const name = userInfo.name;
    for (let i = 0; i < this.state.usersList.length; i++) {
      if (this.state.usersList[i].name === name) {
        this.state.myhobbielist = this.state.usersList[i].hobbies;
        this.state.mymediaList = this.state.usersList[i].media;
        this.state.myNombre = name;
        this.state.myEdad = this.state.usersList[i].age;
        this.state.myPais = this.state.usersList[i].country;
        this.actualizarLenguajes(this.state.usersList[i].learn, this.state.usersList[i].teach)
      }
    }
    this.asignarHobbieListJson();
    this.asignarMediaListJson();
  }

  actualizarLenguajes(e, t) {
    this.setState({
      mylearnList: e,
      myteachList: t
    })

    console.log('LEARN');
    console.log(this.state.mylearnList);
    console.log('TEACH');
    console.log(this.state.myteachList);
  }

  asignarMediaListJson = () => {
    for (let i = 0; i < this.state.mymediaList.length; i++) {
      this.state.mymedialistJson.push({ 'name': this.state.mymediaList[i] });
    }
  }

  asignarHobbieListJson = () => {
    for (let i = 0; i < this.state.myhobbielist.length; i++) {
      this.state.myhobbielistJson.push({ 'name': this.state.myhobbielist[i] });
    }
  }

  hobbiesAttempt = (res) => {
    this.setState({
      hobbielist: res
    })
  }

  mediaAttempt = (res) => {
    this.setState({
      mediaList: res
    })
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

  clickSelectHobbie = (event) => {
    this.setState({
      selectHobbie: event
    })
  }

  clickSelectMedia = (event) => {
    this.setState({
      selectMedia: event
    })
  }

  clickAddMedia = () => {
    this.state.guardarMedia.push({ 'name': this.state.selectMedia });
    this.state.guardarMediaJson.push(this.state.selectMedia);
  }

  clickAddHobbie = () => {
    this.state.guardarHobbie.push({ 'name': this.state.selectHobbie });
    this.state.guardarHobbieJson.push(this.state.selectHobbie);
  }

  crearJson = () => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    this.state.jsonFile.name = userInfo.name;
    for (let i = 0; i < this.state.guardarHobbieJson.length; i++) {
      this.state.jsonFile.hobbies.push(this.state.guardarHobbieJson[i])
    }
    for (let i = 0; i < this.state.guardarMediaJson.length; i++) {
      this.state.jsonFile.media.push(this.state.guardarMediaJson[i])
    }

    console.log('El JSON File');
    console.log(this.state.jsonFile);
  }

  clickRealizarBúsqueda = () => {
    this.crearJson();
    this.busquedaResultados();
    this.setState({
      resultadosFlag: true
    })
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  busquedaResultados = async () => {

    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const url = `https://bda-p2-server.azurewebsites.net/update?continent=${userInfo.region}`;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.jsonFile)
    };

    const response = await fetch(url, requestOptions);
    this.sleep(500);
    window.location.reload();

  }


  render() {

    const columnsNewHobbie = [
      { dataField: 'name', text: 'Hobbie Seleccionado' }
    ];

    const columnsNewMedio = [
      { dataField: 'name', text: 'Medio de Contacto Seleccionado' }
    ];

    const columnsmyHobbie = [
      { dataField: 'name', text: 'Mi Hobbie Actual' }
    ];

    const columnsmyMedio = [
      { dataField: 'name', text: 'Mi Medio de Contacto Actual' }
    ];

    const columnsRespuesta = [
      { dataField: 'name', text: 'Nombre' },
      { dataField: 'age', text: 'Edad' },
      { dataField: 'gender', text: 'Género' }
    ];

    const columnslearnDrop = [
      { dataField: 'language', text: 'Lenguaje' },
      { dataField: 'level', text: 'Nivel' }
    ]
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    this.state.temlistTeach = userInfo.teach;
    this.state.temlistLearn = userInfo.learn;
    return (
      <div className="Consulta1Page">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Brand href="./WelcomeClient">Bienvenid@</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <Nav.Link href="./Consulta2Page">Búsqueda idiomas que Enseño</Nav.Link>
              <Nav.Link href="./Consulta3Page">Búsqueda idiomas que Enseño y que me enseñen</Nav.Link>
              <Nav.Link href="./Consulta4Page">Búsqueda idiomas que Enseño y que me enseñen por País</Nav.Link>
              <Nav.Link href="./Consulta5Page">Búsqueda idiomas que Enseño y que me enseñen por País y rango Edad</Nav.Link>
              <Nav.Link href="./Consulta1Page">Modificar mis datos</Nav.Link>
              <Nav.Link onClick={this.clickPresionado}>Salir</Nav.Link>
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
                  idioma.
                        </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>


        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 0 }}>
              <h3>
                <Badge variant="light">Seleccione los nuevos datos para modificar</Badge>
              </h3>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>


            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <DropdownButton
                    as={ButtonGroup}
                    title={'Escoger Nuevo Hobbie'}
                    onSelect={this.clickSelectHobbie}
                  >
                    {this.state.hobbielist.map((catg) => (
                      <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <p>{this.state.selectHobbie}</p>
                </Col>
                <Col md="auto">
                  <Button onClick={this.clickAddHobbie}
                    variant="primary" >Añadir</Button>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                    keyField="name"
                    data={this.state.guardarHobbie}
                    columns={columnsNewHobbie} />
                </Col>
              </Row>
            </Col>


            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <DropdownButton
                    as={ButtonGroup}
                    title={'Escoger Nuevo Medio de Contacto'}
                    onSelect={this.clickSelectMedia}
                  >
                    {this.state.mediaList.map((catg) => (
                      <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <p>{this.state.selectMedia}</p>
                </Col>
                <Col md="auto">
                  <Button onClick={this.clickAddMedia}
                    variant="primary" >Añadir</Button>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                    keyField="language"
                    data={this.state.guardarMedia}
                    columns={columnsNewMedio} />
                </Col>
              </Row>
            </Col>
          </Row>




          <br />
          <br />
          <br />




          <Row>
            <Col sm="12" md={{ size: 6, offset: 0 }}>
              <h3>
                <Button onClick={this.clickRealizarBúsqueda}
                  variant="primary" >Modificar Datos</Button>
              </h3>
            </Col>
          </Row>









          <br />
          <br />
          <br />














          <Container>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Badge variant="light">Mis datos en la Base de Datos</Badge>
                </h3>
              </Col>
            </Row>
          </Container>

          <br />
          <br />

          <Row>
            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h4>Nombre: {this.state.myNombre}</h4>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h4>Edad: {this.state.myEdad}</h4>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <h4>Pais de Origen: {this.state.myPais}</h4>
                </Col>
              </Row>
            </Col>
          </Row>

          <br />
          <br />

          <Row>
            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                    keyField="name"
                    data={this.state.myhobbielistJson}
                    columns={columnsmyHobbie} />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                    keyField="name"
                    data={this.state.mymedialistJson}
                    columns={columnsmyMedio} />
                </Col>
              </Row>
            </Col>
          </Row>

          <br />
          <br />

          <Row>
            <Col sm="12" md={{ size: 6, offset: 0 }}>
              <h4>Idiomas que el usuario deseo aprender</h4>
              <br />
              <BootstrapTable
                keyField="_id"
                data={this.state.mylearnList}
                columns={columnslearnDrop}
                pagination={paginationfactory()} />
            </Col>
          </Row>

          <br />
          <br />

          <Row>
            <Col sm="12" md={{ size: 6, offset: 0 }}>
              <h4>Idiomas que el usuario deseo enseñar</h4>
              <br />
              <BootstrapTable
                keyField="_id"
                data={this.state.myteachList}
                columns={columnslearnDrop}
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

export default Consulta1Page;