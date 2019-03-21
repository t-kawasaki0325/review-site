import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  textField: {
    minWidth: 220,
  },
});

const TableText = props => {
  const { list, classes, handleChange } = props;
  return (
    <React.Fragment>
      {list.map((data, index) => {
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Typography>{data.label}</Typography>
            </TableCell>
            <TableCell>
              <TextField
                className={classes.textField}
                name={data.key}
                label={data.label}
                value={data.value}
                onChange={event => handleChange(event)}
              />
              {data.message && (
                <Typography style={{ color: '#d50000', marginTop: 5 }}>
                  {data.message}
                </Typography>
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default withStyles(styles)(TableText);
