import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/Posts';
import './bootstrap-3.3.7-dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return ( 
      <Layout>
        <Posts />
      </Layout>
    );
  }
}

export default App;
