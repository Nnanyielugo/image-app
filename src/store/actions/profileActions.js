import axios from 'axios';
import * as urls from '../helpers/http';
import * as types from './actionTypes';

const loadProfileToState = data => {
  return {
    type: types.LOAD_PROFILE_BY_ID,
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