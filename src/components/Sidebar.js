import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';

import { SaasTable } from '../components';
import { PATH } from '../config';

const styles = () => ({
  container: {
    padding: 10,
    marginBottom: 30,
  },
  title: {
    marginTop: 20,
  },
  icon: {
    padding: 4,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    fontSize: 10,
    color: '#fff',
  },
});

const existNewData = user => {
  if (!user) return false;

  return user.follow.some(saas => {
    return saas.isUpdate;
  });
};

const Sidebar = props => {
  const { user, classes, snapshot, link } = props;

  const menu = [
    {
      label: 'マイページトップ',
      link: PATH.MYPAGE,
    },
    {
      label: 'フォロー一覧',
      link: PATH.FOLLOW,
    },
    {
      label: 'ポイント履歴',
      link: PATH.POINT_HISTORY,
    },
    {
      label: 'ユーザー招待',
      link: PATH.INVITATION,
    },
    {
      label: '退会する',
      link: PATH.QUIT,
    },
  ];
  return (
    <React.Fragment>
      <Paper className={classes.container}>
        <Typography
          component="h1"
          variant="h6"
          className={classes.title}
          gutterBottom
        >
          ようこそ {user.name} さん！
        </Typography>
        {existNewData(user) && (
          <Typography className={classes.title}>
            <span className={classes.icon}>NEW!</span>{' '}
            <Link to={PATH.FOLLOW} styles={{ textDecoration: 'none' }}>
              フォローリストに新着情報があります
            </Link>
          </Typography>
        )}
        <Typography className={classes.title}>
          ポイント: {user.point}
        </Typography>
      </Paper>
      <Paper className={classes.container}>
        {snapshot && (
          <React.Fragment>
            <Typography align="center" gutterBottom>
              最近レビューされたSaaS
            </Typography>
            <Divider />
            <Table>
              <TableBody>
                {snapshot.docs.map(doc => {
                  const saas = doc.data();
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <SaasTable
                          saasId={saas.saasId}
                          saas={saas}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </React.Fragment>
        )}
        {link && (
          <Table>
            <TableBody>
              {menu.map((element, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        to={element.link}
                        style={{ textDecoration: 'none' }}
                      >
                        {element.label}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(Sidebar);
