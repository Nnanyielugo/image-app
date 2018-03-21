import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import postReducer from './reducers/postReducers';
import formReducer from './reducers/formReducers';
import authReducer from './reducers/authReducer';
import errorReducer from './reducers/errorReducer';

/**Returns the application store */
const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    post: postReducer,
    form: formReducer,
    auth: authReducer,
    error: errorReducer
  });

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
}

export default configureStore;