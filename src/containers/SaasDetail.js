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
import Divider from '@material-ui/core/Divider';

import { Header } from '../components';
import { Saas } from '../modules';
import { UrlUtil } from '../utils';
import { SAAS, PATH } from '../config';

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
});

class SaasDetail extends Component {
  state = {
    saasId: '',
    saas: '',
    review: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const saasId = UrlUtil.baseUrl(history.location.pathname);

    // SaaSの取得
    const snapshot = await Saas.sassInfoById(saasId);
    this.setState({ saas: snapshot.data(), saasId: saasId });

    // reviewの取得
    snapshot.data().review.forEach(async ref => {
      const review = await ref.get();
      this.setState({ review: this.state.review.concat(review.data()) });
    });
  }

  render() {
    const { history, classes } = this.props;
    const saas = this.state.saas;
    const review = this.state.review;

    const data = [
      {
        subject: `${SAAS.RADAR.sales}: ${saas && saas.point.sales}`,
        value: parseInt(`${saas && saas.point.sales}`),
      },
      {
        subject: `${SAAS.RADAR.support}: ${saas && saas.point.support}`,
        value: parseInt(`${saas && saas.point.support}`),
      },
      {
        subject: `${SAAS.RADAR.recommendation}: ${saas &&
          saas.point.recommendation}`,
        value: parseInt(`${saas && saas.point.recommendation}`),
      },
      {
        subject: `${SAAS.RADAR.utilization}: ${saas && saas.point.utilization}`,
        value: parseInt(`${saas && saas.point.utilization}`),
      },
      {
        subject: `${SAAS.RADAR.satisfaction}: ${saas &&
          saas.point.satisfaction}`,
        value: parseInt(`${saas && saas.point.satisfaction}`),
      },
    ];

    return (
      <React.Fragment>
        <Header history={history} />
        <CssBaseline />

        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <Typography component="h1" variant="h4" className={classes.title}>
                {saas && saas.name}
              </Typography>
            </Grid>
            {saas && (
              <Grid item xs={12} sm={12}>
                <StarRatings
                  rating={saas.point.total}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="2px"
                />
                <span className={classes.pointText}>{saas.point.total}</span>
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
                      rating={saas.point.total}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starDimension="30px"
                      starSpacing="2px"
                    />
                    <span className={classes.pointText}>
                      {saas.point.total}
                    </span>
                    <Typography>
                      回答者: {saas && saas.numOfReviews}人
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} className={classes.buttonWrapper}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(
                        UrlUtil.changeBaseUrl(
                          PATH.ADD_REVIEW,
                          this.state.saasId
                        )
                      )
                    }
                  >
                    レビューを書く
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {!!review.length &&
            review.map((element, index) => {
              const pointKeys = Object.keys(element.point);

              return (
                <Paper key={index} className={classes.reviewContainer}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                      <Typography component="h1" variant="h5" gutterBottom>
                        {element.title}
                      </Typography>
                      <Divider />
                      <Grid item xs={12} sm={12}>
                        <StarRatings
                          rating={element.score}
                          starRatedColor="blue"
                          numberOfStars={5}
                          starDimension="25px"
                          starSpacing="2px"
                        />
                        <span className={classes.pointText}>
                          {element.score}
                        </span>
                      </Grid>

                      <Typography gutterBottom>
                        {pointKeys.map(key => {
                          return `${SAAS.RADAR[key]}: ${element.point[key]} `;
                        })}
                      </Typography>
                      <Typography component="h1" variant="h6">
                        {element.content}
                      </Typography>
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

export default withStyles(styles)(SaasDetail);
