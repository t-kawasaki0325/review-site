import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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
});

const UrgeViewReview = props => {
  const { uid, saas, classes, handle } = props;
  const text = uid ? 'ポイントを使用' : 'ログイン';
  return (
    <Grid container spacing={24} className={classes.introduction}>
      <Grid item xs={12} sm={12} className={classes.buttonWrapper}>
        <Typography gutterBottom>
          残り {saas.num_of_reviews - 1}
          件のレビューを見るには{text}してください
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => handle()}
        >
          {text}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(UrgeViewReview);
