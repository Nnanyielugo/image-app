import React from 'react';

import './Profile.css';
import Post from '../Posts/Posts';

const profile = props => {
  const username = props.profile.username ? props.profile.username.charAt(0).toUpperCase() + props.profile.username.slice(1) : '';
  const imageSrc = props.profile.imageSrc ? `http://localhost:5000/${props.profile.imageSrc}` : null
  let isOwnProfile = null;
  let following = ''
  let followerAttachment = 'followers';
  if(props.profile){
    if(props.profile.followerCount === 1){
      followerAttachment = 'follower'
    }
  }

  let postAttachment = 'posts';
  if(props.profile){
    if(props.profilePostsCount === 1){
      postAttachment = 'post'
    }
  }

  if(props.user){
    isOwnProfile = props.user && props.user.username === props.profile.username;
    if(!isOwnProfile){
      if(props.profile.following === false){
        following = <div><span className="follow" onClick={(username) => props.follow(props.profile.username)}><span className="glyphicon glyphicon-plus follow-icon"></span>&nbsp;Follow </span> &nbsp;<b>{username}</b></div>
      } else {
        following = <div><div className="following">You are following&nbsp;<b>{username}</b></div> <span className="unfollow" onClick={(username) => props.unfollow(props.profile.username)}><span className="glyphicon glyphicon-remove unfollow-icon"></span>&nbsp;Unfollow </span>&nbsp;<b>{username}</b></div>
      }
    }
  }

  let posts = <h3>{isOwnProfile ? <small>You do not have any posts...yet</small> : <small>{username} &nbsp; does not have any posts...yet</small>}</h3>
    if(props.profilePosts){
      posts = props.profilePosts.map(post  => (
        <Post 
            key={post.slug} 
            singlePost={post}
            like={props.like}
            unlike={props.unlike}
            user={props.user}
            loginRedirect={props.loginRedirect} />))
      }
  
  
  return(
    <div className="container top-spacing-profile">
      <div className="page-container">
        <div className="row profile-container">
          <div className="col-sm-12 col-md-7 col-lg-7 image-container">
            <a target="_blank" href={imageSrc}>
              <img src={imageSrc} alt={props.profile.username} />
            </a>
          </div>
            
          <div className="col-sm-12 col-md-5 col-lg-5 details-container">
            <h1>{username}</h1>
            {props.profile.bio ? <div><b>Bio: &nbsp;</b>{props.profile.bio}</div> : ''}
            <div className="following">{isOwnProfile ? <div className="following">You have {props.profile.followerCount} {followerAttachment}</div> : <div><b>{username}</b> has {props.profile.followerCount} {followerAttachment}</div>}</div>
            {following}
            <div className="edit-trigger-container" onClick={props.triggerProfileEditing}>{isOwnProfile ? <span><span className="glyphicon glyphicon-cog edit-trigger"></span>Edit Profile</span> : ''}</div>
            {props.isEditing ? 'Reset editing clicked' : ''}
            {props.isEditing ? <button onClick={props.resetProfileEditing}>Cancel</button> : ''}            
          </div>
        </div>  
        {isOwnProfile ? <h3 style={{textAlign: 'center'}} >You have made {props.profilePostsCount} {postAttachment}:</h3> : <h3 style={{textAlign: 'center'}}><b>{username} &nbsp;</b>has made {props.profilePostsCount} {postAttachment}:</h3>}
      </div>
      <div className="center-div">{posts}</div>

     
    </div>
  )
}

export default profile;