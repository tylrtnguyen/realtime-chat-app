import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
      flexGrow:1
    },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.default
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
