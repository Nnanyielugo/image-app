import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from '../../components/Navigation/Navigation';
import * as actions from '../../store/actions/index';

class Navigation extends Component {
   
  componentDidMount() {
    this.props.onSetCurrentUser();
    this.props.onCheckAuth()

  }
  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <Nav 
        clicked={this.props.onSetEditing}
        loggedIn={this.props.loggedIn}
        user={this.props.user} />
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onSetCurrentUser: () => dispatch(actions.setCurrentUser()),
    onSetEditing: () => dispatch(actions.triggerEditing())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);