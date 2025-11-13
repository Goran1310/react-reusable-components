/**
 * EXERCISE 4: Build a Modal/Dialog Component
 * 
 * Requirements:
 * - Show/hide with isOpen prop
 * - Close on overlay click
 * - Close on ESC key
 * - Prevent body scroll when open
 * - Compound components for Header, Body, Footer
 */

import { useEffect } from "react"

export default function Modal({ 
    isOpen,
    onClose,
    children,
    closeOnOverlayClick = true,
    closeOnEsc = true
}) {
    // Close on ESC key
    useEffect(() => {
        if (!closeOnEsc || !isOpen) return
        
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose()
        }
        
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [isOpen, closeOnEsc, onClose])
    
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])
    
    if (!isOpen) return null
    
    return (
        <div 
            className="modal-overlay"
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

// Compound components
Modal.Header = function ModalHeader({ children, onClose }) {
    return (
        <div className="modal-header">
            <div className="modal-title">{children}</div>
            {onClose && (
                <button 
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>
            )}
        </div>
    )
}

Modal.Body = function ModalBody({ children }) {
    return <div className="modal-body">{children}</div>
}

Modal.Footer = function ModalFooter({ children }) {
    return <div className="modal-footer">{children}</div>
}

// TODO: Add this CSS to index.css
/*
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease-out;
}

.modal-content {
    background-color: #21222A;
    border-radius: 8px;
    max-width: 90%;
    width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease-out;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #282D35;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    color: white;
    opacity: 0.6;
    padding: 0;
    width: 2rem;
    height: 2rem;
}

.modal-close:hover {
    opacity: 1;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1.5rem;
    border-top: 1px solid #282D35;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(20px);
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
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Open Modal
            </Button>
            
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header onClose={() => setIsOpen(false)}>
                    Modal Title
                </Modal.Header>
                <Modal.Body>
                    <p>Modal content goes here...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
*/
