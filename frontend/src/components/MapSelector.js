import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
function LocationMarker({ lat, lon, onLocationSelect }) {
    const map = useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    useEffect(() => {
        map.flyTo([lat, lon], map.getZoom());
    }, [lat, lon, map]);
    return _jsx(Marker, { position: [lat, lon] });
}
export default function MapSelector({ lat, lon, onLocationSelect }) {
    return (_jsxs("div", { className: "map-container glass", children: [_jsxs(MapContainer, { center: [lat, lon], zoom: 7, style: { height: '400px', width: '100%', borderRadius: '1rem' }, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(LocationMarker, { lat: lat, lon: lon, onLocationSelect: onLocationSelect })] }), _jsx("div", { className: "map-hint", children: "Click anywhere on the map to update location" })] }));
}
