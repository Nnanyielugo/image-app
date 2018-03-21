import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import SinglePost from '../../components/Post/Post';
import * as actions from '../../store/actions/index';

class Post extends Component {
  state = {
    comment: {
      comment: {
        body: ''
      }
    }
  }
  componentWillMount() {
    this.props.onFetchPostById(this.props.match.params.id);
    this.props.onCheckAuth();
    this.props.onFetchComments(this.props.match.params.id);
  }

  // componentWillUpdate()

  componentDidUpdate(){
    if(this.props.reload){
      this.props.onFetchComments(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.onClearPost()
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({comment: {comment: {body: event.target.value}}})
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("[comment on enter", this.state.comment);
    this.props.onPostComment(this.props.match.params.id, this.state.comment)
    this.clear();
  }

  clear = () => {
    this.setState({comment: {comment: {body: ''}}})
  }



  render() {
    return (
      <div className="container main-post">
        <SinglePost 
          singlePost={this.props.post}
          localComment={this.state.comment.comment.body}
          changed={this.handleChange}
          submit={this.handleSubmit}
          comments={this.props.comments}
          user={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post.singlePost,
    comments: state.post.comments,
    user: state.auth.user,
    reload: state.post.reload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPostById: (slug) => dispatch(actions.fetchPostById(slug)),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onFetchComments: (slug) => dispatch(actions.fetchComments(slug)),
    onPostComment: (slug, comment) => dispatch(actions.postComment(slug, comment)),
    onClearPost: () => dispatch(actions.clearPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);