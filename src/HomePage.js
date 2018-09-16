import React, { Component } from 'react';
import SearchQuestions from './SearchQuestions'

class HomePage extends Component {

  render() {
    const { isAuthenticated, login } = this.props.auth
    const { api } = this.props
    return (
      <div className="container">
        {
          isAuthenticated() ?
            <SearchQuestions api={api} />

          : <div>
              <h2>People Power</h2>
              <p>Please login <a onClick={login}>here</a> to continue</p>
            </div>
        }
      </div>
    )
  }
}

export default HomePage;
