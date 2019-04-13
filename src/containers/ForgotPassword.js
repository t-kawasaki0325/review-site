import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Header, Email, Message } from '../components';
import { Authentication } from '../modules';
import { ValidationUtil } from '../utils';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  title: {
    marginBottom: theme.spacing.unit * 4,
  },
  wrapper: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    position: 'relative',
  },
  submit: {
    fontSize: 18,
  },
});

class ForgotPassword extends Component {
  state = {
    info: {
      email: '',
    },
    message: {
      email: '',
    },
    messageTop: '',
    loading: true,
  };

  async componentDidMount() {
    const { history } = this.props;

    await Authentication.transisionTopIfLogin(history);
    this.setState({ loading: false });
  }

  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    const { info, message } = this.state;

    this.setState({
      info: { ...info, [key]: value },
    });
    this.setState({
      message: {
        ...message,
        [key]: ValidationUtil.formValidate(key, value),
      },
    });
  };

  canSubmit = () => {
    const { info, message, loading } = this.state;

    return !info.email || !!message.email || loading;
  };

  resetPasswordEmailSend = async email => {
    const message = await Authentication.resetPassword(email);
    this.setState({ messageTop: message });
  };

  render() {
    const { history, classes } = this.props;
    const { info, message, loading, messageTop } = this.state;

    return (
      <React.Fragment>
        <Header history={history} />
        <main className={classes.main}>
          <CssBaseline />
          <div className={classes.appBarSpacer} />
          <Paper className={classes.paper}>
            {messageTop && (
              <Message error={messageTop.message} type={messageTop.type} />
            )}
            <Typography component="h1" variant="h5" className={classes.title}>
              パスワードを忘れた方
            </Typography>
            <Typography component="h1">
              ご登録されたメールアドレスを入力して「送信する」ボタンを押してください
            </Typography>
            <Email
              value={info.email}
              handleChange={event => this.handleChange(event)}
              message={message.email}
            />
            <div className={classes.wrapper}>
              <Button
                disabled={this.canSubmit()}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.resetPasswordEmailSend(info.email)}
              >
                送信する
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
