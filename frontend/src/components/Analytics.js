import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ComparisonTool from './ComparisonTool';
import './Analytics.css';
export default function Analytics() {
    return (_jsxs("div", { className: "analytics-page", children: [_jsxs("div", { className: "analytics-header", children: [_jsx("h1", { children: "\uD83D\uDCC8 Advanced Analytics" }), _jsx("p", { children: "Deep dive into flood risk patterns and comparisons" })] }), _jsx(ComparisonTool, {}), _jsxs("div", { className: "analytics-info glass", children: [_jsx("h3", { children: "\uD83D\uDCA1 Analytics Features" }), _jsxs("ul", { children: [_jsx("li", { children: "Compare flood risk across multiple locations simultaneously" }), _jsx("li", { children: "Analyze patterns and trends in prediction data" }), _jsx("li", { children: "Make informed decisions based on comparative analysis" }), _jsx("li", { children: "Export comparison results for reporting" })] })] })] }));
}
