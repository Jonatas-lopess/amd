import React, { memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const GeoMap = ({ mapProps }) => {
    const mapStyle = {
        height: '20vh',
        maxWidth: '50vw',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'hidden',
        margin: '1rem auto'
    }

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
                options={{disableDefaultUI: true, zoom: 15}}
            >
                <Marker position={mapProps} />
            </GoogleMap>
        </div>
    ) : <></>
}

export default memo(GeoMap);