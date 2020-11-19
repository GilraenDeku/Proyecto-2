import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Register.css';
import BootstrapTable                            from 'react-bootstrap-table-next';
import paginationfactory                         from 'react-bootstrap-table2-paginator';
import DropdownButton                            from 'react-bootstrap/DropdownButton';
import Dropdown 								 from 'react-bootstrap/Dropdown';
import ButtonGroup 								 from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect }                              from 'react-router-dom';




class Register extends Component {

  constructor(props){
    super(props)
    this.state ={ 
      generalLanguage:[
        {name: '',
        count: ''}
      ],
      items: [],
      nameList: [],
      countryList: [],
      lenguajesList: [],
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
    console.log(`http://localhost:5000/get?continent=${userInfo.region}&collection=user`);

    await fetch(`http://localhost:5000/get?continent=${userInfo.region}&collection=user`).catch (err => alert(err))
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
  for(let i = 0; i < this.state.items.length; i++){
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

updateStates = (newC, newN, newL) => {
  this.setState({
    selectCounrty: newC,
    selectName: newN,
    lenguajesList : newL
  })
} 

searchCountry(name){
  var test = [];
  for(let i = 0; i < this.state.items.length; i++){
    if(this.state.items[i].name == name){
      this.updateStates(this.state.items[i].country, name, this.state.items[i].learn);
    }
    else{
    }
  }
}

renderRedirect = () => {
  if (this.state.loginFlag) {
    return <Redirect to='/IntroPage' />
  }
}

clickPresionado = (event) =>{
  this.setState({
    loginFlag: true
  })
}

  render () {
    const columnsMeansPractice = [
      { dataField: 'language', text: 'Languages to Practice' }
    ];
    return (
      <div className="Register">
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
              <Jumbotron fluid>
                <Container>
                  <h1>People Register</h1>
                  <p>
                  See a list of all the people registered on the site. Must be
                  show the person's name, their country of origin and the languages they
                  want to practice
                  </p>
                </Container>
              </Jumbotron>
              <h3>Please Select your UserName</h3>

              {['Select UserName'].map(
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
              <h3>Name: {this.state.selectName}</h3>
            </Col>
            <Col>
              <h3>Country of Origin: {this.state.selectCounrty}</h3>
            </Col>
          </Row>

              <BootstrapTable
                      keyField="_id"
                      data={this.state.lenguajesList}
                      columns={columnsMeansPractice}
                      pagination={paginationfactory()}/>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
  
}

export default Register;