import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import icon from '../assets/icons-google.svg';

import { Header, Email, Password } from '../components';
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
  submit: {
    marginTop: theme.spacing.unit * 3,
    fontSize: 18,
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
  };

  componentDidMount() {
    const { history } = this.props;
    Authentication.completeLoginWithGoogle(history);
  }

  handleChange = event => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      info: { ...this.state.info, [key]: value },
    });
    this.setState({
      message: {
        ...this.state.message,
        [key]: ValidationUtil.formValidate(key, value),
      },
    });
  };

  canSubmit = () => {
    const info = this.state.info;
    const message = this.state.message;

    const infoValid = !info.email && !info.password;
    const messageValid = !!message.email || !!message.password;
    return infoValid || messageValid;
  };

  render() {
    const { classes, history } = this.props;

    return (
      <React.Fragment>
        <Header history={history} />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <div className={classes.form}>
              <Email
                value={this.state.info.email}
                handleChange={event => this.handleChange(event)}
                message={this.state.message.email}
              />
              <Password
                value={this.state.info.password}
                handleChange={event => this.handleChange(event)}
                message={this.state.message.password}
              />
              <Button
                disabled={this.canSubmit()}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() =>
                  Authentication.loginWithEmail(
                    this.state.info.email,
                    this.state.info.password,
                    history
                  )
                }
              >
                ログイン
              </Button>
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
