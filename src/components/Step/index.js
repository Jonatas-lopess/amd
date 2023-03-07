import { useEffect, useRef, useState } from 'react';
import UploadFiles from '../UploadFiles';
import CustomSnackbar from '../CustomSnackbar';
import { useParams } from 'react-router-dom';
import useTimer from '../Timer';
import saveData from '../../api/saveData';
import CustomDialog from '../CustomDialog';
import errorImg from '../../assets/img/no-image.png';
import proxImg from '../../assets/img/proximo.png';
import antImg from '../../assets/img/anterior.png';

const Step = ({ data, changeData }) => {
    const vistoria = data.vistoria;
    const info = getInfo();
    const infoId = Number(info.id);
    const [fileURL, setFileURL] = useState(null);
    const videoRef = useRef();
    const veiculoImg = `https://teste.sivisweb.com.br${info.imagem}`;
    const [snack, setSnack] = useState({
        message: '',
        status: false,
        type: 'error'
    });
    const [dialogStatus, setDialogStatus] = useState({
        open: false,
        message: `Salvando ${info.tipo === 'button' ? 'Vistoria' : info.tipo}...`,
        action: false
    });
    const stepsNumber = countSteps();
    const { id, contrato } = useParams();
    const requestBody = {
        "contrato": contrato,
        "idVistoria": id,
        "functionPage": "vistoriaSave"
    }
    const timer = useTimer();

    useEffect(() => {
        videoRef.current?.load();
    }, [fileURL])

    function getInfo() {
        for (const key in vistoria.vistoriaEtapas) {
            const element = vistoria.vistoriaEtapas[key];
            for (const key in element.imagens) {
                if(Number(element.imagens[key].id) === data.currentStep) return element.imagens[key];
            }
        }
    }

    function countSteps() {
        let arr = 0;
        for (let index = 0; index < vistoria.vistoriaEtapas.length; index++) {
            let element = vistoria.vistoriaEtapas[index].imagens;
            for (let i = 0; i < element.length; i++) {
                arr++
            }          
        }
        return arr;
    }

    const renderObs = () => {
        let stringArr = info.observacao.split("*");
        let arr = [];
        let i = 0;
        for (const value in stringArr) {
                if(stringArr[value]) arr.push(<li key={i}>{stringArr[value]}</li>)
                i++
        }

        return arr;
    }

    const handleImgLoadError = event => {
        event.target.src = errorImg;
        event.onerror = null;
    }

    const handleFilePick = () => {
        let element = document.getElementById('file-upload');
        if(element.click)
            element.click();
        else {
            let eventObj = new MouseEvent('click', { bubbles: true, cancelable: false });
            element.dispatchEvent(eventObj);
        }
    }

    const sendFile = async () => {
        setDialogStatus(prev => ({...prev, open: true}))

        try {
            if(info.tipo === 'button') {
                let date = new Date();
                let newdate = `${date.getDate()}`.padStart(2, "0") + "/" + (`${date.getMonth() + 1}`.padStart(2, "0")) + "/" + date.getFullYear() + " " + `${date.getHours()}`.padStart(2, "0") + ":" + `${date.getMinutes()}`.padStart(2, "0") + ":" + `${date.getSeconds()}`.padStart(2, "0");
        
                info.cache = newdate;
                info.latitude = Number(localStorage.getItem('location_lat'));
                info.longitude = Number(localStorage.getItem('location_lng'));
                info.dt_ini = localStorage.getItem(`initial_${vistoria.id}`);
            } else { info.cache = fileURL }
            vistoria.vistoriaEtapas = [{
                "imagens": [info]
            }];
            let arrayData = Object.assign({}, requestBody, vistoria);
            
            let response = await ((await saveData(arrayData)).json())

            if(typeof response !== 'object') throw Error(`Erro no envio de ${info.tipo}`);

            if(info.tipo === 'button') {
                localStorage.removeItem(`initial_${vistoria.id}`)
                localStorage.removeItem('atual')
                window.location.reload()
            } else {
                setDialogStatus(prev => ({...prev, open: false}))

                changeData(prev => ({
                    vistoria: response,
                    currentStep : prev.currentStep + 1
                }));
            }
        } catch (error) {
            setDialogStatus(prev => ({...prev, open: false}))

            setSnack({
                type: 'error',
                message: error.message,
                status: true
            });
        }
    }

    return <>
        <div className='etapas'>
            <span className={infoId === 0 ? 'disable' : ''} onClick={infoId !== 0 ? () => changeData(prev => ({...prev, currentStep: prev.currentStep - 1})) : null}><img src={antImg} alt="prev" /></span>
            <h3>Etapa {(infoId + 1)}/{stepsNumber}</h3>
            <span className={infoId === (stepsNumber - 1) || info.imagem.substr(0, 24) === "/Modulos/Seguro/Api/img/" ? 'disable' : ''} onClick={infoId !== (stepsNumber - 1) && info.imagem.substr(0, 24) !== "/Modulos/Seguro/Api/img/" ? () => changeData(prev => ({...prev, currentStep: prev.currentStep + 1})) : null}><img src={proxImg} alt="next" /></span>
            <span className='timer'>{`${timer.minutes}`.padStart(2, "0")}:{`${timer.seconds}`.padStart(2, "0")}</span>
        </div>
        {
            fileURL ?
                info.tipo === "imagem" ?
                <img src={fileURL} alt="veiculo" className='veiculo-img' onClick={handleFilePick} onError={handleImgLoadError} />
                :
                <video ref={videoRef} controls className='veiculo-img'>
                    <source src={fileURL} type="video/mp4" />
                    "Seu brouser não suporta vídeos"
                </video>
            :
                veiculoImg.includes(".mp4") ? 
                    <video ref={videoRef} controls className='veiculo-img'>
                        <source src={veiculoImg} type="video/mp4" />
                        "Seu brouser não suporta vídeos"
                    </video>
                :
                    <img src={veiculoImg} alt="veiculo" className={info.tipo === 'button' ? 'veiculo-img no-border' : 'veiculo-img'} onClick={handleFilePick} onError={handleImgLoadError} />
        }
        <h1>{info.nome}</h1>
        {
            info.tipo === "button" ?
            <>
                <p>Caso o Veículo possua algum amassado, arranhado mais profundo, pintura queimada, vidros, faróis ou retrovisores quebrados, não deixe de informar a seguir no botão <b>DANOS E AVARIAS</b></p>
                <button onClick={sendFile}>Finalizar</button>
            </>
            :
            <>
            <div className='info'>
                <h4>foto obrigatória</h4>
                <ul>
                    { renderObs() }
                </ul>
            </div>
            <UploadFiles file={fileURL} fileURLCallback={setFileURL} fileType={info.tipo} submit={sendFile} />
            </>
        }
        <CustomSnackbar content={snack} setStatus={setSnack} />
        <CustomDialog open={dialogStatus.open} handleClose={() => null} action={dialogStatus.action} message={dialogStatus.message} />
    </>
}

export default Step;