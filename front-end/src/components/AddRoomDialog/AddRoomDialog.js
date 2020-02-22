import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AddRoomDialog() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };
    
    return (
        <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        + Add New Room
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the information section below to add new room
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room Name"
            type="text"
            helperText="Max 255"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            helperText="Min 8 | Max 255"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Room
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}