import React from 'react';
import { Link } from 'react-router-dom';

const navigation = props => {
  return(
    <div className="container">
      <div className="navbar-header topnav">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/">Imagify</Link>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="form-button" ><Link to="/status">Make Post</Link></li>
          <li className="form-button"><Link to="/login">Login</Link></li>
          <li className="form-button"><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default navigation;