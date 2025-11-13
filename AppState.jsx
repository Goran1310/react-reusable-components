import React, { useState, useReducer, createContext, useContext } from "react"
import Navbar from "./components/Navbar"

// ============================================
// 1. CONTEXT API - Theme Context
// ============================================
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")
  
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using theme
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

// ============================================
// 2. useReducer - Shopping Cart
// ============================================
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
    
    case "CLEAR_CART":
      return { items: [] }
    
    default:
      return state
  }
}

// ============================================
// 3. Custom Hook - useLocalStorage
// ============================================
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue]
}

// ============================================
// 4. Custom Hook - useToggle
// ============================================
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = () => setValue(prev => !prev)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  
  return [value, { toggle, setTrue, setFalse }]
}

// ============================================
// 5. State Lifting - Temperature Converter
// ============================================
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
  }
  
  return (
    <div className="form-group">
      <label>Temperature in {scaleNames[scale]}</label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        className="form-control"
        placeholder={`Enter ${scaleNames[scale]}`}
      />
    </div>
  )
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <div className="alert alert-success">The water would boil! 💧➡️💨</div>
  }
  return <div className="alert alert-info">The water would not boil. ❄️</div>
}

function TemperatureCalculator() {
  const [temperature, setTemperature] = useState("")
  const [scale, setScale] = useState("c")
  
  const toCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9
  }
  
  const toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32
  }
  
  const tryConvert = (temperature, convert) => {
    const input = parseFloat(temperature)
    if (Number.isNaN(input)) {
      return ""
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
  }
  
  const handleCelsiusChange = (temp) => {
    setScale("c")
    setTemperature(temp)
  }
  
  const handleFahrenheitChange = (temp) => {
    setScale("f")
    setTemperature(temp)
  }
  
  const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature
  const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature
  
  return (
    <div className="card">
      <h3>🌡️ State Lifting Example</h3>
      <p className="text-secondary">State is lifted to parent to synchronize two inputs</p>
      
      <TemperatureInput
        scale="c"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      
      {celsius && <BoilingVerdict celsius={parseFloat(celsius)} />}
    </div>
  )
}

// ============================================
// Shopping Cart Component (useReducer)
// ============================================
function ShoppingCart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })
  
  const products = [
    { id: 1, name: "React Book", price: 29.99 },
    { id: 2, name: "JavaScript Course", price: 49.99 },
    { id: 3, name: "VS Code Theme", price: 9.99 },
    { id: 4, name: "Keyboard", price: 89.99 }
  ]
  
  const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  return (
    <div className="card">
      <h3>🛒 useReducer Example</h3>
      <p className="text-secondary">Complex state management with reducer pattern</p>
      
      <div style={{ marginBottom: "20px" }}>
        <h4>Products</h4>
        <div style={{ display: "grid", gap: "10px" }}>
          {products.map(product => (
            <div key={product.id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              background: "#2a2f3a",
              borderRadius: "6px"
            }}>
              <div>
                <strong>{product.name}</strong>
                <div className="text-secondary">${product.price}</div>
              </div>
              <button
                onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
                className="btn btn-primary"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h4>Cart ({cart.items.length} items)</h4>
          {cart.items.length > 0 && (
            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="btn btn-danger"
            >
              Clear Cart
            </button>
          )}
        </div>
        
        {cart.items.length === 0 ? (
          <div className="alert alert-info">Cart is empty</div>
        ) : (
          <>
            <div style={{ display: "grid", gap: "10px", marginBottom: "15px" }}>
              {cart.items.map(item => (
                <div key={item.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: "#2a2f3a",
                  borderRadius: "6px"
                }}>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="text-secondary">${item.price} × {item.quantity}</div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                      onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
                      className="btn btn-sm"
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span style={{ minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
                      className="btn btn-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                      className="btn btn-danger btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              padding: "15px",
              background: "#1e2229",
              borderRadius: "6px",
              textAlign: "right"
            }}>
              <strong style={{ fontSize: "1.2em" }}>Total: ${total.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================
// Custom Hooks Demo
// ============================================
function CustomHooksDemo() {
  const [name, setName] = useLocalStorage("userName", "")
  const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false)
  
  return (
    <div className="card">
      <h3>🎣 Custom Hooks Examples</h3>
      <p className="text-secondary">Reusable logic with custom hooks</p>
      
      <div className="form-group">
        <label>useLocalStorage Hook</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (saved to localStorage)"
          className="form-control"
        />
        {name && <div className="alert alert-success" style={{ marginTop: "10px" }}>
          Saved: {name} (Refresh page - it persists!)
        </div>}
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>useToggle Hook</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button onClick={toggle} className="btn btn-primary">Toggle</button>
          <button onClick={setTrue} className="btn btn-success">Show</button>
          <button onClick={setFalse} className="btn btn-danger">Hide</button>
        </div>
        
        {isVisible && (
          <div className="alert alert-info">
            ✅ Content is visible! (State: {isVisible.toString()})
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Theme Demo (Context API)
// ============================================
function ThemedComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div className="card" style={{
      background: theme === "light" ? "#f8f9fa" : "#21222a",
      color: theme === "light" ? "#212529" : "#f8f9fa",
      transition: "all 0.3s ease"
    }}>
      <h3>🎨 Context API Example</h3>
      <p className="text-secondary">Global theme state with Context API</p>
      
      <div style={{ marginTop: "15px" }}>
        <p>Current Theme: <strong>{theme}</strong></p>
        <button onClick={toggleTheme} className="btn btn-primary">
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
      
      <div className="alert alert-info" style={{ marginTop: "15px" }}>
        💡 This theme is provided via Context API and accessible anywhere in the component tree!
      </div>
    </div>
  )
}

// ============================================
// Main App Component
// ============================================
export default function AppState() {
  const [activeTab, setActiveTab] = useState("reducer")
  
  const tabs = [
    { id: "reducer", label: "useReducer", icon: "🛒" },
    { id: "context", label: "Context API", icon: "🎨" },
    { id: "custom", label: "Custom Hooks", icon: "🎣" },
    { id: "lifting", label: "State Lifting", icon: "🌡️" }
  ]
  
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        
        <div className="container">
          <div className="header">
            <h1>State Management Patterns</h1>
            <p className="subtitle">Master React state management techniques</p>
          </div>
          
          {/* Tabs */}
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "reducer" && <ShoppingCart />}
            {activeTab === "context" && <ThemedComponent />}
            {activeTab === "custom" && <CustomHooksDemo />}
            {activeTab === "lifting" && <TemperatureCalculator />}
          </div>
          
          {/* Code Examples */}
          <div className="card" style={{ marginTop: "30px" }}>
            <h3>📚 Key Concepts</h3>
            
            {activeTab === "reducer" && (
              <div>
                <h4>useReducer Pattern</h4>
                <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`const [state, dispatch] = useReducer(reducer, initialState)

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    default:
      return state
  }
}

// Dispatch actions
dispatch({ type: 'ADD_ITEM', payload: item })`}
                </pre>
                <p className="text-secondary" style={{ marginTop: "10px" }}>
                  Use useReducer when you have complex state logic with multiple sub-values or when the next state depends on the previous one.
                </p>
              </div>
            )}
            
            {activeTab === "context" && (
              <div>
                <h4>Context API Pattern</h4>
                <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`// Create Context
const ThemeContext = createContext()

// Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom Hook
function useTheme() {
  return useContext(ThemeContext)
}

// Usage
const { theme, setTheme } = useTheme()`}
                </pre>
                <p className="text-secondary" style={{ marginTop: "10px" }}>
                  Use Context API to pass data through the component tree without having to pass props down manually at every level.
                </p>
              </div>
            )}
            
            {activeTab === "custom" && (
              <div>
                <h4>Custom Hooks Pattern</h4>
                <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`// Custom Hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })
  
  const setStoredValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  
  return [value, setStoredValue]
}

// Usage
const [name, setName] = useLocalStorage('name', '')`}
                </pre>
                <p className="text-secondary" style={{ marginTop: "10px" }}>
                  Custom hooks let you extract component logic into reusable functions. Start with "use" prefix.
                </p>
              </div>
            )}
            
            {activeTab === "lifting" && (
              <div>
                <h4>State Lifting Pattern</h4>
                <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`// Parent Component (lifted state)
function Parent() {
  const [value, setValue] = useState('')
  
  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} onChange={setValue} />
    </>
  )
}

// Child Components share the same state
function ChildA({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}`}
                </pre>
                <p className="text-secondary" style={{ marginTop: "10px" }}>
                  Lift state up to the closest common ancestor when multiple components need to share the same changing data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
