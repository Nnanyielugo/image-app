import axios from 'axios';

import * as types from './actionTypes';
import * as urls from '../helpers/http';
import token from '../helpers/token';


const loadPosts = data => {
  return {
    type: types.LOAD_POSTS,
    data
  }
}

const loadPostById = data => {
  return {
    type: types.LOAD_POST_BY_ID,
    data
  }
}

const fetchCommentsSuccess = data => {
  return {
    type: types.FETCH_COMMENTS,
    data
  }
}

export const clearPost = () => {
  return {
    type: types.CLEAR_POST
  }
}


export const fetchPosts = () => {

  return dispatch => {
    axios.get(urls.postsUrl, token)
    .then(response => {
      console.log("[posts]: ", response.data)
      dispatch(loadPosts(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const fetchPostById = (slug) => {
  return dispatch => {
    axios.get(`${urls.postsUrl}/${slug}`, token)
      .then(response => {
        console.log(response.data.post)
        dispatch(loadPostById(response.data.post))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const editPost = (slug) => {
  return dispatch => {
    axios.put(`${urls.postsUrl}/${slug}`, token)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const deletePost = (slug) => {
  return dispatch => {
    axios.delete(`${urls.postsUrl}/${slug}`, token)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const fetchComments = (slug) => {
  return dispatch => {
    axios.get(`${urls.postsUrl}/${slug}/comments`, token)
      .then(response => {
        console.log(response.data);
        dispatch(fetchCommentsSuccess(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const postComment = (slug, comment) => {
  return dispatch => {
    console.log("[COMMENT]", comment)
    axios.post(`${urls.postsUrl}/${slug}/comments`, comment, token)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const deleteComment = (slug) => {
  return dispatch => {
    axios.delete(`${urls.postsUrl}/${slug}/comments`, token)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}