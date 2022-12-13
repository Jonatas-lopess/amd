import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import veiculoImg from '../../assets/img/veiculo.jpg';
import './style.css';

const Vistoria = () => (
    <>
    <h1>Lateral do Motorista</h1>
    <img src={veiculoImg} alt="veiculo" />
    <div className='info'>
        <h4>foto obrigatória</h4>
        <ul>
            <li>Na foto deve aparecer toda lateral do motorista;</li>
            <li><span>Atenção:</span> Os vidros devem estar fechados.</li>
        </ul>
    </div>
    <h2>tirar foto</h2>
    <div className='camera'>
        <FontAwesomeIcon icon={faCamera} size='3x' className='cameraIcon' />
    </div>
    </>
)

export default Vistoria;