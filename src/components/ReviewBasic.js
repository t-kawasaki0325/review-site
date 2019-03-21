import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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

const ReviewBasic = props => {
  const { classes, info, handleChange } = props;

  const basicCell = [
    {
      label: 'プロダクトの管理者ですか',
      value: info.isAdmin,
      key: 'isAdmin',
      list: REVIEW.YES_OR_NO,
    },
    {
      label: '現状の満足度',
      value: info.satisfaction,
      key: 'satisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
      display: info.isAdmin,
    },
    {
      label: '契約ステータス',
      value: info.contractStatus,
      key: 'contractStatus',
      list: REVIEW.BASIC.CONTRACT_STATUS,
      display: info.isAdmin,
    },
  ];

  const basicCellSecond = [
    {
      label: '価格の満足度',
      value: info.priceSatisfaction,
      key: 'priceSatisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
    },
    {
      label: 'ライセンス数',
      value: info.licenseNum,
      key: 'licenseNum',
      list: REVIEW.BASIC.LISENCE_NUM,
    },
    {
      label: '今後も継続予定ですか',
      value: info.isContinue,
      key: 'isContinue',
      list: REVIEW.YES_OR_NO,
    },
  ];

  const basicTextarea = [
    {
      label: 'その理由を教えてください',
      value: info.reasonNotContinue,
      key: 'reasonNotContinue',
    },
  ];

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" gutterBottom>
        現在の契約状況について
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            <TableSelect
              list={basicCell}
              handleChange={event => handleChange(event)}
            />
            {!!info.isAdmin && (
              <React.Fragment>
                <TableRow>
                  <TableCell>
                    <Typography>契約日</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>契約日</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>契約期間</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>契約期間</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography>価格</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>価格</Typography>
                  </TableCell>
                </TableRow>
                <TableSelect
                  list={basicCellSecond}
                  handleChange={event => handleChange(event)}
                />
              </React.Fragment>
            )}
          </TableBody>
        </Table>
        {!!info.isAdmin && (
          <TableTextarea
            list={basicTextarea}
            handleChange={event => handleChange(event)}
          />
        )}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ReviewBasic);
