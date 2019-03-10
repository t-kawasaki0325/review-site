import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import { Authentication } from '../modules';
import { Header, TableSelect, TableText } from '../components';
import { COMPANY, SAAS } from '../config';

const styles = theme => ({
  layout: {
    display: 'flex',
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.white,
    color: theme.palette.common.grey,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
  },
  textCenter: {
    textAlign: 'center',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class Root extends Component {
  state = {
    keyword: '',
    category: '',
    serviceType: '',
    scale: '',
    region: '',
  };

  componentDidMount() {
    Authentication.transisionTopIfLogin();
  }

  render() {
    const { history, classes } = this.props;

    const searchText = [
      {
        label: 'キーワード',
        value: this.state.keyword,
        key: 'keyword',
      },
    ];

    const searchCell = [
      {
        label: '製品カテゴリ',
        value: this.state.category,
        key: 'category',
        list: SAAS.CATEGORY,
      },
      {
        label: '業種',
        value: this.state.serviceType,
        key: 'serviceType',
        list: COMPANY.SERVICE_TYPE,
      },
      {
        label: '会社規模',
        value: this.state.scale,
        key: 'scale',
        list: COMPANY.SCALE,
      },
      {
        label: '会社地域',
        value: this.state.region,
        key: 'region',
        list: COMPANY.REGION,
      },
    ];

    return (
      <React.Fragment>
        <CssBaseline />
        <Header history={history} />
        <main>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container className={classes.layout}>
              <Grid item md={12}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    className={classes.textCenter}
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    口コミから探す優良SaaS
                  </Typography>
                  <Table>
                    <TableBody>
                      <TableText
                        list={searchText}
                        handleChange={event => this.handleChange(event)}
                      />
                      <TableSelect
                        list={searchCell}
                        handleChange={event => this.handleChange(event)}
                      />
                    </TableBody>
                  </Table>
                  <Grid container spacing={24}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      className={classes.buttonContainer}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.searchSaas()}
                      >
                        検索する
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Root);
