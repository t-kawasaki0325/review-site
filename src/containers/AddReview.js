import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { Header, TableSelect, TableText } from '../components';
import { ValidationUtil } from '../utils';
import { SAAS, REVIEW } from '../config';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    marginBottom: theme.spacing.unit * 6,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  container: {
    marginTop: 30,
  },
  textField: {
    minWidth: 220,
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
      period: '',
      onboadingSystem: '',
    },
    message: {},
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
              <TableSelect
                list={adopting}
                handleChange={event => this.handleChange(event)}
              />
              <TableText
                list={adoptingText}
                handleChange={event => this.handleChange(event)}
              />
            </Paper>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddReview);
