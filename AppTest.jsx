import Button from "./components/Button"
import Card from "./components/Card"
import Badge from "./components/Badge"
import Avatar from "./components/Avatar"
import FactItem from "./components/FactItem"

/**
 * Simple Test App - Minimal component testing
 * Use this to verify components work before viewing the full demo
 */
export default function AppTest() {
    return (
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ color: "#61DAFB" }}>Component Test ⚛️</h1>
            
            <h2>✅ Button Test</h2>
            <Button onClick={() => alert("Works!")} variant="primary">
                Test Button
            </Button>
            
            <h2 style={{ marginTop: "2rem" }}>✅ Badge Test</h2>
            <Badge text="Test" color="green" />
            
            <h2 style={{ marginTop: "2rem" }}>✅ Avatar Test</h2>
            <Avatar fallbackText="OK" size="medium" />
            
            <h2 style={{ marginTop: "2rem" }}>✅ Card Test</h2>
            <Card title="Test Card">
                <p>Card is working!</p>
            </Card>
            
            <h2 style={{ marginTop: "2rem" }}>✅ FactItem Test</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <FactItem fact="Components are working" icon="✅" />
            </ul>
            
            <h2 style={{ marginTop: "2rem", color: "#28a745" }}>
                All Components Working! 🎉
            </h2>
        </div>
    )
}
