import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyle from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { COMPANY } from '../config';
import { UrlUtil } from '../utils';

const styles = () => ({
  container: {
    marginTop: 30,
  },
  formControl: {
    minWidth: 200,
  },
});

const MemberInfo = props => {
  const {
    classes,
    history,
    email,
    password,
    name,
    company,
    region,
    scale,
    serviceType,
    department,
    position,
    handleChange,
  } = props;

  const companySelectMenu = [
    {
      label: '会社所在地',
      key: 'region',
      value: region,
      list: COMPANY.REGION,
    },
    {
      label: '会社規模',
      key: 'scale',
      value: scale,
      list: COMPANY.SCALE,
    },
    {
      label: '業種',
      key: 'serviceType',
      value: serviceType,
      list: COMPANY.SERVICE_TYPE,
    },
    {
      label: '部署',
      key: 'department',
      value: department,
      list: COMPANY.DEPARTMENT,
    },
    {
      label: '役職',
      key: 'position',
      value: position,
      list: COMPANY.POSITION,
    },
  ];

  const emailAndPassword = [
    {
      label: 'メールアドレス',
      key: 'email',
      value: email,
    },
    {
      label: 'パスワード',
      key: 'password',
      value: password,
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
                  onChange={event => handleChange(event)}
                />
              </Grid>
            )
          );
        })}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="name"
            label="ユーザー名"
            fullWidth
            autoComplete="fname"
            value={name}
            onChange={event => handleChange(event)}
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
            name="company"
            label="会社名"
            fullWidth
            value={company}
            onChange={event => handleChange(event)}
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
                  onChange={event => handleChange(event)}
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
    </React.Fragment>
  );
};

export default withStyle(styles)(MemberInfo);
