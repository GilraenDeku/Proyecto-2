import React, { Component } from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Image, InputGroup, FormControl } from 'react-bootstrap';
import './SignInPage.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Badge from 'react-bootstrap/Badge';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationfactory from 'react-bootstrap-table2-paginator';



class SignInPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      registerFlag: false,
      goBackFlag: false,
      items: [],
      selectRegion: '',
      inputName: '',
      inputPassword: '',
      countryList: [],
      selectCountry: '',
      ageList: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
      ],
      selectGender: '',
      showGender: '',
      selectAge: 0,
      jsonFile: {
        name: '',
        age: 0,
        gender: '',
        country: '',
        learn: null,
        teach: null,
        hobbies: null,
        media: null
      },
      languagelistGet: [],
      selectLanguageLearn: '',
      selectLevelLearn: '',
      levellistGet: [],
      languageLearnlistaTemp: [],

      selectLanguageTeach: '',
      selectLevelTeach: '',
      languageTeachlistTemp: [],

      selectHobbie: '',
      hobbieListTemp: [],
      hobbieListJson: [],
      hobbieList: [],

      selectMeans: '',
      meansLitTemp: [],
      mediaListJson: [],
      meansList: [],

      languageLearnJson: []
    }

  }

  componentDidMount = async (e) => {
    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=country`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.countryAttempt(response))
      .catch(err => this.errorHandler(err))

    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=language`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.languageAttempt(response))
      .catch(err => this.errorHandler(err))

    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=level`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.levelAttempt(response))
      .catch(err => this.errorHandler(err))

    await fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=hobbie`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.hobbieAttempt(response))
      .catch(err => this.errorHandler(err))

    fetch(`https://bda-p2-server.azurewebsites.net/get?continent=EUR&collection=media`).catch(err => alert(err))
      .then(response => response.json())
      .then(response => this.meansAttempt(response))
      .catch(err => this.errorHandler(err))



  }

  renderRedirect = () => {
    if (this.state.registerFlag) {
      console.log("Entra a registerFlag");
      return <Redirect to='/IntroPage' />
    } else {
      if (this.state.goBackFlag) {
        return <Redirect to='/IntroPage' />
      }
    }
  }


  writeJson = () => {

    const newlanguage = 'Dayanna';

    const newlevel = '1234';

    this.state.jsonFile.learn.push({ "language": newlanguage, "level": newlevel });

  }

  clickAddLearnPresionado = (event) => {
    this.state.languageLearnlistaTemp.push({ "language": this.state.selectLanguageLearn, "level": this.state.selectLevelLearn });
  }

  clickAddTeachPresionado = (event) => {
    this.state.languageTeachlistTemp.push({ "language": this.state.selectLanguageTeach, "level": this.state.selectLevelTeach });
  }

  clickAddHobbie = (event) => {
    this.state.hobbieListTemp.push({ "name": this.state.selectHobbie });
    this.state.hobbieListJson.push(this.state.selectHobbie);
  }

  clickAddMean = (event) => {
    this.state.meansLitTemp.push({ "name": this.state.selectMeans });
    this.state.mediaListJson.push(this.state.selectMeans);
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

  countryAttempt = (res) => {
    this.setState({
      countryList: res
    })
  }

  languageAttempt = (res) => {

    this.setState({
      languagelistGet: res
    })
  }

  levelAttempt = (res) => {
    this.setState({
      levellistGet: res
    })
  }

  hobbieAttempt = (res) => {
    this.setState({
      hobbieList: res
    })
  }

  meansAttempt = (res) => {
    this.setState({
      meansList: res
    })
  }

  clickSelectEstado = (res) => {
    this.setState({
      selectRegion: res
    })
  }

  clickSelectAge = (res) => {
    this.setState({
      selectAge: res
    })
  }

  clickSelectGender = (res) => {

    this.setState({
      selectGender: res
    })

    if (res === 'F') {
      this.setState({
        showGender: 'Female'
      })
    } else {
      if (res === 'M') {
        this.setState({
          showGender: 'Male'
        })
      } else {
        if (res === 'I') {
          this.setState({
            showGender: 'Undefined'
          })
        }
      }
    }
  }

  clickSelectCountry = (res) => {
    this.setState({
      selectCountry: res
    })
  }

  clickSelectLanguageLearn = (res) => {
    this.setState({
      selectLanguageLearn: res
    })
  }

  clickSelectLanguageTeach = (res) => {
    this.setState({
      selectLanguageTeach: res
    })
  }

  clickSelectHobbie = (res) => {
    this.setState({
      selectHobbie: res
    })
  }

  clickSelectLevelLearn = (res) => {
    this.setState({
      selectLevelLearn: res
    })
  }

  clickSelectMean = (res) => {
    this.setState({
      selectMeans: res
    })
  }


  registerNewUser = async (e) => {
    alert('El usuario se registró correctamente');
    const url = `https://bda-p2-server.azurewebsites.net/register?continent=${this.state.selectRegion}`;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.jsonFile)
    };
    const response = await fetch(url, requestOptions);
  }



  clickRegisterPresionado = () => {

    //console.log(this.state.languageLearnlistaTemp);
    //console.log(this.state.hobbieListTemp);

    if (this.state.inputName === '') {
      alert('Please write your new name');
    } else {
      if (this.state.selectGender === '') {
        alert('Please select your gender');
      } else {
        if (this.state.selectCountry === '') {
          alert('Please select your Country');
        } else {
          if (this.state.languageLearnlistaTemp.length === 0) {
            alert('Please select the language you want to learn');
          } else {
            if (this.state.languageTeachlistTemp.length === 0) {
              alert('Please select the language you want to teach');
            } else {
              if (this.state.hobbieListJson.length === 0) {
                alert('Please select your hobbie');
              } else {
                if (this.state.mediaListJson.length === 0) {
                  alert('Please select your mean to practice');
                } else {
                  if (this.state.selectRegion === '') {
                    alert('Please select the region');
                  } else {
                    this.setState({
                      registerFlag: true
                    })
                    this.state.jsonFile.name = this.state.inputName;
                    this.state.jsonFile.age = Number(this.state.selectAge);
                    this.state.jsonFile.gender = this.state.selectGender;
                    this.state.jsonFile.country = this.state.selectCountry;
                    this.state.jsonFile.learn = this.state.languageLearnlistaTemp;
                    this.state.jsonFile.teach = this.state.languageTeachlistTemp;
                    this.state.jsonFile.hobbies = this.state.hobbieListJson;
                    this.state.jsonFile.media = this.state.mediaListJson;
                    console.log(this.state.jsonFile);
                    this.registerNewUser();
                  }
                }
              }
            }
          }
        }//else country
      }//else gender
    }//else de name  
  }

  clickGoBackPresionado = () => {
    this.setState({
      goBackFlag: true
    })
  }

  clickSelectLevelTeach = (res) => {
    this.setState({
      selectLevelTeach: res
    })
  }


  searchCountry(name) {
    var flag = false;
    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].name === name) {
        flag = true
      }
      else {
      }
    }
    return (flag);
  }

  render() {
    const columnslanguajeLearn = [
      { dataField: 'language', text: 'Lenguajes para Aprender' },
      { dataField: 'level', text: 'Nivel de Dominio' }
    ];

    const columnshobbie = [
      { dataField: 'name', text: 'Hobbies selecionados' }
    ];

    const columnsMeans = [
      { dataField: 'name', text: 'Medios para comunicarse' }
    ];
    return (
      <div className='SignInPage'>
        {this.renderRedirect()}
        <container>
          <Row>
            <Col>
              <container>
                <Jumbotron fluid>
                  <h1>Registro</h1>
                  <p>
                    Registrar un nuevo usuario
                    </p>
                </Jumbotron>
              </container>
            </Col>
          </Row>

          {/*
          Selección de nombre, edad, género y pais de Origen
          */}
          <Row>
            <Col sm="12" md={{ size: 6, offset: 1 }}>
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
            <Col>
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione su edad'}
                onSelect={this.clickSelectAge}
              >
                {this.state.ageList.map((catg) => (
                  <Dropdown.Item eventKey={catg}>{catg}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectAge}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 1 }}>
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione su género'}
                onSelect={this.clickSelectGender}
              >
                <Dropdown.Item eventKey="F">Female</Dropdown.Item>
                <Dropdown.Item eventKey="M">Male</Dropdown.Item>
                <Dropdown.Item eventKey="I">Undefined</Dropdown.Item>
              </DropdownButton>
              <p>{this.state.showGender}</p>
            </Col>
            <Col>
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione su país de origen'}
                onSelect={this.clickSelectCountry}
              >
                {this.state.countryList.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectCountry}</p>
            </Col>
          </Row>
        </container>

        <br />
        <br />


        {/*
          Selección de lenguaje Aprender
        */}

        <container>
          <h3>
            <Badge variant="light">Seleccione sus lenguajes que desea aprender</Badge>
          </h3>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione sus lenguajes'}
                onSelect={this.clickSelectLanguageLearn}
              >
                {this.state.languagelistGet.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectLanguageLearn}</p>
            </Col>
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione el nivel de dominio'}
                onSelect={this.clickSelectLevelLearn}
              >
                {this.state.levellistGet.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectLevelLearn}</p>
            </Col>
            <Col md="auto">
              <Button onClick={this.clickAddLearnPresionado}
                variant="primary" >Añadir</Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <BootstrapTable
                keyField="language"
                data={this.state.languageLearnlistaTemp}
                columns={columnslanguajeLearn} />
            </Col>
          </Row>
        </container>




        {/*
          Selección de lenguaje Enseñar
        */}


        <br />
        <br />




        <container>
          <h3>
            <Badge variant="light">Seleccione sus lenguajes para enseñar</Badge>
          </h3>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione sus lenguajes'}
                onSelect={this.clickSelectLanguageTeach}
              >
                {this.state.languagelistGet.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectLanguageTeach}</p>
            </Col>
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione el nivel de dominio'}
                onSelect={this.clickSelectLevelTeach}
              >
                {this.state.levellistGet.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectLevelTeach}</p>
            </Col>
            <Col md="auto">
              <Button onClick={this.clickAddTeachPresionado}
                variant="primary" >Añadir</Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <BootstrapTable
                keyField="language"
                data={this.state.languageTeachlistTemp}
                columns={columnslanguajeLearn} />
            </Col>
          </Row>
        </container>




        {/*
          Selección de Hobbie
        */}

        <br />
        <br />

        <container>
          <h3>
            <Badge variant="light">Seleccione sus hobbies</Badge>
          </h3>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione sus hobbies'}
                onSelect={this.clickSelectHobbie}
              >
                {this.state.hobbieList.map((catg) => (
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
                data={this.state.hobbieListTemp}
                columns={columnshobbie} />
            </Col>
          </Row>
        </container>





        {/*
          Selección de Medios para enseñar
        */}




        <br />
        <br />


        <container>
          <h3>
            <Badge variant="light">Seleccione los medios que desea usar para practicar</Badge>
          </h3>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione los medios'}
                onSelect={this.clickSelectMean}
              >
                {this.state.meansList.map((catg) => (
                  <Dropdown.Item eventKey={catg.name}>{catg.name}</Dropdown.Item>
                ))}
              </DropdownButton>
              <p>{this.state.selectMeans}</p>
            </Col>
            <Col md="auto">
              <Button onClick={this.clickAddMean}
                variant="primary" >Añadir</Button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <BootstrapTable
                keyField="name"
                data={this.state.meansLitTemp}
                columns={columnsMeans} />
            </Col>
          </Row>
        </container>

        <br />
        <br />

        <container>
          <Row>
            <Col>
              <DropdownButton
                as={ButtonGroup}
                title={'Seleccione la Región'}
                onSelect={this.clickSelectEstado}
              >
                <Dropdown.Item eventKey="AME">America</Dropdown.Item>
                <Dropdown.Item eventKey="EUR">Europe</Dropdown.Item>
                <Dropdown.Item eventKey="ASI">Asia</Dropdown.Item>
              </DropdownButton>
              <p>{this.state.selectRegion}</p>
            </Col>
          </Row>
        </container>

        <br />
        <br />

        <container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button variant="primary" onClick={this.clickRegisterPresionado}>Registrarse</Button>
              <Button variant="primary" onClick={this.clickGoBackPresionado}>Regresar</Button>
            </Col>
          </Row>
        </container>

        <br />
        <br />












      </div>
    );
  }
}

export default SignInPage