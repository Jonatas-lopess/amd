import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import Layout from "../../layout";
import Presentation from "../Presentation";
import Vistoria from '../Vistoria';

const DataBuffer = ({ request, header }) => {
    const vistoria = request.data.read();
    const [snackStatus, setSnackStatus] = useState({
        open: false,
        type: 'error',
        message: ""
    });
    const [atual, setAtual] = useState("presentation");
    const list = {
        presentation: <Presentation changeView={setAtual}/>,
        vistoria: <Vistoria vistoria={vistoria} setSnackStatus={setSnackStatus} head={header} />
    }

    return <Layout info={vistoria} >
        { list[atual] }
        <Snackbar
            open={snackStatus.open}
            autoHideDuration={5000}
            anchorOrigin={{horizontal:'center', vertical:'bottom'}}
            onClose={
                () => setSnackStatus(prev => ({...prev, open: false}))
            }
        >
            <Alert variant='filled' severity={snackStatus.type} sx={{ width: '100%' }}>
                {snackStatus.message}
            </Alert>
        </Snackbar>
    </Layout>
}

export default DataBuffer;