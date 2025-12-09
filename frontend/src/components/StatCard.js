import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import './StatCard.css';
export default function StatCard({ icon, label, value, trend, color = 'blue' }) {
    const icons = {
        trending: TrendingUp,
        alert: AlertTriangle,
        check: CheckCircle,
        activity: Activity,
    };
    const Icon = icons[icon];
    return (_jsxs("div", { className: `stat-card glass ${color}`, children: [_jsx("div", { className: "stat-icon", children: _jsx(Icon, { size: 24 }) }), _jsxs("div", { className: "stat-content", children: [_jsx("p", { className: "stat-label", children: label }), _jsx("h3", { className: "stat-value", children: value }), trend && _jsx("span", { className: "stat-trend", children: trend })] })] }));
}
