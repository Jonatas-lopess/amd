import { useEffect, useState } from "react";
import GeoMap from "../GeoMap";
import map from '../../assets/img/maps.jpg';
import img from '../../assets/img/ICONE.png';

const Presentation = ({ callback }) => {
    const [local, setLocal] = useState(undefined);

    useEffect(() => getLocation(), []);

    const getLocation = () => {
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
    }

    return <>
        {
            local
            ? <GeoMap mapProps={local} />
            : <div className="location">
                <img src={map} alt="localização" onClick={() => getLocation()}/>
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
                <img src={img} alt="check" className="icone" />
                <span>Fotos e vídeos devem ser feitos em modo paisagem.</span>
            </div>
            <div>
                <img src={img} alt="check" className="icone" />
                <span>Procure saber onde está localizado o número do CHASSI do seu veículo.</span>
            </div>
            <div>
                <img src={img} alt="check" className="icone" />
                <span>Esteja em um local iluminado, não aceitamos vistorias feitas no interior de garagem ou em locais apertados e nunca utilize o FLASH.</span>
            </div>
            { local && <button onClick={() => callback(local)}>Próxima</button> }
        </div>
    </>
}

export default Presentation;