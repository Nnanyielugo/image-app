import React from 'react';
import profile from '../../assets/profile-placeholder-03.jpeg'
import { Button } from 'react-bootstrap';
import marked from 'marked';

import './Post.css';
import EditForm from './Form';

const post = props => {
  let Post = null;
  let comments = null;
  let editable = null;
  let deletable = null;
  let commentTag = 'Comments';
    if(props.comments.length === 1){
      commentTag = 'Comment'
    }
  if (props.singlePost){
    const imgSrc = `http://localhost:5000/${props.singlePost.imgSrc}`
    const authorImage = props.singlePost.author.imageSrc ? <img className="avatar" src={`http://localhost:5000/${props.singlePost.author.imageSrc}`} /> : <img className="avatar" src={profile} />
    const tag = props.singlePost.tags.map(tag => {
      return <span id="tag" key={new Date}>{tag}</span>
    });   
  
  if(props.user){
    if(props.user.username.toString() === props.singlePost.author.username.toString()) {
      editable = <span onClick={props.edit} className="editable"><span className="edit glyphicon glyphicon-pencil"></span><span className="text">Edit Post</span></span>
      deletable = <span onClick={props.onPostDeletable} className="deletable"><span className=" delete glyphicon glyphicon-trash"></span><span className="text">Delete Post</span></span>
    }
  }  

  if(props.comments){
    comments = props.comments.map(comment => {
      let deletableComment = null;
      const markup = { __html: marked(comment.body, { sanitize: true}) }
      if(props.user && props.user.username.toString() === comment.author.username.toString()) {
        deletableComment = <span onClick={(id)=>props.onCommentDeletable(comment.id)} className=" deletableComment glyphicon glyphicon-trash"></span>
      }
      return (
        <div key={comment.id}>
          {comment.author.imageSrc ? <img className="avatar-comment" src={`http://localhost:5000/${comment.author.imageSrc}`} /> : <img className="avatar" src={profile} />}
          <span><b>{comment.author.username.charAt(0).toUpperCase() + comment.author.username.slice(1)}</b></span>
          {deletableComment}
          <div className="comment-body" dangerouslySetInnerHTML={markup}></div>
          <hr />
        </div>
      )
    })
  }

    let post = '';
    if (props.singlePost.post !== 'undefined'){
      post = props.singlePost.post
    }

    Post = (
      <article className="Post">
        {authorImage}
        <span className="username">{props.singlePost.author.username.charAt(0).toUpperCase() + props.singlePost.author.username.slice(1)}</span>
        {!props.singlePost.favorited ? <span onClick={(slug)=>props.like(props.singlePost.slug)} className="no-like glyphicon glyphicon-heart-empty"><span>{props.singlePost.favoritesCount}</span></span> :
      <span onClick={(slug)=>props.unlike(props.singlePost.slug)} className="like glyphicon glyphicon-heart"><span>{props.singlePost.favoritesCount}</span></span>}
        {editable}
        {deletable}
        <img className="img" src={imgSrc} />
        <h3>{props.singlePost.title}</h3>
        <p className="postBody">{post}</p>
        <div>{tag}</div>
        <hr />

         {props.formEditable ? <EditForm 
          post={post}
          image={imgSrc}
          title={props.singlePost.title}
          save={props.onPostEditable}
          resetEditable={props.resetEditable}
          sendPostHandler={props.postForm} 
          /> : ''}

        <form>
          {props.user ? <div className="form-group">
            <textarea type="text" value={props.localComment} onChange={props.changed} rows="3" name="post" className="form-control"  placeholder="Write your comment..." />
          </div> : ''}

          {props.user ? <Button
            className="pull-right"
            bsStyle="primary"
            disabled={!props.localComment}
            onClick={props.submit}
          >Comment</Button> : <Button
            className="pull-right"
            bsStyle="primary"
            onClick={props.login}
          >Login to comment</Button>
          }
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