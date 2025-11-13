/**
 * EXERCISE 2: Build a Spinner/Loader Component
 * 
 * Requirements:
 * - Support different sizes (small, medium, large)
 * - Support different variants (primary, secondary, white)
 * - Optional loading text
 * - Smooth animation
 */

export default function Spinner({ 
    size = "medium",
    variant = "primary",
    text = ""
}) {
    return (
        <div className="spinner-container">
            <div className={`spinner spinner-${size} spinner-${variant}`}>
                <div className="spinner-circle"></div>
            </div>
            {text && <span className="spinner-text">{text}</span>}
        </div>
    )
}

// TODO: Add this CSS to index.css
/*
.spinner-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.spinner {
    display: inline-block;
    position: relative;
}

.spinner-small { width: 20px; height: 20px; }
.spinner-medium { width: 40px; height: 40px; }
.spinner-large { width: 60px; height: 60px; }

.spinner-circle {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spinner-rotate 0.8s linear infinite;
}

.spinner-primary .spinner-circle { color: #61DAFB; }
.spinner-secondary .spinner-circle { color: #6c757d; }
.spinner-white .spinner-circle { color: white; }

@keyframes spinner-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner-text {
    font-size: 0.9rem;
    color: inherit;
}
*/

// USAGE EXAMPLES:
// <Spinner />
// <Spinner size="large" variant="primary" text="Loading..." />
// <Spinner size="small" variant="white" />
