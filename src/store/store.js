import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import postReducer from './reducers/postReducers';
import formReducer from './reducers/formReducers';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';
import profileReducer from './reducers/profileReducer';

/**Returns the application store */
const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const appReducer = combineReducers({
    post: postReducer,
    form: formReducer,
    auth: authReducer,
    error: errorReducer,
    profiles: profileReducer
  });

  const rootReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT'){
      console.log("AUTH LOGOUT FROM ROOT REDUCER")
      state = undefined
      console.log(state)
    }

    return appReducer(state, action)
  }

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  // store.dispatch({
  //   type: 'RESET'
  // })
  return store;
}

export default configureStore;