import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeoMap from "../GeoMap";
import Vistoria from '../Vistoria';
import Observation from '../Observation';
import Avarias from "../Avarias";
import { useEffect, useState } from "react";
import img from '../../assets/img/ICONE.png';

const Menu = ({ local, vistoria }) => {
    const [fase, setFase] = useState({
        vistoria: vistoria.data_aprov !== "",
        avarias: false,
        observation: false
    });
    const [atual, setAtual] = useState(handleAtual());
    
    const list = {
        vistoria: <Vistoria data={vistoria} />,
        avarias: <Avarias />,
        observation: <Observation changeView={setAtual} callback={setFase} />
    }

    useEffect(() => {
        localStorage.removeItem('timer');
    }, [])

    function handleAtual() {
        let atual = localStorage.getItem('atual')
        if(!atual || !atual.includes(vistoria.id)) {
            localStorage.removeItem('atual')
            return null;
        }

        return "vistoria";
    }

    return atual
         ? list[atual]
         : <>
            <GeoMap mapProps={local} />
            <div className="menu">
                <div onClick={() => !fase.vistoria ? setAtual("vistoria") : null}>
                    <span>Iniciar vistoria</span>
                    { fase.vistoria ? <img src={img} alt="check" className="icone" /> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
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