import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import { Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


import * as actions from '../../store/actions/index';

class EditProfile extends Component {
  state = {
    user: {
      email: this.props.user.email, 
      password: '', 
      username: this.props.user.username.charAt(0).toUpperCase() + this.props.user.username.slice(1),
      bio: this.props.user.bio ? this.props.user.bio : ''
    },
    image: '',
    imagePreviewUrl: null,
    statusMsg: (<p style={{marginTop: 'auto', marginBottom: 'auto'}}>Click here to upload...</p>)
  }

  componentWillMount() {
    const history = createHistory()
    // this.props.loggedIn ? history.push('/') : null;
  }

  componentDidMount(){
    this.props.onCheckAuth()
  }


  handleChange = e => {
    const updatedPostForm = {...this.state.user};
    const field = e.target.name
    const form = updatedPostForm;
    form[field] = e.target.value;
    
    // formUser.email = e.target.value;
    this.setState({user: form})
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
        image: file
        
      })
      // this.state.
      console.log("[ImgSrc]: ", this.state.image)
      console.log(["file]: ", file])
    }
    reader.readAsDataURL(file)
  }

  postForm = (event) => {
    event.preventDefault();

    let data = new FormData()
    data.append('imageSrc', this.state.image)
    data.append('email', this.state.user.email)
    data.append('bio', this.state.user.bio)
    data.append('password', this.state.user.password)
    data.append('username', this.state.user.username)

    for (var value of data.values()) {
      console.log(value); 
   }
    this.props.onUpdateCurrentUser(data)
    const history = createHistory()
    history.goBack()
  }

  cancel = () => {
    const history = createHistory()
    history.goBack()
  }

  render() {
    const imageSrc = this.props.user.imageSrc ? `http://localhost:5000/${this.props.user.imageSrc}` : null
    const history = createHistory()
    // const loggedInRedirect = this.props.loggedIn ? history.goBack() : null;
    let {imagePreviewUrl} = this.state;
    let imagePreview = (<img src={imageSrc} className='dropPreview'/>);
    
    if(imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }

    return (
      <form>
        {/* {loggedInRedirect} */}
        <div className="center-div top-spacing"><h3>EDIT YOUR PROFILE</h3></div>
    
        <div className="dropZone register-img" id="upload-file-container">{imagePreview}
          <input type="file" name="imgSrc"  onChange={this.handleImageChange} className="form-control"  placeholder="Title of your post" />
        </div>
      
        <div className="container" style={{width: '600px'}}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.user.username}
            placeholder="Enter username"
            onChange={this.handleChange}
            name="username"
          />        
        </FormGroup>

        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.user.email}
            placeholder="Enter email"
            onChange={this.handleChange}
            name="email"
          />        
        </FormGroup>

        <div className="form-group">
          <label htmlFor="post">Post</label>
          <textarea 
            type="text" 
            rows="5" name="post" 
            value={this.state.user.bio} 
            onChange={this.handleChange} 
            className="form-control" 
            name="bio" 
            placeholder="Tell us about your awesome self..." />
        </div>

        <FormGroup >
          <ControlLabel>Change Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.user.password}
            placeholder="******"
            onChange={this.handleChange}
            name="password"
          />          
        </FormGroup>

        <Button
          bsStyle="primary"
          onClick={this.postForm}          
        >
          Save
        </Button>

        <Button
          bsStyle="warning"
          onClick={this.cancel}
          style={{marginLeft: '10px'}}          
        >
          Cancel
        </Button>
        </div>
      </form>
    );
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
    onUpdateCurrentUser: (data) => dispatch(actions.updateCurrentUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);