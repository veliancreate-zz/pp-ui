import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css'
import { Link } from 'react-router-dom'

class App extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {
          isAuthenticated() ?
            <Navbar fluid>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">People Power</a>
                </Navbar.Brand>
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                >
                  <Link to="/home">Home</Link>
                </Button>
                <Button
                  bsStyle="primary"
                  className="btn-margin">
                  <Link to="/create-question">Create Question</Link>
                </Button>
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              </Navbar.Header>
            </Navbar>
          : null
        }

      </div>
    );
  }
}

export default App;
