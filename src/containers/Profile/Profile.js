import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import ProfileContent from '../../components/Profile/Profile';

class Profile extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.onLoadProfileById(id);
    this.props.onCheckAuth();
    console.log("[LOADED PROFILE OF ", id)
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

  render() {
    return (
      <ProfileContent 
        profile={this.props.profile}
        user={this.props.user}
        follow={this.follow}
        unfollow={this.unfollow} />
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profiles.profile,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadProfileById: (id) => dispatch(actions.loadProfileById(id)),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onClearProfileState: () => dispatch(actions.clearProfileState()),
    onFollow: (username) => dispatch(actions.follow(username)),
    onUnFollow: (username) => dispatch(actions.unfollow(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);