import { faCheck, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeoMap from "../GeoMap";
import Vistoria from '../Vistoria';
import Observation from '../Observation';
import Avarias from "../Avarias";
import { useEffect, useState } from "react";

const Menu = ({ local, vistoria }) => {
    const [fase, setFase] = useState({
        vistoria: vistoria.vistoriaEtapas[vistoria.vistoriaEtapas.length - 1].imagens[0].cache ? true : false,
        avarias: false,
        observation: false
    });
    const [atual, setAtual] = useState(undefined);
    
    const list = {
        vistoria: <Vistoria data={vistoria} />,
        avarias: <Avarias />,
        observation: <Observation changeView={setAtual} callback={setFase} />
    }

    useEffect(() => {
        sessionStorage.removeItem('initial');
        sessionStorage.removeItem('timer');
    }, [])

    useEffect(() => {
        setAtual(undefined);
    }, [fase])

    return atual
         ? list[atual]
         : <>
            <GeoMap mapProps={local} />
            <div className="menu">
                <div onClick={() => fase.vistoria === false ? setAtual("vistoria") : null}>
                    <span>Iniciar vistoria</span>
                    { fase.vistoria === true ? <FontAwesomeIcon icon={faCheck} size='xl' color="green"/> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
                </div>
                <div className={fase.vistoria === false ? "disable" : ""}>
                    <span>Danos e Avarias</span>
                    <FontAwesomeIcon icon={faPlay} size="xl" />
                </div>
                <div className={fase.vistoria === false ? "disable" : ""}>
                    <span>Acessórios</span>
                    <FontAwesomeIcon icon={faPlay} size="xl" />
                </div>
                <div className={fase.vistoria === false ? "disable" : ""}>
                    <span>Observações</span>
                    <FontAwesomeIcon icon={faPlay} size="xl" />
                </div>
            </div>
         </>
}

export default Menu;