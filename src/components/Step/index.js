import './style.css';
import { useEffect, useState } from 'react';
import UploadImages from '../UploadImages';

const Step = ({ data }) => {
    const [imageURL, setImageURL] = useState(null);
    const veiculoImg = `https://teste.sivisweb.com.br${data.imagem}`;

    useEffect(() => {
        return () => URL.revokeObjectURL(imageURL);
    }, [imageURL])
    
    return (
    <div>
        <h1>{data.nome}</h1>
        <img src={(imageURL ?? veiculoImg)} alt="veiculo" className='veiculo-img' />
        <div className='info'>
            <h4>foto obrigatória</h4>
            <ul>
                <li>Na foto deve aparecer toda lateral do motorista;</li>
                <li><span>Atenção:</span> Os vidros devem estar fechados.</li>
            </ul>
        </div>
        <h2>tirar foto</h2>
        <UploadImages imageURLCallback={setImageURL} />
    </div>
)}

export default Step;