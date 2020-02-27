import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import moment from 'moment'


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Total(props) {
  const classes = useStyles();
  const {title, total} = props
  return (
    <React.Fragment>
      <Title>Total {title}</Title>
      <Typography component="p" variant="h2">
        {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment().format('LL')}
      </Typography>
    </React.Fragment>
  );
}