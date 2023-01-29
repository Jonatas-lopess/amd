import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

const CustomDialog = ({ open, handleClose }) => (
    <Dialog
        open={open}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Atenção!<br/>Sua foto foi capturada com o celular em modo Retrato (em pé). Vamos tentar de novo? Precisamos da foto em modo PAISAGEM (com celular deitado) ok?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Repetir</Button>
        </DialogActions>
    </Dialog>
);

export default CustomDialog;