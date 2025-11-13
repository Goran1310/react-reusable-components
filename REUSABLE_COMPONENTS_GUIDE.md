# Reusable React Components Guide

## Overview
This project demonstrates how to build **reusable React components** using props, composition, and best practices.

## 🎯 Key Concepts Learned

### 1. **Props (Properties)**
- Pass data from parent to child components
- Make components flexible and reusable
- Use default values with destructuring

### 2. **Component Composition**
- Use `children` prop to nest components
- Build complex UIs from simple building blocks
- Create flexible layouts

### 3. **Conditional Rendering**
- Show/hide elements based on props
- Provide fallback content
- Handle optional props

### 4. **Destructuring**
- Clean component signatures
- Set default values inline
- Extract only needed props

---

## 📦 Components Created

### 1. **Button Component**
```jsx
<Button onClick={handleClick} variant="primary">
    Click Me
</Button>
```

**Props:**
- `children`: Button text/content
- `onClick`: Click handler function
- `variant`: Style variant (primary, secondary, success, danger)
- `disabled`: Boolean to disable button

**Usage Examples:**
```jsx
<Button variant="primary">Primary Button</Button>
<Button variant="danger" onClick={() => alert('Delete!')}>Delete</Button>
<Button disabled>Can't Click</Button>
```

---

### 2. **Card Component**
```jsx
<Card 
    title="Card Title"
    footer="Card Footer"
>
    <p>Card content goes here</p>
</Card>
```

**Props:**
- `title`: Card header content
- `children`: Main card content (composition)
- `footer`: Footer content
- `className`: Additional CSS classes

**Usage Examples:**
```jsx
<Card title="Welcome">
    <p>This is a simple card</p>
</Card>

<Card 
    title="Profile"
    footer={<Button>Save Changes</Button>}
>
    <Avatar />
    <p>User information...</p>
</Card>
```

---

### 3. **Badge Component**
```jsx
<Badge text="New" color="blue" />
```

**Props:**
- `text`: Badge content
- `color`: Color variant (blue, green, red, yellow, purple, gray)
- `size`: Size variant (small, medium, large)

**Usage Examples:**
```jsx
<Badge text="New" color="blue" />
<Badge text="Popular" color="green" size="large" />
<Badge text="Sale" color="red" size="small" />
```

---

### 4. **Avatar Component**
```jsx
<Avatar src="/path/to/image.jpg" alt="User" size="medium" />
```

**Props:**
- `src`: Image source URL
- `alt`: Alt text for image
- `size`: Size variant (small, medium, large)
- `fallbackText`: Text to show if no image (initials)

**Usage Examples:**
```jsx
<Avatar src="/user.jpg" alt="John Doe" />
<Avatar fallbackText="JD" size="large" />
<Avatar fallbackText="AB" /> {/* No image, shows initials */}
```

---

### 5. **FactItem Component**
```jsx
<FactItem fact="React is awesome!" icon="⚛️" />
```

**Props:**
- `fact`: The fact text to display
- `icon`: Icon/emoji to show (default: "✓")

**Usage Examples:**
```jsx
<ul>
    <FactItem fact="React uses JSX" icon="⚛️" />
    <FactItem fact="React is component-based" icon="🧩" />
    <FactItem fact="React is fast" icon="⚡" />
</ul>
```

---

## 🎨 Running the Demo

### Option 1: View Original App
```bash
# Uses index.jsx which imports App.jsx
npm run dev
```

### Option 2: View Component Demo
1. Change `index.jsx` to import `AppDemo` instead of `App`:
```jsx
import { createRoot } from "react-dom/client"
import AppDemo from "./AppDemo"  // Changed from "./App"

const root = createRoot(document.getElementById("root"))
root.render(<AppDemo />)
```

2. Run the dev server:
```bash
npm run dev
```

This will show all components in action with various examples!

---

## 💡 Best Practices for Reusable Components

### 1. **Use Descriptive Prop Names**
```jsx
// ❌ Bad
<Button type="1" />

// ✅ Good
<Button variant="primary" />
```

### 2. **Provide Default Values**
```jsx
export default function Button({ 
    variant = "primary",  // Default value
    disabled = false 
}) {
    // Component code
}
```

### 3. **Use Destructuring**
```jsx
// ❌ Avoid
export default function Button(props) {
    return <button className={props.variant}>{props.children}</button>
}

// ✅ Better
export default function Button({ variant, children }) {
    return <button className={variant}>{children}</button>
}
```

### 4. **Keep Components Small and Focused**
- Each component should do ONE thing well
- Break large components into smaller ones
- Easier to test and maintain

### 5. **Use Composition Over Configuration**
```jsx
// ✅ Good - Flexible composition
<Card>
    <Avatar />
    <h2>Title</h2>
    <p>Description</p>
</Card>

// ❌ Less flexible - Too many props
<Card 
    avatarSrc="..."
    title="..."
    description="..."
/>
```

---

## 🔄 How Props Flow

```
Parent Component (App)
        |
        | passes props ↓
        |
Child Component (Button)
        |
        | receives props
        |
        ↓
    Renders UI
```

**Example:**
```jsx
// Parent passes props
<Button variant="primary" onClick={handleClick}>
    Click Me
</Button>

// Child receives props
function Button({ variant, onClick, children }) {
    return <button className={variant} onClick={onClick}>
        {children}
    </button>
}
```

---

## 📚 Key Takeaways

1. **Props make components reusable** - Same component, different data
2. **Children prop enables composition** - Nest components flexibly
3. **Default values prevent errors** - Components work even without all props
4. **Destructuring keeps code clean** - Easy to see what props are used
5. **Small components are better** - Easier to understand and reuse

---

## 🚀 Next Steps

Try these challenges:
1. Create a `List` component that takes an array of items
2. Add a `Modal` component with open/close functionality
3. Build a `Form` component with input validation
4. Create a `Tooltip` component that shows on hover
5. Make a `Tabs` component for switching content

---

## 📖 Resources

- [React Docs - Components and Props](https://react.dev/learn/passing-props-to-a-component)
- [React Docs - Children Prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [Component Composition Guide](https://react.dev/learn/thinking-in-react)

---

**Happy Coding! ⚛️**
