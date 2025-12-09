import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MapPin, Trash2, ExternalLink } from 'lucide-react';
import './SavedLocations.css';
export default function SavedLocations({ onLoadLocation }) {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('saved-locations');
        if (saved) {
            setLocations(JSON.parse(saved));
        }
    }, []);
    const deleteLocation = (id) => {
        const updated = locations.filter(loc => loc.id !== id);
        setLocations(updated);
        localStorage.setItem('saved-locations', JSON.stringify(updated));
    };
    const loadLocation = (lat, lon) => {
        if (onLoadLocation) {
            onLoadLocation(lat, lon);
        }
    };
    return (_jsxs("div", { className: "saved-locations", children: [_jsxs("h3", { children: [_jsx(MapPin, { size: 20 }), "Saved Locations"] }), locations.length === 0 ? (_jsx("div", { className: "empty-locations", children: _jsx("p", { children: "No saved locations yet. Save locations from the prediction form." }) })) : (_jsx("div", { className: "locations-list", children: locations.map((loc) => (_jsxs("div", { className: "location-item glass", children: [_jsxs("div", { className: "location-info", children: [_jsx("h4", { children: loc.nickname }), _jsxs("p", { children: [loc.lat.toFixed(4), ", ", loc.lon.toFixed(4)] }), _jsxs("span", { className: "location-date", children: ["Saved: ", new Date(loc.addedAt).toLocaleDateString()] })] }), _jsxs("div", { className: "location-actions", children: [_jsx("button", { onClick: () => loadLocation(loc.lat, loc.lon), className: "load-btn", title: "Load this location", children: _jsx(ExternalLink, { size: 16 }) }), _jsx("button", { onClick: () => deleteLocation(loc.id), className: "delete-btn", title: "Delete this location", children: _jsx(Trash2, { size: 16 }) })] })] }, loc.id))) }))] }));
}
