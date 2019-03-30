import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { Authentication, Saas } from '../modules';
import { Header, TableSelect, TableText, SaasTable } from '../components';
import { COMPANY, SAAS, PATH } from '../config';
import { UrlUtil } from '../utils';

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
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit * 2,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class Root extends Component {
  state = {
    search: {
      keyword: '',
      category: '',
      serviceType: '',
      scale: '',
      region: '',
    },
    snapshot: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    Authentication.transisionTopIfLogin(history);

    const popularItem = await Saas.recentlyManyViewed();
    this.setState({ snapshot: popularItem });
    // 直近1時間で閲覧数が多かったSaaSの更新
    Saas.updatePopularItemIfOld('recently_viewed');
  }

  handleChange = event => {
    this.setState({
      search: { ...this.state.search, [event.target.name]: event.target.value },
    });
  };

  searchSaas = () => {
    const { history } = this.props;
    history.push(PATH.SAAS_LIST, { search: this.state.search });
  };

  render() {
    const { history, classes } = this.props;
    const { snapshot, search } = this.state;

    const searchText = [
      {
        label: 'キーワード',
        value: search.keyword,
        key: 'keyword',
      },
    ];

    const searchCell = [
      {
        label: '製品カテゴリ',
        value: search.category,
        key: 'category',
        list: SAAS.CATEGORY,
      },
      {
        label: '業種',
        value: search.serviceType,
        key: 'serviceType',
        list: COMPANY.SERVICE_TYPE,
      },
      {
        label: '会社規模',
        value: search.scale,
        key: 'scale',
        list: COMPANY.SCALE,
      },
      {
        label: '会社地域',
        value: search.region,
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
                    align="center"
                    component="h1"
                    variant="h4"
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
          <Grid container className={classes.layout}>
            <Grid item sm={12}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                gutterBottom
              >
                よく見られているSaaS
              </Typography>
              <Divider />
            </Grid>
            {snapshot &&
              snapshot.docs.map(doc => {
                const saas = doc.data();
                return (
                  <Grid key={doc.id} item sm={3}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <SaasTable
                          saasId={saas.saasId}
                          saas={saas}
                          size="small"
                        />
                        <CardActions style={{ justifyContent: 'center' }}>
                          <Button
                            color="primary"
                            onClick={() =>
                              history.push(
                                UrlUtil.changeBaseUrl(
                                  PATH.SAAS_DETAIL,
                                  saas.saasId
                                )
                              )
                            }
                          >
                            詳細を見る
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Review Site
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              <Link to="" style={{ textDecoration: 'none' }}>
                &nbsp;HOME&nbsp;
              </Link>
              <Link to="" style={{ textDecoration: 'none' }}>
                &nbsp;会社情報&nbsp;
              </Link>
              <Link to="" style={{ textDecoration: 'none' }}>
                &nbsp;利用規約&nbsp;
              </Link>
              <Link to="" style={{ textDecoration: 'none' }}>
                &nbsp;プライバシーポリシー&nbsp;
              </Link>
            </Typography>
          </footer>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Root);
