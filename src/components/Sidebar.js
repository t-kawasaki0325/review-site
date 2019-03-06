import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { SaasTable } from '../components';

const styles = () => ({
  container: {
    padding: 10,
    marginBottom: 30,
  },
  title: {
    marginTop: 20,
  },
});

const Sidebar = props => {
  const { user, classes, snapshot } = props;
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
        <Typography className={classes.title}>
          ポイント: {user.point}
        </Typography>
      </Paper>
      <Paper className={classes.container}>
        {snapshot && (
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
        )}
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(Sidebar);
