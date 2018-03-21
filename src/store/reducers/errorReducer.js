import * as types from '../actions/actionTypes';

const initialState = {
  loginError: null,
  usernameError: null,
  emailError: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.AUTH_FAIL:
      return {
        ...state,
        loginError: action.error.error
      }
    case types.SIGNUP_ERROR:
      return {
        ...state,
        usernameError: action.error.username,
        emailError: action.error.email
      }
    default:
    return state;
  }
}

export default reducer;