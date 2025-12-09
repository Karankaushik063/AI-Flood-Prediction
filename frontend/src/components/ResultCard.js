import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, AlertTriangle, AlertCircle, TrendingUp } from 'lucide-react';
import RiskGauge from './RiskGauge';
import ExportPDF from './ExportPDF';
import './ResultCard.css';
export default function ResultCard({ result, request }) {
    const getRiskColor = () => {
        switch (result.risk_level) {
            case 'Low': return 'var(--risk-low)';
            case 'Medium': return 'var(--risk-medium)';
            case 'High': return 'var(--risk-high)';
            default: return 'var(--text-secondary)';
        }
    };
    const getRiskIcon = () => {
        switch (result.risk_level) {
            case 'Low': return _jsx(CheckCircle, { size: 24 });
            case 'Medium': return _jsx(AlertCircle, { size: 24 });
            case 'High': return _jsx(AlertTriangle, { size: 24 });
            default: return null;
        }
    };
    const getRiskGradient = () => {
        switch (result.risk_level) {
            case 'Low': return 'var(--gradient-risk-low)';
            case 'Medium': return 'var(--gradient-risk-medium)';
            case 'High': return 'var(--gradient-risk-high)';
            default: return 'var(--gradient-surface)';
        }
    };
    return (_jsxs("div", { className: "result-card glass fade-in", children: [_jsx("div", { className: "result-header", children: _jsx("h2", { children: "Prediction Results" }) }), _jsx("div", { className: "risk-badge", style: { background: getRiskGradient(), color: 'white' }, children: _jsxs("div", { className: "risk-badge-content", children: [getRiskIcon(), _jsxs("div", { children: [_jsxs("div", { className: "risk-level", children: [result.risk_level, " Risk"] }), _jsx("div", { className: "risk-subtitle", children: result.is_flood_predicted ? 'Flood Predicted' : 'No Flood Predicted' })] })] }) }), _jsx(RiskGauge, { probability: result.flood_probability, riskLevel: result.risk_level }), _jsxs("div", { className: "metrics-grid", children: [_jsxs("div", { className: "metric-card", children: [_jsx("div", { className: "metric-label", children: "Flood Probability" }), _jsxs("div", { className: "metric-value", style: { color: getRiskColor() }, children: [(result.flood_probability * 100).toFixed(1), "%"] })] }), _jsxs("div", { className: "metric-card", children: [_jsxs("div", { className: "metric-label", children: [_jsx(TrendingUp, { size: 16 }), "Model Confidence"] }), _jsxs("div", { className: "metric-value", children: [(result.confidence * 100).toFixed(1), "%"] })] })] }), _jsxs("div", { className: "prediction-status", children: [_jsx("div", { className: "status-indicator", style: { background: getRiskColor() } }), _jsx("p", { children: result.is_flood_predicted
                            ? 'High likelihood of flooding detected. Take necessary precautions.'
                            : 'Low likelihood of flooding. Continue monitoring conditions.' })] }), _jsx(ExportPDF, { prediction: result, request: request, location: `${request.lat.toFixed(4)}, ${request.lon.toFixed(4)}` })] }));
}
