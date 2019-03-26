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
import { Evaluation } from '../modules';
import { SAAS, REVIEW, PATH } from '../config';

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
    uid: '',
    saasId: '',
    info: '',
    loading: false,
  };

  async componentDidMount() {
    const { location, history } = this.props;
    if (!location.state) {
      history.push(PATH.SAAS_LIST);
      return;
    }

    const { uid, saasId, info } = location.state.state;
    this.setState({ info: info, saasId: saasId, uid: uid });
  }

  render() {
    const { classes, history } = this.props;
    const { uid, saasId, info } = this.state;

    const reviewCell = [
      {
        label: SAAS.RADAR.recommendation,
        answer: REVIEW.RECOMMENDATION_LEVEL[info.recommendation],
      },
      {
        label: REVIEW.TOTAL_TITLE.TITLE,
        answer: info.title,
      },
      {
        label: REVIEW.TOTAL_TITLE.GOOD,
        answer: info.good,
      },
      {
        label: REVIEW.TOTAL_TITLE.BAD,
        answer: info.bad,
      },
    ];

    const basicCell = [
      {
        label: REVIEW.BASIC_TITLE.IS_ADMIN,
        answer: REVIEW.YES_OR_NO[info.isAdmin],
      },
      {
        label: SAAS.RADAR.satisfaction,
        answer: REVIEW.SATISFACTION_LEVEL[info.satisfaction],
        display: !!info.satisfaction,
      },
      {
        label: REVIEW.BASIC_TITLE.CONTRACT_STATUS,
        answer: REVIEW.BASIC.CONTRACT_STATUS[info.contractStatus],
        display: info.contractStatus,
      },
      {
        label: REVIEW.BASIC_TITLE.CONTRACT_DATE,
        answer: `${REVIEW.YEAR[info.contractYear]} 年 ${
          REVIEW.MONTH[info.contractMonth]
        } 月`,
        display: !!(info.contractYear && info.contractMonth),
      },
      {
        label: REVIEW.BASIC_TITLE.CONTRACT_PERIOD,
        answer: REVIEW.BASIC.CONTRACT_PERIOD[info.contractPeriod],
        display: !!info.contractPeriod,
      },
      {
        label: REVIEW.BASIC_TITLE.PRICE,
        answer: `${REVIEW.BASIC.PRICE_OPTION[info.priceOption]} ${
          info.price
        } 円`,
        display: !!info.price,
      },
      {
        label: REVIEW.BASIC_TITLE.PRICE_SATISFACTION,
        answer: REVIEW.SATISFACTION_LEVEL[info.priceSatisfaction],
        display: !!info.priceSatisfaction,
      },
      {
        label: REVIEW.BASIC_TITLE.LISENCE_NUM,
        answer: REVIEW.BASIC.LISENCE_NUM[info.licenseNum],
        display: !!info.licenseNum,
      },
      {
        label: REVIEW.BASIC_TITLE.IS_CONTINUE,
        answer: REVIEW.YES_OR_NO[info.isContinue],
        display: !!info.isContinue,
      },
      {
        label: REVIEW.BASIC_TITLE.REASON_NOT_CONTINUE,
        answer: info.reasonNotContinue,
        display: !!info.reasonNotContinue,
      },
    ];

    const untilAdoptCell = [
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.IS_PARTICIPANT,
        answer: REVIEW.YES_OR_NO[info.isParticipant],
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.FIRST_CONTACT,
        answer: REVIEW.UNTIL_ADOPT.FIRST_CONTACT[info.firstContact],
        display: !!info.firstContact,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.REASON_FIRST_CONTACT,
        answer: info.reasonFirstContact,
        display: !!info.reasonFirstContact,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.CONSIDERATION_REASON,
        answer: info.considerationReason,
        display: !!info.considerationReason,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.OTHER_SAAS,
        answer: info.otherSaas,
        display: !!info.otherSaas,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.CONSIDERATION_PERIOD,
        answer: REVIEW.UNTIL_ADOPT.PERIOD[info.considerrationPeriod],
        display: !!info.considerrationPeriod,
      },
      {
        label: SAAS.RADAR.sales,
        answer: REVIEW.SATISFACTION_LEVEL[info.sales],
        display: !!info.sales,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.IS_DISCOUNTED,
        answer: REVIEW.UNTIL_ADOPT.IS_DISCOUNTED[info.isDiscounted],
        display: !!info.isDiscounted,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.DISCOUNT_RATE,
        answer: REVIEW.UNTIL_ADOPT.DISCOUNT_RATE[info.discountRate],
        display: !!info.discountRate,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.DECISION,
        answer: info.decision,
        display: !!info.decision,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_SYSTEM,
        answer: `${
          info.onboadingSystemA ? REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[0] : ''
        } ${
          info.onboadingSystemB ? REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[1] : ''
        } ${
          info.onboadingSystemC ? REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[2] : ''
        }`,
        display:
          info.onboadingSystemA ||
          info.onboadingSystemB ||
          info.onboadingSystemC,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_PERIOD,
        answer: REVIEW.UNTIL_ADOPT.ONBOADING_PERIOD[info.onboadingPeriod],
        display: !!info.onboadingPeriod,
      },
      {
        label: REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_SATISFACTION,
        answer: REVIEW.SATISFACTION_LEVEL[info.onboadingSatisfaction],
        display: !!info.onboadingSatisfaction,
      },
    ];

    const adoptingCell = [
      {
        label: REVIEW.ADOPTING_TITLE.IS_OPERATION_PARTICIPANT,
        answer: REVIEW.YES_OR_NO[info.isOperationParticipant],
      },
      {
        label: SAAS.RADAR.support,
        answer: REVIEW.SATISFACTION_LEVEL[info.support],
        display: !!info.support,
      },
      {
        label: REVIEW.ADOPTING_TITLE.SUPPORT_SATISFACTION,
        answer: info.supportSatisfaction,
        display: !!info.supportSatisfaction,
      },
      {
        label: SAAS.RADAR.utilization,
        answer: REVIEW.SATISFACTION_LEVEL[info.utilization],
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} uid={uid} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            確認ページ
          </Typography>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              全体評価レビュー
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
              現在の契約状況について
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={basicCell} />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              導入にあたって
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={untilAdoptCell} />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.container}>
            <Typography component="h1" variant="h6" gutterBottom>
              導入後の状況
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  <TableConfirm list={adoptingCell} />
                </TableBody>
              </Table>
            </Paper>
          </div>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Evaluation.addReview(uid, saasId, info, history)}
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
