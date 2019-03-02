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
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
  },
  container: {
    marginTop: 30,
  },
  formControl: {
    minWidth: 200,
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

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
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
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddReview);
