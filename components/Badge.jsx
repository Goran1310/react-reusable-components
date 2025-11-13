/**
 * Reusable Badge Component
 * Demonstrates: Conditional rendering and styling
 */
export default function Badge({ 
    text, 
    color = "blue",
    size = "medium" 
}) {
    const badgeClass = `badge badge-${color} badge-${size}`
    
    return (
        <span className={badgeClass}>
            {text}
        </span>
    )
}
