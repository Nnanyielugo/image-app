import * as types from './actionTypes';
import axios from 'axios';


const loadPosts = data => {
  return {
    type: types.LOAD_POSTS,
    data
  }
}

export const fetchPosts = () => {
  return dispatch => {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      console.log("[posts]", response)
      dispatch(loadPosts(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  }
}