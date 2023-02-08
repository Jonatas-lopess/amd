import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import Loading from '../Loading';

const CustomDialog = ({ open, handleClose, message, action }) => (
    <Dialog
        open={open}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          { !action ? <Loading /> : <></> }
          <DialogContentText id="alert-dialog-description">
            { message }
          </DialogContentText>
        </DialogContent>
        {
        action ?
          <DialogActions>
            <Button onClick={handleClose}>Repetir</Button>
          </DialogActions>
          : <></>
        }
    </Dialog>
);

export default CustomDialog;