# Troubleshooting & Common Issues

## 🔧 Common Problems and Solutions

### 1. **"Vite is not recognized" Error**

**Problem:**
```
'vite' is not recognized as an internal or external command
```

**Solution:**
```bash
# Install dependencies first
npm install

# Then run dev server
npm run dev
```

---

### 2. **Component Not Rendering**

**Problem:** Component shows nothing on screen

**Checklist:**
- ✅ Did you export the component? `export default function MyComponent()`
- ✅ Did you import it correctly? `import MyComponent from "./MyComponent"`
- ✅ Is the component returning JSX? `return <div>...</div>`
- ✅ Are you using the component? `<MyComponent />`

**Example Fix:**
```jsx
// ❌ Wrong - No export
function Button() {
    return <button>Click</button>
}

// ✅ Correct
export default function Button() {
    return <button>Click</button>
}
```

---

### 3. **Props Not Working**

**Problem:** Props undefined or not displaying

**Common Mistakes:**
```jsx
// ❌ Wrong - Not destructured
function Button(props) {
    return <button>{text}</button>  // text is undefined
}

// ✅ Correct - Destructured
function Button({ text }) {
    return <button>{text}</button>
}

// OR

// ✅ Correct - Use props object
function Button(props) {
    return <button>{props.text}</button>
}
```

---

### 4. **"Cannot read property 'map' of undefined"**

**Problem:** Trying to map undefined array

**Solution:**
```jsx
// ❌ Wrong - No default value
function List({ items }) {
    return <ul>{items.map(item => <li>{item}</li>)}</ul>
}

// ✅ Correct - Provide default
function List({ items = [] }) {
    return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
}

// OR

// ✅ Correct - Conditional rendering
function List({ items }) {
    if (!items) return null
    return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
}
```

---

### 5. **"Each child should have unique key prop"**

**Problem:** Console warning about missing keys

**Solution:**
```jsx
// ❌ Wrong - No key
{items.map(item => <li>{item}</li>)}

// ✅ Correct - Add key
{items.map((item, index) => <li key={index}>{item}</li>)}

// ⭐ Best - Use unique ID
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

### 6. **Styles Not Applying**

**Problem:** CSS classes not working

**Checklist:**
- ✅ Is `index.css` imported in `index.jsx`?
- ✅ Is the class name spelled correctly?
- ✅ Are you using `className` (not `class`)?
- ✅ Is the CSS file in the right location?

**Example Fix:**
```jsx
// ❌ Wrong - Using 'class'
<button class="btn">Click</button>

// ✅ Correct - Using 'className'
<button className="btn">Click</button>
```

---

### 7. **Component Not Updating**

**Problem:** Changes in code don't show in browser

**Solutions:**
1. **Hard refresh browser:** `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Restart dev server:** Stop terminal (Ctrl + C) and run `npm run dev` again
3. **Clear browser cache**
4. **Check console for errors:** Open DevTools (F12)

---

### 8. **Import/Export Errors**

**Problem:** "Module not found" or "default export not found"

**Common Issues:**

```jsx
// ❌ Wrong - Incorrect path
import Button from "./Button"  // Missing .jsx

// ✅ Correct
import Button from "./Button.jsx"
// OR (works if config allows)
import Button from "./Button"

// ❌ Wrong - Named import for default export
import { Button } from "./Button"

// ✅ Correct - Default import
import Button from "./Button"
```

---

### 9. **JSX Syntax Errors**

**Common JSX Mistakes:**

```jsx
// ❌ Wrong - Adjacent JSX elements
function App() {
    return (
        <header>Header</header>
        <main>Main</main>
    )
}

// ✅ Correct - Wrapped in Fragment
function App() {
    return (
        <>
            <header>Header</header>
            <main>Main</main>
        </>
    )
}

// ❌ Wrong - Self-closing tag not closed
<img src="logo.png">

// ✅ Correct
<img src="logo.png" />
```

---

### 10. **Props Not Passing Through**

**Problem:** Parent passes prop but child doesn't receive it

**Debug Steps:**
```jsx
// In child component, log props
function Button(props) {
    console.log("Received props:", props)  // Check what's received
    return <button>{props.text}</button>
}

// In parent component
<Button text="Click Me" />  // Make sure you're passing it
```

---

## 🐛 Debugging Tips

### 1. **Use Console Logs**
```jsx
function Card({ title, children }) {
    console.log("Card received:", { title, children })
    return <div>...</div>
}
```

### 2. **Use React DevTools**
- Install React DevTools browser extension
- Inspect component props in real-time
- View component hierarchy

### 3. **Check Browser Console**
- Press F12 to open DevTools
- Look for red error messages
- Read error messages carefully

### 4. **Simplify and Test**
```jsx
// Start with minimal version
function Button({ text }) {
    return <button>TEST</button>  // Hardcode first
}

// Then add props
function Button({ text }) {
    return <button>{text}</button>  // Add prop after testing
}
```

---

## ✅ Pre-Flight Checklist

Before running the app, verify:

- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] All components exported with `export default`
- [ ] All components imported correctly
- [ ] JSX elements properly closed
- [ ] Using `className` instead of `class`
- [ ] Props destructured or accessed via `props.`
- [ ] Keys added to mapped elements
- [ ] CSS file imported in `index.jsx`

---

## 🆘 Still Having Issues?

### Step-by-step debugging:

1. **Test AppTest.jsx first**
   - Change `index.jsx` to import `AppTest`
   - This tests each component individually

2. **Comment out components**
   - Start with one component
   - Add others one at a time
   - Find which causes the issue

3. **Check file structure**
   ```
   components/
       Button.jsx  ← Make sure it's here
       Card.jsx
       ...
   App.jsx
   index.jsx
   ```

4. **Verify imports match exports**
   ```jsx
   // In Button.jsx
   export default function Button() { }
   
   // In App.jsx
   import Button from "./components/Button"  // Match the path
   ```

---

## 📚 Common Error Messages Decoded

| Error Message | Meaning | Solution |
|--------------|---------|----------|
| `Element type is invalid` | Wrong import/export | Check import/export syntax |
| `Cannot read property of undefined` | Accessing undefined prop | Add default value or check |
| `Each child should have key` | Missing key in map | Add `key` prop |
| `Adjacent JSX elements` | Multiple root elements | Wrap in `<>...</>` |
| `className is not defined` | Used `class` instead | Use `className` |
| `Module not found` | Wrong file path | Check import path |

---

## 💡 Pro Tips

✅ **Always check browser console first**  
✅ **Read error messages completely**  
✅ **Use console.log liberally when debugging**  
✅ **Test components in isolation**  
✅ **Start simple, add complexity gradually**  
✅ **Use React DevTools extension**  

---

## 🎯 Quick Fixes

```bash
# Fix 90% of issues:
npm install          # Install dependencies
# Restart dev server (Ctrl + C, then:)
npm run dev         # Start fresh
# Hard refresh browser (Ctrl + Shift + R)
```

---

**Remember: Every React developer encounters these issues. Debugging is part of learning! 🚀**
