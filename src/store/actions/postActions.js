import axios from 'axios';

import * as types from './actionTypes';
import * as urls from '../helpers/http';


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

const setReload = () => {
  return {
    type: types.SET_RELOAD
  }
}

const resetReload = () => {
  return {
    type: types.RESET_RELOAD
  }
}

export const clearPost = () => {
  return {
    type: types.CLEAR_POST
  }
}

/**  ASYNC ACTIONS(thunks) */

export const fetchPosts = (token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
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

export const fetchPostById = (slug, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
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

export const editPost = (slug, data, token) => {
  for (var value of data.values()) {
    console.log("[EDITED ACTIONS Data]: ", value); 
 }
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.put(`${urls.postsUrl}/${slug}`, data, header)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const deletePost = (slug, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.delete(`${urls.postsUrl}/${slug}`, header)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const fetchComments = (slug, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.get(`${urls.postsUrl}/${slug}/comments`, token)
      .then(response => {
        console.log(response.data);
        dispatch(fetchCommentsSuccess(response.data))
        dispatch(resetReload())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const postComment = (slug, comment, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    console.log("[COMMENT]", comment)
    // dispatch(resetReload())
    axios.post(`${urls.postsUrl}/${slug}/comments`, comment, header)
      .then(response => {
        console.log(response)
        dispatch(setReload())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const deleteComment = (slug, id, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.delete(`${urls.postsUrl}/${slug}/comments/${id}`, header)
      .then(response => {
        console.log(response)
        dispatch(setReload())
      })
      .catch(error => {
        console.log(error)
      })
  }
}