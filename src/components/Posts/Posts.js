import React from 'react';
import { Link } from 'react-router-dom';

import './Posts.css';

const posts = props => {
  let imgSrc = null;
  let tag = null;
  const authorImage = props.singlePost.author.imageSrc ? <img className="avatar" src={`http://localhost:5000/${props.singlePost.author.imageSrc}`} /> : null

  if (props.singlePost.imgSrc) {
    imgSrc = (
    <a target="_blank" href={imgSrc}>
      <img className="img" src={`http://localhost:5000/${props.singlePost.imgSrc}`} alt={props.singlePost.author.username} />
    </a>)
  }
  if(props.singlePost.tags) {
    tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    })
  }

let post = '';
if (props.singlePost.post !== 'undefined'){
  post = props.singlePost.post
}

let favTag = <span onClick={props.loginRedirect} className="no-user glyphicon glyphicon-heart-empty"><span>{props.singlePost.favoritesCount}<span className="tooltip"><small>Login to fav</small></span></span></span>
if(props.user){
  favTag = !props.singlePost.favorited ? <span onClick={(slug)=>props.like(props.singlePost.slug)} className="no-like glyphicon glyphicon-heart-empty"><span>{props.singlePost.favoritesCount}</span></span> :
  <span onClick={(slug)=>props.unlike(props.singlePost.slug)} className="like glyphicon glyphicon-heart"><span>{props.singlePost.favoritesCount}</span></span>
}
  

  return(
    <article className="Posts">
      <Link style={{ textDecoration: 'none', color: 'black'}} to={`/profiles/${props.singlePost.author.username}`}>
        {authorImage}
        <span className="username">{props.singlePost.author.username.charAt(0).toUpperCase() + props.singlePost.author.username.slice(1)}</span>
      </Link>
      {favTag}
      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/posts/${props.singlePost.slug}`}>
        {imgSrc}      
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{post}</p>
        <i><small>View comments...</small></i>
        <div>{tag}</div>
        <hr style={{clear: "both"}}/>
      </Link>
    </article>    
  )
}

export default posts;