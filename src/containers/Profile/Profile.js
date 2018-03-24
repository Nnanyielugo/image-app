import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import ProfileContent from '../../components/Profile/Profile';

class Profile extends Component {
  componentDidMount() {
    this.props.onSetCurrentUser()
    const id = this.props.match.params.id;
    this.props.onLoadProfileById(id);
    this.props.onCheckAuth();
    this.props.onLoadPostsByUser(id)
  }

  componentWillUnmount() {
    this.props.onClearProfileState()
  }

  componentWillUpdate(nextProps) {
    const id = this.props.match.params.id;
    if(this.props.match.params.id !== nextProps.match.params.id
      ) {
      console.log("[NEXT_URL_PARAMS]", nextProps.match.params.id)
      this.props.onLoadProfileById(nextProps.match.params.id);
      // this.props.onCheckAuth();
      this.props.onLoadPostsByUser(nextProps.match.params.id)
      // this.props.onLoadProfileById(nextProps.match.params.id);
    }

  }

  componentDidUpdate(nextProps) {
    if(nextProps.profile.imageSrc  !== this.props.profile.imageSrc 
      || this.props.profile.username !== nextProps.profile.username
      || this.props.profile.bio !== nextProps.profile.bio ){
      console.log('next props')
      setTimeout(() => {
        this.props.onLoadProfileById(this.props.match.params.id);
       }, 300)
      
      
      

    }
  }

  follow = (username) => {
    this.props.onFollow(username);
  }

  unfollow = (username) => {
    this.props.onUnFollow(username);
  }

  like = (slug) => {
    console.log("[LIKED POST", slug)
    const token = this.props.user ? this.props.user.token : null
    this.props.onLike(slug, token)
    setTimeout(() => {
      this.props.onLoadPostsByUser(this.props.match.params.id);
     }, 500)
  }

  unlike = (slug) => {
    console.log("[UNLIKED POST]", slug)
    const token = this.props.user ? this.props.user.token : null
    this.props.onUnLike(slug, token)
    setTimeout(() => {
      this.props.onLoadPostsByUser(this.props.match.params.id);
     }, 500)
  }

  loginRedirect = () => {
    this.props.history.push('/login')
  }

  triggerProfileEditing = () => {
    this.props.history.push('/settings')
  }

  render() {
    return (
      <ProfileContent 
        profile={this.props.profile}
        user={this.props.user}
        follow={this.follow}
        unfollow={this.unfollow}
        profilePosts={this.props.profilePosts}
        profilePostsCount={this.props.profilePostsCount}
        like={this.like}
        unlike={this.unlike}
        loginRedirect={this.loginRedirect}
        triggerProfileEditing={this.triggerProfileEditing}
        isEditing={this.props.isEditing} />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profiles.profile,
    profilePosts: state.profiles.posts,
    profilePostsCount: state.profiles.postsCount,
    isEditing: state.profiles.isEditing,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfileById: (id) => dispatch(actions.loadProfileById(id)),
    onSetCurrentUser: () => dispatch(actions.setCurrentUser()),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onClearProfileState: () => dispatch(actions.clearProfileState()),
    onFollow: (username) => dispatch(actions.follow(username)),
    onUnFollow: (username) => dispatch(actions.unfollow(username)),
    onLoadPostsByUser: (username) => dispatch(actions.fetchPostsOfUsername(username)),
    onLike: (slug, token) => dispatch(actions.favPost(slug, token)),
    onUnLike: (slug, token) => dispatch(actions.unfavPost(slug, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);