import React, { useState, createContext, useContext } from "react"
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, Navigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"

// ============================================
// Auth Context for Protected Routes
// ============================================
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (username) => {
    setIsAuthenticated(true)
    setUser({ username, role: "user" })
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

// ============================================
// Breadcrumbs Component
// ============================================
function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter(x => x)

  return (
    <nav style={{
      padding: "1rem 0",
      fontSize: "0.9rem",
      color: "#adb5bd"
    }}>
      <Link to="/" style={{ color: "#61DAFB", textDecoration: "none" }}>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
        const isLast = index === pathnames.length - 1
        const displayName = name.charAt(0).toUpperCase() + name.slice(1)

        return (
          <span key={routeTo}>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            {isLast ? (
              <span style={{ color: "#f8f9fa" }}>{displayName}</span>
            ) : (
              <Link to={routeTo} style={{ color: "#61DAFB", textDecoration: "none" }}>
                {displayName}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

// ============================================
// Protected Route Component
// ============================================
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
        <h2>🔒 Access Denied</h2>
        <p className="text-secondary" style={{ marginBottom: "1.5rem" }}>
          You need to login to access this page
        </p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    )
  }

  return children
}

// ============================================
// Layout Component
// ============================================
function Layout({ children }) {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div>
      {/* Navigation Menu */}
      <nav style={{
        background: "#21222a",
        padding: "1rem 2rem",
        marginBottom: "2rem",
        borderBottom: "2px solid #282D35"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Link to="/" style={{ color: "#61DAFB", textDecoration: "none", fontWeight: "600", fontSize: "1.1rem" }}>
              🏠 Home
            </Link>
            <Link to="/products" style={{ color: "#f8f9fa", textDecoration: "none" }}>Products</Link>
            <Link to="/blog" style={{ color: "#f8f9fa", textDecoration: "none" }}>Blog</Link>
            <Link to="/dashboard" style={{ color: "#f8f9fa", textDecoration: "none" }}>Dashboard</Link>
            <Link to="/about" style={{ color: "#f8f9fa", textDecoration: "none" }}>About</Link>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <span style={{ color: "#61DAFB" }}>👤 {user.username}</span>
                <button onClick={handleLogout} className="btn btn-danger" style={{ padding: "0.5rem 1rem" }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: "0.5rem 1rem", textDecoration: "none" }}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div style={{ padding: "0 2rem" }}>
        <Breadcrumbs />
        {children}
      </div>
    </div>
  )
}

// ============================================
// Page Components
// ============================================
function HomePage() {
  return (
    <div className="card">
      <h1>🏠 Welcome to React Router Demo</h1>
      <p className="text-secondary" style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        Explore multi-page navigation, dynamic routes, and protected routes
      </p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        <div style={{ padding: "1rem", background: "#2a2f3a", borderRadius: "6px" }}>
          <h3>📄 Features Demonstrated:</h3>
          <ul style={{ lineHeight: "2", color: "#adb5bd" }}>
            <li>✅ Multi-page navigation with React Router</li>
            <li>✅ Dynamic routes with URL parameters</li>
            <li>✅ Protected routes with authentication</li>
            <li>✅ Breadcrumb navigation</li>
            <li>✅ Nested routing</li>
            <li>✅ 404 Not Found page</li>
          </ul>
        </div>

        <div style={{ padding: "1rem", background: "#2a2f3a", borderRadius: "6px" }}>
          <h3>🚀 Quick Links:</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link to="/products" className="btn btn-primary">View Products</Link>
            <Link to="/blog" className="btn btn-primary">Read Blog</Link>
            <Link to="/dashboard" className="btn btn-success">Dashboard (Protected)</Link>
            <Link to="/invalid-route" className="btn btn-danger">Test 404 Page</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsPage() {
  const products = [
    { id: 1, name: "React Handbook", price: 29.99, category: "Books" },
    { id: 2, name: "JavaScript Pro", price: 49.99, category: "Courses" },
    { id: 3, name: "VS Code Theme Pack", price: 9.99, category: "Tools" },
    { id: 4, name: "Mechanical Keyboard", price: 129.99, category: "Hardware" },
    { id: 5, name: "USB-C Hub", price: 39.99, category: "Hardware" }
  ]

  return (
    <div className="card">
      <h1>🛍️ Products</h1>
      <p className="text-secondary">Click on any product to see details</p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              background: "#2a2f3a",
              borderRadius: "6px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#343a46"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2a2f3a"}
          >
            <div>
              <h3 style={{ margin: "0 0 0.5rem 0" }}>{product.name}</h3>
              <span className="badge badge-blue">{product.category}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#61DAFB" }}>
                ${product.price}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#adb5bd" }}>
                View Details →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const products = {
    1: { name: "React Handbook", price: 29.99, category: "Books", description: "Complete guide to React development", inStock: true },
    2: { name: "JavaScript Pro", price: 49.99, category: "Courses", description: "Advanced JavaScript course", inStock: true },
    3: { name: "VS Code Theme Pack", price: 9.99, category: "Tools", description: "Beautiful themes for VS Code", inStock: true },
    4: { name: "Mechanical Keyboard", price: 129.99, category: "Hardware", description: "Premium mechanical keyboard", inStock: false },
    5: { name: "USB-C Hub", price: 39.99, category: "Hardware", description: "7-in-1 USB-C Hub", inStock: true }
  }

  const product = products[id]

  if (!product) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
        <h2>❌ Product Not Found</h2>
        <p className="text-secondary">Product ID {id} does not exist</p>
        <button onClick={() => navigate("/products")} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="card">
      <button onClick={() => navigate("/products")} className="btn btn-secondary" style={{ marginBottom: "1.5rem" }}>
        ← Back to Products
      </button>

      <h1>{product.name}</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2rem" }}>
        <span className="badge badge-blue">{product.category}</span>
        <span className={`badge ${product.inStock ? "badge-green" : "badge-red"}`}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div style={{ fontSize: "2rem", fontWeight: "600", color: "#61DAFB", marginBottom: "1rem" }}>
        ${product.price}
      </div>

      <p className="text-secondary" style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
        {product.description}
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="btn btn-primary" disabled={!product.inStock}>
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
        <button className="btn btn-secondary">Add to Wishlist</button>
      </div>

      <div className="alert alert-info" style={{ marginTop: "2rem" }}>
        💡 This page demonstrates dynamic routing with URL parameters (id: {id})
      </div>
    </div>
  )
}

function BlogPage() {
  const posts = [
    { id: 1, title: "Getting Started with React Router", category: "Tutorial" },
    { id: 2, title: "Understanding React Hooks", category: "Guide" },
    { id: 3, title: "State Management Best Practices", category: "Tips" }
  ]

  return (
    <div className="card">
      <h1>📝 Blog</h1>
      <p className="text-secondary">Explore our latest articles</p>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {posts.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            style={{
              padding: "1.5rem",
              background: "#2a2f3a",
              borderRadius: "6px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#343a46"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2a2f3a"}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{post.title}</h3>
            <span className="badge badge-purple">{post.category}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function BlogPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const posts = {
    1: { title: "Getting Started with React Router", content: "React Router is a powerful library for handling navigation in React applications..." },
    2: { title: "Understanding React Hooks", content: "Hooks revolutionized React development by allowing functional components..." },
    3: { title: "State Management Best Practices", content: "Managing state effectively is crucial for scalable React applications..." }
  }

  const post = posts[id]

  if (!post) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="card">
      <button onClick={() => navigate("/blog")} className="btn btn-secondary" style={{ marginBottom: "1.5rem" }}>
        ← Back to Blog
      </button>
      <h1>{post.title}</h1>
      <p style={{ lineHeight: "1.8", color: "#adb5bd" }}>{post.content}</p>
    </div>
  )
}

function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="card">
      <h1>📊 Dashboard</h1>
      <div className="alert alert-success">
        🎉 Welcome back, {user.username}! This is a protected route.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
        <div style={{ padding: "1.5rem", background: "#2a2f3a", borderRadius: "6px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📈</div>
          <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#61DAFB" }}>125</div>
          <div className="text-secondary">Total Orders</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#2a2f3a", borderRadius: "6px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💰</div>
          <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#28a745" }}>$3,450</div>
          <div className="text-secondary">Revenue</div>
        </div>
        <div style={{ padding: "1.5rem", background: "#2a2f3a", borderRadius: "6px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
          <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#ffc107" }}>48</div>
          <div className="text-secondary">Customers</div>
        </div>
      </div>
    </div>
  )
}

function LoginPage() {
  const [username, setUsername] = useState("")
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      login(username)
      navigate("/dashboard")
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1>🔐 Login</h1>
      <p className="text-secondary">Enter any username to access protected routes</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
        <div className="form-group">
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
          Login
        </button>
      </form>

      <div className="alert alert-info" style={{ marginTop: "2rem" }}>
        💡 This is a demo - any username will work!
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="card">
      <h1>ℹ️ About React Router</h1>
      <div style={{ lineHeight: "1.8", color: "#adb5bd" }}>
        <p>
          React Router is the standard routing library for React applications. It enables navigation
          among different views of various components in a React Application, allows changing the
          browser URL, and keeps the UI in sync with the URL.
        </p>
        <h3 style={{ marginTop: "2rem", color: "#f8f9fa" }}>Key Features:</h3>
        <ul>
          <li>Declarative routing</li>
          <li>Dynamic route matching</li>
          <li>Nested routes</li>
          <li>URL parameters</li>
          <li>Programmatic navigation</li>
        </ul>
      </div>
    </div>
  )
}

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>404</div>
      <h1>Page Not Found</h1>
      <p className="text-secondary" style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
        The page you're looking for doesn't exist.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Go Home
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go Back
        </button>
      </div>
    </div>
  )
}

// ============================================
// Main App Component
// ============================================
function RouterApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <div className="header">
            <h1>React Router & Navigation</h1>
            <p className="subtitle">Multi-page apps with routing, dynamic routes & protected pages</p>
          </div>

          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>

          {/* Documentation */}
          <div className="card" style={{ marginTop: "3rem" }}>
            <h3>📚 Key Concepts</h3>
            
            <div style={{ marginTop: "1.5rem" }}>
              <h4>React Router Basics</h4>
              <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`}
              </pre>

              <h4 style={{ marginTop: "2rem" }}>Dynamic Routes with useParams</h4>
              <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  return <div>Product ID: {id}</div>
}

// Route definition
<Route path="/products/:id" element={<ProductDetail />} />`}
              </pre>

              <h4 style={{ marginTop: "2rem" }}>Protected Routes</h4>
              <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />`}
              </pre>

              <h4 style={{ marginTop: "2rem" }}>Programmatic Navigation</h4>
              <pre style={{ background: "#1e2229", padding: "15px", borderRadius: "6px", overflow: "auto" }}>
{`import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/products')
    // navigate(-1) // Go back
    // navigate('/login', { replace: true }) // Replace history
  }
  
  return <button onClick={handleClick}>Go to Products</button>
}`}
              </pre>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default RouterApp
