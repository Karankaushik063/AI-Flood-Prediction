import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, X, TrendingUp } from 'lucide-react';
import { predictFlood } from '../services/api';
import './ComparisonTool.css';
export default function ComparisonTool() {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const addLocation = () => {
        if (locations.length >= 3) {
            alert('Maximum 3 locations can be compared');
            return;
        }
        const newLocation = {
            id: Date.now().toString(),
            nickname: `Location ${locations.length + 1}`,
            lat: 23.8103,
            lon: 90.4125,
            precip_1d: 50,
            precip_3d: 120,
            precip_7d: 200,
            precip_14d: 300,
        };
        setLocations([...locations, newLocation]);
    };
    const removeLocation = (id) => {
        setLocations(locations.filter(loc => loc.id !== id));
    };
    const updateLocation = (id, field, value) => {
        setLocations(locations.map(loc => loc.id === id ? { ...loc, [field]: value } : loc));
    };
    const runComparison = async () => {
        setIsLoading(true);
        const updatedLocations = await Promise.all(locations.map(async (loc) => {
            try {
                const request = {
                    lat: loc.lat,
                    lon: loc.lon,
                    date: new Date().getDay(),
                    elevation: 10,
                    slope: 0.5,
                    landcover: 11,
                    precip_1d: loc.precip_1d || 50,
                    precip_3d: loc.precip_3d || 120,
                    precip_7d: loc.precip_7d || 200,
                    precip_14d: loc.precip_14d || 300,
                    dis_last: 1500,
                    dis_trend_3: 100,
                    dayofyear: new Date().getDay(),
                };
                const prediction = await predictFlood(request);
                return { ...loc, prediction };
            }
            catch (error) {
                console.error(`Failed to predict for ${loc.nickname}:`, error);
                return loc;
            }
        }));
        setLocations(updatedLocations);
        setIsLoading(false);
    };
    return (_jsxs("div", { className: "comparison-tool", children: [_jsxs("div", { className: "comparison-header", children: [_jsx("h2", { children: "\uD83D\uDCCD Location Comparison" }), _jsx("p", { children: "Compare flood risk across multiple locations" })] }), _jsxs("div", { className: "comparison-actions", children: [_jsxs("button", { onClick: addLocation, className: "add-location-btn", disabled: locations.length >= 3, children: [_jsx(Plus, { size: 18 }), "Add Location"] }), locations.length > 0 && (_jsxs("button", { onClick: runComparison, className: "compare-btn", disabled: isLoading, children: [_jsx(TrendingUp, { size: 18 }), isLoading ? 'Analyzing...' : 'Compare All'] }))] }), _jsx("div", { className: "comparison-grid", children: locations.map((loc) => (_jsxs("div", { className: "comparison-card glass", children: [_jsx("button", { className: "remove-btn", onClick: () => removeLocation(loc.id), children: _jsx(X, { size: 16 }) }), _jsxs("div", { className: "location-inputs", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Nickname" }), _jsx("input", { type: "text", value: loc.nickname, onChange: (e) => updateLocation(loc.id, 'nickname', e.target.value), placeholder: "Location name" })] }), _jsxs("div", { className: "input-row", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Latitude" }), _jsx("input", { type: "number", value: loc.lat, onChange: (e) => updateLocation(loc.id, 'lat', parseFloat(e.target.value)), step: "0.0001" })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "Longitude" }), _jsx("input", { type: "number", value: loc.lon, onChange: (e) => updateLocation(loc.id, 'lon', parseFloat(e.target.value)), step: "0.0001" })] })] }), _jsxs("div", { className: "precipitation-inputs", children: [_jsx("h4", { children: "Precipitation (mm)" }), _jsxs("div", { className: "input-grid-small", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { children: "1-Day" }), _jsx("input", { type: "number", value: loc.precip_1d || 0, onChange: (e) => updateLocation(loc.id, 'precip_1d', parseFloat(e.target.value)), placeholder: "0" })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "3-Day" }), _jsx("input", { type: "number", value: loc.precip_3d || 0, onChange: (e) => updateLocation(loc.id, 'precip_3d', parseFloat(e.target.value)), placeholder: "0" })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "7-Day" }), _jsx("input", { type: "number", value: loc.precip_7d || 0, onChange: (e) => updateLocation(loc.id, 'precip_7d', parseFloat(e.target.value)), placeholder: "0" })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { children: "14-Day" }), _jsx("input", { type: "number", value: loc.precip_14d || 0, onChange: (e) => updateLocation(loc.id, 'precip_14d', parseFloat(e.target.value)), placeholder: "0" })] })] })] })] }), loc.prediction && (_jsxs("div", { className: "prediction-result", children: [_jsxs("div", { className: `risk-level ${loc.prediction.risk_level.toLowerCase()}`, children: [loc.prediction.risk_level, " Risk"] }), _jsxs("div", { className: "probability-display", children: [_jsxs("span", { className: "probability-value", children: [(loc.prediction.flood_probability * 100).toFixed(1), "%"] }), _jsx("span", { className: "probability-label", children: "Flood Probability" })] }), _jsxs("div", { className: "confidence-display", children: ["Confidence: ", (loc.prediction.confidence * 100).toFixed(1), "%"] })] }))] }, loc.id))) }), locations.length === 0 && (_jsx("div", { className: "empty-comparison glass", children: _jsx("p", { children: "Click \"Add Location\" to start comparing flood risks" }) }))] }));
}
