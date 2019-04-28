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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { Header, Message, ReviewList } from '../components';
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
  introduction: {
    backgroundColor: '#eaeaea',
  },
  reviewSubtitle: {
    marginTop: 10,
    fontSize: '1.1em',
  },
  formControl: {
    marginTop: 30,
    minWidth: 200,
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
    isReview: true,
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
    if (target) return { reviewId: target.review_ref.id };
    return '';
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
    const {
      uid,
      saas,
      review,
      canView,
      saasId,
      message,
      isReview,
    } = this.state;

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

    const mainView = [
      { title: 'レビュー一覧', value: true },
      { title: '掲示板一覧', value: false },
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
                <Message type="info" message={message} />
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
          <FormControl className={classes.formControl}>
            <Select
              value={isReview}
              onChange={e => {
                this.setState({ isReview: e.target.value });
              }}
            >
              {mainView.map((element, index) => {
                return (
                  <MenuItem key={index} value={element.value}>
                    {element.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {isReview && (
            <ReviewList
              review={review}
              uid={uid}
              saas={saas}
              canView={canView}
              history={history}
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasDetail);
