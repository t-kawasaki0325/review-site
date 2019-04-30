import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const SelectMenu = props => {
  const { value, menu, handleChange, style } = props;

  return (
    <FormControl style={{ ...style, minWidth: 200 }}>
      <Select value={value} onChange={e => handleChange(e)}>
        {menu.map((element, index) => {
          return (
            <MenuItem key={index} value={element.value}>
              {element.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;
