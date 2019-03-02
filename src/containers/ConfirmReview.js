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
        label: 'サービスを知ったきっかけ',
        value: info.opportunity,
      },
      {
        label: '企業との初回接点',
        value: info.firstContact,
      },
      {
        label: '検討理由',
        value: info.considerationReason,
      },
      {
        label: '検討期間',
        value: info.considerationPeriod,
      },
      {
        label: '他に検討したサービス',
        value: info.otherSaas,
      },
    ];

    const adopting = [
      {
        label: '割引の有無',
        value: info.isDiscounted,
      },
      {
        label: '割引率',
        value: info.discountRate,
      },
      {
        label: 'オンボーディング期間',
        value: info.onboadingPeriod,
      },
      {
        label: '購入した価格',
        value: info.price,
      },
      {
        label: '導入時期',
        value: info.period,
      },
      {
        label: '今後の契約予定',
        value: info.fromNow,
      },
      {
        label: 'オンボーディング体制',
        value: info.onboadingSystem,
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
