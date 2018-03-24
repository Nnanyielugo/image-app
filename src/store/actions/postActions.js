import axios from 'axios';

import * as types from './actionTypes';
import * as urls from '../helpers/http';

const encode = encodeURIComponent;
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;


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

const makeComment = data => {
  return {
    type: types.MAKE_COMMENT,
    data
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

export const fetchPosts = () => {
  const token = localStorage.getItem('token')
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null;
  return dispatch => {
    axios.get(urls.postsUrl, header)
    .then(response => {
      dispatch(loadPosts(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const fetchPostById = (slug) => {
  const token = localStorage.getItem('token')
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.get(`${urls.postsUrl}/${slug}`, header)
      .then(response => {
        dispatch(loadPostById(response.data.post))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const editPost = (slug, data, token) => {

  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.put(`${urls.postsUrl}/${slug}`, data, header)
      .then(response => {
        // console.log(response)
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
        // console.log(response)
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
        dispatch(fetchCommentsSuccess(response.data))
        dispatch(resetReload())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const postComment = (slug, comment, token) => {
  console.log(token)
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.post(`${urls.postsUrl}/${slug}/comments`, comment, header)
      .then(response => {
        console.log(response)
        dispatch(makeComment(response.data))
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

export const favPost = (slug, token) => {
  console.log(token)
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null;
  return dispatch => {
    axios.post(`${urls.postsUrl}/${slug}/favorite`, null, header)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const unfavPost = (slug, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.delete(`${urls.postsUrl}/${slug}/favorite`, header)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}