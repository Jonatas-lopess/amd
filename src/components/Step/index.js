import { useEffect, useRef, useState } from 'react';
import UploadFiles from '../UploadFiles';
import { setStorage, getStorage } from '../CustomStorage';

const Step = ({ data, total, changeStep, submit }) => {
    const id = Number(data.id);
    const [fileURL, setFileURL] = useState(getStorage(`file_${id}`));
    const videoRef = useRef();
    const veiculoImg = `https://teste.sivisweb.com.br${data.imagem}`;

    useEffect(() => {
        videoRef.current?.load();
        return () => setStorage(`file_${id}`, fileURL);
    }, [fileURL, id])
    
    return (
        <>
        <div className='etapas'>
            <span className={id === 0 ? 'disable' : ''} onClick={id !== 0 ? () => changeStep(id - 1) : null}>&lt;</span>
            <h3>Etapa {(id + 1)}/{total}</h3>
            <span className={id === (total - 1) ? 'disable' : ''} onClick={id !== (total - 1) ? () => changeStep(id + 1) : null}>&gt;</span>
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
                    <img src={veiculoImg} alt="veiculo" className='veiculo-img' />
        }
        <h1>{data.nome}</h1>
        {
            data.tipo === "button" ?
            <button onClick={submit}>Finalizar</button>
            :
            <>
            <div className='info'>
                <h4>foto obrigatória</h4>
                <ul>
                    <li>Na foto deve aparecer toda lateral do motorista;</li>
                    <li>Os vidros devem estar fechados.</li>
                </ul>
            </div>
            {data.tipo === 'imagem' ? <h2>tirar foto</h2> : <h2>gravar vídeo</h2>}
            <UploadFiles fileURLCallback={setFileURL} fileType={data.tipo} />
            </>
        }
        </>
    )
}

export default Step;