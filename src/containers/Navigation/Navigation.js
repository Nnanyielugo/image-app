import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Navigation/Navigation';
import * as actions from '../../store/actions/index';

class Navigation extends Component {
  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <Nav clicked={this.props.onSetEditing} />
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetEditing: () => dispatch(actions.triggerEditing())
  }
}

export default connect(null, mapDispatchToProps)(Navigation);