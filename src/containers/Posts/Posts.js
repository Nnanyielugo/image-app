import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from '../../components/Posts/Posts';
import Aux from '../../hoc/Aux/Aux';
import Form from '../Form/Form';
import * as actions from '../../store/actions/index'


class Posts extends Component {

  componentDidMount() {
    console.log('[Posts] mounted');
    this.props.onloadPosts()
  }

  render() {
    return(
      <div>
        <div className="container main-post">
          {this.props.fullPosts.map(post  => (
          <Post key={post._id} singlePost={post} />))}
        </div>
        <Form />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fullPosts: state.post.posts,
    isEditing: state.form.isEditing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onloadPosts: () => dispatch(actions.fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);