import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Authentication } from '../modules';
import { MemberInfo } from '../components';

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
  title: {
    margin: theme.spacing.unit * 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

class UserInfo extends Component {
  state = {
    name: '',
    department: '',
    position: '',
    company: '',
    region: '',
    scale: '',
    serviceType: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, history } = this.props;

    const info = {
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
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              className={classes.title}
            >
              ユーザー情報
            </Typography>
            <React.Fragment>
              <MemberInfo
                history={history}
                name={this.state.name}
                department={this.state.department}
                position={this.state.position}
                company={this.state.company}
                region={this.state.region}
                scale={this.state.scale}
                serviceType={this.state.serviceType}
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
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserInfo);
