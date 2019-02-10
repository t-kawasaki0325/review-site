import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Registration, Login, UserInfo, Top } from './containers';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/registation" exact component={Registration} />
        <Route path="/registration/:id" exact component={UserInfo} />
        <Route path="/top" exact component={Top} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
