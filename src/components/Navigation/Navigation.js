import React from 'react';
import { Link } from 'react-router-dom';

import profile from '../../assets/profile-placeholder-03.jpeg'
import './Navigation.css'

const navigation = props => {
  let imageLink = profile ;
  let username = ''
  if(props.user) {
    imageLink = `http://localhost:5000/${props.user.imageSrc}`
  }

  if(props.user){
    if(props.user.username) {
      username = props.user.username.charAt(0).toUpperCase() + props.user.username.slice(1)
    }
  }
  
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
          {props.loggedIn ? <li className="form-button" ><Link to="/status">Make Post</Link></li> : ''}
          {props.loggedIn ? <li className="form-button" ><Link to="/hgjd"> <img className="avatar-nav" src={imageLink} /> <span id="avatar-nav">{username}</span></Link></li>: ''}
          {!props.loggedIn ? <li className="form-button"><Link to="/login">Login</Link></li> :
          <li className="form-button"><Link to="/logout">Logout</Link></li>}
        </ul>
      </div>
    </div>
  )
}

export default navigation;