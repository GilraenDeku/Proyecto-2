import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Learning.css';
import BootstrapTable                            from 'react-bootstrap-table-next';
import paginationfactory                         from 'react-bootstrap-table2-paginator';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect }                              from 'react-router-dom';



class Learning extends Component {

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

  componentDidMount = async (e) => {
    const userInfo = JSON.parse(localStorage.getItem('user_info'))

    console.log('Region que el usuario escogió');
    console.log(`http://localhost:5000/people_by_learn?continent=${userInfo.region}`);

    await fetch(`http://localhost:5000/people_by_learn?continent=${userInfo.region}`).catch (err => alert(err))
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

clickPresionado = (event) =>{
  this.setState({
    loginFlag: true
  })
}

  render () {
    const columnsMeansPractice = [
      { dataField: '_id', text: 'Lenguaje' },
      { dataField: 'count', text: 'Cantidad de personas' }
    ];
    return (
      <div className="Learning">
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
                  <h1>Learning Language</h1>
                  <p>
                  See the number of registered users by language to learn. Show the
                  language and the corresponding amount.
                  </p>
                </Container>
              </Jumbotron>
              <BootstrapTable
                      keyField="_id"
                      data={this.state.items}
                      columns={columnsMeansPractice}
                      pagination={paginationfactory()}/>
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
  
}

export default Learning;