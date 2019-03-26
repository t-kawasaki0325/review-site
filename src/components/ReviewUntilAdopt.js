import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { REVIEW, SAAS } from '../config';
import { TableSelect, TableText, TableTextarea } from '../components';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
});

const ReviewUntilAdopt = props => {
  const { classes, info, message, handleChange, handleCheckChange } = props;

  const untilAdoptCell = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.IS_PARTICIPANT,
      value: info.isParticipant,
      key: 'isParticipant',
      list: REVIEW.YES_OR_NO,
    },
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.FIRST_CONTACT,
      value: info.firstContact,
      key: 'firstContact',
      list: REVIEW.UNTIL_ADOPT.FIRST_CONTACT,
      display: !!info.isParticipant,
    },
  ];

  const contactTextarea = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.REASON_FIRST_CONTACT,
      value: info.reasonFirstContact,
      key: 'reasonFirstContact',
      display: !!(
        info.isParticipant &&
        info.firstContact === REVIEW.UNTIL_ADOPT.FIRST_CONTACT.length - 1
      ),
    },
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.CONSIDERATION_REASON,
      value: info.considerationReason,
      key: 'considerationReason',
      display: !!info.isParticipant,
      message: message.considerationReason,
    },
  ];

  const otherSaasText = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.OTHER_SAAS,
      value: info.otherSaas,
      key: 'otherSaas',
      display: !!info.isParticipant,
      message: message.otherSaas,
    },
  ];

  const untilAdoptCellSecond = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.CONSIDERATION_PERIOD,
      value: info.considerationPeriod,
      key: 'considerationPeriod',
      list: REVIEW.UNTIL_ADOPT.PERIOD,
      display: !!info.isParticipant,
    },
    {
      label: SAAS.RADAR.sales,
      value: info.sales,
      key: 'sales',
      list: REVIEW.SATISFACTION_LEVEL,
      display: !!info.isParticipant,
    },
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.IS_DISCOUNTED,
      value: info.isDiscounted,
      key: 'isDiscounted',
      list: REVIEW.UNTIL_ADOPT.IS_DISCOUNTED,
      display: !!info.isParticipant,
    },
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.DISCOUNT_RATE,
      value: info.discountRate,
      key: 'discountRate',
      list: REVIEW.UNTIL_ADOPT.DISCOUNT_RATE,
      display: !!(info.isParticipant && info.isDiscounted),
    },
  ];

  const decisionTextarea = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.DECISION,
      value: info.decision,
      key: 'decision',
      display: !!info.isParticipant,
      message: message.decision,
    },
  ];

  const untilAdoptCellThird = [
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_PERIOD,
      value: info.onboadingPeriod,
      key: 'onboadingPeriod',
      list: REVIEW.UNTIL_ADOPT.ONBOADING_PERIOD,
      display: !!info.isParticipant,
    },
    {
      label: REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_SATISFACTION,
      value: info.onboadingSatisfaction,
      key: 'onboadingSatisfaction',
      list: REVIEW.SATISFACTION_LEVEL,
      display: !!info.isParticipant,
    },
  ];

  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h6" gutterBottom>
        導入にあたって
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableBody>
            <TableSelect
              list={untilAdoptCell}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={contactTextarea}
          handleChange={event => handleChange(event)}
        />
        <Table>
          <TableBody>
            <TableText
              list={otherSaasText}
              handleChange={event => handleChange(event)}
            />
            <TableSelect
              list={untilAdoptCellSecond}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
        <TableTextarea
          list={decisionTextarea}
          handleChange={event => handleChange(event)}
        />
        <Table>
          <TableBody>
            {!!info.isParticipant && (
              <TableRow>
                <TableCell>
                  <Typography>
                    {REVIEW.UNTIL_ADOPTED_TITLE.ONBOADING_SYSTEM}
                  </Typography>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={info.onboadingSystemA}
                        onChange={event => handleCheckChange(event)}
                        value="onboadingSystemA"
                      />
                    }
                    label={REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[0]}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={info.onboadingSystemB}
                        onChange={event => handleCheckChange(event)}
                        value="onboadingSystemB"
                      />
                    }
                    label={REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[1]}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={info.onboadingSystemC}
                        onChange={event => handleCheckChange(event)}
                        value="onboadingSystemC"
                      />
                    }
                    label={REVIEW.UNTIL_ADOPT.ONBOADING_SYSTEM[2]}
                  />
                </TableCell>
              </TableRow>
            )}
            <TableSelect
              list={untilAdoptCellThird}
              handleChange={event => handleChange(event)}
            />
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ReviewUntilAdopt);
