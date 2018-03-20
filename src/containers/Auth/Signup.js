import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

class Signup extends Component {
  state = {
    user: {
      imageSrc: '',
      email: '', 
      password: '', 
      username: ''
    },
    isFormValid: false,
    imagePreviewUrl: null,
    statusMsg: (<p style={{marginTop: 'auto', marginBottom: 'auto'}}>Click here to upload...</p>)
  }

  getEmailValidationState = () => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let length = null;
    if (this.state.user.email) {
      length = this.state.user.email.length;
    }
    if(pattern.test(this.state.user.email)) {
      return 'success';
    } 
    else if(!pattern.test(this.state.user.email) && length > 0) return 'error';
    return null;
  }

  getPasswordValidationState = () => {
    let length = null;
    if (this.state.user.password) {
      length = this.state.user.password.length;
    }
    if (length >= 6) {
      return 'success';
    }
    // else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  getUsernameValidationState = () => {
    let length = null;
    if (this.state.user.username) {
      length = this.state.user.username.length;
    }
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
    let usernameLength = null;
    let passwordLength = null;
    if(form.username){
      usernameLength = form.username.length;
    }
    if(form.password){
      passwordLength = form.password.length
    }
    if(pattern.test(form.email) && passwordLength >= 6 && usernameLength >= 6){
      formValid = true
    }
    // formUser.email = e.target.value;
    this.setState({user: form, isFormValid: formValid})
    console.log(this.state)
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader()
    let file = e.target.files[0];

    reader.onloadend = () => {
      const newState = {...this.state}
      // newState.imagePreviewUrl = reader.result;
      const newPost = {...newState.user}
      //newPost.imageSrc = file
      this.setState({
        imagePreviewUrl: reader.result,
        user: {
          imageSrc: file
        }
        
      })
      // this.state.
      console.log("[ImgSrc]: ", this.state.user.imageSrc)
      console.log(["file]: ", file])
    }
    reader.readAsDataURL(file)
  }

  postForm = (event) => {
    event.preventDefault();

    let data = new FormData()
    data.append('imageSrc', this.state.user.imageSrc)
    data.append('email', this.state.user.email)
    data.append('password', this.state.user.password)
    data.append('username', this.state.user.username)

    for (var value of data.values()) {
      console.log(value); 
   }
    // this.props.onResetEditing()
    this.props.onRegister(data);
    // this.clearForm()
    
  }

  render() {
    const loggedInRedirect = this.props.loggedIn ? <Redirect to="/" /> : null;
    let {imagePreviewUrl} = this.state;
    let imagePreview = this.state.statusMsg
    
    if(imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }

    return (
      <form>
        {loggedInRedirect}
        <div className="center-div"><h3>SIGNUP FORM</h3></div>

        <div className="dropZone register-img" id="upload-file-container">{imagePreview}
          <input type="file" name="imgSrc"  onChange={this.handleImageChange} className="form-control"  placeholder="Title of your post" />
        </div>

        <FormGroup
          controlId="formBasicText"
          validationState={this.getUsernameValidationState()}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.user.username}
            placeholder="Enter username"
            onChange={this.handleChange}
            name="username"
          />        
        </FormGroup>

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
          onClick={this.postForm}          
        >
          Signup
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (form) => dispatch(actions.register(form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);