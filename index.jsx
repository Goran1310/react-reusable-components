import { createRoot } from "react-dom/client"
import { useState } from "react"
import AppPractice from "./AppPractice"
import AppTest from "./AppTest"
import AppAPI from "./AppAPI"

/**
 * App Selector - Choose which demo to view
 */
function AppSelector() {
    const [selectedApp, setSelectedApp] = useState("form-validation")

    return (
        <>
            <div style={{
                position: "fixed",
                top: "1rem",
                right: "1rem",
                zIndex: 1000,
            }}>
                <select
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                    style={{
                        padding: "0.5rem 0.75rem",
                        fontSize: "0.875rem",
                        borderRadius: "4px",
                        border: "2px solid #dee2e6",
                        cursor: "pointer",
                        backgroundColor: "white",
                    }}
                >
                    <option value="form-validation">Form Validation Demo</option>
                    <option value="advanced-components">Advanced React Components Practice</option>
                    <option value="api-integration">API Integration & Data Fetching</option>
                </select>
            </div>
            
            {selectedApp === "form-validation" && <AppTest />}
            {selectedApp === "advanced-components" && <AppPractice />}
            {selectedApp === "api-integration" && <AppAPI />}
        </>
    )
}

const root = createRoot(document.getElementById("root"))
root.render(<AppSelector />)
