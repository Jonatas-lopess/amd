import { faCheck, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeoMap from "../GeoMap";

const Menu = ({ changeView, local, option }) => {
    return <>
        <GeoMap mapProps={local} />
        <div className="menu">
            <div onClick={() => option.vistoria === false ? changeView("vistoria") : null}>
                <span>Iniciar vistoria</span>
                { option.vistoria === true ? <FontAwesomeIcon icon={faCheck} size='xl' color="green"/> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
            </div>
            <div onClick={() => changeView("avarias")} className={option.vistoria === false ? "disable" : ""}>
                <span>Danos e Avarias</span>
                <FontAwesomeIcon icon={faPlay} size="xl" />
            </div>
            <div className={option.vistoria === false ? "disable" : ""}>
                <span>Acessórios</span>
                <FontAwesomeIcon icon={faPlay} size="xl" />
            </div>
            <div onClick={() => changeView("observation")} className={option.vistoria === false ? "disable" : ""}>
                <span>Observações</span>
                <FontAwesomeIcon icon={faPlay} size="xl" />
            </div>
        </div>
    </>
}

export default Menu;