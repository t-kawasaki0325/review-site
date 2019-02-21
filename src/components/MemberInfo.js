import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyle from '@material-ui/core/styles/withStyles';

import { UrlUtil } from '../utils';

const styles = () => ({
  container: {
    marginTop: 30,
  },
  formControl: {
    minWidth: 200,
  },
});

const MemberInfo = props => {
  const { classes, history, email, password, name, handleChange } = props;

  const emailAndPassword = [
    {
      label: 'メールアドレス',
      key: 'email',
      value: email,
    },
    {
      label: 'パスワード',
      key: 'password',
      value: password,
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
            会員情報
          </Typography>
        </Grid>
        {emailAndPassword.map((element, index) => {
          return (
            UrlUtil.isRegistrationPage(history) && (
              <Grid key={index} item xs={12} sm={6}>
                <TextField
                  required
                  name={element.key}
                  value={element.value}
                  type={element.key}
                  label={element.label}
                  fullWidth
                  onChange={event => handleChange(event)}
                />
              </Grid>
            )
          );
        })}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="name"
            label="ユーザー名"
            fullWidth
            autoComplete="fname"
            value={name}
            onChange={event => handleChange(event)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyle(styles)(MemberInfo);
