import Button from "./components/Button"
import Card from "./components/Card"
import Badge from "./components/Badge"
import Avatar from "./components/Avatar"
import FactItem from "./components/FactItem"
import Navbar from "./components/Navbar"
import MainEnhanced from "./components/MainEnhanced"

/**
 * Demo App showing all reusable components
 */
export default function AppDemo() {
    const handleClick = () => {
        alert("Button clicked!")
    }
    
    return (
        <>
            <Navbar />
            
            {/* Main content with enhanced components */}
            <MainEnhanced />
            
            {/* Component showcase */}
            <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
                
                {/* Buttons Demo */}
                <Card title="Button Components" className="mb-4">
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Button onClick={handleClick} variant="primary">
                            Primary Button
                        </Button>
                        <Button onClick={handleClick} variant="secondary">
                            Secondary Button
                        </Button>
                        <Button onClick={handleClick} variant="success">
                            Success Button
                        </Button>
                        <Button onClick={handleClick} variant="danger">
                            Danger Button
                        </Button>
                        <Button onClick={handleClick} disabled>
                            Disabled Button
                        </Button>
                    </div>
                </Card>
                
                {/* Badges Demo */}
                <Card title="Badge Components" className="mb-4">
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                        <Badge text="New" color="blue" />
                        <Badge text="Popular" color="green" />
                        <Badge text="Sale" color="red" />
                        <Badge text="Premium" color="yellow" />
                        <Badge text="Large Badge" color="purple" size="large" />
                        <Badge text="Small" color="gray" size="small" />
                    </div>
                </Card>
                
                {/* Avatars Demo */}
                <Card title="Avatar Components" className="mb-4">
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                        <Avatar 
                            src="/images/react-logo.png" 
                            alt="React Logo"
                            size="small"
                        />
                        <Avatar 
                            src="/images/react-logo.png" 
                            alt="React Logo"
                            size="medium"
                        />
                        <Avatar 
                            src="/images/react-logo.png" 
                            alt="React Logo"
                            size="large"
                        />
                        <Avatar fallbackText="JD" size="medium" />
                        <Avatar fallbackText="AB" size="large" />
                    </div>
                </Card>
                
                {/* Custom Card with Children */}
                <Card 
                    title="Nested Card Example"
                    footer={<Button variant="primary">Learn More</Button>}
                >
                    <p>This card demonstrates the children prop pattern.</p>
                    <p>You can put any content inside a Card component!</p>
                    <ul>
                        <FactItem fact="Cards are versatile" icon="📦" />
                        <FactItem fact="They use composition" icon="🔧" />
                        <FactItem fact="They're reusable" icon="♻️" />
                    </ul>
                </Card>
                
            </div>
        </>
    )
}
