import React from 'react';

import './Profile.css';

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

  if(props.user){
    isOwnProfile = props.user && props.user.username === props.profile.username;
    if(!isOwnProfile){
      if(props.profile.following === false){
        following = <div className="follow" onClick={(username) => props.follow(props.profile.username)}><span className="glyphicon glyphicon-plus follow-icon"></span>&nbsp;Follow <b>{username}</b></div>
      } else {
        following = <div><div className="following">You are following&nbsp;<b>{username}</b></div> <div className="unfollow" onClick={(username) => props.unfollow(props.profile.username)}><span className="glyphicon glyphicon-remove unfollow-icon"></span>&nbsp;Unfollow <b>{username}</b></div></div>
      }
    }
  }
  
  
  return(
    <div className="main-post container">
      <div className="page-container">
        <div className="row profile-container">
          <div className="col-sm-12 col-md-8 col-lg-8 image-container">
            <a target="_blank" href={imageSrc}>
              <img src={imageSrc} alt={props.profile.username} />
            </a>
          </div>
          <div className="col-sm-12 col-md-1 col-lg-1">
            
          </div>
          <div className="col-sm-12 col-md-3 col-lg-4">
            <h1>{username}</h1>
            <div>{isOwnProfile ? <div>You have {props.profile.followerCount} {followerAttachment}</div> : <div><b>{username}</b> has {props.profile.followerCount} {followerAttachment}</div>}</div>
            {following}
          </div>
        </div>
        
      </div>

     
    </div>
  )
}

export default profile;