import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { Header, Sidebar } from '../components';
import { Authentication, Saas } from '../modules';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
});

class Top extends Component {
  state = {
    uid: '',
    user: '',
    snapshot: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const userSnapshot = await Authentication.fetchUserDataById(uid);
    const popularItem = await Saas.recentlyManyReviewed();
    this.setState({
      uid: uid,
      user: userSnapshot.data(),
      snapshot: popularItem,
    });

    // 直近1時間でレビュー数が多かったSaaSの更新
    Saas.updatePopularItemIfOld('recently_reviewed');
  }
  render() {
    const { history, classes } = this.props;
    const { uid, user, snapshot } = this.state;

    return (
      <React.Fragment>
        <Header history={history} uid={uid} />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar user={user} snapshot={snapshot} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <p>main contents</p>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Top);
