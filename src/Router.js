import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Register, Login } from './containers';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
