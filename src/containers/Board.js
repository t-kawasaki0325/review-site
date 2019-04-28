import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Header } from '../components';
import { Authentication, Discussion } from '../modules';
import { UrlUtil } from '../utils';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
});

class Board extends Component {
  state = {
    uid: '',
    board: '',
  };

  async componentDidMount() {
    const { history } = this.props;

    const uid = await Authentication.fetchUserId();
    const boardId = UrlUtil.baseUrl(history.location.pathname);
    const board = await Discussion.getBoardById(boardId);
    this.setState({ uid: uid, board: board.data() });
  }

  render() {
    const { history, classes } = this.props;
    const { uid, board } = this.state;

    return (
      <React.Fragment>
        <Header uid={uid} history={history} />
        <main className={classes.layout}>
          <div className={classes.appBarSpacer} />
          <CssBaseline />
          <Typography component="h1" variant="h5" className={classes.title}>
            {board && board.saas}の掲示板
          </Typography>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.title}>
              {board && board.title}
            </Typography>
            {board && (
              <Table>
                <TableBody>
                  {board.content.map((element, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="h6" color="inherit">
                            {element}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Board);
