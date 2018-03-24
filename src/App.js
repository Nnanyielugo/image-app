import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/Posts';
import Post from './containers/Post/Post';
import Auth from './containers/Auth/Auth';
import Form from './containers/Form/Form';
import Logout from './containers/Auth/Logout';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/Form/EditProfile';
import './bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './font-awesome-4.7.0/css/font-awesome.min.css';
import './App.css';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/profiles/:id" exact component={Profile} />
        <Route path="/" exact component={Posts} />
        <Redirect to="/" />
      </Switch>
    )
    /** AUTH GUARD */
    if(this.props.isLoggedIn){
      routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Route path="/status" component={Form} />
          <Route path="/logout" component={Logout} />
          <Route path="/settings" component={EditProfile} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/profiles/:id" exact component={Profile} />
          <Route path="/" exact component={Posts} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return ( 
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  }
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(App));
