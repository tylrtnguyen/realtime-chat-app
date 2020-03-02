import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 350;

export const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: drawerWidth,
      height: '100%',
      color: '#fff',
      backgroundColor: '#3F0E40'
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    inline: {
      display: 'inline',
    }
  }));