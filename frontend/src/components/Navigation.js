import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, TrendingUp, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import AlertCenter from './AlertCenter';
import './Navigation.css';
export default function Navigation() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/dashboard', label: 'Dashboard', icon: Activity },
        { path: '/analytics', label: 'Analytics', icon: TrendingUp },
        { path: '/safety', label: 'Safety', icon: Shield },
    ];
    const isActive = (path) => location.pathname === path;
    return (_jsxs("nav", { className: "navigation glass", children: [_jsxs("div", { className: "nav-container", children: [_jsxs(Link, { to: "/", className: "nav-logo", children: [_jsx("span", { className: "logo-icon", children: "\uD83C\uDF0A" }), _jsx("span", { className: "logo-text", children: "Flood Predict" })] }), _jsx("div", { className: "nav-links desktop", children: navItems.map((item) => {
                            const Icon = item.icon;
                            return (_jsxs(Link, { to: item.path, className: `nav-link ${isActive(item.path) ? 'active' : ''}`, children: [_jsx(Icon, { size: 18 }), item.label] }, item.path));
                        }) }), _jsxs("div", { className: "nav-actions", children: [_jsx(AlertCenter, {}), _jsx(ThemeToggle, {}), _jsx("button", { className: "mobile-menu-btn", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] })] }), isMobileMenuOpen && (_jsx("div", { className: "nav-links mobile", children: navItems.map((item) => {
                    const Icon = item.icon;
                    return (_jsxs(Link, { to: item.path, className: `nav-link ${isActive(item.path) ? 'active' : ''}`, onClick: () => setIsMobileMenuOpen(false), children: [_jsx(Icon, { size: 18 }), item.label] }, item.path));
                }) }))] }));
}
