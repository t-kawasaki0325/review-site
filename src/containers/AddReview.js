import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Header } from '../components';
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
  formControl: {
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
        list: REVIEW.UNTIL_ADOPT.OPPORTUNITY,
      },
      {
        label: '企業との初回接点',
        value: this.state.info.firstContact,
        key: 'firstContact',
        list: REVIEW.UNTIL_ADOPT.FIRST_CONTACT,
      },
      {
        label: '検討理由',
        value: this.state.info.considerationReason,
        key: 'considerationReason',
        list: REVIEW.UNTIL_ADOPT.REASON,
      },
      {
        label: '検討期間',
        value: this.state.info.considerationPeriod,
        key: 'considerationPeriod',
        list: REVIEW.UNTIL_ADOPT.PERIOD,
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <div className={classes.container}>
            <Typography component="h1" variant="h4" className={classes.title}>
              SaaS評価レポート
            </Typography>
            <Typography component="h1" variant="h6" gutterBottom>
              全体的な満足度
            </Typography>
            <Paper className={classes.paper}>
              <Table>
                <TableBody>
                  {reviewCell.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Typography>{data.label}</Typography>
                        </TableCell>
                        <TableCell>
                          <FormControl className={classes.formControl}>
                            <InputLabel>{data.label}</InputLabel>
                            <Select
                              name={data.key}
                              value={data.value}
                              onChange={event => this.handleChange(event)}
                            >
                              {data.list.map((element, index) => {
                                return (
                                  <MenuItem key={index} value={index}>
                                    {element}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
                  {untilAdopt.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Typography>{data.label}</Typography>
                        </TableCell>
                        <TableCell>
                          <FormControl className={classes.formControl}>
                            <InputLabel>{data.label}</InputLabel>
                            <Select
                              name={data.key}
                              value={data.value}
                              onChange={event => this.handleChange(event)}
                            >
                              {data.list.map((element, index) => {
                                return (
                                  <MenuItem key={index} value={index}>
                                    {element}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddReview);
