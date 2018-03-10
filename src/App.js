import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import Posts from './containers/Posts/Posts';
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
