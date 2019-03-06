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
import { ValidationUtil, UrlUtil } from '../utils';
import { SAAS, REVIEW, PATH } from '../config';
import { Saas, Authentication } from '../modules';

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
      content: '',
    },
    uid: '',
    saasId: '',
    name: '',
    message: {},
    loading: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const saasId = UrlUtil.baseUrl(history.location.pathname);
    const saas = await Saas.sassInfoById(saasId);
    if (!saas.data()) {
      return history.push(PATH.SAAS_LIST);
    }
    this.setState({ saasId: saasId, name: saas.data().name, uid: uid });
  }

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

  confirmReview = () => {
    const { history } = this.props;
    history.push(PATH.CONFIRM_REVIEW, { state: this.state });
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
        list: REVIEW.RECOMMENDATION_LEVEL,
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
        label: REVIEW.UNTIL_ADOPTED_TITLE.OPPORTUNITY,
        value: this.state.info.opportunity,
        key: 'opportunity',
        list: REVIEW.UNTIL_ADOPTED.OPPORTUNITY,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.FIRST_CONTACT,
        value: this.state.info.firstContact,
        key: 'firstContact',
        list: REVIEW.UNTIL_ADOPTED.FIRST_CONTACT,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.REASON,
        value: this.state.info.considerationReason,
        key: 'considerationReason',
        list: REVIEW.UNTIL_ADOPTED.REASON,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.PERIOD,
        value: this.state.info.considerationPeriod,
        key: 'considerationPeriod',
        list: REVIEW.UNTIL_ADOPTED.PERIOD,
      },
    ];

    const untilAdoptText = [
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.OTHER_SAAS,
        value: this.state.info.otherSaas,
        key: 'otherSaas',
      },
    ];

    const adopting = [
      {
        label: REVIEW.BEING_ADOPTED_TITLE.IS_DISCOUNTED,
        value: this.state.info.isDiscounted,
        key: 'isDiscounted',
        list: REVIEW.BEING_ADOPTED.IS_DISCOUNTED,
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.DISCOUNT_RATE,
        value: this.state.info.discountRate,
        key: 'discountRate',
        list: REVIEW.BEING_ADOPTED.DISCOUNT_RATE,
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.ONBOADING_PERIOD,
        value: this.state.info.onboadingPeriod,
        key: 'onboadingPeriod',
        list: REVIEW.BEING_ADOPTED.ONBOADING_PERIOD,
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.PRICE,
        value: this.state.info.price,
        key: 'price',
        list: REVIEW.BEING_ADOPTED.PRICE,
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.PERIOD,
        value: this.state.info.period,
        key: 'period',
        list: REVIEW.BEING_ADOPTED.PERIOD,
      },
      {
        label: REVIEW.BEING_ADOPTED_TITLE.FROM_NOW,
        value: this.state.info.fromNow,
        key: 'fromNow',
        list: REVIEW.BEING_ADOPTED.FROM_NOW,
      },
    ];

    const adoptingText = [
      {
        label: REVIEW.BEING_ADOPTED_TITLE.ONBOADING_SYSTEM,
        value: this.state.info.onboadingSystem,
        key: 'onboadingSystem',
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} uid={this.state.uid} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            {this.state.name} 評価レポート
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
              サービスを導入するまで
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
                name="content"
                value={this.state.info.content}
                placeholder="ご自由にレビューをお書きください"
                onChange={event => this.handleChange(event)}
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
