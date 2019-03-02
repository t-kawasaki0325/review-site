import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MemberInfo, CompanyInfo, Header, Message } from '../components';
import { Authentication } from '../modules';
import { ValidationUtil } from '../utils';

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
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 8,
    position: 'relative',
  },
  button: {
    minWidth: 200,
    fontSize: 18,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
});

class Mypage extends Component {
  state = {
    info: {
      uid: '',
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
    loading: true,
    error: '',
  };

  async componentDidMount() {
    const uid = await Authentication.transitionLoginIfNotLogin();
    const userSnapshot = await Authentication.fetchUserDataById(uid);
    const user = userSnapshot.data();
    const companySnapshot = await user.companyRef.get();
    const company = companySnapshot.data();

    const info = {
      uid: uid,
      name: user.name,
      department: user.department,
      position: user.position,
      company: company.name,
      region: company.region,
      scale: company.scale,
      serviceType: company.serviceType,
    };

    this.setState({ info: info, loading: false });
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
    return infoValid || messageValid || this.state.loading;
  };

  updateUserInfo = async () => {
    this.setState({ loading: true });
    const message = await Authentication.updateUserInfo(this.state.info);
    this.setState({ loading: false, error: message });
  };

  render() {
    const { classes, history } = this.props;

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {this.state.error && (
              <Message type="info" error={this.state.error} />
            )}
            <Typography
              component="h1"
              variant="h4"
              align="center"
              className={classes.title}
            >
              マイページ編集
            </Typography>
            <MemberInfo
              history={history}
              name={this.state.info.name}
              handleChange={event => this.handleChange(event)}
              message={this.state.message}
            />
            <CompanyInfo
              company={this.state.info.company}
              region={this.state.info.region}
              scale={this.state.info.scale}
              serviceType={this.state.info.serviceType}
              position={this.state.info.position}
              department={this.state.info.department}
              handleChange={event => this.handleChange(event)}
              message={this.state.message}
            />
            <div className={classes.buttons}>
              <Button
                disabled={this.canSubmit()}
                variant="contained"
                color="primary"
                onClick={() => this.updateUserInfo()}
                className={classes.button}
              >
                送信
              </Button>
              {this.state.loading && (
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

Mypage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mypage);
