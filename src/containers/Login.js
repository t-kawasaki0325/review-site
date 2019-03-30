import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import icon from '../assets/icons-google.svg';

import { Header, Email, Password, Message } from '../components';
import { Authentication } from '../modules';
import { ValidationUtil } from '../utils';
import { PATH } from '../config';

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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  wrapper: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    position: 'relative',
  },
  submit: {
    fontSize: 18,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  icon: {
    height: 30,
    marginRight: 10,
  },
});

class Login extends Component {
  state = {
    info: {
      email: '',
      password: '',
    },
    message: {
      email: '',
      password: '',
    },
    loading: true,
    error: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const result = await Authentication.completeLoginWithGoogle();
    if (result && result.isNewUser) {
      history.push(`${PATH.REGISTRATION}/${result.user.uid}`);
      return;
    }

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

    const infoValid = !info.email || !info.password;
    const messageValid = !!message.email || !!message.password;
    return infoValid || messageValid || loading;
  };

  loginWithEmail = async () => {
    const { history } = this.props;
    const { email, password } = this.state.info;

    this.setState({ loading: true });
    const message = await Authentication.loginWithEmail(
      email,
      password,
      history
    );
    this.setState({ error: message, loading: false });
  };

  render() {
    const { classes, history } = this.props;
    const { error, info, message, loading } = this.state;

    return (
      <React.Fragment>
        <Header history={history} />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            {error && <Message error={error} type="error" />}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <div className={classes.form}>
              <Email
                value={info.email}
                handleChange={event => this.handleChange(event)}
                message={message.email}
              />
              <Password
                value={info.password}
                handleChange={event => this.handleChange(event)}
                message={message.password}
              />
              <div className={classes.wrapper}>
                <Button
                  disabled={this.canSubmit()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => this.loginWithEmail()}
                >
                  ログイン
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <Typography className={classes.text}>または</Typography>
              <Button
                fullWidth
                variant="contained"
                color="default"
                onClick={() => Authentication.loginWithGoogle()}
              >
                <img src={icon} className={classes.icon} alt="icon" />
                Googleでログイン
              </Button>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
