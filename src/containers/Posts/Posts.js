import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';

class Posts extends Component {
  state = {
    posts: []
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
  render() {
    
    return(
      <div>
        {this.state.posts.map(post => (
          <Post key={post._id} singlePost={post} />
        ))}
      </div>
    )
  }
}

export default Posts;