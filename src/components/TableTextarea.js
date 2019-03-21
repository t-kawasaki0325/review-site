import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const TableTextarea = props => {
  const { list, handleChange } = props;
  return (
    <React.Fragment>
      {list.map((data, index) => {
        return (
          <Table key={index}>
            <TableBody>
              <TableRow>
                <TableCell component="td" scope="row">
                  <Typography>{data.label}</Typography>
                  <TextField
                    fullWidth
                    name={data.key}
                    value={data.value}
                    onChange={event => handleChange(event)}
                    multiline={true}
                    rows={4}
                    rowsMax={10}
                  />
                  {data.message && (
                    <Typography style={{ color: '#d50000', marginTop: 5 }}>
                      {data.message}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      })}
    </React.Fragment>
  );
};

export default TableTextarea;
