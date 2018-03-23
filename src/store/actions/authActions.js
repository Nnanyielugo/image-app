import axios from 'axios';
import * as types from './actionTypes';

const authStart = () => {
  return {
    type: types.AUTH_START
  }
}

const authSuccess = (user) => {
  return {
    type: types.AUTH_SUCCESS,
    user
  }
}

const authFail = (error) => {
  return {
    type: types.AUTH_FAIL,
    error
  }
}

const signUpErrors = error => {
  return {
    type: types.SIGNUP_ERROR,
    error
  }
}

export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('id');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('imageSrc');

  return {
    type: types.AUTH_LOGOUT
  }
}

const authenticated = user => {
  return {
    type: types.AUTHENTICATED,
    user
  }
}

export const register = form => {

  return dispatch => {
    dispatch(authStart())
    axios.post('http://localhost:5000/api/users', form)
      .then(response => {
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('id', response.data.user.id);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('imageSrc', response.data.user.imageSrc)
        console.log(response.data);
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        console.log(error.response.data.errors);
        dispatch(signUpErrors(error.response.data.errors))
      })
  }
}

export const login = form => {
  return dispatch => {
    dispatch(authStart())
    axios.post('http://localhost:5000/api/users/login', form)
    .then(response => {
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('imageSrc', response.data.user.imageSrc)
      console.log(response.data);
      dispatch(authSuccess(response.data))
      checkAuthState()
    })
    // .then( response => {dispatch(authSuccess(response.data))})
    .catch(error => {
      console.log(error.response.data.errors);
      dispatch(authFail(error.response.data.errors))
    })
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const user = {}
    user.username = localStorage.getItem('username');
    user.id = localStorage.getItem('id');
    user.email = localStorage.getItem('email');
    user.username = localStorage.getItem('username');
    user.token = localStorage.getItem('token');
    user.imageSrc = localStorage.getItem('imageSrc');

    if(!user.token) {
      dispatch(logout());
    } else {
      dispatch(authenticated(user))
    }
  }
}

export const fetchCurrentUser = () => {
  const token = localStorage.getItem('token')
  console.log("[[[USER TOKEN]]] :", token)

  const header = token ? { headers: { Authorization: "Bearer " + token} } : null
  return dispatch => {
    axios.get('http://localhost:5000/api/users/user', header)
      .then(response => {
        console.log("CURRENT USER: ", response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}