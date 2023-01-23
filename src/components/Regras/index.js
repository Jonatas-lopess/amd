import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Regras = ({ closeCallback, status }) => <div className="regras">
    <h2>Leia atentamente antes de iniciar sua vistoria</h2>
    <div>
        <FontAwesomeIcon icon={faCircleCheck} size='xl' color="red" />
        Fotos e vídeos devem ser feitos em modo paisagem.
    </div>
    <div>
        <FontAwesomeIcon icon={faCircleCheck} size='xl' color="red" />
        Procure saber onde está localizado o número do CHASSI do seu veículo.
    </div>
    <div>
        <FontAwesomeIcon icon={faCircleCheck} size='xl' color="red" />
        Esteje em um local iluminado, não aceitamos vistorias feitas no interior de garagem ou em locais apertados e nunca utilize o FLASH.
    </div>
    { !status && <button onClick={() => closeCallback(true)}>Próxima</button> }
</div>

export default Regras;