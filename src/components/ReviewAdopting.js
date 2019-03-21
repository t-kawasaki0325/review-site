import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import { REVIEW } from '../config';
import { TableSelect, TableTextarea } from '../components';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const ReviewAdopting = props => {
  const { classes, info, message, handleChange } = props;

  const adoptingCell = [
    {
      label: '運用に携わっていますか',
      value: info.isOperationParticipant,
      key: 'isOperationParticipant',
      list: REVIEW.YES_OR_NO,
    },
    {
      label: '活用度合い',
      value: info.utilization,
      key: 'utilization',
      list: REVIEW.SATISFACTION_LEVEL,
    },
    {
      label: 'サポート対応',
      value: info.support,
      key: 'support',
      list: REVIEW.SATISFACTION_LEVEL,
      display: !!info.isOperationParticipant,
    },
  ];

  const adoptingTextarea = [
    {
      label: 'サポートについて感じることを教えてください',
      value: info.supportSatisfaction,
      key: 'supportSatisfaction',
      display: !!info.isOperationParticipant,
      message: message.supportSatisfaction,
    },
  ];

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" gutterBottom>
        導入後の状況
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            <TableSelect
              list={adoptingCell}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={adoptingTextarea}
          handleChange={event => handleChange(event)}
        />
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ReviewAdopting);
