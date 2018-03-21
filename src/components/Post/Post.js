import React from 'react';
import profile from '../../assets/profile-placeholder-03.jpeg'
import { Button } from 'react-bootstrap';

import './Post.css';

const post = props => {
  let Post = null;
  let comments = null;
  if (props.singlePost){
    const imgSrc = <img className="img" src={`http://localhost:5000/${props.singlePost.imgSrc}`} />
    const authorImage = props.singlePost.author.imageSrc ? <img className="avatar" src={`http://localhost:5000/${props.singlePost.author.imageSrc}`} /> : <img className="avatar" src={profile} />
    const tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    });

    let commentTag = 'Comments';
    if(props.comments.length === 1){
      commentTag = 'Comment'
    }

  if(props.comments){
    comments = props.comments.map(comment => {
      return (
        <div key={comment.id}>
          {comment.author.imageSrc ? <img className="avatar-comment" src={`http://localhost:5000/${comment.author.imageSrc}`} /> : <img className="avatar" src={profile} />}
          <span><b>{comment.author.username.charAt(0).toUpperCase() + comment.author.username.slice(1)}</b></span>
          <div className="comment-body">{comment.body}</div>
          <hr />
        </div>
      )
    })
  }

    Post = (
      <article className="Post">
        {authorImage}
        <span className="username">{props.singlePost.author.username.charAt(0).toUpperCase() + props.singlePost.author.username.slice(1)}</span>
        {imgSrc}
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{props.singlePost.post}</p>
        <div>{tag}</div>
        <hr />
        <div><b>{props.comments.length + ' ' + commentTag}</b></div>
        <br/>
        {comments}
        <hr />
        
        <form>
          <div className="form-group">
            <textarea type="text" value={props.localComment} onChange={props.changed} rows="3" name="post" className="form-control"  placeholder="Write your comment..." />
          </div>
          <Button
          style={{float: "right"}}
          bsStyle="primary"
          disabled={!props.localComment}
          onClick={props.submit}
        >Submit</Button>
        </form>
      </article>
      
    )
  }
  
  return Post
}

export default post;