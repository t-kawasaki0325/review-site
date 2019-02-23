import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const Password = props => {
  const { value, handleChange } = props;
  return (
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="password">パスワード</InputLabel>
      <Input
        name="password"
        type="password"
        autoComplete="password"
        autoFocus
        value={value}
        onChange={event => handleChange(event)}
      />
    </FormControl>
  );
};

export default Password;
