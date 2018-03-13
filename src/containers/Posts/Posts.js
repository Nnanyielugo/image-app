import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Posts/Posts';
import Aux from '../../hoc/Aux/Aux';

class Posts extends Component {
  state = {
    posts: [],
    postForm: {
      post: '',
      imgSrc: '',
      title: '',
      tagList: []      
    },
    tag: '',
    editing: false
  }

  componentDidMount() {
    console.log('[Posts] mounted');
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        console.log(response.data);
        this.setState({
          posts: response.data.posts          
        })
        console.log(this.state)
      })
  }

  inputChangedHandler = (event) => {
    // console.log(event.target.value)
    
    const updatedPostForm = {
      ...this.state.postForm
    }
    const field = event.target.name
    const form = updatedPostForm;
    form[field] = event.target.value;;
    return this.setState({postForm: form})
  }

  

  postForm = (event) => {
    event.preventDefault();
    const formData = this.state.postForm;

    axios.post('http://localhost:5000/api/posts', formData)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
    // this.state.posts.push(formData)
    console.log(this.state.posts)
    this.onAddition(formData);
  }

  onAddition = (newPost) => {
    console.log('[New Post]', newPost);
    const posts = [...this.state.posts]
    posts.unshift({
      _id: Date.now,
      post: newPost.post,
      title: newPost.title,
      // imgSrc: newPost.imgSrc
    })

    this.setState({
      posts: posts,
      postForm: { },
      editing: false
    })
  }

  setEditing = () => {
    this.setState({
      editing: true
    });
  }

  render() {
  let form = <button onClick={this.setEditing} >Make Post</button>;
    if(this.state.editing) {
      form = (
        <form className="container" onSubmit={this.postForm} >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input type="text" name="title" value={this.state.postForm.title} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="Title of your post" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Post</label>
            <textarea type="text" name="post" value={this.state.postForm.post} onChange={(event) => this.inputChangedHandler(event)} className="form-control"  placeholder="What's on your mind..." />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      )
    }

    return(
      <Aux>
        <div className="container">
          {this.state.posts.map((post, i) => (
            <Post key={post._id} singlePost={post} />
          ))}
        </div>
        {form}
      </Aux>
    )
  }
}

export default Posts;