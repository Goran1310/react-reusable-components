/**
 * Reusable Button Component
 * Demonstrates: Props, default values, event handlers
 */
export default function Button({ 
    children, 
    onClick, 
    variant = "primary",
    disabled = false 
}) {
    const buttonClass = `btn btn-${variant}`
    
    return (
        <button 
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
