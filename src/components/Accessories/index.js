import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import saveData from "../../api/saveData";
import AcessoriesList from "../AcessoriesList";
import CustomDialog from "../CustomDialog";
import CustomSnackbar from "../CustomSnackbar";

const Accessories = ({ data, vistoriaId }) => {
    const [accessories, setAcessories] = useState({
        version: 0,
        data: data
    })
    const { id, contrato } = useParams()
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    })
    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        message: `Salvando informações...`,
        action: false
    })

    useEffect(() => {
        localStorage.setItem('atual', `acessorios_${vistoriaId}`)
    }, [vistoriaId]);

    const handleToggle = value => {
        let newList = accessories.data;

        for (const key in newList) {
            const element = newList[key];
            
            if(element.id === value.target.id) element.check === 1 ? element.check = 0 : element.check = 1;
        }

        setAcessories(prev => ({ version: prev.version + 1, data: newList}))
    }

    const handleCloseBtn = () => {
        localStorage.removeItem("atual")
        window.location.reload()
    }

    const saveAcessories = async () => {
        let saveList = []
        accessories.data.map(e => saveList.push({
            "id": e.id,
            "check": e.check
        }));

        let requestBody = {
            "contrato": contrato,
            "idVistoria": id,
            "functionPage": "acessoriosSave",
            "itens": saveList,
        }

        let response = await ((await saveData(requestBody)).text())

        if(response !== 'OK') throw Error(`Erro no envio das informações`);
        setDialogStatus(prev => ({...prev, open: false}))

        return response;
    }

    const handleSaveBtn = () => {
        setDialogStatus(prev => ({...prev, open: true}))

        saveAcessories().then(() => {
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
        <h1>Acessórios</h1>
        <AcessoriesList data={accessories.data} handleToggle={handleToggle} />
        <div className="obs-buttons">
            <button onClick={handleCloseBtn}>Fechar</button>
            <button onClick={handleSaveBtn}>Salvar</button>
        </div>
        <CustomSnackbar content={snack} setStatus={setSnack} />
        <CustomDialog open={dialogStatus.open} handleClose={() => null} action={dialogStatus.action} message={dialogStatus.message} />
    </>
}

export default Accessories;