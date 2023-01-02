import './style.css';
import { useEffect, useState } from 'react';
import UploadFiles from '../UploadFiles';
import { setStorage, getStorage } from '../CustomStorage';

const Step = ({ data, id, submit }) => {
    const [fileURL, setFileURL] = useState(getStorage(`file_${id}`));
    const veiculoImg = `https://teste.sivisweb.com.br${data.imagem}`;

    useEffect(() => {
        return () => setStorage(`file_${id}`, fileURL);
    }, [fileURL, id])
    
    return (
        <>
        <h1>{data.nome}</h1>
        {
            fileURL ?
                data.tipo === "imagem" ?
                <img src={fileURL} alt="veiculo" className='veiculo-img' />
                :
                <video width={300} height={300} controls>
                    <source src={fileURL} type="video/*" />
                    "Seu brouser não suporta vídeos"
                </video>
            :
            <img src={veiculoImg} alt="veiculo" className='veiculo-img' />
        }
        {
            data.tipo === "button" ?
            <button onClick={submit}>Finalizar</button>
            :
            <>
            <div className='info'>
                <h4>foto obrigatória</h4>
                <ul>
                    <li>Na foto deve aparecer toda lateral do motorista;</li>
                    <li><span>Atenção:</span> Os vidros devem estar fechados.</li>
                </ul>
            </div>
            <h2>tirar foto</h2>
            <UploadFiles fileURLCallback={setFileURL} fileType={data.tipo} />
            </>
        }
        </>
    )
}

export default Step;