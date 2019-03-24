import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableConfirm = props => {
  const { list } = props;
  return (
    <React.Fragment>
      {list.map((data, index) => {
        const display = !(data.display === false || data.display === '');
        if (!display) return <React.Fragment key={index} />;
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Typography>{data.label}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{data.answer}</Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </React.Fragment>
  );
};

export default TableConfirm;
