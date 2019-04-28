import React from 'react';
import StarRatings from 'react-star-ratings';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { UrgeViewReview } from '../components';

const styles = theme => ({
  reviewContainer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 4,
  },
});

const ReviewList = props => {
  const { classes, review, uid, saas, canView, history } = props;

  return (
    <React.Fragment>
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
                      rating={element.point_total}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starDimension="25px"
                      starSpacing="2px"
                    />
                    <span className={classes.pointText}>
                      {element.point_total.toFixed(1)}
                    </span>
                  </Grid>

                  <Typography component="h1" className={classes.reviewSubtitle}>
                    優れていると感じた点
                  </Typography>
                  <Typography component="h1">{element.good}</Typography>
                  <Typography component="h1" className={classes.reviewSubtitle}>
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
    </React.Fragment>
  );
};

export default withStyles(styles)(ReviewList);
