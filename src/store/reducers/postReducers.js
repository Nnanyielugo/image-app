import * as types from '../actions/actionTypes';

const initialState = {
  posts: [],
  singlePost: null,
  comments: [],
  reload: false
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
    case types.SET_RELOAD:
      return {
        ...state,
        reload: true
      }
    case types.RESET_RELOAD:
      return {
        ...state,
        reload: false
      }
    default: 
      return state
  }
}

export default reducer