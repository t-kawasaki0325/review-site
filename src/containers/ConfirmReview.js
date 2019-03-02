import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit * 8,
    position: 'relative',
  },
  button: {
    minWidth: 300,
    fontSize: 24,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ConfirmReview extends Component {
  state = {
    loading: false,
  };

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

    const untilAdopt = [
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.OPPORTUNITY,
        answer: REVIEW.UNTIL_ADOPTED.OPPORTUNITY[info.opportunity],
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.FIRST_CONTACT,
        answer: REVIEW.UNTIL_ADOPTED.FIRST_CONTACT[info.firstContact],
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.REASON,
        answer: REVIEW.UNTIL_ADOPTED.REASON[info.considerationReason],
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.PERIOD,
        answer: REVIEW.UNTIL_ADOPTED.PERIOD[info.considerationPeriod],
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.OTHER_SAAS,
        answer: info.otherSaas,
      },
    ];

    const adopting = [
      {
        label: REVIEW.BEING_ADOPTED_TITLE.IS_DISCOUNTED,
        answer: REVIEW.BEING_ADOPTED.IS_DISCOUNTED[info.isDiscounted],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.DISCOUNT_RATE,
        answer: REVIEW.BEING_ADOPTED.DISCOUNT_RATE[info.discountRate],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.ONBOADING_PERIOD,
        answer: REVIEW.BEING_ADOPTED.ONBOADING_PERIOD[info.onboadingPeriod],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.PRICE,
        answer: REVIEW.BEING_ADOPTED.PRICE[info.price],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.PERIOD,
        answer: REVIEW.BEING_ADOPTED.PERIOD[info.period],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.FROM_NOW,
        answer: REVIEW.BEING_ADOPTED.FROM_NOW[info.fromNow],
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.ONBOADING_SYSTEM,
        answer: info.onboadingSystem,
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
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              対象のSaaSを導入するまで
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={untilAdopt} />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              サービス導入にあたって
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={adopting} />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              自由記入欄
            </Typography>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" gutterBottom>
                {info.content}
              </Typography>
            </Paper>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.confirmReview()}
              className={classes.button}
            >
              この内容で確定する
            </Button>
            {this.state.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ConfirmReview);
