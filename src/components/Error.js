import React from 'react';
import Typography from '@material-ui/core/Typography';

const Error = props => {
  const { error } = props;
  return (
    <Typography
      component="h1"
      variant="h6"
      style={{
        color: '#d50000',
        margin: 5,
        padding: 5,
        backgroundColor: '#ffebee',
      }}
    >
      {error}
    </Typography>
  );
};

export default Error;
