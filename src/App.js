import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/layouts/Layout';
import Home from './containers/Home/Home';
import Todos from './containers/Todos/Todos';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';
import { connect } from 'react-redux';

const App = ({ loggedIn }) => {
  console.log(loggedIn);

  let routes;
  if (loggedIn) {
    routes = (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/todos' component={Todos}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid ? true : null
});

export default connect(mapStateToProps)(App);
