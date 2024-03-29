import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { Header } from '../components';
import { Authentication, Discussion } from '../modules';
import { UrlUtil, ValidationUtil } from '../utils';
import { PATH } from '../config';

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
  body: {
    fontSize: 16,
  },
  title: {
    margin: theme.spacing.unit * 2,
  },
  buttonWrapper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1,
    textAlign: 'center',
  },
});

class Board extends Component {
  state = {
    uid: '',
    user: '',
    boardId: '',
    board: '',
    content: '',
    error: '',
  };

  async componentDidMount() {
    const { history } = this.props;

    const uid = await Authentication.fetchUserId();
    const user = await Authentication.fetchUserDataById(uid);
    const boardId = UrlUtil.baseUrl(history.location.pathname);
    const board = await Discussion.getBoardById(boardId);
    this.setState({
      boardId: boardId,
      board: board.data(),
    });
    if (uid) {
      this.setState({
        uid: uid,
        user: user.data(),
      });
    }

    Discussion.subscribeBoard(boardId, board => this.refreshBoard(board));
  }

  handleChange = event => {
    const key = event.target.name;
    const type = event.target.type;
    const value = event.target.value;

    this.setState({
      [key]: value,
      error: ValidationUtil.formValidate(type, value),
    });
  };

  submit = () => {
    const { history } = this.props;
    const { uid, user, boardId, content } = this.state;

    if (!uid) {
      history.push(PATH.LOGIN);
      return;
    }

    Discussion.postToBoard(boardId, user.name, content);
  };

  refreshBoard = board => {
    this.setState({ content: '', board: board });
  };

  render() {
    const { history, classes } = this.props;
    const { uid, board, content, error } = this.state;

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
                    const date = element.created_at.toDate();
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography color="inherit" gutterBottom>
                            {index}. {element.user} {date.getFullYear()}/
                            {date.getMonth() + 1}/{date.getDate()}{' '}
                            {date.getHours()}:{date.getMinutes()}:
                            {date.getSeconds()}
                          </Typography>
                          <Typography color="inherit" className={classes.body}>
                            {element.body}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </Paper>
          <Paper className={classes.paper}>
            <TextField
              style={{ width: '100%' }}
              name="content"
              label="このトピックにコメントする"
              value={content}
              onChange={event => this.handleChange(event)}
              multiline={true}
              rows={4}
              rowsMax={10}
            />
            {error && (
              <Typography style={{ color: '#d50000', marginTop: 5 }}>
                {error}
              </Typography>
            )}
            <Grid item xs={12} sm={12} className={classes.buttonWrapper}>
              <Button
                disabled={!!error || !content}
                variant="contained"
                color="primary"
                onClick={() => this.submit()}
              >
                投稿する
              </Button>
            </Grid>
            <Typography color="inherit" align="center">
              <Link
                to={UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, board.saas_id)}
                style={{ textDecoration: 'none' }}
              >
                SaaS詳細ページに戻る
              </Link>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Board);
