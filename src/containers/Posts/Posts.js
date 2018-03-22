import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Posts/Posts';
import Aux from '../../hoc/Aux/Aux';
import Form from '../Form/Form';
import * as actions from '../../store/actions/index'


class Posts extends Component {

  componentDidMount() {
    console.log('[Posts] mounted');
    const token = this.props.user ? this.props.user.token : null
    this.props.onloadPosts(token);
    this.props.onCheckAuth();
  }

  render() {
    let posts = <h3>There are no posts here...yet</h3>
    if(this.props.fullPosts){
      posts = this.props.fullPosts.map(post  => (
        <Post key={post.slug} singlePost={post} />))
    }
    return(
      <div>
        <div className="container main-post">
          {posts}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fullPosts: state.post.posts,
    isEditing: state.form.isEditing,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onloadPosts: (token) => dispatch(actions.fetchPosts(token)),
    onCheckAuth: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);