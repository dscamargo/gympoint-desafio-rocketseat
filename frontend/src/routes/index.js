import React from 'react';
import { Switch, Route as Guest } from 'react-router-dom';
import Route from './route';

import Signin from '~/pages/Signin';
import Signout from '~/pages/Signout';
import Dashboard from '~/pages/Dashboard';

export default function routes() {
  return (
    <Switch>
      <Guest path="/signout" exact component={Signout} />
      <Route path="/signin" component={Signin} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="*" component={Signin} />
    </Switch>
  );
}
