import * as types from '../actions/actionTypes';

const initialState = {

  profile: {
    username: '',
    followerCount: 0,
    followers: [],
    imageSrc: '',
    following: false
  }
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
        }
      }
    default:
      return state
  }
}

export default reducer;