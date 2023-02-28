import React, { memo } from "react";
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeoMap = ({ mapProps }) => {
    return <div className="map">
            <MapContainer
                style={{ height: '100%', width: '100%', }}
                center={[mapProps.lat, mapProps.lng]}
                zoom={14}
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker center={[mapProps.lat, mapProps.lng]} />
            </MapContainer>
        </div>
}

export default memo(GeoMap);