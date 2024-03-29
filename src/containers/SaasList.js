import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import { Saas, Authentication } from '../modules';
import { SAAS, COMPANY } from '../config';
import {
  Header,
  SaasTable,
  TableSelect,
  TableText,
  SelectMenu,
} from '../components';

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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh',
    overflow: 'auto',
  },
  formControl: {
    minWidth: 200,
  },
  title: {
    marginBottom: theme.spacing.unit,
  },
  searchList: {
    marginBottom: theme.spacing.unit * 6,
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
  },
  saas: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 5,
  },
  saasTitle: {
    padding: 0,
    fontWeight: 550,
  },
});

class SaasList extends Component {
  state = {
    uid: '',
    snapshotList: '',
    sortBy: '',
    sortList: '',
    keyword: '',
    category: 0,
    serviceType: 0,
    scale: 0,
    region: 0,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.setState({
      sortList: Object.keys(SAAS.SORT),
      sortBy: Object.keys(SAAS.SORT)[0],
    });
    if (location.state) {
      this.setState(location.state.search);
    }
    await this.searchSaas();

    const uid = await Authentication.fetchUserId();
    this.setState({ uid: uid });
  }

  searchSaas = async () => {
    const query = {
      keyword: this.state.keyword,
      category: this.state.category,
      companyServiceType: this.state.serviceType,
      companyScale: this.state.scale,
      companyRegion: this.state.region,
    };

    const snapshotList = await Saas.searchSaas(this.state.sortBy, query);
    this.setState({ snapshotList: snapshotList });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  formatSortList = () => {
    const { sortList } = this.state;

    if (!sortList) return [];

    return sortList.map(element => {
      return { title: SAAS.SORT[element], value: element };
    });
  };

  render() {
    const { classes, history } = this.props;
    const { snapshotList } = this.state;

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
        <Header history={history} uid={this.state.uid} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            SaaS一覧
          </Typography>
          <Paper className={classes.searchList}>
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
              <Grid item xs={12} sm={12} className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.searchSaas()}
                >
                  検索する
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Typography component="h1" variant="h5" className={classes.title}>
            検索結果
          </Typography>
          <SelectMenu
            value={this.state.sortBy}
            handleChange={e => {
              this.setState({ sortBy: e.target.value });
              this.searchSaas();
            }}
            menu={this.formatSortList()}
          />
          {snapshotList &&
            snapshotList.map(doc => {
              const saas = doc.data();

              return (
                <Paper key={doc.id} className={classes.saas}>
                  <SaasTable saasId={doc.id} saas={saas} />
                </Paper>
              );
            })}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasList);
