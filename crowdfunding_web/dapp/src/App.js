import React from 'react';
import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import history from './history';
import { Campaign } from './components/Campaign';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Router history={history}>
    <Container>

      <Menu secondary>
        <Menu.Item
          name='home'
          onClick={this.navigateToHome}
        />
      </Menu>


      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/campaigns/:address' component={Campaign} />
        <Route component={NotFound} />
      </Switch>

    </Container>
  </Router>
);
}

export default App;
