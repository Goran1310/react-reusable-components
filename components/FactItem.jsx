/**
 * Reusable Fact Item Component
 * Demonstrates: Props for data-driven components
 */
export default function FactItem({ fact, icon = "✓" }) {
    return (
        <li className="fact-item">
            <span className="fact-icon">{icon}</span>
            <span className="fact-text">{fact}</span>
        </li>
    )
}
