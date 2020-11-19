import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'reactstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import { Redirect }                              from 'react-router-dom';
import './WelcomeClient.css';
import './Consulta2Page.css';
import Badge from 'react-bootstrap/Badge';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import BootstrapTable                            from 'react-bootstrap-table-next';

class Consulta2Page extends Component {

  constructor(props){
    super(props)
    this.state ={ 
      generalLanguage:[
        {name: '',
        count: ''}
      ],
      error: null,
      isLoaded: false,
      loginFlag: false,
      choosenlanguages: [],
      languageSelected: '',
      temlist: [],
      tempListLanguage: [],
      jsonFile:{
        learn: []
      },
      resultadosFlag: false,
      resultadoJson: null,
      resultado:[],
    }
  }

  clickPresionado = (event) =>{
    this.setState({
      loginFlag: true
    })
  }
  clickSelectLanguage = (event) => {
    this.setState({
      languageSelected: event
    })
  }

  renderRedirect = () => {
    if (this.state.loginFlag) {
      return <Redirect to='/IntroPage' />
    }
  }

  clickAddLanguage = () => {
    if(this.state.choosenlanguages.length === this.state.temlist.length){

    }else{
      this.state.choosenlanguages.push({'language': this.state.languageSelected});
      this.state.jsonFile.learn.push(this.state.languageSelected);
    }
  }

  clickRealizarBúsqueda = () => {
    this.busquedaResultados();
    this.setState({
      resultadosFlag: true
    })
  }


  creacionListaTabla = () => {
    if(this.state.resultado.length === this.state.resultadoJson.length){

    }
    else{

      for(let i = 0; i < this.state.resultadoJson.length; i++){
        this.state.resultado.push({
          'name': this.state.resultadoJson[i].name,
          'age': this.state.resultadoJson[i].age,
          'gender': this.state.resultadoJson[i].gender
        })
      }

    }
  }

  busquedaResultados = async () => {

    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const url = `http://localhost:5000/people_learn?continent=${userInfo.region}`;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.jsonFile)
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    this.state.resultadoJson = data;
    this.creacionListaTabla();

  }

  render () {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    this.state.temlist = userInfo.teach;

    const columnslanguage = [
      { dataField: 'language', text: 'Lenguaje Seleccionado' }
    ];

    const columnsRespuesta = [
      { dataField: 'name', text: 'Nombre' },
      { dataField: 'age', text: 'Edad' },
      { dataField: 'gender', text: 'Género' }
    ];

    if(this.state.resultadosFlag){
      return (
        <div className="Consulta2Page">
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
                    <h1>Consulta #1 Búsqueda idiomas que Enseño</h1>
                    <p>
                    Buscar a otros interesados en practicar uno o más de los idiomas que la
                    persona P puede enseñar.
                    </p>
                </Jumbotron>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Badge variant="light">Seleccione el o los idiomas que desea buscar</Badge>
                </h3>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                <DropdownButton
                  as={ButtonGroup}
                  title={'Escoja Lenguaje'}
                  onSelect={this.clickSelectLanguage}
                >
                  {this.state.temlist.map((catg) => (
                  <Dropdown.Item eventKey={catg.language}>{catg.language}</Dropdown.Item>
                ))}
                </DropdownButton>
                <p>{this.state.languageSelected}</p>
                </Col>
                <Col md="auto">
                  <Button onClick={this.clickAddLanguage}
                  variant="primary" >Añadir</Button>
                </Col>
              </Row>
  
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                  keyField="language"
                  data={this.state.choosenlanguages}
                  columns={columnslanguage}/>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Button onClick={this.clickRealizarBúsqueda}
                  variant="primary" >Realizar Búsqueda</Button>
                </h3>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Badge variant="light">Resultados</Badge>
                </h3>
                </Col>
              </Row>

              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <BootstrapTable
                      keyField="name"
                      data={this.state.resultado}
                      columns={columnsRespuesta}/>
                </Col>
              </Row>
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
      );

    }else{
      return (
        <div className="Consulta2Page">
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
                    <h1>Consulta #1 Búsqueda idiomas que Enseño</h1>
                    <p>
                    Buscar a otros interesados en practicar uno o más de los idiomas que la
                    persona P puede enseñar.
                    </p>
                </Jumbotron>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Badge variant="light">Seleccione el o los idiomas que desea buscar</Badge>
                </h3>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                <DropdownButton
                  as={ButtonGroup}
                  title={'Escoja Lenguaje'}
                  onSelect={this.clickSelectLanguage}
                >
                  {this.state.temlist.map((catg) => (
                  <Dropdown.Item eventKey={catg.language}>{catg.language}</Dropdown.Item>
                ))}
                </DropdownButton>
                <p>{this.state.languageSelected}</p>
                </Col>
                <Col md="auto">
                  <Button onClick={this.clickAddLanguage}
                  variant="primary" >Añadir</Button>
                </Col>
              </Row>
  
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <BootstrapTable
                  keyField="language"
                  data={this.state.choosenlanguages}
                  columns={columnslanguage}/>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 0 }}>
                <h3>
                  <Button onClick={this.clickRealizarBúsqueda}
                  variant="primary" >Realizar Búsqueda</Button>
                </h3>
                </Col>
              </Row>
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
      );
    }

    
  }
  
}

export default  Consulta2Page;