import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import {
  MemberInfo,
  CompanyInfo,
  Header,
  Message,
  Sidebar,
} from '../components';
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
    user: '',
    loading: true,
    error: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const userSnapshot = await Authentication.fetchUserDataById(uid);
    const user = userSnapshot.data();
    const companySnapshot = await user.company_ref.get();
    const company = companySnapshot.data();

    const info = {
      uid: uid,
      name: user.name,
      department: user.department,
      position: user.position,
      company: company.name,
      region: company.region,
      scale: company.scale,
      serviceType: company.service_type,
    };

    this.setState({ info: info, loading: false, user: user });
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
    const { user, info, message, error, loading } = this.state;

    return (
      <React.Fragment>
        <Header history={history} uid={info.uid} />
        <CssBaseline />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar user={user} link={true} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                {error && <Message type="info" message={error} />}
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
                  name={info.name}
                  handleChange={event => this.handleChange(event)}
                  message={message}
                />
                <CompanyInfo
                  company={info.company}
                  region={info.region}
                  scale={info.scale}
                  serviceType={info.serviceType}
                  position={info.position}
                  department={info.department}
                  handleChange={event => this.handleChange(event)}
                  message={message}
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
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

Mypage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mypage);
