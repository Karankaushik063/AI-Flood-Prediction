import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import './AlertCenter.css';
export default function AlertCenter() {
    const [alerts, setAlerts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        // Load alerts from localStorage
        const savedAlerts = localStorage.getItem('flood-alerts');
        if (savedAlerts) {
            setAlerts(JSON.parse(savedAlerts));
        }
    }, []);
    const unreadCount = alerts.filter(a => !a.isRead).length;
    const filteredAlerts = filter === 'all'
        ? alerts
        : alerts.filter(a => a.riskLevel === filter);
    const markAsRead = (id) => {
        const updated = alerts.map(a => a.id === id ? { ...a, isRead: true } : a);
        setAlerts(updated);
        localStorage.setItem('flood-alerts', JSON.stringify(updated));
    };
    const markAllAsRead = () => {
        const updated = alerts.map(a => ({ ...a, isRead: true }));
        setAlerts(updated);
        localStorage.setItem('flood-alerts', JSON.stringify(updated));
    };
    const deleteAlert = (id) => {
        const updated = alerts.filter(a => a.id !== id);
        setAlerts(updated);
        localStorage.setItem('flood-alerts', JSON.stringify(updated));
    };
    return (_jsxs("div", { className: "alert-center", children: [_jsxs("button", { className: "alert-button", onClick: () => setIsOpen(!isOpen), "aria-label": "Notifications", children: [_jsx(Bell, { size: 20 }), unreadCount > 0 && (_jsx("span", { className: "alert-badge", children: unreadCount }))] }), isOpen && (_jsxs("div", { className: "alert-dropdown glass", children: [_jsxs("div", { className: "alert-header", children: [_jsx("h3", { children: "Notifications" }), _jsxs("div", { className: "alert-actions", children: [unreadCount > 0 && (_jsx("button", { onClick: markAllAsRead, className: "mark-read-btn", children: "Mark all read" })), _jsx("button", { onClick: () => setIsOpen(false), className: "close-btn", children: _jsx(X, { size: 18 }) })] })] }), _jsxs("div", { className: "alert-filters", children: [_jsx("button", { className: filter === 'all' ? 'active' : '', onClick: () => setFilter('all'), children: "All" }), _jsx("button", { className: filter === 'High' ? 'active' : '', onClick: () => setFilter('High'), children: "High" }), _jsx("button", { className: filter === 'Medium' ? 'active' : '', onClick: () => setFilter('Medium'), children: "Medium" }), _jsx("button", { className: filter === 'Low' ? 'active' : '', onClick: () => setFilter('Low'), children: "Low" })] }), _jsx("div", { className: "alert-list", children: filteredAlerts.length === 0 ? (_jsx("div", { className: "empty-alerts", children: _jsx("p", { children: "No notifications" }) })) : (filteredAlerts.map(alert => (_jsxs("div", { className: `alert-item ${alert.isRead ? 'read' : 'unread'} ${alert.riskLevel.toLowerCase()}`, onClick: () => !alert.isRead && markAsRead(alert.id), children: [_jsxs("div", { className: "alert-content", children: [_jsxs("div", { className: "alert-title", children: [_jsx("span", { className: `risk-indicator ${alert.riskLevel.toLowerCase()}`, children: alert.riskLevel }), _jsx("span", { className: "alert-location", children: alert.location })] }), _jsx("p", { className: "alert-message", children: alert.message }), _jsx("span", { className: "alert-time", children: new Date(alert.timestamp).toLocaleString() })] }), _jsx("button", { className: "delete-alert-btn", onClick: (e) => {
                                        e.stopPropagation();
                                        deleteAlert(alert.id);
                                    }, children: _jsx(X, { size: 16 }) })] }, alert.id)))) })] }))] }));
}
