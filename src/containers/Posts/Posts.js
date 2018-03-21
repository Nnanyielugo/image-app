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
    this.props.onClearPost()
  }

  render() {
    return(
      <div>
        <div className="container main-post">
          {this.props.fullPosts.map(post  => (
          <Post key={post.slug} singlePost={post} />))}
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
    onloadPosts: () => dispatch(actions.fetchPosts()),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onClearPost: () => dispatch(actions.clearPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);