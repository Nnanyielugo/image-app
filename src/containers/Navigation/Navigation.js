import React, { Component } from 'react';

import Nav from '../../components/Navigation/Navigation';

class Navigation extends Component {
  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <Nav />
      </nav>
    )
  }
}

export default Navigation;