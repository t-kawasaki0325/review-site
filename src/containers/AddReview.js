import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Header, ReviewTotal, ReviewBasic } from '../components';
import { ValidationUtil, UrlUtil } from '../utils';
import { PATH } from '../config';
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
      // review
      recommendation: '',
      title: '',
      good: '',
      bad: '',
      // basic
      isAdmin: '',
      contractStatus: '',
      contractDate: '',
      contractPeriod: '',
      price: '',
      priceOption: '',
      priceSatisfaction: '',
      licenseNum: '',
      isContinue: '',
      reasonNotContinue: '',
      satisfaction: '',
      //untilAdopt
      isParticipant: '',
      firstContact: '',
      reasonFirstContact: '',
      considerationReason: '',
      otherSaas: '',
      considerationPeriod: '',
      sales: '',
      isDiscounted: '',
      discountRate: '',
      decision: '',
      // adoptiong
      onboadingSystem: '',
      onboadingPeriod: '',
      onboadingSatisfaction: '',
      isOperationParticipant: '',
      support: '',
      supportSatisfaction: '',
      utilization: '',
    },
    message: {
      // review
      title: '',
      good: '',
      bad: '',
      // basic
      price: '',
      //untilAdopt
      isParticipant: '',
      firstContact: '',
      reasonFirstContact: '',
      considerationReason: '',
      otherSaas: '',
      considerationPeriod: '',
      sales: '',
      isDiscounted: '',
      discountRate: '',
      decision: '',
      // adoptiong
      onboadingSystem: '',
      onboadingPeriod: '',
      onboadingSatisfaction: '',
      isOperationParticipant: '',
      support: '',
      supportSatisfaction: '',
      utilization: '',
    },
    uid: '',
    saasId: '',
    name: '',
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
    const { info, message, name, uid, loading } = this.state;

    return (
      <React.Fragment>
        <Header history={history} uid={uid} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            {name} 評価レポート
          </Typography>
          <ReviewTotal
            info={info}
            message={message}
            handleChange={event => this.handleChange(event)}
          />
          <ReviewBasic
            info={info}
            message={message}
            handleChange={event => this.handleChange(event)}
          />
          <div className={classes.buttonWrapper}>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={() => this.confirmReview()}
              className={classes.button}
            >
              確認ページへ進む
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddReview);
