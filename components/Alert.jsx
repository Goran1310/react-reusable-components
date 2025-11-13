/**
 * EXERCISE 3: Build an Alert/Notification Component
 * 
 * Requirements:
 * - Support types: success, error, warning, info
 * - Optional close button
 * - Optional icon
 * - Dismissible
 */

import { useState } from "react"
import Icon from "./Icon"

export default function Alert({ 
    type = "info",
    children,
    onClose,
    showIcon = true,
    dismissible = false
}) {
    const [visible, setVisible] = useState(true)
    
    if (!visible) return null
    
    const handleClose = () => {
        setVisible(false)
        onClose?.()
    }
    
    // Icon mapping for each alert type
    const icons = {
        success: "check",
        error: "close",
        warning: "⚠️",
        info: "ℹ️"
    }
    
    return (
        <div className={`alert alert-${type}`} role="alert">
            {showIcon && (
                <span className="alert-icon">
                    {icons[type]}
                </span>
            )}
            
            <div className="alert-content">
                {children}
            </div>
            
            {(dismissible || onClose) && (
                <button 
                    className="alert-close"
                    onClick={handleClose}
                    aria-label="Close alert"
                >
                    ×
                </button>
            )}
        </div>
    )
}

// TODO: Add this CSS to index.css
/*
.alert {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    border-left: 4px solid;
}

.alert-success {
    background-color: #d4edda;
    border-color: #28a745;
    color: #155724;
}

.alert-error {
    background-color: #f8d7da;
    border-color: #dc3545;
    color: #721c24;
}

.alert-warning {
    background-color: #fff3cd;
    border-color: #ffc107;
    color: #856404;
}

.alert-info {
    background-color: #d1ecf1;
    border-color: #0dcaf0;
    color: #055160;
}

.alert-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
}

.alert-content {
    flex: 1;
}

.alert-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: inherit;
    opacity: 0.5;
    padding: 0;
    margin-left: auto;
}

.alert-close:hover {
    opacity: 1;
}
*/

// USAGE EXAMPLES:
// <Alert type="success">Operation completed successfully!</Alert>
// <Alert type="error" dismissible>An error occurred.</Alert>
// <Alert type="warning" onClose={() => console.log('Closed')}>
//     Warning: Please check your input
// </Alert>
// <Alert type="info" showIcon={false}>Information message</Alert>
