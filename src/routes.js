import React, { Component }  from 'react';
import { Route } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Signup'
import SignIn from './component/SignIn'

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={Signup} />
      </div>
    );
  }
}

export default Routes;
