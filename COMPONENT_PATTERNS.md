# React Components Quick Reference

## Component Patterns

### 1. Basic Component with Props
```jsx
export default function Greeting({ name, age }) {
    return <h1>Hello {name}, you are {age} years old!</h1>
}

// Usage
<Greeting name="John" age={25} />
```

### 2. Component with Default Props
```jsx
export default function Button({ 
    text = "Click Me",
    variant = "primary" 
}) {
    return <button className={variant}>{text}</button>
}

// Usage
<Button />  {/* Uses defaults */}
<Button text="Submit" variant="success" />
```

### 3. Component with Children
```jsx
export default function Card({ children, title }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            {children}
        </div>
    )
}

// Usage
<Card title="My Card">
    <p>Any content here</p>
    <button>Click</button>
</Card>
```

### 4. Component with Conditional Rendering
```jsx
export default function Alert({ message, type = "info" }) {
    return message ? (
        <div className={`alert alert-${type}`}>
            {message}
        </div>
    ) : null
}

// Usage
<Alert message="Success!" type="success" />
<Alert message="" />  {/* Renders nothing */}
```

### 5. Component with Event Handlers
```jsx
export default function Counter({ initialCount = 0 }) {
    const [count, setCount] = React.useState(initialCount)
    
    const increment = () => setCount(count + 1)
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>+1</button>
        </div>
    )
}
```

### 6. Component with Array Mapping
```jsx
export default function TodoList({ todos }) {
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
    )
}

// Usage
<TodoList todos={["Learn React", "Build App", "Deploy"]} />
```

### 7. Composition Pattern
```jsx
// Container component
export default function Layout({ children }) {
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

// Usage
<Layout>
    <h1>Welcome</h1>
    <p>Content goes here</p>
</Layout>
```

### 8. Component with Multiple Props Types
```jsx
export default function ProfileCard({
    name,              // string
    age,               // number
    isActive,          // boolean
    hobbies,           // array
    address,           // object
    onEdit             // function
}) {
    return (
        <div className="profile-card">
            <h2>{name} {isActive && "✓"}</h2>
            <p>Age: {age}</p>
            <p>City: {address.city}</p>
            <ul>
                {hobbies.map(hobby => <li key={hobby}>{hobby}</li>)}
            </ul>
            <button onClick={onEdit}>Edit</button>
        </div>
    )
}
```

## Props Destructuring Examples

```jsx
// Method 1: Destructure in parameters
function Button({ text, onClick }) {
    return <button onClick={onClick}>{text}</button>
}

// Method 2: Destructure in function body
function Button(props) {
    const { text, onClick } = props
    return <button onClick={onClick}>{text}</button>
}

// Method 3: With default values
function Button({ text = "Click", onClick = () => {} }) {
    return <button onClick={onClick}>{text}</button>
}

// Method 4: With rest operator
function Button({ text, ...otherProps }) {
    return <button {...otherProps}>{text}</button>
}
```

## Common Prop Types

| Type | Example | Usage |
|------|---------|-------|
| String | `name="John"` | Text data |
| Number | `age={25}` | Numeric values |
| Boolean | `isActive={true}` | True/false flags |
| Array | `items={[1,2,3]}` | Lists of data |
| Object | `user={{name: "John"}}` | Complex data |
| Function | `onClick={handleClick}` | Event handlers |
| JSX | `icon={<Icon />}` | React elements |

## Quick Tips

✅ **DO:**
- Use destructuring for cleaner code
- Provide default values for optional props
- Use meaningful prop names
- Keep components small and focused
- Use children for composition

❌ **DON'T:**
- Mutate props (they're read-only)
- Use too many props (>5 consider refactoring)
- Forget keys when mapping arrays
- Pass unnecessary data down multiple levels

## Component File Structure

```jsx
// Imports at top
import React from 'react'
import './Button.css'

// Component definition
export default function Button({ 
    text,
    variant = "primary",
    onClick 
}) {
    // Logic here
    const buttonClass = `btn btn-${variant}`
    
    // Return JSX
    return (
        <button 
            className={buttonClass}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
```
