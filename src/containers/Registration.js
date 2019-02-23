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
    email: '',
    password: '',
    name: '',
    department: '',
    position: '',
    company: '',
    region: '',
    scale: '',
    serviceType: '',
  };

  componentDidMount() {
    const { history } = this.props;
    Authentication.completeLoginWithGoogle(history);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, history } = this.props;

    const info = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      company: this.state.company,
      region: this.state.region,
      scale: this.state.scale,
      serviceType: this.state.serviceType,
      department: this.state.department,
      position: this.state.position,
    };

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
                name={info.name}
                email={info.email}
                password={info.password}
                handleChange={event => this.handleChange(event)}
              />
              <CompanyInfo
                history={history}
                department={info.department}
                position={info.position}
                company={info.company}
                region={info.region}
                scale={info.scale}
                serviceType={info.serviceType}
                handleChange={event => this.handleChange(event)}
              />
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => Authentication.signupWithEmail(info, history)}
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
