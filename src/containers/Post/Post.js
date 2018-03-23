import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  componentDidMount() {
    console.log("[DID MOUNT]")
    this.props.onFetchPostById(this.props.match.params.id);
    this.props.onFetchComments(this.props.match.params.id);
    this.props.onCheckAuth();
  }

  componentDidUpdate(){
    if(this.props.reload){
      this.props.onFetchComments(this.props.match.params.id);
    }    
  }

  componentWillUnmount() {
    this.props.onClearPost();
    this.props.closePostEdit()    
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({comment: {comment: {body: event.target.value}}})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = this.props.user ? this.props.user.token : null;
    this.props.onPostComment(this.props.match.params.id, this.state.comment, token)
    this.clear();
  }



  like = (slug) => {
    const token = this.props.user ? this.props.user.token : null
    this.props.onLike(slug, token)
    setTimeout(() => {
      this.props.onFetchPostById(this.props.match.params.id);
     }, 500)
  }

  unlike = (slug) => {
    const token = this.props.user ? this.props.user.token : null
    this.props.onUnLike(slug, token)
    setTimeout(() => {
      this.props.onFetchPostById(this.props.match.params.id);
     }, 500)
  }


  clear = () => {
    this.setState({comment: {comment: {body: ''}}})
  }

  onEdit = () => {
    this.props.onTriggerEditing()
  }

  onPostEditable = (form) => {
   const token = this.props.user ? this.props.user.token : null;
   const id = this.props.match.params.id
   this.props.postEdit(id, form, token);
   setTimeout(() => {
    this.props.onFetchPostById(id);
   }, 500)
  }

  onPostDeletable = () => {
    const token = this.props.user ? this.props.user.token : null;
    const id = this.props.match.params.id
    this.props.onDeletePost(id, token)
    this.props.history.push('/');
    setTimeout(() => {
      this.props.onloadPosts();
     }, 500)
  }

  onCommentDeletable = (id) => {
    // this.props.onCheckAuth()
    const slug = this.props.match.params.id
    const token = this.props.user ? this.props.user.token : null;
    this.props.commentDeletable(slug, id, token)
  }

  loginRedirect = () => {
    this.props.history.push('/login')
  }

  resetEditable = () => {
    this.props.closePostEdit()
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
          user={this.props.user}
          postForm={this.onPostEditable}
          onPostDeletable={this.onPostDeletable}
          onCommentDeletable={this.onCommentDeletable}
          login={this.loginRedirect}
          edit={this.onEdit}
          formEditable={this.props.formEditable}
          resetEditable={this.resetEditable}
          like={this.like}
          unlike={this.unlike} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post.singlePost,
    comments: state.post.comments,
    user: state.auth.user,
    reload: state.post.reload,
    loginRedirect: state.auth.loginRedirect,
    formEditable: state.form.formEditable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPostById: (slug) => dispatch(actions.fetchPostById(slug)),
    onloadPosts: (token) => dispatch(actions.fetchPosts(token)),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onFetchComments: (slug) => dispatch(actions.fetchComments(slug)),
    onPostComment: (slug, comment, token) => dispatch(actions.postComment(slug, comment, token)),
    onClearPost: () => dispatch(actions.clearPost()),
    commentDeletable: (slug, id, token) => dispatch(actions.deleteComment(slug, id, token)),
    onTriggerEditing: () => dispatch(actions.triggerPostEditing()),
    postEdit: (slug, data, token) => dispatch(actions.editPost(slug, data, token)),
    closePostEdit: () => dispatch(actions.closePostEdit()),
    onDeletePost: (slug, token) => dispatch(actions.deletePost(slug, token)),
    onLike: (slug, token) => dispatch(actions.favPost(slug, token)),
    onUnLike: (slug, token) => dispatch(actions.unfavPost(slug, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);