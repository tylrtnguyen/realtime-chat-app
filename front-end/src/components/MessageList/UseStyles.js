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
    compose: {
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      background: 'white',
      borderTop: '1px solid #eeeef1',
      position: 'fixed',
      width: 'calc(100% - 20px)',
      bottom: '0px'
  },
  composeInput: {
      flex: 1,
      border: 'none',
      fontSize: '14px',
      height: '40px',
      background: 'none',
      alignItems: 'center'
  },
  button: {
      flex: 'auto',
      fontSize:'14px',
      float:'right'
  },
  
  }));


