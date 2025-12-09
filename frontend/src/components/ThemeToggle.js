import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';
export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (_jsx("button", { className: "theme-toggle", onClick: toggleTheme, "aria-label": "Toggle theme", title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, children: theme === 'dark' ? (_jsx(Sun, { size: 20, className: "theme-icon" })) : (_jsx(Moon, { size: 20, className: "theme-icon" })) }));
}
