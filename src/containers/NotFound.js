import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Header } from '../components';
import { Authentication } from '../modules';
import { PATH } from '../config';

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  buttonWrapeer: {
    margin: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
  },
});

class NotFound extends Component {
  state = {
    uid: '',
  };

  async componentDidMount() {
    const uid = await Authentication.fetchUserId();
    this.setState({ uid: uid });
  }
  render() {
    const { uid } = this.state;
    const { history, classes } = this.props;

    return (
      <React.Fragment>
        <Header history={history} uid={uid} />
        <CssBaseline />
        <main>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            Page Not Found
          </Typography>
          <Typography component="h1" variant="h5" align="center">
            お探しのページは見つかりませんでした
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} className={classes.buttonWrapeer}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() =>
                  uid ? history.push(PATH.TOP) : history.push(PATH.ROOT)
                }
              >
                トップに戻る
              </Button>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NotFound);
