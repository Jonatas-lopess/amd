import veiculoImg from '../../assets/img/veiculo.jpg';
import './style.css';
import { useEffect, useState } from 'react';
import UploadImages from '../UploadImages';

const Vistoria = () => {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        return () => {console.log('desmontou');URL.revokeObjectURL(imageURL)};
    }, [imageURL])
    
    return (
    <>
    <h1>Lateral do Motorista</h1>
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
    </>
)}

export default Vistoria;