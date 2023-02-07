import { useEffect, useRef, useState } from 'react';
import UploadFiles from '../UploadFiles';
import CustomSnackbar from '../CustomSnackbar';
import { useParams } from 'react-router-dom';
import useTimer from '../Timer';
import saveData from '../../api/saveData';

const Step = ({ data, step, changeStep }) => {
    const vistoria = data.vistoria.read()[0];
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
                if(Number(element.imagens[key].id) === step) return element.imagens[key];
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

    const sendFile = async () => {
        try {
            if(info.tipo === 'button') {
                info.cache = new Date().toString();
                info.latitude = Number(sessionStorage.getItem('location_lat'));
                info.longitude = Number(sessionStorage.getItem('location_lng'));
                info.dt_ini = sessionStorage.getItem('initial');
            } else { info.cache = fileURL }
            vistoria.vistoriaEtapas = [{
                "imagens": [info]
            }];
            let arrayData = Object.assign({}, requestBody, vistoria);
            
            let response = await saveData(arrayData);

            if(typeof response.json() !== 'object') throw Error(`Erro no processamento de ${info.tipo}`);

            if(info.tipo === 'button') {
                window.location.reload();
            } else {
                changeStep(prev => prev + 1);
            }
        } catch (error) {
            setSnack({
                type: 'error',
                message: error.message,
                status: true
            });
        }
    }

    return <>
        <div className='etapas'>
            <span className={infoId === 0 || (!fileURL && info.tipo !== "button") ? 'disable' : ''} onClick={infoId !== 0 && (fileURL || info.tipo === "button") ? () => changeStep(infoId - 1) : null}>&lt;</span>
            <h3>Etapa {(infoId + 1)}/{stepsNumber}</h3>
            <span className={infoId === (stepsNumber - 1) || !fileURL ? 'disable' : ''} onClick={infoId !== (stepsNumber - 1) && fileURL ? () => changeStep(infoId + 1) : null}>&gt;</span>
            <span className='timer'>{`${timer.minutes}`.padStart(2, "0")}:{`${timer.seconds}`.padStart(2, "0")}</span>
        </div>
        {
            fileURL ?
                info.tipo === "imagem" ?
                <img src={fileURL} alt="veiculo" className='veiculo-img' />
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
                    <img src={veiculoImg} alt="veiculo" className={info.tipo === 'button' ? 'veiculo-img no-border' : 'veiculo-img'} />
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
        </>
}

export default Step;