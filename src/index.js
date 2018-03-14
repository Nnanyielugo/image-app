import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import postReducer from './store/reducers/postReducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rootReducer = combineReducers({
//   post: postReducer
// })

const store = createStore(postReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    
      <App />
    
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
