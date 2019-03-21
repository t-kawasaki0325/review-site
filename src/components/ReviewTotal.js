import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { SAAS, REVIEW } from '../config';
import { TableSelect, TableText, TableTextarea } from '../components';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const ReviewTotal = props => {
  const { classes, info, message, handleChange } = props;

  const reviewCell = [
    {
      label: SAAS.RADAR.recommendation,
      value: info.recommendation,
      key: 'recommendation',
      list: REVIEW.RECOMMENDATION_LEVEL,
    },
  ];

  const reviewText = [
    {
      label: 'レビューのタイトル',
      value: info.title,
      key: 'title',
      message: message.title,
    },
  ];

  const reviewTextarea = [
    {
      label: 'プロダクトの優れている点',
      value: info.good,
      key: 'good',
      message: message.good,
    },
    {
      label: 'プロダクトの改善点',
      value: info.bad,
      key: 'bad',
      message: message.bad,
    },
  ];

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" gutterBottom>
        全体評価レビュー
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            <TableSelect
              list={reviewCell}
              handleChange={event => handleChange(event)}
            />
            <TableText
              list={reviewText}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={reviewTextarea}
          handleChange={event => handleChange(event)}
        />
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ReviewTotal);
