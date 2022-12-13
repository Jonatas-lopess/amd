import React, { memo, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function GeoMap() {
    const mapStyle = {
        height: '50vh',
        maxWidth: '100vh',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden'
    }
    const [ mapProps, setMapProps ] = useState({
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(location => {
                console.log(location.coords);
                setMapProps({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            });
        } else {
            console.log("Sem suporte para geolocalização...");
        }
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBjj77pFcx4YOGyV3TdrZYoTXZ00ry7LUg"
    });

    return isLoaded ? (
        <div style={mapStyle}>
            <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%', }}
                center={mapProps}
                zoom={15}
            >
                <Marker position={mapProps} />
            </GoogleMap>
        </div>
    ) : <></>
}

export default memo(GeoMap);