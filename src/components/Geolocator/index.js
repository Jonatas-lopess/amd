import { useEffect, useState } from "react";
import GeoMap from "./GeoMap";
import map from '../../assets/img/maps.jpg';

const Geolocator = ({ coord, callback }) => {
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                callback({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            }, error => {
                console.log(error)
                if(error.code === 1) setErr(true);
            });
        } else {
            console.log("Sem suporte para geolocalização...");
        }
    }, [callback]);

    return err
     ? <div className="location">
        <img src={map} alt="localização" onClick={() => window.location.reload(true)}/>
        <small>Clique no mapa para adicionar sua localização, em seguida clique em <b>PRÓXIMA</b></small>
        <ul>
            <li>Cetifique-se que o GPS do seu SmartPhone está ligado.</li>
            <li>Permita acesso à sua localização.</li>
        </ul>
     </div>
     : <GeoMap mapProps={coord} />
}

export default Geolocator;