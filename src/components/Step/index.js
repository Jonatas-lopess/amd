import { useEffect, useRef, useState } from 'react';
import UploadFiles from '../UploadFiles';
import { db } from '../../db';

const Step = ({ data, total, changeStep, submit, timer }) => {
    const id = Number(data.id);
    const [fileURL, setFileURL] = useState(null);
    const videoRef = useRef();
    const veiculoImg = `https://teste.sivisweb.com.br${data.imagem}`;

    useEffect(() => {
        (async () => {
            let file = await db.files.get(id);
            if(file) setFileURL(file.value);
        })()
    }, [])

    useEffect(() => {
        videoRef.current?.load();
        return async () => { if(fileURL !== null) await db.files.put({ id, value: fileURL }) }
    }, [fileURL, id])
    
    const renderObs = () => {
        let stringArr = data.observacao.split("*");
        let arr = [];
        let i = 0;
        for (const value in stringArr) {
                if(stringArr[value]) arr.push(<li key={i}>{stringArr[value]}</li>)
                i++
        }

        return arr;
    }

    return (
        <>
        <div className='etapas'>
            <span className={id === 0 || (!fileURL && data.tipo !== "button") ? 'disable' : ''} onClick={id !== 0 && (fileURL || data.tipo === "button") ? () => changeStep(id - 1) : null}>&lt;</span>
            <h3>Etapa {(id + 1)}/{total}</h3>
            <span className={id === (total - 1) || !fileURL ? 'disable' : ''} onClick={id !== (total - 1) && fileURL ? () => changeStep(id + 1) : null}>&gt;</span>
            <span className='timer'>{`${timer.minutes}`.padStart(2, "0")}:{`${timer.seconds}`.padStart(2, "0")}</span>
        </div>
        {
            fileURL ?
                data.tipo === "imagem" ?
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
                    <img src={veiculoImg} alt="veiculo" className={data.tipo === 'button' ? 'veiculo-img no-border' : 'veiculo-img'} />
        }
        <h1>{data.nome}</h1>
        {
            data.tipo === "button" ?
            <>
                <p>Caso o Veículo possua algum amassado, arranhado mais profundo, pintura queimada, vidros, faróis ou retrovisores quebrados, não deixe de informar a seguir no botão <b>DANOS E AVARIAS</b></p>
                <button onClick={submit}>Finalizar</button>
            </>
            :
            <>
            <div className='info'>
                <h4>foto obrigatória</h4>
                <ul>
                    { renderObs() }
                </ul>
            </div>
            <UploadFiles file={fileURL} fileURLCallback={setFileURL} fileType={data.tipo} changeStep={changeStep} />
            </>
        }
        </>
    )
}

export default Step;