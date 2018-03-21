import React from 'react';
import profile from '../../assets/profile-placeholder-03.jpeg'

import './Post.css';

const post = props => {
  let Post = null;
  if (props.singlePost){
    const imgSrc = <img className="img" src={`http://localhost:5000/${props.singlePost.imgSrc}`} />
    const authorImage = props.singlePost.author.imageSrc ? <img className="avatar" src={`http://localhost:5000/${props.singlePost.author.imageSrc}`} /> : <img className="avatar" src={profile} />
    const tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    });

    Post = (
      <article className="Post">
        {authorImage}
        <span className="username">{props.singlePost.author.username.charAt(0).toUpperCase() + props.singlePost.author.username.slice(1)}</span>
        {imgSrc}
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{props.singlePost.post}</p>
        <div>{tag}</div>
        <hr />
        <div>Comments</div>
        <hr />
        <br />
        <div className="form-group">
          <textarea type="text" rows="3" name="post" className="form-control"  placeholder="Write your comment..." />
        </div>
      </article>
      
    )
  }
  
  return Post
}

export default post;