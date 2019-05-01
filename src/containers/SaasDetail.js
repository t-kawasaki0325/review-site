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
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import {
  Header,
  Message,
  ReviewList,
  SelectMenu,
  BoardList,
} from '../components';
import { Saas, Authentication, Point, Discussion } from '../modules';
import { UrlUtil, ValidationUtil } from '../utils';
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
    marginTop: theme.spacing.unit * 4,
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
  modal: {
    width: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 200,
    padding: 20,
  },
});

class SaasDetail extends Component {
  state = {
    info: {
      title: '',
      content: '',
    },
    error: {
      title: '',
      content: '',
    },
    uid: '',
    user: '',
    saasId: '',
    saas: '',
    review: [],
    canView: '',
    message: '',
    isReview: true,
    modal: false,
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

  handleChange = event => {
    const key = event.target.name;
    const type = event.target.type;
    const value = event.target.value;

    this.setState({
      info: { ...this.state.info, [key]: value },
    });
    this.setState({
      error: {
        ...this.state.error,
        [key]: ValidationUtil.formValidate(type, value),
      },
    });
  };

  canSubmit = () => {
    const { info, error } = this.state;
    const allowInfo =
      Object.keys(info).filter(key => {
        return info[key] === '';
      }).length === 0;
    const allowMessage =
      Object.keys(error).filter(key => {
        return error[key] !== '';
      }).length === 0;

    return !allowInfo || !allowMessage;
  };

  isFollowing = () => {
    const { user, saasId } = this.state;

    return user.follow.includes(saasId);
  };

  render() {
    const { history, classes } = this.props;
    const {
      uid,
      user,
      saas,
      review,
      canView,
      saasId,
      message,
      isReview,
      modal,
      info,
      error,
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
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6} className={classes.buttonWrapper}>
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
                      {this.canReview() ? 'レビューを書く' : 'レビューを編集'}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.buttonWrapper}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({ modal: true })}
                    >
                      トピックを作成
                    </Button>
                  </Grid>
                  {!!uid && (
                    <Grid item xs={12} sm={6} className={classes.buttonWrapper}>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.isFollowing()
                            ? Saas.unfollowSaas(uid, saasId)
                            : Saas.followSaaS(uid, saasId)
                        }
                      >
                        {this.isFollowing() ? 'フォロー解除' : 'フォローする'}
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <Modal
                  open={modal}
                  onClose={() => this.setState({ modal: false })}
                >
                  <Paper className={classes.modal}>
                    <Typography variant="h6">トピックを作成</Typography>
                    <Typography variant="subtitle1">タイトル</Typography>
                    <TextField
                      style={{ width: '100%' }}
                      name="title"
                      label="タイトル"
                      value={info.title}
                      onChange={event => this.handleChange(event)}
                    />
                    {error.title && (
                      <Typography style={{ color: '#d50000', marginTop: 5 }}>
                        {error.title}
                      </Typography>
                    )}
                    <Typography variant="subtitle1">本文</Typography>
                    <TextField
                      style={{ width: '100%' }}
                      name="content"
                      label="本文"
                      value={info.content}
                      onChange={event => this.handleChange(event)}
                      multiline={true}
                      rows={4}
                      rowsMax={10}
                    />
                    {error.content && (
                      <Typography style={{ color: '#d50000', marginTop: 5 }}>
                        {error.content}
                      </Typography>
                    )}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      className={classes.buttonWrapper}
                    >
                      <Button
                        disabled={this.canSubmit()}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          Discussion.createNewBoard(
                            history,
                            saasId,
                            saas,
                            user,
                            info
                          )
                        }
                      >
                        掲示板を作成する
                      </Button>
                    </Grid>
                  </Paper>
                </Modal>
              </Grid>
            </Grid>
          </Paper>
          <SelectMenu
            style={{ marginTop: 30 }}
            value={isReview}
            menu={mainView}
            handleChange={e => {
              this.setState({ isReview: e.target.value });
            }}
          />
          {isReview && (
            <ReviewList
              review={review}
              uid={uid}
              saas={saas}
              canView={canView}
              history={history}
            />
          )}
          {!isReview && <BoardList history={history} board={saas.board} />}
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SaasDetail);
