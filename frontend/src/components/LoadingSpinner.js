import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './LoadingSpinner.css';
export default function LoadingSpinner() {
    return (_jsx("div", { className: "loading-overlay", children: _jsxs("div", { className: "spinner-container", children: [_jsx("div", { className: "spinner" }), _jsx("p", { className: "loading-text", children: "Analyzing flood risk..." })] }) }));
}
