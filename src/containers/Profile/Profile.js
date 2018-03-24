import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import ProfileContent from '../../components/Profile/Profile';

class Profile extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.onLoadProfileById(id);
    this.props.onCheckAuth();
    this.props.onLoadPostsByUser(id)
    // setTimeout(() => {
    //   this.props.onLoadPostsByUser(this.props.profile.username)
    //  }, 500)
    // const profileUsername = this.props.profile.username
    // this.props.onLoadPostsByUser(profileUsername)
    // console.log("[p]", profileUsername)
    // console.log("[USER]: ", this.props.profile)
  }

  componentWillUnmount() {
    this.props.onClearProfileState()
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
        loginRedirect={this.loginRedirect} />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profiles.profile,
    profilePosts: state.profiles.posts,
    profilePostsCount: state.profiles.postsCount,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfileById: (id) => dispatch(actions.loadProfileById(id)),
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