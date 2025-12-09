import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MapPin, Mountain, Cloud, Waves, Sparkles, Activity, Map as MapIcon } from 'lucide-react';
import axios from 'axios';
import MapSelector from './MapSelector';
import HistoricalChart from './HistoricalChart';
import './PredictionForm.css';
export default function PredictionForm({ onSubmit, isLoading }) {
    const [showMap, setShowMap] = useState(false);
    const [isFetchingWeather, setIsFetchingWeather] = useState(false);
    const [formData, setFormData] = useState({
        lat: 23.8103,
        lon: 90.4125,
        date: new Date().getDay(), // Approximate day of year
        elevation: 10.5,
        slope: 0.5,
        landcover: 11,
        precip_1d: 50.0,
        precip_3d: 120.0,
        precip_7d: 200.0,
        precip_14d: 300.0,
        dis_last: 1500.0,
        dis_trend_3: 100.0,
        dayofyear: new Date().getDay(),
    });
    // Load saved data on mount
    useEffect(() => {
        const savedData = localStorage.getItem('prediction-form-data');
        if (savedData) {
            try {
                setFormData(JSON.parse(savedData));
            }
            catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
    }, []);
    // Save data on change
    useEffect(() => {
        localStorage.setItem('prediction-form-data', JSON.stringify(formData));
    }, [formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };
    const handleLocationSelect = (lat, lon) => {
        setFormData(prev => ({ ...prev, lat, lon }));
    };
    const fetchLiveData = async () => {
        setIsFetchingWeather(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.get(`${API_URL}/weather/live?lat=${formData.lat}&lon=${formData.lon}`);
            const data = response.data;
            setFormData(prev => ({
                ...prev,
                elevation: data.elevation,
                precip_1d: data.precip_1d,
                precip_3d: data.precip_3d,
                precip_7d: data.precip_7d,
                precip_14d: data.precip_14d,
                // Keep existing values for fields not returned by API or use defaults
                slope: data.slope || prev.slope,
                landcover: data.landcover || prev.landcover,
                dis_last: data.dis_last || prev.dis_last,
                dis_trend_3: data.dis_trend_3 || prev.dis_trend_3
            }));
        }
        catch (error) {
            console.error("Failed to fetch live weather data:", error);
            alert("Failed to fetch live weather data. Please try again.");
        }
        finally {
            setIsFetchingWeather(false);
        }
    };
    // Handler for date selection from HistoricalChart
    const handleHistoricalDateSelect = (entry) => {
        // Convert ISO date to day of year
        const dateObj = new Date(entry.date);
        const start = new Date(dateObj.getFullYear(), 0, 0);
        const diff = dateObj.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        setFormData(prev => ({
            ...prev,
            precip_1d: entry.precipitation,
            precip_3d: entry.precipitation,
            precip_7d: entry.precipitation,
            precip_14d: entry.precipitation,
            dayofyear: dayOfYear,
            date: dayOfYear
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    const fillSampleData = () => {
        setFormData({
            lat: 24.3636,
            lon: 88.6241,
            date: 210,
            elevation: 8.2,
            slope: 0.3,
            landcover: 11,
            precip_1d: 85.0,
            precip_3d: 180.0,
            precip_7d: 320.0,
            precip_14d: 450.0,
            dis_last: 2200.0,
            dis_trend_3: 250.0,
            dayofyear: 210,
        });
    };
    return (_jsxs("div", { className: "form-container", children: [_jsxs("form", { className: "prediction-form glass", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-header", children: [_jsx("h2", { children: "Enter Location Data" }), _jsxs("div", { className: "header-actions", children: [_jsxs("button", { type: "button", onClick: () => setShowMap(!showMap), className: "icon-btn", title: "Toggle Map", children: [_jsx(MapIcon, { size: 18 }), showMap ? 'Hide Map' : 'Show Map'] }), _jsxs("button", { type: "button", onClick: fillSampleData, className: "sample-btn", children: [_jsx(Sparkles, { size: 16 }), "Sample"] })] })] }), showMap && (_jsx(MapSelector, { lat: formData.lat, lon: formData.lon, onLocationSelect: handleLocationSelect })), _jsxs("div", { className: "form-section", children: [_jsxs("div", { className: "section-header", children: [_jsx(MapPin, { size: 20 }), _jsx("h3", { children: "Location" })] }), _jsxs("div", { className: "input-grid", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "lat", children: "Latitude" }), _jsx("input", { type: "number", id: "lat", name: "lat", value: formData.lat, onChange: handleChange, step: "0.0001", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "lon", children: "Longitude" }), _jsx("input", { type: "number", id: "lon", name: "lon", value: formData.lon, onChange: handleChange, step: "0.0001", required: true })] })] }), _jsx("button", { type: "button", onClick: fetchLiveData, className: "live-data-btn", disabled: isFetchingWeather, children: isFetchingWeather ? (_jsx(_Fragment, { children: "Loading..." })) : (_jsxs(_Fragment, { children: [_jsx(Activity, { size: 16 }), "Fetch Live Weather & Elevation"] })) })] }), _jsxs("div", { className: "form-section", children: [_jsxs("div", { className: "section-header", children: [_jsx(Mountain, { size: 20 }), _jsx("h3", { children: "Terrain" })] }), _jsxs("div", { className: "input-grid", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "elevation", children: "Elevation (m)" }), _jsx("input", { type: "number", id: "elevation", name: "elevation", value: formData.elevation, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "slope", children: "Slope (degrees)" }), _jsx("input", { type: "number", id: "slope", name: "slope", value: formData.slope, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "landcover", children: "Land Cover" }), _jsx("input", { type: "number", id: "landcover", name: "landcover", value: formData.landcover, onChange: handleChange, required: true })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsxs("div", { className: "section-header", children: [_jsx(Cloud, { size: 20 }), _jsx("h3", { children: "Precipitation (mm)" })] }), _jsxs("div", { className: "input-grid", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "precip_1d", children: "1-Day Total" }), _jsx("input", { type: "number", id: "precip_1d", name: "precip_1d", value: formData.precip_1d, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "precip_3d", children: "3-Day Total" }), _jsx("input", { type: "number", id: "precip_3d", name: "precip_3d", value: formData.precip_3d, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "precip_7d", children: "7-Day Total" }), _jsx("input", { type: "number", id: "precip_7d", name: "precip_7d", value: formData.precip_7d, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "precip_14d", children: "14-Day Total" }), _jsx("input", { type: "number", id: "precip_14d", name: "precip_14d", value: formData.precip_14d, onChange: handleChange, step: "0.1", required: true })] })] })] }), _jsxs("div", { className: "form-section", children: [_jsxs("div", { className: "section-header", children: [_jsx(Waves, { size: 20 }), _jsx("h3", { children: "River Discharge" })] }), _jsxs("div", { className: "input-grid", children: [_jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "dis_last", children: "Last Discharge" }), _jsx("input", { type: "number", id: "dis_last", name: "dis_last", value: formData.dis_last, onChange: handleChange, step: "0.1", required: true })] }), _jsxs("div", { className: "input-group", children: [_jsx("label", { htmlFor: "dis_trend_3", children: "3-Day Trend" }), _jsx("input", { type: "number", id: "dis_trend_3", name: "dis_trend_3", value: formData.dis_trend_3, onChange: handleChange, step: "0.1", required: true })] })] })] }), _jsx("button", { type: "submit", className: "submit-btn", disabled: isLoading, children: isLoading ? 'Analyzing...' : 'Predict Flood Risk' })] }), _jsx(HistoricalChart, { lat: formData.lat, lon: formData.lon, onDateSelect: handleHistoricalDateSelect })] }));
}
