import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { SAAS, PATH } from '../config';
import { UrlUtil } from '../utils';

const styles = theme => ({
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

const SaasTable = props => {
  const { classes, saas, size, saasId } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={12}>
        <Typography className={classes.title}>
          {SAAS.CATEGORY[saas.category]}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          className={classes.saasTitle}
          style={size === 'small' ? { fontSize: 18 } : { fontSize: 24 }}
        >
          <Link
            to={UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId)}
            style={{ textDecoration: 'none' }}
          >
            {saas.name}
          </Link>
        </Typography>
        {saas.review && (
          <Typography>レビュー数：{saas.review.length}</Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={12}>
        <StarRatings
          rating={saas.point_total}
          starRatedColor="blue"
          numberOfStars={5}
          starDimension={size === 'small' ? '20' : '30'}
          starSpacing="2px"
        />
        {saas.point_total.toFixed(1)}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SaasTable);
