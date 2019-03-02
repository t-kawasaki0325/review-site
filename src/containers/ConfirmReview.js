import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { TableConfirm, Header } from '../components';
import { SAAS, REVIEW } from '../config';

const styles = theme => ({
  layout: {
    width: 'auto',
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    marginBottom: theme.spacing.unit * 6,
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  container: {
    marginTop: 30,
  },
});

class ConfirmReview extends Component {
  render() {
    const { classes, history } = this.props;
    const { info } = this.props.location.state;
    const reviewCell = [
      {
        label: SAAS.RADAR.sales,
        answer: REVIEW.SATISFACTION_LEVEL[info.sales],
      },
      {
        label: SAAS.RADAR.support,
        answer: REVIEW.SATISFACTION_LEVEL[info.support],
      },
      {
        label: SAAS.RADAR.utilization,
        answer: REVIEW.SATISFACTION_LEVEL[info.utilization],
      },
      {
        label: SAAS.RADAR.recommendation,
        answer: REVIEW.SATISFACTION_LEVEL[info.recommendation],
      },
      {
        label: SAAS.RADAR.satisfaction,
        answer: REVIEW.SATISFACTION_LEVEL[info.satisfaction],
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            確認ページ
          </Typography>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              全体的な満足度
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={reviewCell} />
                </TableBody>
              </Table>
            </Paper>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmReview);
