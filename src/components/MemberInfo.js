import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Authentication } from '../modules';
import { COMPANY, PATH } from '../config';
import { UrlUtil } from '../utils';

const styles = theme => ({
  container: {
    marginTop: 30,
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
  formControl: {
    minWidth: 200,
  },
});

class MemberInfo extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    company: '',
    region: 0,
    scale: 0,
    serviceType: 0,
    department: 0,
    position: 0,
  };

  registerUserInfo(history, info) {
    switch (history.location.pathname) {
      case PATH.REGISTRATION:
        Authentication.signupWithEmail(info, history);
        break;
      case UrlUtil.matchUserId(history.location.pathname): {
        const uid = UrlUtil.baseUrl(history.location.pathname);
        Authentication.createNewUser(uid, info, history);
        break;
      }
      default:
        break;
    }
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

    const companySelectMenu = [
      {
        label: '会社所在地',
        key: 'region',
        value: this.state.region,
        list: COMPANY.REGION,
      },
      {
        label: '会社規模',
        key: 'scale',
        value: this.state.scale,
        list: COMPANY.SCALE,
      },
      {
        label: '業種',
        key: 'serviceType',
        value: this.state.serviceType,
        list: COMPANY.SERVICE_TYPE,
      },
      {
        label: '部署',
        key: 'department',
        value: this.state.department,
        list: COMPANY.DEPARTMENT,
      },
      {
        label: '役職',
        key: 'position',
        value: this.state.position,
        list: COMPANY.POSITION,
      },
    ];

    const emailAndPassword = [
      {
        label: 'メールアドレス',
        key: 'email',
        value: this.state.email,
      },
      {
        label: 'パスワード',
        key: 'password',
        value: this.state.password,
      },
    ];

    return (
      <React.Fragment>
        <Grid container spacing={24} className={classes.container}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              会員情報
            </Typography>
          </Grid>
          {emailAndPassword.map((element, index) => {
            return (
              UrlUtil.isRegistrationPage(history) && (
                <Grid key={index} item xs={12} sm={6}>
                  <TextField
                    required
                    name={element.key}
                    value={element.value}
                    type={element.key}
                    label={element.label}
                    fullWidth
                    onChange={event => this.handleChange(event)}
                  />
                </Grid>
              )
            );
          })}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="ユーザー名"
              fullWidth
              autoComplete="fname"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              会社情報
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="会社名"
              fullWidth
              value={this.state.company}
              onChange={event => this.setState({ company: event.target.value })}
            />
          </Grid>
          {companySelectMenu.map((companyInfo, index) => {
            return (
              <Grid key={index} item xs={12} sm={6}>
                <FormControl required className={classes.formControl}>
                  <InputLabel>{companyInfo.label}</InputLabel>
                  <Select
                    name={companyInfo.key}
                    value={companyInfo.value}
                    onChange={event => this.handleChange(event)}
                  >
                    {companyInfo.list.map((element, index) => {
                      return (
                        <MenuItem key={index} value={index}>
                          {element}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.registerUserInfo(history, info)}
            className={classes.button}
          >
            送信
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyle(styles)(MemberInfo);
