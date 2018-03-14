import * as types from './actionTypes';
import axios from 'axios';

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

export const sendPosts = (data) => {
  console.log(data)
  return dispatch => {
    axios.post('http://localhost:5000/api/posts', data)
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