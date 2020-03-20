import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/hoc/layouts/Layout';
import Home from './containers/Home/Home';
import Todos from './containers/Todos/Todos';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/todos' component={Todos}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    </Layout>
  );
};

export default App;
