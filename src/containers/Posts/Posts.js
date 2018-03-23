import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Posts/Posts';
import Aux from '../../hoc/Aux/Aux';
import Form from '../Form/Form';
import * as actions from '../../store/actions/index'


class Posts extends Component {

  componentDidMount() {
    console.log('[Posts] mounted');
    this.props.onloadPosts();
    this.props.onCheckAuth();
    this.props.onFetchCurrentUser()
  }

  like = (slug) => {
    console.log("[LIKED POST", slug)
    const token = this.props.user ? this.props.user.token : null
    this.props.onLike(slug, token)
    setTimeout(() => {
      this.props.onloadPosts();
     }, 500)
  }

  unlike = (slug) => {
    console.log("[UNLIKED POST]", slug)
    const token = this.props.user ? this.props.user.token : null
    this.props.onUnLike(slug, token)
    setTimeout(() => {
      this.props.onloadPosts();
     }, 500)
  }

  loginRedirect = () => {
    this.props.history.push('/login')
  }


  render() {
    let posts = <h3>There are no posts here...yet</h3>
    if(this.props.fullPosts){
      posts = this.props.fullPosts.map(post  => (
        <Post 
            key={post.slug} 
            singlePost={post}
            like={this.like}
            unlike={this.unlike}
            user={this.props.user}
            loginRedirect={this.loginRedirect} />))
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
    onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    onloadPosts: () => dispatch(actions.fetchPosts()),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onLike: (slug, token) => dispatch(actions.favPost(slug, token)),
    onUnLike: (slug, token) => dispatch(actions.unfavPost(slug, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);