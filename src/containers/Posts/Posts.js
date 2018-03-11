import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import Aux from '../../hoc/Aux/Aux';

class Posts extends Component {
  state = {
    posts: [],
    postForm: {
      post: ''
    }
  }

  componentDidMount() {
    console.log('[Posts] mounted');
    axios.get('http://localhost:5000/api')
      .then(response => {
        console.log(response.data);
        this.setState({
          posts: response.data          
        })
        console.log(this.state)
      })
  }

  inputChangedHandler = (event) => {
    // console.log(event.target.value)
    
    const updatedPostForm = {
      ...this.state.postForm
    }

    updatedPostForm.post = event.target.value;
    this.setState({
      postForm: updatedPostForm
    });
  }

  postForm = (event) => {
    event.preventDefault();
    const formData = this.state.postForm;

    axios.post('http://localhost:5000/api/', formData)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
    this.state.posts.push(formData)
    console.log(this.state.posts)
  }

  render() {
    
    return(
      <Aux>
        <div className="container">
          {this.state.posts.map((post, i) => (
            <Post key={post._id} singlePost={post} />
          ))}
        </div>
        <form className="container" onSubmit={this.postForm} >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Post</label>
            <textarea type="email" name="post" value={this.state.postForm.post} onChange={(event) => this.inputChangedHandler(event)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="What's on your mind..." />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </Aux>
    )
  }
}

export default Posts;