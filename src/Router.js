import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Register } from './container';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Register} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
