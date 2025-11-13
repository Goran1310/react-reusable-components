# ⚡ React Components Cheat Sheet

Quick reference for building reusable React components.

---

## 🎯 Component Basics

### Simple Component
```jsx
export default function Greeting() {
    return <h1>Hello World!</h1>
}
```

### Component with Props
```jsx
export default function Greeting({ name }) {
    return <h1>Hello {name}!</h1>
}
// Usage: <Greeting name="John" />
```

### Component with Default Props
```jsx
export default function Button({ text = "Click Me", variant = "primary" }) {
    return <button className={variant}>{text}</button>
}
// Usage: <Button /> or <Button text="Submit" variant="success" />
```

### Component with Children
```jsx
export default function Card({ children }) {
    return <div className="card">{children}</div>
}
// Usage: <Card><p>Content</p></Card>
```

---

## 🔧 Common Patterns

### Destructuring Props
```jsx
// ✅ Good
function Button({ text, onClick, disabled }) {
    return <button onClick={onClick} disabled={disabled}>{text}</button>
}

// ❌ Avoid
function Button(props) {
    return <button onClick={props.onClick}>{props.text}</button>
}
```

### Spread Props
```jsx
function Input({ value, onChange, ...otherProps }) {
    return <input value={value} onChange={onChange} {...otherProps} />
}
// Passes any extra props to input element
```

### Conditional Rendering
```jsx
// Method 1: && operator
{isLoggedIn && <UserMenu />}

// Method 2: Ternary
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// Method 3: If statement
if (!isLoaded) return <Spinner />
return <Content />
```

### Array Mapping
```jsx
{items.map(item => (
    <ListItem key={item.id} data={item} />
))}
```

---

## 📦 Component Types

### Presentational (Dumb)
```jsx
function UserCard({ user }) {
    return (
        <div className="card">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    )
}
```

### Container (Smart)
```jsx
function UserCardContainer() {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        fetchUser().then(setUser)
    }, [])
    
    if (!user) return <Spinner />
    return <UserCard user={user} />
}
```

### Compound Components
```jsx
function Modal({ children }) {
    return <div className="modal">{children}</div>
}

Modal.Header = ({ children }) => (
    <div className="modal-header">{children}</div>
)

Modal.Body = ({ children }) => (
    <div className="modal-body">{children}</div>
)

// Usage:
<Modal>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content</Modal.Body>
</Modal>
```

---

## 🎨 Styling Patterns

### CSS Classes
```jsx
function Button({ variant = "primary" }) {
    return <button className={`btn btn-${variant}`}>Click</button>
}
```

### Conditional Classes
```jsx
function Button({ variant, disabled }) {
    const className = [
        "btn",
        `btn-${variant}`,
        disabled && "btn-disabled"
    ].filter(Boolean).join(" ")
    
    return <button className={className}>Click</button>
}
```

### Inline Styles
```jsx
function Box({ size = 100 }) {
    return (
        <div style={{ 
            width: size, 
            height: size,
            backgroundColor: "#61DAFB"
        }}>
            Box
        </div>
    )
}
```

---

## 💡 State & Events

### useState
```jsx
function Counter() {
    const [count, setCount] = useState(0)
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
```

### Event Handlers
```jsx
function Input() {
    const [value, setValue] = useState("")
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    
    return <input value={value} onChange={handleChange} />
}
```

### useEffect
```jsx
function DataLoader() {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        fetch("/api/data")
            .then(res => res.json())
            .then(setData)
    }, []) // Empty array = run once on mount
    
    return <div>{data}</div>
}
```

---

## 🔄 Controlled vs Uncontrolled

### Controlled Input
```jsx
function Form() {
    const [name, setName] = useState("")
    
    return (
        <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    )
}
```

### Uncontrolled Input
```jsx
function Form() {
    const inputRef = useRef()
    
    const handleSubmit = () => {
        console.log(inputRef.current.value)
    }
    
    return <input ref={inputRef} defaultValue="Initial" />
}
```

---

## 🚀 Advanced Patterns

### Render Props
```jsx
function DataFetcher({ url, render }) {
    const [data, setData] = useState(null)
    
    useEffect(() => {
        fetch(url).then(res => res.json()).then(setData)
    }, [url])
    
    return render(data)
}

// Usage:
<DataFetcher 
    url="/api/users"
    render={(data) => <UserList users={data} />}
/>
```

### Custom Hooks
```jsx
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    
    return [value, setValue]
}

// Usage:
const [name, setName] = useLocalStorage("name", "")
```

### Context API
```jsx
const ThemeContext = createContext()

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

function ThemedButton() {
    const { theme } = useContext(ThemeContext)
    return <button className={theme}>Click</button>
}
```

---

## ✅ Component Checklist

Before building a component, ask:

- [ ] What's its single purpose?
- [ ] What props does it need?
- [ ] What are sensible defaults?
- [ ] Does it need state?
- [ ] Does it need effects?
- [ ] How should it be styled?
- [ ] Is it accessible?
- [ ] How will users use it?

---

## 🎯 Best Practices

### DO ✅
```jsx
// Descriptive names
<Button variant="primary" />

// Default values
function Button({ variant = "primary" }) {}

// Destructure props
function Button({ text, onClick }) {}

// Use keys in lists
{items.map(item => <div key={item.id}>{item.name}</div>)}

// Spread remaining props
function Input({ value, ...props }) {
    return <input value={value} {...props} />
}
```

### DON'T ❌
```jsx
// Vague names
<Button type="1" />

// No defaults (crashes if prop missing)
function Button({ variant }) {}

// Access props object
function Button(props) {
    return <button>{props.text}</button>
}

// Missing keys
{items.map(item => <div>{item.name}</div>)}

// Too many props (use composition instead)
<Component prop1 prop2 prop3 prop4 prop5 prop6 prop7 />
```

---

## 📚 Quick Reference

| Need | Use |
|------|-----|
| Display data | Props |
| Flexible content | Children prop |
| Interactive | useState |
| Fetch data | useEffect |
| Reuse logic | Custom hooks |
| Share state | Context |
| Computed values | useMemo |
| Function refs | useCallback |
| DOM access | useRef |

---

## 🔍 Common Errors

### "Cannot read property 'map' of undefined"
```jsx
// ❌ Problem
{users.map(user => <div>{user.name}</div>)}

// ✅ Solution: Provide default
function UserList({ users = [] }) {
    return users.map(user => <div key={user.id}>{user.name}</div>)
}
```

### "Each child should have unique key"
```jsx
// ❌ Problem
{items.map(item => <div>{item}</div>)}

// ✅ Solution: Add key
{items.map((item, index) => <div key={index}>{item}</div>)}
```

### "className is not defined"
```jsx
// ❌ Problem: Used 'class' instead of 'className'
<div class="card">Content</div>

// ✅ Solution: Use 'className'
<div className="card">Content</div>
```

---

## 💾 Save This Cheat Sheet

Print or bookmark this page for quick reference while coding!

**Quick Links:**
- Full Guide: `ADVANCED_COMPONENTS_GUIDE.md`
- Patterns: `COMPONENT_PATTERNS.md`
- Practice: `PRACTICE_QUICK_START.md`

---

**Happy Coding! ⚛️**
