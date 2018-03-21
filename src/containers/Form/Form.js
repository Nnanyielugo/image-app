import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
// import Dialog from 'material-ui/Dialog';
import { Modal } from 'react-bootstrap'

import * as actions from '../../store/actions/index';
// import Modal from '../../components/UI/Modal/Modal';

let timer = '';
class Form extends Component {
  state = {
    postForm: {
      post: '',
      imgSrc: '',
      title: '',
      tagList: []      
    },
    tag: '',
    imagePreviewUrl: '',
    statusMsg: (<p>Click here to upload...</p>),
  }

  componentWillMount() {
    this.props.onSetEditing()
  }

  inputChangedHandler = (event) => {
    // console.log(event.target.value)
    
    const updatedPostForm = {
      ...this.state.postForm
    }

    // console.log(this.state.postForm)
    const field = event.target.name
    const form = updatedPostForm;
    form[field] = event.target.value;
    return this.setState({postForm: form})
  }

  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader()
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
        postForm: {
          imgSrc: file
        }
        
      })
      // this.state.
      console.log("[ImgSrc]: ", this.state.postForm.imgSrc)
      console.log(["file]: ", file])
    }
    reader.readAsDataURL(file)
  }

  postForm = (event) => {
    event.preventDefault();

    let data = new FormData()
    data.append('imgSrc', this.state.postForm.imgSrc)
    data.append('title', this.state.postForm.title)
    data.append('post', this.state.postForm.post)
    this.props.onResetEditing();
    this.props.sendPostHandler(data);
    this.clearForm();
    this.props.history.goBack();
  }

  resetEditing = (e) => {
    e.preventDefault();
    this.props.onResetEditing();
    this.props.history.goBack();
  }

  postsHandler = () => {
    this.props.loadPostsHandler()
  }

  clearForm = () => {
    // const prevState = {...this.state}
    // const prevStateForm = _.cloneDeep(...this.state.postForm);
    timer = _.delay(this.postsHandler, 1000)
    this.setState({
      imagePreviewUrl: '',
      statusMsg: (<p>Click here to upload...</p>),
      postForm: {}
    })
  }



  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = this.state.statusMsg
    
    if(imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }
    return(
      <Modal show={this.props.isEditing} onHide={this.props.onResetEditing} aria-labelledby="contained-modal-title-sm" className="custom-modal" >
       
          <form className="container form" >
            <div className="dropZone main-post" id="upload-file-container">{imagePreview}
              <input type="file" name="imgSrc"  onChange={this.handleImageChange} className="form-control"  placeholder="Title of your post" />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" value={this.state.postForm.title} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="Title of your post" />
            </div>
            <div className="form-group">
              <label htmlFor="post">Post</label>
              <textarea type="text" rows="5" name="post" value={this.state.postForm.post} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="What's on your mind..." />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.postForm}>Submit</button>
            <button type="cancel" className="btn btn-warning" id="btn" onClick={(e) => this.resetEditing(e)} >Cancel</button>
          </form>
       
      </Modal>
    )
  }
}


const mapStateToProps = state => {
  return {
    isEditing: state.form.isEditing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendPostHandler: (data) => dispatch(actions.sendPosts(data)),
    loadPostsHandler: () => dispatch(actions.fetchPosts()),
    onSetEditing: () => dispatch(actions.triggerEditing()),
    onResetEditing: () => dispatch(actions.triggerResetEditing()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);