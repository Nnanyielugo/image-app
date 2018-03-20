import * as types from './actionTypes';
import axios from 'axios';


const loadPosts = data => {
  return {
    type: types.LOAD_POSTS,
    data
  }
}


export const fetchPosts = () => {

  let token = null;
  const tokenInStorage = localStorage.getItem('token');
  if(tokenInStorage !== null) {
    token = tokenInStorage;
  }

  return dispatch => {
    axios.get('http://localhost:5000/api/posts', {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log("[posts]: ", response)
      dispatch(loadPosts(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  }
}