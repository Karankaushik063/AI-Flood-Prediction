import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import SafetyTips from './components/SafetyTips';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import LoadingSpinner from './components/LoadingSpinner';
import { predictFlood, ApiError } from './services/api';
import './App.css';
function PredictionPage() {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastRequest, setLastRequest] = useState(null);
    const handlePrediction = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const prediction = await predictFlood(data);
            setResult(prediction);
            setLastRequest(data);
            // Save to prediction history
            const historyEntry = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                location: `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`,
                lat: data.lat,
                lon: data.lon,
                request: data,
                response: prediction,
            };
            const history = localStorage.getItem('prediction-history');
            const historyArray = history ? JSON.parse(history) : [];
            historyArray.push(historyEntry);
            localStorage.setItem('prediction-history', JSON.stringify(historyArray));
            // Create alert if high risk
            if (prediction.risk_level === 'High' || prediction.risk_level === 'Medium') {
                const alert = {
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                    location: `${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`,
                    lat: data.lat,
                    lon: data.lon,
                    riskLevel: prediction.risk_level,
                    probability: prediction.flood_probability,
                    message: `${prediction.risk_level} flood risk detected with ${(prediction.flood_probability * 100).toFixed(1)}% probability`,
                    isRead: false,
                };
                const alerts = localStorage.getItem('flood-alerts');
                const alertsArray = alerts ? JSON.parse(alerts) : [];
                alertsArray.unshift(alert);
                localStorage.setItem('flood-alerts', JSON.stringify(alertsArray));
            }
        }
        catch (err) {
            if (err instanceof ApiError) {
                setError(`Prediction failed: ${err.message}`);
            }
            else {
                setError('An unexpected error occurred. Please check if the backend is running.');
            }
            console.error('Prediction error:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("main", { className: "main-content container", children: [_jsxs("div", { className: "content-grid", children: [_jsx("div", { className: "form-column", children: _jsx(PredictionForm, { onSubmit: handlePrediction, isLoading: isLoading }) }), _jsxs("div", { className: "result-column", children: [error && (_jsxs("div", { className: "error-card glass fade-in", children: [_jsx("h3", { children: "\u26A0\uFE0F Error" }), _jsx("p", { children: error }), _jsx("p", { className: "error-hint", children: "Make sure the backend server is running on http://localhost:8000" })] })), result && !error && lastRequest && (_jsx(ResultCard, { result: result, request: lastRequest })), !result && !error && (_jsx("div", { className: "placeholder-card glass", children: _jsxs("div", { className: "placeholder-content", children: [_jsx("svg", { className: "placeholder-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: _jsx("path", { d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), _jsx("h3", { children: "Ready to Predict" }), _jsx("p", { children: "Fill in the location data and click \"Predict Flood Risk\" to get started." })] }) }))] })] }), isLoading && _jsx(LoadingSpinner, {})] }));
}
function App() {
    return (_jsx(ThemeProvider, { children: _jsx(Router, { children: _jsxs("div", { className: "app", children: [_jsx(Navigation, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PredictionPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/analytics", element: _jsx(Analytics, {}) }), _jsx(Route, { path: "/safety", element: _jsx(SafetyTips, {}) })] })] }) }) }));
}
export default App;
