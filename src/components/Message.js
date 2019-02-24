import React from 'react';
import Typography from '@material-ui/core/Typography';

const Message = props => {
  const { error, type } = props;
  let color;
  let background;
  switch (type) {
    case 'info':
      color = '#00c853';
      background = '#e8f5e9';
      break;
    case 'error':
      color = '#d50000';
      background = '#ffebee';
      break;
    default:
      break;
  }
  return (
    <Typography
      component="h1"
      variant="h6"
      style={{
        color: color,
        margin: 5,
        padding: 5,
        backgroundColor: background,
      }}
    >
      {error}
    </Typography>
  );
};

export default Message;
