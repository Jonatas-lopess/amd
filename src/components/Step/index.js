import './style.css';
import { useEffect, useState } from 'react';
import UploadFiles from '../UploadFiles';

const Step = ({ data }) => {
    const [imageURL, setImageURL] = useState(null);
    const veiculoImg = `https://teste.sivisweb.com.br${data.imagem}`;

    useEffect(() => {
        return () => URL.revokeObjectURL(imageURL);
    }, [imageURL])
    
    return (
    <div>
        <h1>{data.nome}</h1>
        {
            imageURL ?
                data.type === "imagem" ?
                <img src={imageURL} alt="veiculo" className='veiculo-img' />
                :
                <video width={300} height={300} controls>
                    <source src={imageURL} type="video/*" />
                    "Seu brouser não suporta vídeos"
                </video>
            :
            <img src={veiculoImg} alt="veiculo" className='veiculo-img' />
        }
        <div className='info'>
            <h4>foto obrigatória</h4>
            <ul>
                <li>Na foto deve aparecer toda lateral do motorista;</li>
                <li><span>Atenção:</span> Os vidros devem estar fechados.</li>
            </ul>
        </div>
        <h2>tirar foto</h2>
        <UploadFiles fileURLCallback={setImageURL} fileType={data.tipo} />
    </div>
)}

export default Step;