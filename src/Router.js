import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Registration, Login, UserInfo, Top, RegisterSaas } from './containers';
import { PATH } from './config';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.LOGIN} exact component={Login} />
        <Route path={PATH.REGISTRATION} exact component={Registration} />
        <Route path={PATH.REGISTRATION_ADDTION} exact component={UserInfo} />
        <Route path={PATH.TOP} exact component={Top} />
        <Route
          path={PATH.AUTHOR_REGISTER_SAAS}
          exact
          component={RegisterSaas}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
