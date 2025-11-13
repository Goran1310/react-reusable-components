/**
 * EXERCISE 5: Build a Tooltip Component
 * 
 * Requirements:
 * - Show on hover
 * - Position: top, bottom, left, right
 * - Optional delay before showing
 * - Arrow pointing to target element
 */

import { useState } from "react"

export default function Tooltip({ 
    children,
    text,
    position = "top",
    delay = 200
}) {
    const [visible, setVisible] = useState(false)
    const [timeoutId, setTimeoutId] = useState(null)
    
    const showTooltip = () => {
        const id = setTimeout(() => {
            setVisible(true)
        }, delay)
        setTimeoutId(id)
    }
    
    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        setVisible(false)
    }
    
    return (
        <div 
            className="tooltip-wrapper"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {visible && (
                <div className={`tooltip tooltip-${position}`}>
                    {text}
                    <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
                </div>
            )}
        </div>
    )
}

// TODO: Add this CSS to index.css
/*
.tooltip-wrapper {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    background-color: #1a1b21;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    animation: tooltipFadeIn 0.2s ease-out;
}

.tooltip-top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
}

.tooltip-bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
}

.tooltip-left {
    right: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
}

.tooltip-right {
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%);
}

.tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
}

.tooltip-arrow-top {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #1a1b21;
}

.tooltip-arrow-bottom {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: #1a1b21;
}

.tooltip-arrow-left {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: #1a1b21;
}

.tooltip-arrow-right {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: #1a1b21;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
*/

// USAGE EXAMPLES:
// <Tooltip text="This is a tooltip" position="top">
//     <Button>Hover me</Button>
// </Tooltip>
//
// <Tooltip text="Click to save" position="right" delay={500}>
//     <Icon name="heart" />
// </Tooltip>
