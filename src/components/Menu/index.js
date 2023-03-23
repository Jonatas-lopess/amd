import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeoMap from "../GeoMap";
import Vistoria from '../Vistoria';
import Observation from '../Observation';
import Avarias from "../Avarias";
import { useEffect, useState } from "react";
import img from '../../assets/img/ICONE.png';
import Accessories from "../Accessories";

const Menu = ({ local, vistoria, avaria, acessorios }) => {
    const [atual, setAtual] = useState(handleAtual());
    const fase= {
        vistoria: vistoria.data_aprov !== "",
        avarias: avaria.length !== 0,
        acessorios: handleAcessorios(),
        observation: vistoria.observacao !== ""
    }
    const list = {
        vistoria: <Vistoria data={vistoria} />,
        avarias: <Avarias data={avaria} id={vistoria.id} />,
        acessorios: <Accessories data={acessorios} vistoriaId={vistoria.id} />,
        observation: <Observation data={vistoria} />
    }

    useEffect(() => {
        localStorage.removeItem('timer');
    }, [])
    
    function handleAcessorios() {
        let val = false;
        for (let i of acessorios) {
            if(i.check === 1) val = true;
        }

        return val;
    }

    function handleAtual() {
        let atual = localStorage.getItem('atual')
        if(!atual || !atual.includes(vistoria.id)) {
            localStorage.removeItem('atual')
            return null;
        }

        return atual.split("_")[0];
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
                <div className={fase.vistoria === false || acessorios.length === 0 ? "disable" : ""} onClick={() => fase.vistoria && acessorios.length !== 0 ? setAtual("avarias") : null}>
                    <span>Danos e Avarias</span>
                    { fase.avarias ? <img src={img} alt="check" className="icone" /> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
                </div>
                <div className={fase.vistoria === false ? "disable" : ""} onClick={() => fase.vistoria ? setAtual("acessorios") : null} >
                    <span>Acessórios</span>
                    { fase.acessorios ? <img src={img} alt="check" className="icone" /> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
                </div>
                <div className={fase.vistoria === false ? "disable" : ""} onClick={() => fase.vistoria ? setAtual("observation") : null} >
                    <span>Observações</span>
                    { fase.observation ? <img src={img} alt="check" className="icone" /> : <FontAwesomeIcon icon={faPlay} size="xl" /> }
                </div>
            </div>
         </>
}

export default Menu;