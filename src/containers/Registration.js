import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Authentication } from '../modules';
import { MemberInfo, CompanyInfo, Header } from '../components';
import { ValidationUtil } from '../utils';
import icon from '../assets/icons-google.svg';

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
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 200,
    fontSize: 18,
  },
  center: {
    textAlign: 'center',
  },
  google: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    height: 30,
    marginRight: 10,
  },
});

class Registration extends Component {
  state = {
    info: {
      email: '',
      password: '',
      name: '',
      department: '',
      position: '',
      company: '',
      region: '',
      scale: '',
      serviceType: '',
    },
    message: {
      email: '',
      password: '',
      name: '',
      department: '',
      position: '',
      company: '',
      region: '',
      scale: '',
      serviceType: '',
    },
  };

  componentDidMount() {
    const { history } = this.props;
    Authentication.completeLoginWithGoogle(history);
  }

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

  canSubmit = () => {
    const i = this.state.info;
    const m = this.state.message;

    const infoValid =
      !i.email ||
      !i.password ||
      !i.name ||
      !i.department ||
      !i.position ||
      !i.company ||
      !i.region ||
      !i.scale ||
      !i.serviceType;
    const messageValid =
      !!m.email ||
      !!m.password ||
      !!m.name ||
      !!m.department ||
      !!m.position ||
      !!m.company ||
      !!m.region ||
      !!m.scale ||
      !!m.serviceType;
    return infoValid || messageValid;
  };

  render() {
    const { classes, history } = this.props;

    return (
      <React.Fragment>
        <Header history={history} />
        <main className={classes.layout}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              className={classes.title}
            >
              ユーザー登録
            </Typography>
            <React.Fragment>
              <Grid container spacing={24} />
              <MemberInfo
                history={history}
                name={this.state.info.name}
                email={this.state.info.email}
                password={this.state.info.password}
                handleChange={event => this.handleChange(event)}
                message={this.state.message}
              />
              <CompanyInfo
                history={history}
                department={this.state.info.department}
                position={this.state.info.position}
                company={this.state.info.company}
                region={this.state.info.region}
                scale={this.state.info.scale}
                serviceType={this.state.info.serviceType}
                handleChange={event => this.handleChange(event)}
                message={this.state.message}
              />
              <div className={classes.buttons}>
                <Button
                  disabled={this.canSubmit()}
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    Authentication.signupWithEmail(this.state.info, history)
                  }
                  className={classes.button}
                >
                  送信
                </Button>
              </div>
              <Grid item xs={12} sm={12} className={classes.text}>
                <Typography>または</Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.center}>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.google}
                  onClick={() => Authentication.loginWithGoogle()}
                >
                  <img src={icon} className={classes.icon} alt="icon" />
                  Googleでログイン
                </Button>
              </Grid>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
