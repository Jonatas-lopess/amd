import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import saveData from "../../api/saveData";
import CustomDialog from "../CustomDialog";
import CustomSnackbar from "../CustomSnackbar";

const Observation = ({ data }) => {
    const [observacao, setObservacao] = useState(data.observacao)
    const { id, contrato } = useParams()
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    })
    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        message: `Salvando observação...`,
        action: false
    })

    useEffect(() => {
        localStorage.setItem('atual', `observation_${data.id}`)
    }, [data.id]);

    const handleCloseBtn = () => {
        localStorage.removeItem("atual")
        window.location.reload()
    }

    const saveObservation = async () => {
        let requestBody = {
            "contrato": contrato,
            "idVistoria": id,
            "functionPage": "observacaoSave",
            "observacao": observacao,
        }

        let response = await ((await saveData(requestBody)).text())

        if(response !== 'OK') throw Error(`Erro no envio das informações`);
        setDialogStatus(prev => ({...prev, open: false}))

        return response;
    }

    const handleSaveBtn = () => {
        setDialogStatus(prev => ({...prev, open: true}))

        saveObservation().then(() => {
            localStorage.removeItem('atual')
            window.location.reload()
        }).catch(r => {
            setDialogStatus(prev => ({...prev, open: false}))

            setSnack({
                type: 'error',
                message: r.message,
                status: true
            });
        });
    }

    return <>
        <div className="observation">
            <h1>observações</h1>
            <textarea rows={20} value={observacao} onChange={e => setObservacao(e.target.value)}></textarea>
            <div className="obs-buttons">
                <button onClick={handleCloseBtn}>Fechar</button>
                <button onClick={handleSaveBtn}>Salvar</button>
            </div>
        </div>
        <CustomSnackbar content={snack} setStatus={setSnack} />
        <CustomDialog open={dialogStatus.open} handleClose={() => null} action={dialogStatus.action} message={dialogStatus.message} />
    </>
}

export default Observation;