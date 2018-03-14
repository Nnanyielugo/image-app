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
  let form = <button onClick={this.props.onSetEditing} >Make Post</button>;
  if(this.props.isEditing) {
      form = (
        <Form />
      )
    }

    return(
      <div>
        <div className="container main-post">
        {this.props.fullPosts.map(post  => (
        <Post key={post._id} singlePost={post} />))}
        </div>
        {form}
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
    onloadPosts: () => dispatch(actions.fetchPosts()),
    onSetEditing: () => dispatch(actions.triggerEditing())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);