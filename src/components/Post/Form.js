import React, { Component } from 'react';

import * as actions from '../../store/actions/index';

class EditForm extends Component {
  state = {
    postForm: {
      post: this.props.post,
      imgSrc: this.props.image,
      newImage: null
    },
    isFormValid: false,
    tag: '',
    imagePreviewUrl: '',
  }

  inputChangedHandler = (event) => {
    // console.log(event.target.value)
    
    const updatedPostForm = {
      ...this.state.postForm
    }

    console.log(this.state.postForm)
    
    const form = updatedPostForm;
    form.post = event.target.value;
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
          newImage: file
        }
        
      })
      // this.state.
      // console.log("[ImgSrc]: ", this.state.postForm.imgSrc)
      // console.log(["file]: ", file])
    }
    reader.readAsDataURL(file)
  }

  postForm = (event) => {
    event.preventDefault();

    let data = new FormData()
    if(this.state.postForm.post === undefined) {
      this.state.postForm.post = this.props.post
    }
    data.append('post', this.state.postForm.post)

    if(this.state.postForm.newImage !== null){
      data.append('imgSrc', this.state.postForm.newImage)
    }
    

  //   for (var value of data.values()) {
  //     console.log("[Data]: ", value); 
  //  }

    // const token = this.props.user ? this.props.user.token : null;
    this.props.sendPostHandler(data);
    // console.log(data, token)
    this.props.resetEditable()  
  }

  
  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = (<img src={this.state.postForm.imgSrc} className='dropPreview'/>)
    
    if(imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }
    return(
      <form className="container form" >
        <div className="dropZone main-post" id="upload-file-container">{imagePreview}
          <input type="file" name="imgSrc"  onChange={this.handleImageChange} className="form-control"  placeholder="Title of your post" />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={this.props.title}  className="form-control"  placeholder="Title of your post" />
        </div>
        <div className="form-group">
          <label htmlFor="post">Post</label>
          <textarea type="text" rows="5" name="post" value={this.state.postForm.post} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="What's on your mind..." />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.postForm}>Submit</button>
        <button type="cancel" className="btn btn-warning" id="btn" onClick={this.props.resetEditable} >Cancel</button>
        <hr />
      </form>
    )
  }
}

export default EditForm;