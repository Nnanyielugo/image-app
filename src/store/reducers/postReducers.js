import * as types from '../actions/actionTypes';

const initialState = {
  posts: [],
  singlePost: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_POSTS:
      return {
        ...state,
        posts: action.data.posts
      }
    case types.LOAD_POST_BY_ID:
      return {
        ...state,
        singlePost: action.data
      }
      
    default: 
      return state
  }
}

export default reducer