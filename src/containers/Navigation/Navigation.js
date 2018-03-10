import React, { Component } from 'react';

import Nav from '../../components/Navigation/Navigation';

class Navigation extends Component {
  render() {
    return(
      <nav className="navbar navbar-inverse ">
        <Nav />
      </nav>
    )
  }
}

export default Navigation;