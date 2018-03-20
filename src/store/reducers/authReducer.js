import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false, 
  user: null, 
  error: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.AUTH_START:
      return {
        ...state,
        loggedIn: false
      }
    case types.AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      }
    case types.AUTH_FAIL:
      return {
        ...state,
        loggedIn: false,
        error: action.error
      }
    case types.AUTH_LOGOUT: 
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    case types.AUTHENTICATED:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      }
    default: 
      return state
  }
}

export default reducer;
