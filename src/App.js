import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/layouts/Layout';
import Home from './containers/Home/Home';
import Todos from './containers/Todos/Todos';
import Login from './containers/Auth/Login/Login';
import SignUp from './containers/Auth/SignUp/SignUp';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/todos' component={Todos}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    </Layout>
  );
};

export default App;
