import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Nav from './Nav';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import Question from './Question'
import AskQuestion from './AskQuestion'
import Rep from './Rep'
import User from './User'
import Party from './Party'
import history from './history';
import HomePage from './HomePage';
import api from './api'

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  const p = { api }
  return (
      <Router history={history}>
        <div>
          <Nav auth={auth} />
          <Switch>
            <Route path="/question/:id" render={(props) => <Question { ...props } api={api} />} />
            <Route path="/rep/:id" render={(props) => <Rep {...props } api={api} />} />
            <Route path="/user/:id" render={(props) => <User {...props } api={api} />} />
            <Route path="/party/:id" render={(props) => <Party {...props } api={api} />} />
            <Route path="/create-question" render={(props) => <AskQuestion {...props } api={api} />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} />
            }}/>
            <Route component={(props) => <HomePage auth={auth} {...props} api={api} />} />
          </Switch>
        </div>
      </Router>
  );
}
