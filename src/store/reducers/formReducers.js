import * as types from '../actions/actionTypes';

const initialState = {
  isEditing: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_EDITING:
      return {
        ...state,
        isEditing: true
      }
    case types.RESET_EDITING:
      return {
        ...state,
        isEditing: false
      }
    default:
      return state;
  }
}

export default reducer;