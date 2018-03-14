import * as types from '../actions/actionTypes';

const initialState = {
  posts: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_POSTS:
      return {
        ...state,
        posts: action.data.posts
      }
      
    default: 
      return state
  }
}

export default reducer