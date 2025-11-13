# 🚀 Advanced Reusable Components Guide

Master the art of building highly reusable React components with advanced patterns and best practices.

---

## 📚 Table of Contents

1. [Component Design Principles](#component-design-principles)
2. [Advanced Component Patterns](#advanced-component-patterns)
3. [Practical Components to Build](#practical-components-to-build)
4. [Step-by-Step Exercises](#step-by-step-exercises)
5. [Real-World Examples](#real-world-examples)

---

## 🎯 Component Design Principles

### 1. **Single Responsibility Principle**
Each component should do ONE thing well.

```jsx
// ❌ Bad - Too many responsibilities
function UserCard({ user, onEdit, onDelete, showStats, theme }) {
    // Handles display, editing, deletion, stats, theming...
}

// ✅ Good - Focused components
function UserProfile({ user }) { }
function UserActions({ onEdit, onDelete }) { }
function UserStats({ stats }) { }
```

### 2. **Composition Over Props**
Use children and composition instead of too many props.

```jsx
// ❌ Bad - Too many conditional props
function Modal({ 
    title, 
    showHeader, 
    showFooter, 
    headerColor,
    footerButtons 
}) { }

// ✅ Good - Flexible composition
function Modal({ children }) {
    return <div className="modal">{children}</div>
}

function Modal.Header({ children }) {
    return <div className="modal-header">{children}</div>
}

function Modal.Footer({ children }) {
    return <div className="modal-footer">{children}</div>
}

// Usage
<Modal>
    <Modal.Header>Title</Modal.Header>
    <p>Content</p>
    <Modal.Footer>
        <Button>Close</Button>
    </Modal.Footer>
</Modal>
```

### 3. **Flexible but Not Complicated**
Provide sensible defaults, allow customization when needed.

```jsx
// ✅ Good balance
function Button({ 
    children,
    variant = "primary",
    size = "medium",
    onClick,
    disabled = false,
    className = "",
    ...otherProps  // Allow any other HTML attributes
}) {
    return (
        <button 
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}  // Spread remaining props
        >
            {children}
        </button>
    )
}
```

---

## 🔧 Advanced Component Patterns

### Pattern 1: Compound Components

Components that work together as a system.

```jsx
// Select component with compound pattern
function Select({ children, value, onChange }) {
    return (
        <select value={value} onChange={onChange}>
            {children}
        </select>
    )
}

function Option({ value, children }) {
    return <option value={value}>{children}</option>
}

// Export as compound
Select.Option = Option
export default Select

// Usage
<Select value={selected} onChange={handleChange}>
    <Select.Option value="1">Option 1</Select.Option>
    <Select.Option value="2">Option 2</Select.Option>
</Select>
```

### Pattern 2: Render Props

Pass a function to customize rendering.

```jsx
function DataFetcher({ url, render }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
    }, [url])
    
    return render({ data, loading })
}

// Usage
<DataFetcher 
    url="/api/users"
    render={({ data, loading }) => (
        loading ? <Spinner /> : <UserList users={data} />
    )}
/>
```

### Pattern 3: Polymorphic Components

Component that can render as different HTML elements.

```jsx
function Text({ 
    as = "p",
    children,
    className = "",
    ...props 
}) {
    const Component = as
    
    return (
        <Component className={`text ${className}`} {...props}>
            {children}
        </Component>
    )
}

// Usage
<Text as="h1">Heading</Text>
<Text as="span">Inline text</Text>
<Text as="p">Paragraph</Text>
```

### Pattern 4: Controlled vs Uncontrolled

Support both usage patterns.

```jsx
function Input({ 
    value: controlledValue,
    defaultValue,
    onChange,
    ...props 
}) {
    // Uncontrolled internal state
    const [internalValue, setInternalValue] = useState(defaultValue || "")
    
    // Use controlled value if provided, otherwise internal
    const value = controlledValue !== undefined 
        ? controlledValue 
        : internalValue
    
    const handleChange = (e) => {
        if (controlledValue === undefined) {
            setInternalValue(e.target.value)
        }
        onChange?.(e)
    }
    
    return <input value={value} onChange={handleChange} {...props} />
}

// Controlled usage
<Input value={state} onChange={e => setState(e.target.value)} />

// Uncontrolled usage
<Input defaultValue="Initial" />
```

### Pattern 5: Container/Presentational Split

Separate logic from presentation.

```jsx
// Presentational (dumb component)
function UserListView({ users, onUserClick }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id} onClick={() => onUserClick(user)}>
                    {user.name}
                </li>
            ))}
        </ul>
    )
}

// Container (smart component)
function UserListContainer() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        fetchUsers().then(data => {
            setUsers(data)
            setLoading(false)
        })
    }, [])
    
    const handleUserClick = (user) => {
        console.log("Clicked:", user)
    }
    
    if (loading) return <Spinner />
    
    return <UserListView users={users} onUserClick={handleUserClick} />
}
```

---

## 💡 Practical Components to Build

### Level 1: Basic Components ⭐

1. **Icon Component**
```jsx
function Icon({ name, size = 24, color = "currentColor" }) {
    return (
        <svg 
            width={size} 
            height={size} 
            fill={color}
            className="icon"
        >
            {/* SVG paths based on name */}
        </svg>
    )
}
```

2. **Spinner/Loader**
```jsx
function Spinner({ size = "medium", color = "primary" }) {
    return (
        <div className={`spinner spinner-${size} spinner-${color}`}>
            <div className="spinner-circle"></div>
        </div>
    )
}
```

3. **Alert/Notification**
```jsx
function Alert({ type = "info", children, onClose }) {
    return (
        <div className={`alert alert-${type}`}>
            <span>{children}</span>
            {onClose && (
                <button onClick={onClose} className="alert-close">×</button>
            )}
        </div>
    )
}
```

### Level 2: Intermediate Components ⭐⭐

4. **Modal/Dialog**
```jsx
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

Modal.Header = ({ children }) => (
    <div className="modal-header">{children}</div>
)

Modal.Body = ({ children }) => (
    <div className="modal-body">{children}</div>
)

Modal.Footer = ({ children }) => (
    <div className="modal-footer">{children}</div>
)
```

5. **Tabs Component**
```jsx
function Tabs({ children, defaultTab = 0 }) {
    const [activeTab, setActiveTab] = useState(defaultTab)
    
    return (
        <div className="tabs">
            <div className="tabs-header">
                {React.Children.map(children, (child, index) => (
                    <button
                        className={activeTab === index ? "active" : ""}
                        onClick={() => setActiveTab(index)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className="tabs-content">
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    )
}

function Tab({ children }) {
    return <div className="tab-pane">{children}</div>
}
```

6. **Tooltip**
```jsx
function Tooltip({ text, children, position = "top" }) {
    const [visible, setVisible] = useState(false)
    
    return (
        <div 
            className="tooltip-container"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && (
                <div className={`tooltip tooltip-${position}`}>
                    {text}
                </div>
            )}
        </div>
    )
}
```

### Level 3: Advanced Components ⭐⭐⭐

7. **Dropdown/Select**
```jsx
function Dropdown({ options, value, onChange, placeholder }) {
    const [isOpen, setIsOpen] = useState(false)
    
    const handleSelect = (option) => {
        onChange(option)
        setIsOpen(false)
    }
    
    return (
        <div className="dropdown">
            <button 
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value?.label || placeholder}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map(option => (
                        <li 
                            key={option.value}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
```

8. **Accordion**
```jsx
function Accordion({ children }) {
    const [openIndex, setOpenIndex] = useState(null)
    
    return (
        <div className="accordion">
            {React.Children.map(children, (child, index) => 
                React.cloneElement(child, {
                    isOpen: openIndex === index,
                    onToggle: () => setOpenIndex(
                        openIndex === index ? null : index
                    )
                })
            )}
        </div>
    )
}

function AccordionItem({ title, children, isOpen, onToggle }) {
    return (
        <div className="accordion-item">
            <button 
                className="accordion-header"
                onClick={onToggle}
            >
                {title}
                <span>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
                <div className="accordion-content">
                    {children}
                </div>
            )}
        </div>
    )
}
```

9. **Form Field with Validation**
```jsx
function FormField({ 
    label,
    type = "text",
    value,
    onChange,
    validate,
    required = false
}) {
    const [error, setError] = useState("")
    const [touched, setTouched] = useState(false)
    
    const handleBlur = () => {
        setTouched(true)
        if (validate) {
            const validationError = validate(value)
            setError(validationError || "")
        }
        if (required && !value) {
            setError("This field is required")
        }
    }
    
    return (
        <div className="form-field">
            <label>
                {label} {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                className={error && touched ? "error" : ""}
            />
            {error && touched && (
                <span className="error-message">{error}</span>
            )}
        </div>
    )
}
```

---

## 🎓 Step-by-Step Exercises

### Exercise 1: Build a Toast Notification System

**Requirements:**
- Show notifications in corner of screen
- Auto-dismiss after timeout
- Support different types (success, error, warning, info)
- Stack multiple notifications
- Allow manual dismiss

**Steps:**
1. Create `Toast.jsx` component
2. Create `ToastContainer.jsx` to hold all toasts
3. Add animation for enter/exit
4. Implement auto-dismiss with timeout
5. Add close button

### Exercise 2: Build a Data Table

**Requirements:**
- Display array of objects
- Sortable columns
- Filterable/searchable
- Pagination
- Row selection

**Steps:**
1. Create `Table.jsx` component
2. Add `TableHeader` and `TableRow` sub-components
3. Implement sorting logic
4. Add search functionality
5. Add pagination controls

### Exercise 3: Build a Multi-Step Form

**Requirements:**
- Multiple steps/pages
- Progress indicator
- Navigation (next, previous, skip)
- Validation per step
- Summary at end

**Steps:**
1. Create `MultiStepForm.jsx` wrapper
2. Create `FormStep.jsx` component
3. Add progress bar component
4. Implement step navigation
5. Add validation per step

---

## 🌟 Real-World Examples

### Example 1: Flexible Card Component

```jsx
function Card({ 
    children,
    variant = "default",
    padding = "medium",
    shadow = true,
    hoverable = false,
    onClick,
    className = ""
}) {
    const classes = [
        "card",
        `card-${variant}`,
        `card-padding-${padding}`,
        shadow && "card-shadow",
        hoverable && "card-hoverable",
        className
    ].filter(Boolean).join(" ")
    
    return (
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    )
}

// Sub-components
Card.Image = ({ src, alt }) => (
    <img src={src} alt={alt} className="card-image" />
)

Card.Title = ({ children }) => (
    <h3 className="card-title">{children}</h3>
)

Card.Description = ({ children }) => (
    <p className="card-description">{children}</p>
)

Card.Actions = ({ children }) => (
    <div className="card-actions">{children}</div>
)

// Usage
<Card variant="primary" hoverable>
    <Card.Image src="/product.jpg" alt="Product" />
    <Card.Title>Product Name</Card.Title>
    <Card.Description>Product description here</Card.Description>
    <Card.Actions>
        <Button>Buy Now</Button>
        <Button variant="secondary">Details</Button>
    </Card.Actions>
</Card>
```

### Example 2: Smart Input Component

```jsx
function Input({
    type = "text",
    value,
    onChange,
    placeholder,
    label,
    error,
    hint,
    icon,
    iconPosition = "left",
    disabled = false,
    required = false,
    className = "",
    ...props
}) {
    const [focused, setFocused] = useState(false)
    
    return (
        <div className={`input-wrapper ${className}`}>
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            
            <div className={`
                input-container 
                ${focused ? "focused" : ""}
                ${error ? "error" : ""}
                ${disabled ? "disabled" : ""}
            `}>
                {icon && iconPosition === "left" && (
                    <span className="input-icon">{icon}</span>
                )}
                
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    {...props}
                />
                
                {icon && iconPosition === "right" && (
                    <span className="input-icon">{icon}</span>
                )}
            </div>
            
            {hint && !error && (
                <span className="input-hint">{hint}</span>
            )}
            
            {error && (
                <span className="input-error">{error}</span>
            )}
        </div>
    )
}
```

---

## 📋 Component Checklist

Before considering a component "reusable," check:

- [ ] **Single purpose** - Does one thing well
- [ ] **Flexible props** - Customizable but with defaults
- [ ] **Composition-friendly** - Uses children appropriately
- [ ] **Accessible** - Proper ARIA labels, keyboard nav
- [ ] **Styled but themeable** - CSS classes allow customization
- [ ] **Well-documented** - Clear prop descriptions
- [ ] **Error-handling** - Graceful with missing/wrong props
- [ ] **Performance** - Doesn't re-render unnecessarily
- [ ] **Testable** - Easy to test in isolation

---

## 🎯 Best Practices Summary

1. **Start simple, add complexity as needed**
2. **Use TypeScript/PropTypes for type safety**
3. **Provide sensible defaults**
4. **Use compound components for related functionality**
5. **Spread props (...props) for flexibility**
6. **Keep components small (<200 lines)**
7. **Extract common logic to custom hooks**
8. **Document prop usage with examples**
9. **Think about accessibility from the start**
10. **Test components in isolation**

---

## 🚀 Next Steps

1. **Pick 3 components from Level 1** and build them
2. **Move to Level 2** once comfortable
3. **Challenge yourself with Level 3** components
4. **Build a component library** for your projects
5. **Share and get feedback** on your components

---

**Remember: The best way to learn is by building! Start with simple components and gradually increase complexity. 🎉**
