import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Header } from '../components';
import { Authentication } from '../modules';

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
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
  currentPoint: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 4,
    textAlign: 'right',
    fontSize: 20,
  },
});

class PointHistory extends Component {
  state = {
    uid: '',
    user: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const snapshot = await Authentication.fetchUserDataById(uid);
    this.setState({ uid: uid, user: snapshot.data() });
  }

  render() {
    const { history, classes } = this.props;
    const { uid, user } = this.state;

    return (
      <React.Fragment>
        <Header uid={uid} history={history} />
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              className={classes.title}
            >
              ポイント履歴
            </Typography>
            {user && (
              <Table>
                <TableBody>
                  {user.point_history.map((element, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Typography>{element.event}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{element.value}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            <Typography className={classes.currentPoint}>
              保有ポイント: {user && user.point}
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PointHistory);
