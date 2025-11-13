import { useState } from "react"
import Navbar from "./components/Navbar"
import Button from "./components/Button"
import Card from "./components/Card"
import Badge from "./components/Badge"
import Icon from "./components/Icon"
import Spinner from "./components/Spinner"
import Alert from "./components/Alert"
import Modal from "./components/Modal"
import Tooltip from "./components/Tooltip"
import Tabs, { Tab } from "./components/Tabs"

/**
 * Advanced Components Practice App
 * Demonstrates all the new reusable components
 */
export default function AppPractice() {
    const [modalOpen, setModalOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(true)
    
    return (
        <>
            <Navbar />
            
            <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{ color: "#61DAFB", marginBottom: "2rem" }}>
                    Advanced React Components Practice 🚀
                </h1>
                
                {/* Alerts Section */}
                <section style={{ marginBottom: "3rem" }}>
                    <h2>Alerts & Notifications</h2>
                    {showAlert && (
                        <Alert 
                            type="success" 
                            dismissible 
                            onClose={() => setShowAlert(false)}
                        >
                            Welcome! You've successfully loaded the practice app.
                        </Alert>
                    )}
                    <Alert type="info">
                        This is an informational message with useful tips.
                    </Alert>
                    <Alert type="warning">
                        Warning: This action cannot be undone!
                    </Alert>
                    <Alert type="error" showIcon={false}>
                        Error: Something went wrong. Please try again.
                    </Alert>
                </section>
                
                {/* Icons Section */}
                <Card title="Icon Component" className="mb-4">
                    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <Icon name="check" size="small" />
                            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Small</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Icon name="heart" color="red" size="medium" />
                            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Medium</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Icon name="star" color="#FFD700" size="large" />
                            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Large</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Icon name="close" color="#dc3545" size="medium" />
                            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>Close</p>
                        </div>
                    </div>
                </Card>
                
                {/* Spinners Section */}
                <Card title="Spinner Component" className="mb-4">
                    <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
                        <Spinner size="small" />
                        <Spinner size="medium" text="Loading..." />
                        <Spinner size="large" variant="primary" />
                        <div style={{ backgroundColor: "#61DAFB", padding: "1rem", borderRadius: "8px" }}>
                            <Spinner variant="white" text="Processing..." />
                        </div>
                    </div>
                </Card>
                
                {/* Modal Section */}
                <Card title="Modal Component" className="mb-4">
                    <p>Modals are great for focused interactions.</p>
                    <Button onClick={() => setModalOpen(true)}>
                        Open Modal
                    </Button>
                    
                    <Modal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                    >
                        <Modal.Header onClose={() => setModalOpen(false)}>
                            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                Modal Title 
                                <Badge text="New" color="blue" size="small" />
                            </span>
                        </Modal.Header>
                        <Modal.Body>
                            <p>This is a modal dialog. You can put any content here!</p>
                            <p>Try pressing ESC or clicking outside to close.</p>
                            <Alert type="info" showIcon={false}>
                                Modals are perfect for confirmations, forms, or detailed views.
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant="secondary" 
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                alert("Confirmed!")
                                setModalOpen(false)
                            }}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
                
                {/* Tooltips Section */}
                <Card title="Tooltip Component" className="mb-4">
                    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                        <Tooltip text="This is a top tooltip" position="top">
                            <Button variant="primary">Hover Top</Button>
                        </Tooltip>
                        
                        <Tooltip text="This is a bottom tooltip" position="bottom">
                            <Button variant="secondary">Hover Bottom</Button>
                        </Tooltip>
                        
                        <Tooltip text="This is a left tooltip" position="left">
                            <Button variant="success">Hover Left</Button>
                        </Tooltip>
                        
                        <Tooltip text="This is a right tooltip" position="right">
                            <Button variant="danger">Hover Right</Button>
                        </Tooltip>
                        
                        <Tooltip text="Save to favorites" delay={0}>
                            <Icon name="heart" color="#dc3545" size="large" />
                        </Tooltip>
                    </div>
                </Card>
                
                {/* Tabs Section */}
                <Card title="Tabs Component" className="mb-4">
                    <Tabs defaultTab={0}>
                        <Tab label="🏠 Overview">
                            <h3>Welcome to React Components</h3>
                            <p>Tabs are perfect for organizing related content into sections.</p>
                            <p>Click on different tabs to see the content change!</p>
                        </Tab>
                        
                        <Tab label="⚙️ Features">
                            <h3>Component Features</h3>
                            <ul>
                                <li>Reusable and composable</li>
                                <li>Customizable with props</li>
                                <li>Accessible and semantic HTML</li>
                                <li>Smooth animations</li>
                                <li>TypeScript-ready</li>
                            </ul>
                        </Tab>
                        
                        <Tab label="📚 Learn More">
                            <h3>Learning Resources</h3>
                            <p>Check out these resources to learn more:</p>
                            <ul>
                                <li>ADVANCED_COMPONENTS_GUIDE.md</li>
                                <li>COMPONENT_PATTERNS.md</li>
                                <li>ARCHITECTURE.md</li>
                            </ul>
                            <Button variant="primary">View Documentation</Button>
                        </Tab>
                    </Tabs>
                </Card>
                
                {/* Combined Example */}
                <Card 
                    title="🎨 Combined Example"
                    footer={
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <Tooltip text="Like this card">
                                <Button variant="secondary">
                                    <Icon name="heart" size="small" /> Like
                                </Button>
                            </Tooltip>
                            <Tooltip text="Share with friends">
                                <Button variant="primary">Share</Button>
                            </Tooltip>
                        </div>
                    }
                >
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                        <Badge text="Popular" color="green" />
                        <Badge text="New" color="blue" />
                        <Badge text="Featured" color="purple" />
                    </div>
                    
                    <p>
                        This card demonstrates how all components work together.
                        Hover over the buttons to see tooltips!
                    </p>
                    
                    <Tabs defaultTab={0}>
                        <Tab label="Details">
                            <p>Product details and information go here.</p>
                        </Tab>
                        <Tab label="Reviews">
                            <Alert type="success">
                                ⭐⭐⭐⭐⭐ Rated 5 stars by users!
                            </Alert>
                        </Tab>
                    </Tabs>
                </Card>
                
                {/* Practice Exercises */}
                <Card title="🎯 Your Practice Exercises">
                    <h3>Now it's your turn!</h3>
                    <p>Try building these components:</p>
                    <ol>
                        <li><strong>Accordion</strong> - Collapsible content sections</li>
                        <li><strong>Dropdown</strong> - Custom select menu</li>
                        <li><strong>Toast Notifications</strong> - Temporary messages</li>
                        <li><strong>Progress Bar</strong> - Show completion status</li>
                        <li><strong>Breadcrumbs</strong> - Navigation trail</li>
                    </ol>
                    <p>Check <code>ADVANCED_COMPONENTS_GUIDE.md</code> for detailed instructions!</p>
                </Card>
                
            </main>
        </>
    )
}
