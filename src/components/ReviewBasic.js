import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { REVIEW, SAAS } from '../config';
import { TableSelect, TableTextarea } from '../components';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  priceEndText: {
    margin: 10,
    fontSize: 16,
    verticalAlign: 'bottom',
  },
});

const ReviewBasic = props => {
  const { classes, info, message, handleChange } = props;

  const basicCell = [
    {
      label: REVIEW.BASIC_TITLE.IS_ADMIN,
      value: info.isAdmin,
      key: 'isAdmin',
      list: REVIEW.YES_OR_NO,
    },
    {
      label: SAAS.RADAR.satisfaction,
      value: info.satisfaction,
      key: 'satisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
      display: !!info.isAdmin,
    },
    {
      label: REVIEW.BASIC_TITLE.CONTRACT_STATUS,
      value: info.contractStatus,
      key: 'contractStatus',
      list: REVIEW.BASIC.CONTRACT_STATUS,
      display: !!info.isAdmin,
    },
  ];

  const basicCellPeriod = [
    {
      label: REVIEW.BASIC_TITLE.CONTRACT_PERIOD,
      value: info.contractPeriod,
      key: 'contractPeriod',
      list: REVIEW.BASIC.CONTRACT_PERIOD,
    },
  ];

  const basicCellSecond = [
    {
      label: REVIEW.BASIC_TITLE.PRICE_SATISFACTION,
      value: info.priceSatisfaction,
      key: 'priceSatisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
    },
    {
      label: REVIEW.BASIC_TITLE.LISENCE_NUM,
      value: info.licenseNum,
      key: 'licenseNum',
      list: REVIEW.BASIC.LISENCE_NUM,
    },
    {
      label: REVIEW.BASIC_TITLE.IS_CONTINUE,
      value: info.isContinue,
      key: 'isContinue',
      list: REVIEW.YES_OR_NO,
    },
  ];

  const basicTextarea = [
    {
      label: REVIEW.BASIC_TITLE.REASON_NOT_CONTINUE,
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
                    <Typography>{REVIEW.BASIC_TITLE.CONTRACT_DATE}</Typography>
                  </TableCell>
                  <TableCell>
                    <Select
                      name="contractYear"
                      value={info.contractYear}
                      onChange={event => handleChange(event)}
                    >
                      {REVIEW.YEAR.map((element, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {element}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    &nbsp;年&nbsp;
                    <Select
                      name="contractMonth"
                      value={info.contractMonth}
                      onChange={event => handleChange(event)}
                    >
                      {REVIEW.MONTH.map((element, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {element}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    &nbsp;月&nbsp;
                  </TableCell>
                </TableRow>
                <TableSelect
                  list={basicCellPeriod}
                  handleChange={event => handleChange(event)}
                />
                <TableRow>
                  <TableCell>
                    <Typography>{REVIEW.BASIC_TITLE.PRICE}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <Radio
                        checked={info.priceOption === '0'}
                        onChange={event => handleChange(event)}
                        value="0"
                        name="priceOption"
                      />
                      : {REVIEW.BASIC.PRICE_OPTION[0]}
                      <Radio
                        checked={info.priceOption === '1'}
                        onChange={event => handleChange(event)}
                        value="1"
                        name="priceOption"
                      />
                      : {REVIEW.BASIC.PRICE_OPTION[1]}
                      <Radio
                        checked={info.priceOption === '2'}
                        onChange={event => handleChange(event)}
                        value="2"
                        name="priceOption"
                      />
                      : {REVIEW.BASIC.PRICE_OPTION[2]}
                    </Typography>
                    <TextField
                      name="price"
                      label="価格"
                      value={info.price}
                      onChange={event => handleChange(event)}
                    />
                    <span className={classes.priceEndText}>円</span>
                    {message.price && (
                      <Typography style={{ color: '#d50000', marginTop: 5 }}>
                        {message.price}
                      </Typography>
                    )}
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
        {!!info.isAdmin && info.isContinue === 0 && (
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
