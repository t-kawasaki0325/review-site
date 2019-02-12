import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Registration, Login, UserInfo, Top, RegisterSass } from './containers';
import { PATH } from './config';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.ROOT} exact component={Login} />
        <Route path={PATH.REGISTRATION} exact component={Registration} />
        <Route path={PATH.REGISTRATION_ADDTION} exact component={UserInfo} />
        <Route path={PATH.TOP} exact component={Top} />
        <Route
          path={PATH.AUTHOR_REGISTER_SASS}
          exact
          component={RegisterSass}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
