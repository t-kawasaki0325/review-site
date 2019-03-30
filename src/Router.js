import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Root,
  Registration,
  Login,
  UserInfo,
  Top,
  RegisterSaas,
  SaasList,
  SaasDetail,
  Mypage,
  AddReview,
  ConfirmReview,
  PointHistory,
  NotFound,
} from './containers';
import { PATH } from './config';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.ROOT} exact component={Root} />
        <Route path={PATH.LOGIN} exact component={Login} />
        <Route path={PATH.REGISTRATION} exact component={Registration} />
        <Route path={PATH.REGISTRATION_ADDTION} exact component={UserInfo} />
        <Route path={PATH.TOP} exact component={Top} />
        <Route
          path={PATH.AUTHOR_REGISTER_SAAS}
          exact
          component={RegisterSaas}
        />
        <Route path={PATH.SAAS_LIST} exact component={SaasList} />
        <Route path={PATH.SAAS_DETAIL} exact component={SaasDetail} />
        <Route path={PATH.MYPAGE} exact component={Mypage} />
        <Route path={PATH.POINT_HISTORY} exact component={PointHistory} />
        <Route path={PATH.CONFIRM_REVIEW} exact component={ConfirmReview} />
        <Route path={PATH.ADD_REVIEW} exact component={AddReview} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
