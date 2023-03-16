import { useState } from "react";
import UploadFiles from "../UploadFiles";
import img from '../../assets/img/avaria.jpg';
import { useParams } from "react-router-dom";
import proxImg from '../../assets/img/proximo.png';
import antImg from '../../assets/img/anterior.png';
import saveData from "../../api/saveData";
import CustomSnackbar from '../CustomSnackbar';
import CustomDialog from '../CustomDialog';

const AvariaStep = ({ data, changeData }) => {
    const index = data.index;
    const avaria = data.avaria;
    const [photoURL, setPhotoURL] = useState(avaria[index - 1] ? `https://teste.sivisweb.com.br${avaria[index - 1].imagem}` : null);
    const [descURL, setDescURL] = useState(avaria[index - 1] ? avaria[index - 1].observacao : null);
    const { id, contrato } = useParams();
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });
    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        message: `Salvando informações...`,
        action: false
    });

    const handleFilePick = () => {
        let element = document.getElementById('file-upload');
        if(element.click)
            element.click();
        else {
            let eventObj = new MouseEvent('click', { bubbles: true, cancelable: false });
            element.dispatchEvent(eventObj);
        }
    }

    const saveAvaria = async () => {
        if(!descURL) throw Error("Preencha o campo de descrição!")

        let requestBody = {
            "contrato": contrato,
            "idVistoria": id,
            "functionPage": "avariasSave",
            "observacao": descURL,
            "cache": photoURL
        }

        let response = await ((await saveData(requestBody)).json())

        if(typeof response !== 'object') throw Error(`Erro no envio das informações`);
        setDialogStatus(prev => ({...prev, open: false}))

        return response;
    }

    const finish = () => {
        setDialogStatus(prev => ({...prev, open: true}))

        saveAvaria().then(() => {
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

    const submit = () => {
        setDialogStatus(prev => ({...prev, open: true}))

        saveAvaria().then(r => {
            changeData(prev => ({
                avaria: r,
                index: prev.index + 1
            }))
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
        <div className='etapas'>
            <span className={index === 1 ? 'disable' : ''} onClick={index !== 1 ? () => changeData(prev => ({...prev, index: prev.index - 1})) : null}><img src={antImg} alt="prev" /></span>
            <h3>Foto {`${index}`.padStart(2, "0")}/{`${avaria.length + 1}`.padStart(2, "0")}</h3>
            <span className={index === (avaria.length + 1) ? 'disable' : ''} onClick={index !== (avaria.length + 1) ? () => changeData(prev => ({...prev, index: prev.index + 1})) : null}><img src={proxImg} alt="next" /></span>
        </div>
        {
            photoURL
            ?   <img src={photoURL} alt="veiculo" className='veiculo-img' onClick={handleFilePick} />
            :   <img src={img} alt="veiculo" className='veiculo-img' onClick={handleFilePick} />
        }
        <p>Danos e Avarias</p>
        <textarea className="ma" rows={5} onChange={e => setDescURL(e.target.value)} value={descURL ? descURL : ''} disabled={photoURL === null}></textarea>
        <UploadFiles file={photoURL && photoURL?.substring(0, 5) !== 'https'} fileURLCallback={setPhotoURL} fileType={"imagem"} submit={submit} finishCallback={finish} />
        <CustomSnackbar content={snack} setStatus={setSnack} />
        <CustomDialog open={dialogStatus.open} handleClose={() => null} action={dialogStatus.action} message={dialogStatus.message} />
    </>
}

export default AvariaStep;