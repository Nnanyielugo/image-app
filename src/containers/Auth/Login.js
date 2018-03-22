import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import * as actions from '../../store/actions/index';

class Login extends Component {
  state = {
    user: {
      email: '', 
      password: ''
    },
    isFormValid: false
  }

  getEmailValidationState = () => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const length = this.state.user.email.length;
    if(pattern.test(this.state.user.email)) {
      return 'success';
    } 
    else if(!pattern.test(this.state.user.email) && length > 0) return 'error';
    return null;
  }

  getPasswordValidationState = () => {
    const length = this.state.user.password.length;
    if (length >= 6) {
      return 'success';
    }
    // else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange = e => {
    const updatedPostForm = {...this.state.user};
    const field = e.target.name
    const form = updatedPostForm;
    form[field] = e.target.value;

    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let formValid = false;
    if(pattern.test(form.email) && form.password.length >= 6 ){
      formValid = true
    }
    // formUser.email = e.target.value;
    this.setState({user: form, isFormValid: formValid})
    console.log(this.state)
  }

  onLoginHandler = event => {
    const user = {}
    user.user = this.state.user
    event.preventDefault()
    this.props.onLogin(user);
    this.props.onCheckAuthState();
  }

  render() {
    const history = createHistory()
    const loggedInRedirect = this.props.loggedIn ? history.goBack() : null;
    const error = this.props.error ? <div className="error">{this.props.error}</div> : null;
    return (
      
      <form >
        {loggedInRedirect}
        <div className="center-div"><h3>LOGIN FORM</h3></div>
        {error}
        <FormGroup
          controlId="formBasicText"
          validationState={this.getEmailValidationState()}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.user.email}
            placeholder="Enter email"
            onChange={this.handleChange}
            name="email"
          />
         
          
        </FormGroup>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getPasswordValidationState()}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.user.password}
            placeholder="Enter password"
            onChange={this.handleChange}
            name="password"
          />
          
        </FormGroup>
        <Button
          bsStyle="primary"
          disabled={!this.state.isFormValid}
          onClick={this.onLoginHandler}
        >
          Login
        </Button>
      </form>
      
      
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.error.loginError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (form) => dispatch(actions.login(form)),
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);