import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
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
    }
  }));