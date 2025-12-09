import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './HistoricalChart.css';
export default function HistoricalChart({ lat, lon, onDateSelect }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${API_URL}/weather/history?lat=${lat}&lon=${lon}`);
                const { dates, precipitation, temperature } = response.data;
                const chartData = dates.map((date, i) => ({
                    rawDate: date,
                    displayDate: new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    precipitation: precipitation[i],
                    temperature: temperature[i]
                }));
                setData(chartData);
            }
            catch (error) {
                console.error('Failed to fetch historical data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [lat, lon]);
    const handleDateChange = (e) => {
        const iso = e.target.value; // YYYY-MM-DD
        setSelectedDate(iso);
        if (onDateSelect) {
            const entry = data.find(d => d.rawDate.slice(0, 10) === iso);
            if (entry) {
                onDateSelect({
                    date: entry.rawDate,
                    precipitation: entry.precipitation,
                    temperature: entry.temperature
                });
            }
        }
    };
    if (loading) {
        return _jsx("div", { className: "chart-loading", children: "Loading historical data..." });
    }
    return (_jsxs("div", { className: "historical-chart glass", children: [_jsx("h3", { children: "30-Day Weather Trends" }), _jsxs("div", { className: "date-picker", children: [_jsx("label", { htmlFor: "historical-date", children: "Select Date:" }), _jsx("input", { type: "date", id: "historical-date", value: selectedDate, onChange: handleDateChange })] }), _jsx("div", { className: "chart-container", children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: data.map(d => ({ date: d.displayDate, precipitation: d.precipitation, temperature: d.temperature })), children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.1)" }), _jsx(XAxis, { dataKey: "date", stroke: "var(--text-secondary)", fontSize: 12 }), _jsx(YAxis, { yAxisId: "left", stroke: "var(--primary-blue)", fontSize: 12 }), _jsx(YAxis, { yAxisId: "right", orientation: "right", stroke: "var(--risk-medium)", fontSize: 12 }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }, labelStyle: { color: 'var(--text-primary)' } }), _jsx(Legend, {}), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "precipitation", name: "Precipitation (mm)", stroke: "var(--primary-blue)", strokeWidth: 2, dot: false }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "temperature", name: "Max Temp (\u00B0C)", stroke: "var(--risk-medium)", strokeWidth: 2, dot: false })] }) }) })] }));
}
