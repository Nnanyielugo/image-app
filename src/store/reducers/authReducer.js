import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false, 
  user: null,
  recent: false,
  loginRedirect: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.AUTH_START:
      return {
        ...state,
        loggedIn: false,
        user: null
      }
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      }
    case types.CURRENT_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
        recent: true
      }
    case types.EDIT_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
        recent: true
      }
    case types.AUTH_LOGOUT: 
      return {
        ...state,
        user: null,
        loggedIn: false        
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
