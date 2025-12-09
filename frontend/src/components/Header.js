import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Droplets } from 'lucide-react';
import './Header.css';
export default function Header() {
    return (_jsx("header", { className: "header", children: _jsx("div", { className: "container", children: _jsx("div", { className: "header-content", children: _jsxs("div", { className: "logo", children: [_jsx(Droplets, { className: "logo-icon", size: 32 }), _jsxs("div", { children: [_jsx("h1", { className: "logo-title", children: "Bangladesh Flood Predictor" }), _jsx("p", { className: "logo-subtitle", children: "AI-Powered Risk Assessment" })] })] }) }) }) }));
}
