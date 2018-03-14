import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

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
        imgSrc: file
      })
      // this.state.
    }
    reader.readAsDataURL(file)
  }

  postForm = (event) => {
    event.preventDefault();

    let data = new FormData()
    data.append('imgSrc', this.state.postForm.imgSrc)
    data.append('title', this.state.postForm.title)
    data.append('post', this.state.postForm.post)

    axios.post('http://localhost:5000/api/posts', data)
      .then(response => {
        console.log("Response from api: ", response)
      })
      .catch(error => {
        console.log(error)
      });
    timer = _.delay(this.loadPosts, 1000)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = this.state.statusMsg
    
    if(imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} className='dropPreview'/>);
    }
    return(
      <form className="container form" onSubmit={this.postForm} >
        <div className="dropZone main-post" id="upload-file-container">{imagePreview}
          <input type="file" name="imgSrc"  onChange={this.handleImageChange} className="form-control"  placeholder="Title of your post" />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={this.state.postForm.title} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="Title of your post" />
        </div>
        <div className="form-group">
          <label htmlFor="post">Post</label>
          <textarea type="text" style={{height:"200px"}} name="post" value={this.state.postForm.post} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="What's on your mind..." />
        </div>
        <button type="submit" className="btn btn-primary" id="btn">Submit</button>
        <button type="cancel" className="btn btn-warning" id="btn">Cancel</button>
      </form>
    )
  }
}

export default Form;