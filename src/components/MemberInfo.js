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

import { SCALE, SERVICE_TYPE, DEPARTMENT, POSITION } from '../config';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    minWidth: 200,
  },
});

class MemberInfo extends Component {
  state = {
    user: '',
    company: '',
    scale: 0,
    serviceType: 0,
    department: 0,
    position: 0,
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="ユーザー名"
              fullWidth
              autoComplete="fname"
              value={this.state.user}
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
              autoComplete="lname"
              value={this.state.company}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>会社規模</InputLabel>
              <Select value={this.state.scale} onChange={this.handleChange}>
                {SCALE.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>業種</InputLabel>
              <Select
                value={this.state.serviceType}
                onChange={this.handleChange}
              >
                {SERVICE_TYPE.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>部署</InputLabel>
              <Select
                value={this.state.department}
                onChange={this.handleChange}
              >
                {DEPARTMENT.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>役職</InputLabel>
              <Select value={this.state.position} onChange={this.handleChange}>
                {POSITION.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleNext}
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
