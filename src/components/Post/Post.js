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

  let editable = null;
  let deletable = null;
  
  if(props.user && props.user.username.toString() === props.singlePost.author.username.toString()) {
    editable = <span className="editable"><span className="edit glyphicon glyphicon-pencil"></span><span className="text">Edit Post</span></span>
    deletable = <span className="deletable"><span className=" delete glyphicon glyphicon-trash"></span><span className="text">Delete Post</span></span>
  }

  

  if(props.comments){
    comments = props.comments.map(comment => {
      let deletableComment = null;
      if(props.user && props.user.username.toString() === comment.author.username.toString()) {
        deletableComment = <span className=" deletableComment glyphicon glyphicon-trash"></span>
      }
      return (
        <div key={comment.id}>
          {comment.author.imageSrc ? <img className="avatar-comment" src={`http://localhost:5000/${comment.author.imageSrc}`} /> : <img className="avatar" src={profile} />}
          <span><b>{comment.author.username.charAt(0).toUpperCase() + comment.author.username.slice(1)}</b></span>
          {deletableComment}
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
        {editable}
        {deletable}
        {imgSrc}
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{props.singlePost.post}</p>
        <div>{tag}</div>
        <hr />
        <form>
          <div className="form-group">
            <textarea type="text" value={props.localComment} onChange={props.changed} rows="3" name="post" className="form-control"  placeholder="Write your comment..." />
          </div>
          <Button
          className="pull-right"
          bsStyle="primary"
          disabled={!props.localComment}
          onClick={props.submit}
        >Submit</Button>
        </form>
        <hr style={{clear: "both"}}/>
        
        <div><b>{props.comments.length + ' ' + commentTag}</b></div>
        <br/>
        {comments}
        <hr />
        
        
      </article>
      
    )
  }
  
  return Post
}

export default post;