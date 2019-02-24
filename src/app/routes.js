import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotFound, Exchange } from './pages';

const routes = (
  <Switch>
    <Route exact path="/exchange" component={Exchange} />
    <Route exact path="/404" component={NotFound} />
    <Redirect exact from="/" to="/exchange" />
    <Redirect to="/404" />
  </Switch>
);

export default routes;
