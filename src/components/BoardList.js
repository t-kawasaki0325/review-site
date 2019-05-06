import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { PATH } from '../config';
import { UrlUtil } from '../utils';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 4,
  },
});

const BoardList = props => {
  const { classes, board } = props;

  return (
    <Paper className={classes.container}>
      {board.length > 0 ? (
        <Table>
          <TableBody>
            {board.map((element, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h6" color="inherit">
                      <Link
                        to={UrlUtil.changeBaseUrl(PATH.BOARD, element.board_id)}
                        style={{ textDecoration: 'none' }}
                      >
                        {element.title}
                      </Link>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6" color="inherit">
          現在表示するトピックはありません
        </Typography>
      )}
    </Paper>
  );
};

export default withStyles(styles)(BoardList);
