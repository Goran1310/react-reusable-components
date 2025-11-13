# React Component Architecture

## 🏗️ Component Hierarchy

```
index.jsx (Entry Point)
    └── App.jsx OR AppDemo.jsx
            ├── Navbar.jsx
            │       └── <nav>
            │           ├── <img> (React logo)
            │           └── <span> (ReactFacts)
            │
            └── Main.jsx OR MainEnhanced.jsx
                    └── <main>
                        ├── Card.jsx
                        │   ├── card-header
                        │   │   ├── <h3> (title)
                        │   │   └── Badge.jsx
                        │   ├── card-body
                        │   │   └── <ul>
                        │   │       └── FactItem.jsx (x5)
                        │   └── card-footer
                        │
                        └── Multiple Card components
                            ├── Buttons Demo Card
                            │   └── Button.jsx (x5 variants)
                            ├── Badges Demo Card
                            │   └── Badge.jsx (x6 variants)
                            ├── Avatars Demo Card
                            │   └── Avatar.jsx (x5 variants)
                            └── Nested Card Example
                                ├── <p> elements
                                ├── <ul>
                                │   └── FactItem.jsx (x3)
                                └── Button.jsx (in footer)
```

---

## 🔄 Data Flow

### Props Flow (One-Way Data Flow)
```
Parent Component
      |
      | Passes props ↓
      |
Child Component
      |
      | Uses props to render
      |
      ↓
    UI Output
```

### Example: Button Component
```
AppDemo.jsx
    |
    | <Button onClick={handleClick} variant="primary">
    |     Click Me
    | </Button>
    ↓
Button.jsx receives:
    - onClick function
    - variant = "primary"
    - children = "Click Me"
    ↓
Renders:
    <button className="btn btn-primary" onClick={handleClick}>
        Click Me
    </button>
```

---

## 📦 Component Composition Pattern

### Pattern: Container + Content (Children Prop)

```jsx
// Container Component (Card)
<Card title="My Card">
    {/* Content Components */}
    <Avatar />
    <p>Description</p>
    <Button>Action</Button>
</Card>
```

### How it works:
```
1. Card receives children prop
2. Children = everything between <Card> tags
3. Card places {children} in card-body div
4. Result: Flexible, composable layout
```

---

## 🎨 Styling Architecture

```
index.css (Global Styles)
    ├── Base styles (*, body)
    ├── Header/Nav styles
    ├── Main content styles
    └── Component styles
        ├── .btn (Button variants)
        ├── .card (Card layout)
        ├── .badge (Badge colors/sizes)
        ├── .avatar (Avatar sizes)
        └── .fact-item (FactItem layout)
```

### CSS Class Naming Pattern:
```
Component-based naming:
- .btn, .btn-primary, .btn-secondary
- .card, .card-header, .card-body
- .badge, .badge-blue, .badge-large
- .avatar, .avatar-small, .avatar-medium
```

---

## 🔧 Component Responsibility

### Single Responsibility Principle

Each component has ONE clear purpose:

| Component | Responsibility | Reusable? |
|-----------|---------------|-----------|
| **App** | Layout structure | ❌ App-specific |
| **Navbar** | Site navigation | ⚠️ Could be reusable |
| **Main** | Page content | ❌ App-specific |
| **Card** | Container layout | ✅ Highly reusable |
| **Button** | User actions | ✅ Highly reusable |
| **Badge** | Labels/status | ✅ Highly reusable |
| **Avatar** | User identity | ✅ Highly reusable |
| **FactItem** | List items | ✅ Highly reusable |

---

## 🎯 Component Types

### 1. **Presentational Components**
- Display data passed via props
- No state (in static version)
- Reusable across app

**Examples:** Button, Badge, Avatar, FactItem

```jsx
function Badge({ text, color }) {
    return <span className={`badge badge-${color}`}>{text}</span>
}
```

### 2. **Container Components**
- Use composition (children prop)
- Provide layout structure
- Wrap other components

**Examples:** Card, Main, App

```jsx
function Card({ title, children }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            {children}
        </div>
    )
}
```

### 3. **Layout Components**
- Overall page structure
- Usually app-specific
- Combine multiple components

**Examples:** App, Navbar

```jsx
function App() {
    return (
        <>
            <Navbar />
            <Main />
        </>
    )
}
```

---

## 📊 Component Reusability Score

```
Most Reusable
    ↑
    |  Button    ████████████ 100%
    |  Badge     ████████████ 100%
    |  Avatar    ███████████  95%
    |  FactItem  ██████████   90%
    |  Card      ██████████   90%
    |  Navbar    ████████     70%
    |  Main      ████         40%
    |  App       ██           20%
    ↓
Least Reusable
```

**Key Factors:**
- More props = More flexible = More reusable
- Generic purpose = More reusable
- App-specific logic = Less reusable

---

## 🚀 Building Strategy

### Bottom-Up Approach (Recommended for Learning)

```
Step 1: Build smallest components
    → Button, Badge, Avatar, FactItem

Step 2: Build container components
    → Card (uses Button, Badge)

Step 3: Build page sections
    → MainEnhanced (uses Card, FactItem)

Step 4: Build app layout
    → App (uses Navbar, Main)

Step 5: Render app
    → index.jsx (renders App)
```

### Top-Down Approach (Recommended for Real Projects)

```
Step 1: Design full UI mockup
Step 2: Break down into component hierarchy
Step 3: Build from outside in (App → Main → Card → Button)
Step 4: Extract reusable components as patterns emerge
```

---

## 💡 Best Practices Applied

✅ **Small, focused components** - Each does one thing well  
✅ **Composition over configuration** - Use children prop  
✅ **Props for customization** - Make components flexible  
✅ **Default values** - Components work without all props  
✅ **Destructuring** - Clean component signatures  
✅ **Consistent naming** - Clear prop and component names  
✅ **Separation of concerns** - Style, logic, structure separated  

---

## 🎓 Key Takeaways

1. **Component hierarchy flows from general to specific**
2. **Props flow one-way: parent → child**
3. **Children prop enables flexible composition**
4. **Smaller components = More reusable**
5. **Build reusable components first, compose later**

---

**Now you understand React architecture! ⚛️**
