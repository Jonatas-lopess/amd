import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import GeoMap from "../GeoMap";
import map from '../../assets/img/maps.jpg';

const Presentation = ({ changeView, local, setLocal }) => {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                setLocal({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            }, error => {
                console.log(error)
            });
        } else {
            console.log("Sem suporte para geolocalização...");
        }
    }, [setLocal]);

    return <>
        {
            local
            ? <GeoMap mapProps={local} />
            : <div className="location">
                <img src={map} alt="localização" onClick={() => window.location.reload(true)}/>
                <small>Clique no mapa para adicionar sua localização, em seguida clique em <b>PRÓXIMA</b></small>
                <ul>
                    <li>Cetifique-se que o GPS do seu SmartPhone está ligado.</li>
                    <li>Permita acesso à sua localização.</li>
                </ul>
            </div>
        }
        <div className="regras">
            <h2>Leia atentamente antes de iniciar sua vistoria</h2>
            <div>
                <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                Fotos e vídeos devem ser feitos em modo paisagem.
            </div>
            <div>
                <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                Procure saber onde está localizado o número do CHASSI do seu veículo.
            </div>
            <div>
                <FontAwesomeIcon icon={faCircleCheck} size='xl' />
                Esteja em um local iluminado, não aceitamos vistorias feitas no interior de garagem ou em locais apertados e nunca utilize o FLASH.
            </div>
            { local && <button onClick={() => changeView("menu")}>Próxima</button> }
        </div>
    </>
}

export default Presentation;