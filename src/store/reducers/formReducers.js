import * as types from '../actions/actionTypes';

const initialState = {
  isEditing: false,
  formEditable: false
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
    case types.TRIGGER_EDITING:
      return {
        ...state,
        formEditable: true
      }
    case types.CLOSE_POST_EDITING:
      return {
        ...state,
        formEditable: false
      }
    default:
      return state;
  }
}

export default reducer;