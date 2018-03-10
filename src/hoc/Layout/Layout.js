import React from 'react';

import Aux from '../Aux/Aux';
import Navigation from '../../containers/Navigation/Navigation';

const Layout = props => (
  <Aux>
    <Navigation />
    <main>
      {props.children}
    </main>
  </Aux>
)

export default Layout;