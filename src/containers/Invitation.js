import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Header, Sidebar, Email } from '../components';
import { Authentication } from '../modules';
import { ValidationUtil } from '../utils';

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
  buttonWrapper: {
    margin: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
});

class Invitation extends Component {
  state = {
    uid: '',
    user: '',
    info: { email: '' },
    message: { email: '' },
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const snapshot = await Authentication.fetchUserDataById(uid);
    this.setState({ uid: uid, user: snapshot.data() });
  }

  handleChange = event => {
    const key = event.target.name;
    const type = event.target.type;
    const value = event.target.value;
    const { info, message } = this.state;

    this.setState({
      info: { ...info, [key]: value },
    });
    this.setState({
      message: {
        ...message,
        [key]: ValidationUtil.formValidate(type, value),
      },
    });
  };

  render() {
    const { history, classes } = this.props;
    const { uid, user, info, message } = this.state;

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
                >
                  ユーザー招待
                </Typography>
                <Typography>
                  招待したいユーザーのメールアドレスを記入して送信してください。
                </Typography>
                <Email
                  value={info.email}
                  handleChange={event => this.handleChange(event)}
                  message={message.email}
                />
                <Grid item xs={12} sm={12} className={classes.buttonWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                  >
                    招待する
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Invitation);
