import React, { Component } from 'react';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory'

import * as actions from '../../store/actions/authActions';


class Logout extends Component {
  componentDidMount(){
    this.props.onLogout()
    const history = createHistory()
    history.goBack()
  }
  render(){
    return <div />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)