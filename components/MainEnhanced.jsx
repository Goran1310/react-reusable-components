import FactItem from "./FactItem"
import Card from "./Card"
import Badge from "./Badge"

export default function MainEnhanced() {
    const facts = [
        "Was first released in 2013",
        "Was originally created by Jordan Walke",
        "Has well over 200K stars on GitHub",
        "Is maintained by Meta",
        "Powers thousands of enterprise apps, including mobile apps"
    ]
    
    return (
        <main>
            <Card 
                title={
                    <>
                        Fun facts about React 
                        <Badge text="Popular" color="green" />
                    </>
                }
                footer="Learn more at react.dev"
            >
                <ul className="facts-list">
                    {facts.map((fact, index) => (
                        <FactItem 
                            key={index} 
                            fact={fact}
                            icon="⚛️"
                        />
                    ))}
                </ul>
            </Card>
        </main>
    )
}
