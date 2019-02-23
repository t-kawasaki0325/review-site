import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const Email = props => {
  const { value, handleChange } = props;
  return (
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="email">メールアドレス</InputLabel>
      <Input
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        value={value}
        onChange={event => handleChange(event)}
      />
    </FormControl>
  );
};

export default Email;
