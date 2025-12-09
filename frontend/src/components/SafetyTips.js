import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Shield, AlertTriangle, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import './SafetyTips.css';
export default function SafetyTips() {
    const [openItem, setOpenItem] = useState('before');
    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };
    const safetyContent = [
        {
            id: 'before',
            title: 'Before a Flood',
            icon: Shield,
            content: [
                'Stay informed about weather forecasts and flood warnings',
                'Prepare an emergency kit with essentials (water, food, medicine, flashlight)',
                'Keep important documents in waterproof containers',
                'Know your evacuation routes and shelter locations',
                'Move valuable items to higher floors',
                'Install check valves in plumbing to prevent backflow',
                'Consider flood insurance for your property',
            ],
        },
        {
            id: 'during',
            title: 'During a Flood',
            icon: AlertTriangle,
            content: [
                'Move to higher ground immediately if flooding begins',
                'Never walk, swim, or drive through flood waters',
                'Stay away from power lines and electrical wires',
                'Listen to emergency broadcasts for updates',
                'If trapped in a building, go to the highest level',
                'Do not touch electrical equipment if wet',
                'Signal for help if needed (whistle, flashlight, bright cloth)',
            ],
        },
        {
            id: 'after',
            title: 'After a Flood',
            icon: MapPin,
            content: [
                'Return home only when authorities say it is safe',
                'Avoid floodwater as it may be contaminated',
                'Document property damage with photos for insurance',
                'Clean and disinfect everything that got wet',
                'Check for structural damage before entering buildings',
                'Throw away food that came in contact with floodwater',
                'Watch for animals, especially snakes',
            ],
        },
    ];
    const emergencyContacts = [
        { name: 'National Emergency', number: '999' },
        { name: 'Fire Service', number: '102' },
        { name: 'Police', number: '100' },
        { name: 'Disaster Management', number: '1090' },
    ];
    const faqs = [
        {
            q: 'What is considered a flood risk area?',
            a: 'Areas near rivers, coastal regions, low-lying lands, and regions with poor drainage are considered high flood risk areas.',
        },
        {
            q: 'How accurate are flood predictions?',
            a: 'Our ML model provides predictions based on historical data, terrain, and weather patterns with confidence scores to help you assess reliability.',
        },
        {
            q: 'When should I evacuate?',
            a: 'Evacuate immediately when local authorities issue evacuation orders, or when you observe rapidly rising water levels.',
        },
        {
            q: 'What should be in my emergency kit?',
            a: 'Include water (1 gallon per person per day), non-perishable food, first aid kit, medications, flashlight, batteries, radio, and important documents.',
        },
    ];
    return (_jsxs("div", { className: "safety-tips-page", children: [_jsxs("div", { className: "safety-header", children: [_jsx("h1", { children: "\uD83D\uDEE1\uFE0F Flood Safety Guide" }), _jsx("p", { children: "Essential information to keep you and your family safe" })] }), _jsx("div", { className: "safety-accordion", children: safetyContent.map((item) => {
                    const Icon = item.icon;
                    const isOpen = openItem === item.id;
                    return (_jsxs("div", { className: `accordion-item glass ${isOpen ? 'open' : ''}`, children: [_jsxs("button", { className: "accordion-header", onClick: () => toggleItem(item.id), children: [_jsxs("div", { className: "accordion-title", children: [_jsx(Icon, { size: 24 }), _jsx("h3", { children: item.title })] }), isOpen ? _jsx(ChevronUp, { size: 20 }) : _jsx(ChevronDown, { size: 20 })] }), isOpen && (_jsx("div", { className: "accordion-content", children: _jsx("ul", { children: item.content.map((point, idx) => (_jsx("li", { children: point }, idx))) }) }))] }, item.id));
                }) }), _jsxs("div", { className: "emergency-contacts glass", children: [_jsxs("h3", { children: [_jsx(Phone, { size: 24 }), "Emergency Contacts (Bangladesh)"] }), _jsx("div", { className: "contacts-grid", children: emergencyContacts.map((contact) => (_jsxs("div", { className: "contact-card", children: [_jsx("span", { className: "contact-name", children: contact.name }), _jsx("a", { href: `tel:${contact.number}`, className: "contact-number", children: contact.number })] }, contact.name))) })] }), _jsxs("div", { className: "faq-section glass", children: [_jsx("h3", { children: "\u2753 Frequently Asked Questions" }), _jsx("div", { className: "faq-list", children: faqs.map((faq, idx) => (_jsxs("div", { className: "faq-item", children: [_jsx("h4", { children: faq.q }), _jsx("p", { children: faq.a })] }, idx))) })] })] }));
}
