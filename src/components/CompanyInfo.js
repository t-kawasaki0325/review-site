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

const CompanyInfo = props => {
  const {
    classes,
    region,
    scale,
    serviceType,
    department,
    position,
    company,
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

  return (
    <React.Fragment>
      <Grid container spacing={24} className={classes.container}>
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

export default withStyle(styles)(CompanyInfo);
