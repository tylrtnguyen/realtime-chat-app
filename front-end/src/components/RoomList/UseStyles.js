import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 360;

export const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      height: '100%',
      backgroundColor: '#3F0E40',
      color: '#fff',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    inline: {
      display: 'inline',
    }
  }));