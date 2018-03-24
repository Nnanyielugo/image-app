import axios from 'axios';
import * as urls from '../helpers/http';
import * as types from './actionTypes';

const encode = encodeURIComponent;
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const loadProfileToState = data => {
  return {
    type: types.LOAD_PROFILE_BY_ID,
    data
  }
}

const loadPostsOfUsernameToState = data => {
  return {
    type: types.LOAD_POST_OF_PROFILE,
    data
  }
}

const setFollowInstate = (data) => {
  return {
    type: types.FOLLOW_USER,
    data
  }
}

const setUnFollowInState = (data) => {
  return {
    type: types.UNFOLLOW_USER,
    data
  }
}

export const clearProfileState = () => {
  return {
    type: types.CLEAR_PROFILE_STATE
  }
}

export const loadProfileById = id => {
  console.log('LOAD FROM API')
  const token = localStorage.getItem('token');
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.get(`${urls.profileUrl}/${id}`, header)
      .then(response => {
        console.log(response.data)
        dispatch(loadProfileToState(response.data))
      })
  }
}

export const fetchPostsOfUsername = (username) => {
  console.log("USERNAME: ", username)
  const token = localStorage.getItem('token');
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null;
  return dispatch => {
    axios.get(`${urls.postsUrl}?author=${encode(username)}`, header)
      .then(response => {
        console.log(response.data)
        dispatch(loadPostsOfUsernameToState(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const follow = (username) => {
  const token = localStorage.getItem('token');
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null;
  return dispatch => {
    axios.post(`${urls.profileUrl}/${username}/follow`, null, header)
      .then(response => {
        console.log(response)
        dispatch(setFollowInstate(response.data))
      })
  }
}

export const unfollow = (username) => {
  const token = localStorage.getItem('token');
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null;
  return dispatch => {
    axios.delete(`${urls.profileUrl}/${username}/follow`, header)
    .then(response => {
      dispatch(setUnFollowInState(response.data))
      console.log(response)
    })
  }
}