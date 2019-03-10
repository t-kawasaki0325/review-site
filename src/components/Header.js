import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Authentication } from '../modules';
import { PATH } from '../config';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Header = props => {
  const { classes, history, uid } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Review Site
          </Typography>
          {uid ? (
            <React.Fragment>
              <Button
                color="inherit"
                onClick={() => history.push(PATH.SAAS_LIST)}
              >
                SaaSを探す
              </Button>
              <Button color="inherit" onClick={() => history.push(PATH.MYPAGE)}>
                マイページ
              </Button>
              <Button
                color="inherit"
                onClick={() => Authentication.logout(history)}
              >
                ログアウト
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                color="inherit"
                onClick={() => history.push(PATH.SAAS_LIST)}
              >
                SaaSを探す
              </Button>
              <Button
                color="inherit"
                onClick={() => history.push(PATH.REGISTRATION)}
              >
                ユーザー登録（無料）
              </Button>
              <Button color="inherit" onClick={() => history.push(PATH.LOGIN)}>
                ログイン
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
