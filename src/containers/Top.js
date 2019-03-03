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
    user: '',
    snapshot: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const userSnapshot = await Authentication.fetchUserDataById(uid);
    const popularItem = await Saas.recentlyManyReviewed();
    this.setState({ user: userSnapshot.data() });
    this.setState({ snapshot: popularItem });

    Saas.updatePopularItemIfOld();
  }
  render() {
    const { history, classes } = this.props;

    return (
      <React.Fragment>
        <Header history={history} />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />

          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar user={this.state.user} snapshot={this.state.snapshot} />
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
