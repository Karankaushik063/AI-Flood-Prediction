import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './RiskGauge.css';
export default function RiskGauge({ probability }) {
    const [animatedValue, setAnimatedValue] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(probability);
        }, 100);
        return () => clearTimeout(timer);
    }, [probability]);
    const percentage = Math.round(animatedValue * 100);
    const rotation = (animatedValue * 180) - 90; // -90 to 90 degrees
    const getGaugeColor = () => {
        if (probability < 0.3)
            return 'var(--risk-low)';
        if (probability < 0.6)
            return 'var(--risk-medium)';
        return 'var(--risk-high)';
    };
    return (_jsxs("div", { className: "risk-gauge", children: [_jsxs("svg", { className: "gauge-svg", viewBox: "0 0 200 120", children: [_jsx("path", { d: "M 20 100 A 80 80 0 0 1 180 100", fill: "none", stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: "20", strokeLinecap: "round" }), _jsx("path", { d: "M 20 100 A 80 80 0 0 1 180 100", fill: "none", stroke: getGaugeColor(), strokeWidth: "20", strokeLinecap: "round", strokeDasharray: `${animatedValue * 251.2} 251.2`, className: "gauge-fill" }), _jsxs("g", { transform: `rotate(${rotation} 100 100)`, children: [_jsx("line", { x1: "100", y1: "100", x2: "100", y2: "40", stroke: "white", strokeWidth: "3", strokeLinecap: "round" }), _jsx("circle", { cx: "100", cy: "100", r: "6", fill: "white" })] })] }), _jsxs("div", { className: "gauge-value", children: [_jsxs("div", { className: "gauge-percentage", children: [percentage, "%"] }), _jsx("div", { className: "gauge-label", children: "Flood Probability" })] })] }));
}
