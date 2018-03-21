import React from 'react';
import { Link } from 'react-router-dom';

import './Posts.css';
import profile from '../../assets/profile-placeholder-03.jpeg'

const posts = props => {
  let imgSrc = null;
  let tag = null;
  const authorImage = props.singlePost.author.imageSrc ? <img className="avatar" src={`http://localhost:5000/${props.singlePost.author.imageSrc}`} /> : <img className="avatar" src={profile} />

  if (props.singlePost.imgSrc) {
    imgSrc = <img className="img" src={`http://localhost:5000/${props.singlePost.imgSrc}`} />
  }
  if(props.singlePost.tags) {
    tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    })
  }
  // if(props.singlePost.author.imageSrc) {
  //   authorImage = 
  // }


  return(
    <article className="Posts">
      {authorImage}
      <span className="username">{props.singlePost.author.username.charAt(0).toUpperCase() + props.singlePost.author.username.slice(1)}</span>
      <Link style={{ textDecoration: 'none', color: 'black' }} to={`/post/${props.singlePost.slug}`}>
        {imgSrc}      
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{props.singlePost.post}</p>
        <div>{tag}</div>
        <hr />
        <div>Comments</div>
      </Link>
    </article>    
  )
}

export default posts;