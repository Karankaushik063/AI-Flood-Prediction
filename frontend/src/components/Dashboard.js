import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import StatCard from './StatCard';
import './Dashboard.css';
export default function Dashboard() {
    const [stats, setStats] = useState({
        totalPredictions: 0,
        highRiskCount: 0,
        mediumRiskCount: 0,
        lowRiskCount: 0,
        averageRisk: 0,
        recentPredictions: [],
    });
    useEffect(() => {
        // Load statistics from localStorage
        const history = localStorage.getItem('prediction-history');
        if (history) {
            const predictions = JSON.parse(history);
            const highRisk = predictions.filter(p => p.response.risk_level === 'High').length;
            const mediumRisk = predictions.filter(p => p.response.risk_level === 'Medium').length;
            const lowRisk = predictions.filter(p => p.response.risk_level === 'Low').length;
            const avgRisk = predictions.length > 0
                ? predictions.reduce((sum, p) => sum + p.response.flood_probability, 0) / predictions.length
                : 0;
            setStats({
                totalPredictions: predictions.length,
                highRiskCount: highRisk,
                mediumRiskCount: mediumRisk,
                lowRiskCount: lowRisk,
                averageRisk: avgRisk,
                recentPredictions: predictions.slice(-10).reverse(),
            });
        }
    }, []);
    // Prepare chart data
    const riskDistribution = [
        { name: 'Low Risk', value: stats.lowRiskCount, fill: '#10B981' },
        { name: 'Medium Risk', value: stats.mediumRiskCount, fill: '#F59E0B' },
        { name: 'High Risk', value: stats.highRiskCount, fill: '#EF4444' },
    ];
    const trendData = stats.recentPredictions.map((pred, idx) => ({
        name: `#${stats.recentPredictions.length - idx}`,
        probability: (pred.response.flood_probability * 100).toFixed(1),
        confidence: (pred.response.confidence * 100).toFixed(1),
    })).reverse();
    return (_jsxs("div", { className: "dashboard", children: [_jsxs("div", { className: "dashboard-header", children: [_jsx("h1", { children: "\uD83D\uDCCA Flood Prediction Dashboard" }), _jsx("p", { children: "Overview of flood risk analysis and predictions" })] }), _jsxs("div", { className: "stats-grid", children: [_jsx(StatCard, { icon: "activity", label: "Total Predictions", value: stats.totalPredictions, color: "blue" }), _jsx(StatCard, { icon: "alert", label: "High Risk Areas", value: stats.highRiskCount, color: "red" }), _jsx(StatCard, { icon: "trending", label: "Medium Risk", value: stats.mediumRiskCount, color: "orange" }), _jsx(StatCard, { icon: "check", label: "Low Risk", value: stats.lowRiskCount, color: "green" })] }), stats.totalPredictions > 0 && (_jsxs("div", { className: "charts-section", children: [_jsxs("div", { className: "chart-card glass", children: [_jsx("h3", { children: "Risk Level Distribution" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: riskDistribution, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", stroke: "var(--text-secondary)" }), _jsx(YAxis, { stroke: "var(--text-secondary)" }), _jsx(Tooltip, { contentStyle: {
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-primary)'
                                            } }), _jsx(Bar, { dataKey: "value", fill: "var(--primary-blue)", radius: [8, 8, 0, 0] })] }) })] }), _jsxs("div", { className: "chart-card glass", children: [_jsx("h3", { children: "Recent Prediction Trends" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: trendData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", stroke: "var(--text-secondary)" }), _jsx(YAxis, { stroke: "var(--text-secondary)" }), _jsx(Tooltip, { contentStyle: {
                                                background: 'var(--surface)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: 'var(--text-primary)'
                                            } }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "probability", stroke: "var(--primary-blue)", strokeWidth: 2, name: "Flood Probability (%)" }), _jsx(Line, { type: "monotone", dataKey: "confidence", stroke: "var(--accent-teal)", strokeWidth: 2, name: "Confidence (%)" })] }) })] })] })), stats.recentPredictions.length > 0 && (_jsxs("div", { className: "recent-predictions glass", children: [_jsx("h3", { children: "Recent Predictions" }), _jsx("div", { className: "predictions-list", children: stats.recentPredictions.map((pred) => (_jsxs("div", { className: "prediction-item", children: [_jsxs("div", { className: "prediction-info", children: [_jsxs("span", { className: "prediction-location", children: ["\uD83D\uDCCD ", pred.location] }), _jsx("span", { className: "prediction-time", children: new Date(pred.timestamp).toLocaleString() })] }), _jsxs("div", { className: "prediction-result", children: [_jsxs("span", { className: `risk-badge ${pred.response.risk_level.toLowerCase()}`, children: [pred.response.risk_level, " Risk"] }), _jsxs("span", { className: "probability", children: [(pred.response.flood_probability * 100).toFixed(1), "%"] })] })] }, pred.id))) })] })), stats.totalPredictions === 0 && (_jsxs("div", { className: "empty-state glass", children: [_jsx("h3", { children: "No Predictions Yet" }), _jsx("p", { children: "Start making predictions to see your dashboard statistics and trends." })] }))] }));
}
