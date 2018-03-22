import axios from 'axios';

import * as types from './actionTypes';
import * as urls from '../helpers/http';

const setEditing = () => {
  return {
    type: types.SET_EDITING
  }
}

const resetEditing = () => {
  return {
    type: types.RESET_EDITING
  }
}

export const triggerPostEditing = () => {
  return {
    type: types.TRIGGER_EDITING
  }
}

export const closePostEdit = () => {
  return {
    type: types.CLOSE_POST_EDITING
  }
}

export const sendPosts = (data, token) => {
  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  console.log(data)
  return dispatch => {
    axios.post(urls.postsUrl, data, header)
    .then(response => {
      console.log("Response from api: ", response)
      triggerResetEditing()
    })
    .catch(error => {
      console.log(error)
    });
  }    
}

export const triggerResetEditing = () => dispatch => dispatch(resetEditing());

export const triggerEditing = () => dispatch => dispatch(setEditing());