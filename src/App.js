import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/Posts';
import Auth from './containers/Auth/Auth';
import Form from './containers/Form/Form';
import Logout from './containers/Auth/Logout';
import './bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './font-awesome-4.7.0/css/font-awesome.min.css';
import './App.css';
import Post from './containers/Post/Post';


class App extends Component {
  render() {
    return ( 
      <Layout>
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/status" component={Form} />
          <Route path="/logout" component={Logout} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/" exact component={Posts} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
