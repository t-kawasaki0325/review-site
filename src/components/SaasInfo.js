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
import CircularProgress from '@material-ui/core/CircularProgress';

import { Saas } from '../modules';
import { COMPANY, SAAS } from '../config';
import { Message } from '../components';

const styles = theme => ({
  container: {
    marginTop: 30,
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
  formControl: {
    minWidth: 200,
  },
});

class SaasInfo extends Component {
  state = {
    company: '',
    scale: 0,
    serviceType: 0,
    region: 0,
    name: '',
    category: 0,
    loading: false,
    message: '',
  };

  registerSaas = async info => {
    this.setState({ loading: true });
    const message = await Saas.registerProduct(info);
    this.setState({ loading: false, message: message });
  };

  render() {
    const { classes } = this.props;

    const info = {
      company: this.state.company,
      scale: this.state.scale,
      serviceType: this.state.serviceType,
      region: this.state.region,
      name: this.state.name,
      category: this.state.category,
    };

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
              label="会社名"
              fullWidth
              value={this.state.company}
              onChange={event => this.setState({ company: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>会社規模</InputLabel>
              <Select
                value={this.state.scale}
                onChange={event => this.setState({ scale: event.target.value })}
              >
                {COMPANY.SCALE.map((element, index) => {
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
                onChange={event =>
                  this.setState({ serviceType: event.target.value })
                }
              >
                {COMPANY.SERVICE_TYPE.map((element, index) => {
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
              <InputLabel>会社所在地</InputLabel>
              <Select
                value={this.state.region}
                onChange={event =>
                  this.setState({ region: event.target.value })
                }
              >
                {COMPANY.REGION.map((element, index) => {
                  return (
                    <MenuItem key={index} value={index}>
                      {element}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom>
              Saas情報
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="SaaS名"
              fullWidth
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel>製品カテゴリ</InputLabel>
              <Select
                value={this.state.category}
                onChange={event =>
                  this.setState({ category: event.target.value })
                }
              >
                {SAAS.CATEGORY.map((element, index) => {
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
            disabled={this.state.loading}
            variant="contained"
            color="primary"
            onClick={() => this.registerSaas(info)}
            className={classes.button}
          >
            送信
          </Button>
          {this.state.loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        {this.state.message && (
          <Message type="info" error={this.state.message} />
        )}
      </React.Fragment>
    );
  }
}

export default withStyle(styles)(SaasInfo);
