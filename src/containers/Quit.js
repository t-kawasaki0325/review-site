import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { Header, Sidebar } from '../components';
import { Authentication } from '../modules';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  title: {
    margin: theme.spacing.unit * 4,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
});

class Quit extends Component {
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
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar user={user} link={true} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  className={classes.title}
                  gutterBottom
                >
                  退会する
                </Typography>
                {user && (
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Typography>保持しているポイント</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{user.point}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
                <Typography align="center" className={classes.title}>
                  退会の手続きを行うと下記のポイントが失効されます。
                </Typography>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                    className={classes.button}
                  >
                    退会する
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Quit);
