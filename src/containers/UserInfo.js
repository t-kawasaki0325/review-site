import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Authentication } from '../modules';
import { MemberInfo, CompanyInfo } from '../components';
import { UrlUtil, ValidationUtil } from '../utils';

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
    info: {
      name: '',
      department: '',
      position: '',
      company: '',
      region: '',
      scale: '',
      serviceType: '',
    },
    message: {
      name: '',
      department: '',
      position: '',
      company: '',
      region: '',
      scale: '',
      serviceType: '',
    },
  };

  async componentDidMount() {
    const { history } = this.props;
    await Authentication.transisionTopIfLogin(history);
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
      !i.name ||
      !i.department ||
      !i.position ||
      !i.company ||
      !i.region ||
      !i.scale ||
      !i.serviceType;
    const messageValid =
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
                name={this.state.info.name}
                handleChange={event => this.handleChange(event)}
                message={this.state.message}
              />
              <CompanyInfo
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
                  onClick={() => {
                    const uid = UrlUtil.baseUrl(history.location.pathname);
                    Authentication.createNewUser(uid, this.state.info, history);
                  }}
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
