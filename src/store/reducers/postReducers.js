import * as types from '../actions/actionTypes';

const initialState = {
  posts: [],
  singlePost: null,
  comments: []
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
    case types.FETCH_COMMENTS:
      return {
        ...state,
        comments: action.data.comments
      }
    case types.CLEAR_POST:
      return {
        ...state,
        singlePost: null
      }
    default: 
      return state
  }
}

export default reducer