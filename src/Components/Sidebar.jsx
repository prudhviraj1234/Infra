import { useState } from "react";
import {
    FiGrid,
    FiAlertCircle,
    FiTrendingUp,
    FiCpu,
    FiTool,
    FiFileText,
    FiBell,
    FiSettings,
} from "react-icons/fi";

const menuItems = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: <FiGrid />,
    },
    {
        id: "incidents",
        title: "Incidents",
        icon: <FiAlertCircle />,
    },
    {
        id: "trends",
        title: "Trends & Insights",
        icon: <FiTrendingUp />,
    },
    {
        id: "devices",
        title: "Device Categories",
        icon: <FiCpu />,
    },
    {
        id: "causes",
        title: "Causes",
        icon: <FiTool />,
    },
    {
        id: "reports",
        title: "Reports",
        icon: <FiFileText />,
    },
    {
        id: "alerts",
        title: "Alerts",
        icon: <FiBell />,
    },
    {
        id: "settings",
        title: "Settings",
        icon: <FiSettings />,
    },
];

function Sidebar({ activeTab, setActiveTab }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            {/* Logo */}

            <div className="sidebar-header">
                {!collapsed && (
                    <div className="logo">
                        <div className="logo-icon">IT</div>

                        <div>
                            <h3>Infra Tracker</h3>
                            <span>Enterprise</span>
                        </div>
                    </div>
                )}

                <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    ☰
                </button>
            </div>

            {/* Menu */}

            <ul className="menu">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={activeTab === item.id ? "active" : ""}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <span className="menu-icon">{item.icon}</span>

                        {!collapsed && (
                            <span className="menu-text">{item.title}</span>
                        )}
                    </li>
                ))}
            </ul>

            {/* Footer */}

            {!collapsed && (
                <div className="sidebar-footer">
                    <div className="online-dot"></div>

                    <span>System Online</span>
                </div>
            )}
        </aside>
    );
}

export default Sidebar;