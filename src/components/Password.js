import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

const Password = props => {
  const { value, message, handleChange } = props;
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
      {message && (
        <Typography style={{ color: '#d50000', marginTop: 5 }}>
          {message}
        </Typography>
      )}
    </FormControl>
  );
};

export default Password;
