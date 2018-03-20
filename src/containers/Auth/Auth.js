import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';

class Auth extends Component {
  state = {
    isLogin: true
  }

  switchAuthMode = (event) => {
    event.preventDefault()
    this.setState({isLogin: !this.state.isLogin})
  }
  render() {
    let authForm = this.state.isLogin ? <Login /> : <Signup />
    return (
      <div className="container top-spacing Auth">
        {authForm}
        <hr />
        <a onClick={this.switchAuthMode} href="" style={{marginLeft: "80%"}}>Or {this.state.isLogin ? 'Signup' : 'Login'}</a>
      </div>
    )
    
  }
}

export default Auth;


