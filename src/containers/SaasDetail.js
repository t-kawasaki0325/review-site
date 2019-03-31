import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Header, UrgeViewReview, Message } from '../components';
import { Saas, Authentication, Point } from '../modules';
import { UrlUtil } from '../utils';
import { SAAS, PATH } from '../config';

const styles = theme => ({
  layout: {
    width: 'auto',
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  pointText: {
    fontSize: 20,
    marginLeft: 10,
  },
  buttonWrapper: {
    margin: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  button: {
    fontSize: 18,
  },
  reviewContainer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 4,
  },
  introduction: {
    backgroundColor: '#eaeaea',
  },
  reviewSubtitle: {
    marginTop: 10,
    fontSize: '1.1em',
  },
});

class SaasDetail extends Component {
  state = {
    uid: '',
    user: '',
    saasId: '',
    saas: '',
    review: [],
    canView: '',
    message: '',
  };

  async componentDidMount() {
    const { location, history } = this.props;

    const uid = await Authentication.fetchUserId();
    if (uid) {
      const user = await Authentication.fetchUserDataById(uid);
      this.setState({ uid: uid, user: user.data() });
    }

    // SaaSの取得
    const saasId = UrlUtil.baseUrl(history.location.pathname);
    const snapshot = await Saas.sassInfoById(saasId);
    this.setState({ saas: snapshot.data(), saasId: saasId });

    // reviewの取得
    if (snapshot.data().review.length === 0) {
      this.setState({ review: [] });
      return;
    }
    const canView = this.canViewAll(saasId);
    if (canView) {
      this.updateReview(snapshot);
    } else {
      const review = await snapshot.data().review[0].get();
      this.setState({ review: [review.data()], canView: false });
    }
    if (location.state) {
      this.setState({ message: location.state.message });
    }

    // 閲覧数をcount up
    Saas.viewCountUp(saasId);
  }

  canViewAll = saasId => {
    const { user } = this.state;
    if (!user) return;
    return user.can_view.includes(saasId);
  };

  canReview = () => {
    const { user, saasId } = this.state;
    if (!user) return true;
    // 過去にレビューが存在するか確認する
    return (
      user.reviewed.filter(element => {
        return element.product_ref.id === saasId;
      }).length < 1
    );
  };

  getReviewId = () => {
    const { user, saasId } = this.state;
    if (!user || !saasId) return '';
    const target = user.reviewed.find(element => {
      return element.product_ref.id === saasId;
    });
    return { reviewId: target.review_ref.id };
  };

  handleForView = async () => {
    const { history } = this.props;
    const { uid, saasId } = this.state;
    if (!uid) {
      history.push(PATH.LOGIN);
      return;
    }

    Point.useForViewReview(uid, saasId);

    const snapshot = await Saas.sassInfoById(saasId);
    this.updateReview(snapshot);
  };

  updateReview = snapshot => {
    this.setState({ review: [] });
    snapshot.data().review.forEach(async ref => {
      const review = await ref.get();
      this.setState({
        review: this.state.review.concat(review.data()),
        canView: true,
      });
    });
  };

  render() {
    const { history, classes } = this.props;
    const { uid, saas, review, canView, saasId, message } = this.state;

    const data = [
      {
        subject: `${SAAS.RADAR.sales}: ${saas && saas.point.sales.toFixed(1)}`,
        value: parseFloat(`${saas && saas.point.sales}`),
      },
      {
        subject: `${SAAS.RADAR.support}: ${saas &&
          saas.point.support.toFixed(1)}`,
        value: parseFloat(`${saas && saas.point.support}`),
      },
      {
        subject: `${SAAS.RADAR.recommendation}: ${saas &&
          saas.point.recommendation.toFixed(1)}`,
        value: parseFloat(`${saas && saas.point.recommendation}`),
      },
      {
        subject: `${SAAS.RADAR.utilization}: ${saas &&
          saas.point.utilization.toFixed(1)}`,
        value: parseFloat(`${saas && saas.point.utilization}`),
      },
      {
        subject: `${SAAS.RADAR.satisfaction}: ${saas &&
          saas.point.satisfaction.toFixed(1)}`,
        value: parseFloat(`${saas && saas.point.satisfaction}`),
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} uid={uid} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            {message && (
              <Grid item xs={12} sm={12}>
                <Message type="info" error={message} />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <Typography component="h1" variant="h4" className={classes.title}>
                {saas && saas.name}
              </Typography>
            </Grid>
            {saas && (
              <Grid item xs={12} sm={12}>
                <StarRatings
                  rating={saas.point_total}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="2px"
                />
                <span className={classes.pointText}>
                  {saas && saas.point_total.toFixed(1)}
                </span>
              </Grid>
            )}
          </Grid>
          <Paper>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={7}>
                <RadarChart
                  height={300}
                  width={500}
                  cx={250}
                  cy={150}
                  data={data}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis
                    domain={[0, 5]}
                    angle={90}
                    tick={false}
                    tickCount={6}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography component="h1" variant="h6">
                  総合評価
                </Typography>
                {saas && (
                  <Grid item xs={12} sm={12}>
                    <StarRatings
                      rating={saas.point_total}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starDimension="30px"
                      starSpacing="2px"
                    />
                    <span className={classes.pointText}>
                      {saas && saas.point_total.toFixed(1)}
                    </span>
                    <Typography>
                      回答者: {saas && saas.num_of_reviews}人
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} className={classes.buttonWrapper}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const url = this.canReview()
                        ? UrlUtil.changeBaseUrl(PATH.ADD_REVIEW, saasId)
                        : UrlUtil.changeBaseUrl(PATH.EDIT_REVIEW, saasId);
                      history.push(url, this.getReviewId());
                    }}
                  >
                    {this.canReview() ? 'レビューを書く' : 'レビューを編集する'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {!!review.length &&
            review.map((element, index) => {
              return (
                <Paper key={index} className={classes.reviewContainer}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                      <Typography component="h1" variant="h5">
                        {element.title}
                      </Typography>
                      <Grid item xs={12} sm={12}>
                        <StarRatings
                          rating={element.point.total}
                          starRatedColor="blue"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="2px"
                        />
                        <span className={classes.pointText}>
                          {element.point.total}
                        </span>
                      </Grid>

                      <Typography
                        component="h1"
                        className={classes.reviewSubtitle}
                      >
                        優れていると感じた点
                      </Typography>
                      <Typography component="h1">{element.good}</Typography>
                      <Typography
                        component="h1"
                        className={classes.reviewSubtitle}
                      >
                        改善してほしいと感じた点
                      </Typography>
                      <Typography component="h1">{element.bad}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          {!!review.length && !!(saas.num_of_reviews - 1) && !canView && (
            <UrgeViewReview
              uid={uid}
              saas={saas}
              history={history}
              handle={() => this.handleForView()}
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasDetail);
