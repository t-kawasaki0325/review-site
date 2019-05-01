import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Header, Sidebar } from '../components';
import { Authentication, Saas } from '../modules';
import { PATH } from '../config';
import { UrlUtil } from '../utils';

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
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
  newArrival: {
    position: 'absolute',
    marginLeft: -10,
    marginTop: -5,
    width: 10,
    height: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
});

class Follow extends Component {
  state = {
    uid: '',
    user: '',
    follow: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const uid = await Authentication.transitionLoginIfNotLogin(history);
    if (!uid) return;

    const snapshot = await Authentication.fetchUserDataById(uid);
    this.setState({ uid: uid, user: snapshot.data() });

    Saas.subscribeFollow(uid, data => {
      this.setState({ user: data });
      this.getFollowList(data);
    });
  }

  getFollowList = data => {
    this.setState({ follow: [] });
    data.follow.forEach(async element => {
      const saas = await element.ref.get();
      const data = {
        id: element.ref.id,
        isNew: element.isUpdate,
        saas: saas.data(),
      };
      this.setState({
        follow: this.state.follow.concat(data),
      });
    });
  };

  render() {
    const { history, classes } = this.props;
    const { uid, user, follow } = this.state;

    return (
      <React.Fragment>
        <Header uid={uid} history={history} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={4}>
              <Sidebar user={user} link={true} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  className={classes.title}
                >
                  フォローリスト
                </Typography>
                {follow.length > 0 ? (
                  <Table>
                    <TableBody>
                      {follow.map((element, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {element.isNew && (
                                <span className={classes.newArrival} />
                              )}
                              <Typography>
                                <Link
                                  to={UrlUtil.changeBaseUrl(
                                    PATH.SAAS_DETAIL,
                                    element.id
                                  )}
                                  style={{ textDecoration: 'none' }}
                                >
                                  {element.saas.name}
                                </Link>
                              </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              評価:{' '}
                              <StarRatings
                                rating={element.saas.point_total}
                                starRatedColor="blue"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  Saas.unfollowSaas(uid, element.id)
                                }
                              >
                                フォロー解除
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  '現在フォローしているSaaSはありません'
                )}
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Follow);
