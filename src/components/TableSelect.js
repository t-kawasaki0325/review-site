import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
  formControl: {
    minWidth: 220,
  },
});

const TableSelect = props => {
  const { list, classes, handleChange } = props;
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
              <FormControl className={classes.formControl}>
                <InputLabel>{data.label}</InputLabel>
                <Select
                  name={data.key}
                  value={data.value}
                  onChange={event => handleChange(event)}
                >
                  {data.list.map((element, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {element}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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

export default withStyles(styles)(TableSelect);
