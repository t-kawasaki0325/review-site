import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Authentication from '../components';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Registration extends Component {
  state = {
    company: '',
    scale: 0,
    category: 0,
    position: 0,
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Button
            fullWidth
            variant="contained"
            color="default"
            className={classes.submit}
            onClick={() => Authentication.loginWithGoogle()}
          >
            Googleでログイン
          </Button>
          <Typography variant="h6" gutterBottom>
            またはメールアドレスでも登録できます
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="メールアドレス"
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="パスワード"
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="ユーザー名"
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                会社情報
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="会社名"
                fullWidth
                autoComplete="billing address-line2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="会社規模"
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="業種" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="役職"
                fullWidth
                autoComplete="billing postal-code"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() =>
              Authentication.signupWithEmail(
                this.state.email,
                this.state.password
              )
            }
          >
            登録する
          </Button>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Registration);
