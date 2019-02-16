import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Saas } from '../modules';
import { SAAS, COMPANY } from '../config';
import { Header } from '../components';

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
    snapshot: '',
    sortBy: '',
    sortList: '',
    name: '',
    category: 0,
    serviceType: 0,
    scale: 0,
    region: 0,
  };

  async componentDidMount() {
    await this.setState({ sortList: Object.keys(SAAS.SORT) });
    await this.setState({ sortBy: this.state.sortList[0] });
    await this.searchSaas();
  }

  searchSaas = async () => {
    const query = {
      name: this.state.name,
      category: this.state.category,
      companyServiceType: this.state.serviceType,
      companyScale: this.state.scale,
      companyRegion: this.state.region,
    };

    const snapshot = await Saas.searchSaas(this.state.sortBy, query);
    this.setState({ snapshot: snapshot });
  };

  render() {
    const { classes, history } = this.props;
    const snapshot = this.state.snapshot;
    const sortList = this.state.sortList;

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Typography component="h1" variant="h4" className={classes.title}>
            SaaS一覧
          </Typography>
          <Paper className={classes.searchList}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Typography>製品カテゴリ</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl}>
                      <InputLabel>製品カテゴリ</InputLabel>
                      <Select
                        value={this.state.category}
                        onChange={e =>
                          this.setState({ category: parseInt(e.target.value) })
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>業種</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl}>
                      <InputLabel>業種</InputLabel>
                      <Select
                        value={this.state.serviceType}
                        onChange={e =>
                          this.setState({
                            serviceType: parseInt(e.target.value),
                          })
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>会社規模</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl}>
                      <InputLabel>会社規模</InputLabel>
                      <Select
                        value={this.state.scale}
                        onChange={e =>
                          this.setState({
                            scale: parseInt(e.target.value),
                          })
                        }
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>会社地域</Typography>
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl}>
                      <InputLabel>会社地域</InputLabel>
                      <Select
                        value={this.state.region}
                        onChange={e =>
                          this.setState({
                            region: parseInt(e.target.value),
                          })
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
                  </TableCell>
                </TableRow>
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
          <FormControl className={classes.formControl}>
            <Select
              value={this.state.sortBy}
              onChange={e =>
                this.setState({ sortBy: parseInt(e.target.value) })
              }
            >
              {sortList &&
                sortList.map(element => {
                  return (
                    <MenuItem key={element} value={element}>
                      {SAAS.SORT[element]}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {snapshot &&
            snapshot.docs.map(doc => {
              const saas = doc.data();
              return (
                <Paper key={doc.id} className={classes.saas}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                      <Typography className={classes.title}>
                        {SAAS.CATEGORY[saas.category]}
                      </Typography>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography
                          component="h1"
                          variant="h5"
                          color="primary"
                          className={classes.saasTitle}
                        >
                          {saas.name}
                        </Typography>
                      </Link>
                      {saas.board && saas.review && (
                        <Typography>
                          トピック数：{saas.board.length}　レビュー数：
                          {saas.review.length}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <StarRatings
                        rating={saas.point}
                        starRatedColor="blue"
                        numberOfStars={5}
                        starDimension="30px"
                        starSpacing="2px"
                      />
                      {saas.point}
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasList);
