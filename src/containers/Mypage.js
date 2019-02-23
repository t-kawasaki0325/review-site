import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { MemberInfo, CompanyInfo, Header } from '../components';
import { Authentication } from '../modules';

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
  google: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    height: 30,
    marginRight: 10,
  },
});

class Mypage extends Component {
  state = {
    uid: '',
    name: '',
    department: '',
    position: '',
    company: '',
    region: '',
    scale: '',
    serviceType: '',
  };

  async componentDidMount() {
    const uid = await Authentication.transitionLoginIfNotLogin();
    const userSnapshot = await Authentication.fetchUserDataById(uid);
    const user = userSnapshot.data();
    const companySnapshot = await user.companyRef.get();
    const company = companySnapshot.data();

    this.setState({ uid: uid });
    this.setState({ name: user.name });
    this.setState({ department: user.department });
    this.setState({ position: user.position });
    this.setState({ company: company.name });
    this.setState({ region: company.region });
    this.setState({ scale: company.scale });
    this.setState({ serviceType: company.serviceType });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, history } = this.props;

    const info = {
      uid: this.state.uid,
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
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
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
            />
            <CompanyInfo
              company={info.company}
              region={info.region}
              scale={info.scale}
              serviceType={info.serviceType}
              position={info.position}
              department={info.department}
              handleChange={event => this.handleChange(event)}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => Authentication.updateUserInfo(info)}
                className={classes.button}
              >
                送信
              </Button>
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
