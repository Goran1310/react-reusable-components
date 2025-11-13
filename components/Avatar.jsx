/**
 * Reusable Avatar Component
 * Demonstrates: Props with fallback values
 */
export default function Avatar({ 
    src, 
    alt = "User avatar",
    size = "medium",
    fallbackText = "?" 
}) {
    const avatarClass = `avatar avatar-${size}`
    
    return (
        <div className={avatarClass}>
            {src ? (
                <img src={src} alt={alt} />
            ) : (
                <div className="avatar-fallback">
                    {fallbackText}
                </div>
            )}
        </div>
    )
}
