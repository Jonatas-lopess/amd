import { Alert, Snackbar } from "@mui/material";

function CustomSnackbar({ content, setStatus }) {
    return <Snackbar
        open={content.status}
        autoHideDuration={5000}
        anchorOrigin={{horizontal:'center', vertical:'bottom'}}
        onClose={() => setStatus(prev => ({ ...prev, status: false }))}
    >
        <Alert variant='filled' severity={content.type} sx={{ width: '100%' }}>
            {content.message}
        </Alert>
    </Snackbar>
}

export default CustomSnackbar;