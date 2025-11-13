/**
 * Reusable Card Component
 * Demonstrates: Composition pattern with children
 */
export default function Card({ 
    title, 
    children, 
    footer,
    className = "" 
}) {
    return (
        <div className={`card ${className}`}>
            {title && <div className="card-header">
                <h3>{title}</h3>
            </div>}
            
            <div className="card-body">
                {children}
            </div>
            
            {footer && <div className="card-footer">
                {footer}
            </div>}
        </div>
    )
}
