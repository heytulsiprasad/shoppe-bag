import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoute from './container/PrivateRoute';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <Container>
              <Switch>
                <Route exact path="/">
                  <ItemModal />
                  <ShoppingList />
                </Route>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route
                  render={() => <h1>Hey buddy, I assume you're a 404</h1>}
                />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
