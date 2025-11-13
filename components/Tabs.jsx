/**
 * EXERCISE 6: Build a Tabs Component
 * 
 * Requirements:
 * - Multiple tab panels
 * - Active tab highlighting
 * - Controlled or uncontrolled mode
 * - Keyboard navigation (arrow keys)
 */

import { useState, Children, cloneElement } from "react"

export default function Tabs({ 
    children,
    defaultTab = 0,
    activeTab: controlledTab,
    onTabChange
}) {
    const [internalTab, setInternalTab] = useState(defaultTab)
    
    // Use controlled tab if provided, otherwise internal state
    const activeTab = controlledTab !== undefined ? controlledTab : internalTab
    
    const handleTabChange = (index) => {
        if (controlledTab === undefined) {
            setInternalTab(index)
        }
        onTabChange?.(index)
    }
    
    const tabs = Children.toArray(children)
    
    return (
        <div className="tabs">
            <div className="tabs-header" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        role="tab"
                        aria-selected={activeTab === index}
                        className={`tabs-tab ${activeTab === index ? "active" : ""}`}
                        onClick={() => handleTabChange(index)}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            
            <div className="tabs-content">
                {tabs[activeTab]}
            </div>
        </div>
    )
}

// Tab panel component
export function Tab({ children, label }) {
    return (
        <div className="tab-panel" role="tabpanel">
            {children}
        </div>
    )
}

// TODO: Add this CSS to index.css
/*
.tabs {
    width: 100%;
}

.tabs-header {
    display: flex;
    gap: 0.5rem;
    border-bottom: 2px solid #282D35;
    margin-bottom: 1.5rem;
}

.tabs-tab {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: #8892ab;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
}

.tabs-tab:hover {
    color: #61DAFB;
    background-color: rgba(97, 218, 251, 0.1);
}

.tabs-tab.active {
    color: #61DAFB;
    border-bottom-color: #61DAFB;
    font-weight: 600;
}

.tabs-content {
    padding: 1rem 0;
}

.tab-panel {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
*/

// USAGE EXAMPLE:
/*
function App() {
    return (
        <Tabs defaultTab={0}>
            <Tab label="Profile">
                <h2>Profile Information</h2>
                <p>User profile content here...</p>
            </Tab>
            
            <Tab label="Settings">
                <h2>Account Settings</h2>
                <p>Settings content here...</p>
            </Tab>
            
            <Tab label="Notifications">
                <h2>Notification Preferences</h2>
                <p>Notifications content here...</p>
            </Tab>
        </Tabs>
    )
}

// Controlled mode:
function ControlledTabs() {
    const [activeTab, setActiveTab] = useState(0)
    
    return (
        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
            <Tab label="Tab 1">Content 1</Tab>
            <Tab label="Tab 2">Content 2</Tab>
        </Tabs>
    )
}
*/
