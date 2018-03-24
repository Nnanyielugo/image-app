import * as types from '../actions/actionTypes';

const initialState = {

  profile: {
    username: '',
    followerCount: 0,
    followers: [],
    imageSrc: '',
    following: false
  },
  posts: [],
  postsCount: 0
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_PROFILE_BY_ID:
      return {
        ...state,
        profile: action.data.profile      
      }
    case types.CLEAR_PROFILE_STATE:
      return {
        ...state,
        profile: {
          username: '',
          followerCount: 0,
          followers: [],
          imageSrc: '',
          following: false
        }, 
        posts: [],
        postsCount: 0
      }
    case types.LOAD_POST_OF_PROFILE: 
      return{
        ...state,
        posts: action.data.posts,
        postsCount: action.data.postsCount
      }
    case types.FOLLOW_USER:
      return {
        ...state,
        profile: action.data.profile
      }
    case types.UNFOLLOW_USER:
      return {
        ...state,
        profile: action.data.profile
      }
    default:
      return state
  }
}

export default reducer;