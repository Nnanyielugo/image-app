import React, { Component } from 'react';
import { connect } from 'react-redux';

import SinglePost from '../../components/Post/Post';
import * as actions from '../../store/actions/index';

class Post extends Component {

  componentWillMount() {
    this.props.onFetchPostById(this.props.match.params.id);
    this.props.onCheckAuth();
    this.props.onFetchComments(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container main-post">
        <SinglePost singlePost={this.props.post} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post.singlePost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPostById: (slug) => dispatch(actions.fetchPostById(slug)),
    onCheckAuth: () => dispatch(actions.checkAuthState()),
    onFetchComments: (slug) => dispatch(actions.fetchComments(slug))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);