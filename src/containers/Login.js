import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import icon from '../assets/icons-google.svg';
import { Authentication } from '../modules';

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
    email: '',
    password: '',
  };

  componentDidMount() {
    const { history } = this.props;
    Authentication.completeLoginWithGoogle(history);
  }

  handleChange = event => {
    this.setState({ [event.target.type]: event.target.value });
  };

  render() {
    const { classes, history } = this.props;
    const formList = [
      {
        title: 'メールアドレス',
        value: this.state.email,
        type: 'email',
      },
      {
        title: 'パスワード',
        value: this.state.password,
        type: 'password',
      },
    ];

    return (
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
            {formList.map((element, index) => {
              return (
                <FormControl key={index} margin="normal" required fullWidth>
                  <InputLabel htmlFor={element.type}>
                    {element.title}
                  </InputLabel>
                  <Input
                    type={element.type}
                    autoComplete={element.type}
                    autoFocus
                    value={element.value}
                    onChange={event => this.handleChange(event)}
                  />
                </FormControl>
              );
            })}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() =>
                Authentication.loginWithEmail(
                  this.state.email,
                  this.state.password,
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
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
