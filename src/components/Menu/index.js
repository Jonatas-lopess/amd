import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = ({ changeView }) => {
    return <div className="menu">
        <div onClick={() => changeView("vistoria")}>
            <span>Iniciar vistoria</span>
            <FontAwesomeIcon icon={faPlay} size="xl" />
        </div>
        <div className="disable">
            <span>Danos e Avarias</span>
            <FontAwesomeIcon icon={faPlay} size="xl" />
        </div>
        <div className="disable">
            <span>Acessórios</span>
            <FontAwesomeIcon icon={faPlay} size="xl" />
        </div>
        <div className="disable">
            <span>Observações</span>
            <FontAwesomeIcon icon={faPlay} size="xl" />
        </div>
    </div>
}

export default Menu;