import { createRoot } from "react-dom/client"
// import App from "./App"           // Original app with basic components
import AppDemo from "./AppDemo"      // Demo showcasing all reusable components

/**
 * Toggle between different app versions:
 * - App: Original ReactFacts app
 * - AppDemo: Comprehensive demo of all reusable components
 */

const root = createRoot(document.getElementById("root"))
root.render(<AppDemo />)
