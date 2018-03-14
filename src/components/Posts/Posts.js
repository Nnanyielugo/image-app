import React from 'react';

import './Posts.css';

const posts = props => {
  let imgSrc = null;
  let tag = null;

  if (props.singlePost.imgSrc) {
    imgSrc = <img src={`http://localhost:5000/${props.singlePost.imgSrc}`} />
  }
  if(props.singlePost.tags) {
    tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    })
  }

  return(
    <article className="Post">
      {imgSrc}
      <h3>{props.singlePost.title}</h3>
      <p className="postBody">{props.singlePost.post}</p>
      <div>{tag}</div>
      <hr />
      <div>Comments</div>
    </article>    
  )
}

export default posts;