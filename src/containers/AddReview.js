import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Header, TableSelect, TableText } from '../components';
import { ValidationUtil } from '../utils';
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
  textField: {
    minWidth: 220,
  },
  textArea: {
    width: '100%',
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

class AddReview extends Component {
  state = {
    info: {
      recommendation: '',
      sales: '',
      support: '',
      utilization: '',
      satisfaction: '',
      opportunity: '',
      firstContact: '',
      considerationReason: '',
      considerationPeriod: '',
      otherSaas: '',
      isDiscounted: '',
      discountRate: '',
      onboadingPeriod: '',
      price: '',
      period: '',
      onboadingSystem: '',
      fromNow: '',
    },
    message: {},
    loading: false,
  };

  handleChange = event => {
    const key = event.target.name;
    const type = event.target.type;
    const value = event.target.value;

    this.setState({
      info: { ...this.state.info, [key]: value },
    });
    this.setState({
      message: {
        ...this.state.message,
        [key]: ValidationUtil.formValidate(type, value),
      },
    });
  };

  render() {
    const { classes, history } = this.props;

    const reviewCell = [
      {
        label: SAAS.RADAR.sales,
        value: this.state.info.sales,
        key: 'sales',
        list: REVIEW.SATISFACTION_LEVEL,
      },
      {
        label: SAAS.RADAR.support,
        value: this.state.info.support,
        key: 'support',
        list: REVIEW.SATISFACTION_LEVEL,
      },
      {
        label: SAAS.RADAR.utilization,
        value: this.state.info.utilization,
        key: 'utilization',
        list: REVIEW.SATISFACTION_LEVEL,
      },
      {
        label: SAAS.RADAR.recommendation,
        value: this.state.info.recommendation,
        key: 'recommendation',
        list: REVIEW.SATISFACTION_LEVEL,
      },
      {
        label: SAAS.RADAR.satisfaction,
        value: this.state.info.satisfaction,
        key: 'satisfaction',
        list: REVIEW.SATISFACTION_LEVEL,
      },
    ];

    const untilAdopt = [
      {
        label: 'サービスを知ったきっかけ',
        value: this.state.info.opportunity,
        key: 'opportunity',
        list: REVIEW.UNTIL_ADOPTED.OPPORTUNITY,
      },
      {
        label: '企業との初回接点',
        value: this.state.info.firstContact,
        key: 'firstContact',
        list: REVIEW.UNTIL_ADOPTED.FIRST_CONTACT,
      },
      {
        label: '検討理由',
        value: this.state.info.considerationReason,
        key: 'considerationReason',
        list: REVIEW.UNTIL_ADOPTED.REASON,
      },
      {
        label: '検討期間',
        value: this.state.info.considerationPeriod,
        key: 'considerationPeriod',
        list: REVIEW.UNTIL_ADOPTED.PERIOD,
      },
    ];

    const untilAdoptText = [
      {
        label: '他に検討したサービス',
        value: this.state.info.otherSaas,
        key: 'otherSaas',
      },
    ];

    const adopting = [
      {
        label: '割引の有無',
        value: this.state.info.isDiscounted,
        key: 'isDiscounted',
        list: REVIEW.BEING_ADOPTED.IS_DISCOUNTED,
      },
      {
        label: '割引率',
        value: this.state.info.discountRate,
        key: 'discountRate',
        list: REVIEW.BEING_ADOPTED.DISCOUNT_RATE,
      },
      {
        label: 'オンボーディング期間',
        value: this.state.info.onboadingPeriod,
        key: 'onboadingPeriod',
        list: REVIEW.BEING_ADOPTED.ONBOADING_PERIOD,
      },
      {
        label: '購入した価格',
        value: this.state.info.price,
        key: 'isDiscounted',
        list: REVIEW.BEING_ADOPTED.PRICE,
      },
      {
        label: '導入時期',
        value: this.state.info.period,
        key: 'period',
        list: REVIEW.BEING_ADOPTED.PERIOD,
      },
      {
        label: '今後の契約予定',
        value: this.state.info.fromNow,
        key: 'fromNow',
        list: REVIEW.BEING_ADOPTED.FROM_NOW,
      },
    ];

    const adoptingText = [
      {
        label: 'オンボーディング体制',
        value: this.state.info.onboadingSystem,
        key: 'onboadingSystem',
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            SaaS評価レポート
          </Typography>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              全体的な満足度
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableSelect
                    list={reviewCell}
                    handleChange={event => this.handleChange(event)}
                  />
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
                  <TableSelect
                    list={untilAdopt}
                    handleChange={event => this.handleChange(event)}
                  />
                  <TableText
                    list={untilAdoptText}
                    handleChange={event => this.handleChange(event)}
                  />
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
                  <TableSelect
                    list={adopting}
                    handleChange={event => this.handleChange(event)}
                  />
                  <TableText
                    list={adoptingText}
                    handleChange={event => this.handleChange(event)}
                  />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              ご自由にレビューを記載してください(100字以上)
            </Typography>
            <Paper className={classes.paper}>
              <TextField
                className={classes.textArea}
                placeholder="ご自由にレビューをお書きください"
                multiline={true}
                rows={4}
                rowsMax={10}
              />
            </Paper>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              disabled={this.state.loading}
              variant="contained"
              color="primary"
              onClick={() => this.confirmReview()}
              className={classes.button}
            >
              確認ページへ進む
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

export default withStyles(styles)(AddReview);
