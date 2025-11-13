# 🌐 API Integration & Data Fetching Guide

## Overview

This guide covers essential patterns for working with APIs in React applications. You'll learn how to fetch data, handle loading and error states, implement pagination, infinite scroll, and optimize searches with debouncing.

---

## 📋 Table of Contents

1. [Basic Fetch with Loading & Error States](#1-basic-fetch-with-loading--error-states)
2. [useEffect Cleanup Patterns](#2-useeffect-cleanup-patterns)
3. [Async/Await vs Promises](#3-asyncawait-vs-promises)
4. [Pagination](#4-pagination)
5. [Infinite Scroll](#5-infinite-scroll)
6. [Debounced Search](#6-debounced-search)
7. [Best Practices](#7-best-practices)

---

## 1. Basic Fetch with Loading & Error States

### Why This Matters
Users need feedback while data loads. Without proper states, your app feels broken.

### The Three States Pattern
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### Complete Example
```javascript
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setData(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

### Rendering Based on State
```javascript
if (loading) return <Spinner />;
if (error) return <ErrorMessage message={error} />;
return <DataDisplay data={data} />;
```

---

## 2. useEffect Cleanup Patterns

### The Problem: Memory Leaks
If a component unmounts before fetch completes, React throws a warning about setting state on unmounted components.

### The Solution: Cleanup Flag
```javascript
useEffect(() => {
  let isMounted = true; // Track if component is mounted
  
  const fetchData = async () => {
    const data = await fetch('...');
    
    // Only update state if still mounted
    if (isMounted) {
      setData(data);
    }
  };
  
  fetchData();
  
  // Cleanup function runs on unmount
  return () => {
    isMounted = false;
  };
}, []);
```

### Alternative: AbortController
```javascript
useEffect(() => {
  const controller = new AbortController();
  
  fetch('https://api.example.com/data', {
    signal: controller.signal
  })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });
  
  return () => {
    controller.abort(); // Cancel the request
  };
}, []);
```

---

## 3. Async/Await vs Promises

### Promise Chain (Older Style)
```javascript
fetch('https://api.example.com/data')
  .then(res => {
    if (!res.ok) throw new Error('Failed');
    return res.json();
  })
  .then(data => setData(data))
  .catch(err => setError(err.message))
  .finally(() => setLoading(false));
```

### Async/Await (Modern Style) ✅
```javascript
try {
  const res = await fetch('https://api.example.com/data');
  if (!res.ok) throw new Error('Failed');
  const data = await res.json();
  setData(data);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

**Why async/await is better:**
- More readable
- Easier error handling
- Looks like synchronous code
- Better for complex logic

---

## 4. Pagination

### When to Use
- Large datasets (hundreds/thousands of items)
- Server supports pagination
- Need explicit page navigation

### State Management
```javascript
const [page, setPage] = useState(1);
const [data, setData] = useState([]);
const [totalPages, setTotalPages] = useState(0);
```

### Fetch Pattern
```javascript
useEffect(() => {
  const fetchPage = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.example.com/data?page=${page}&limit=10`
    );
    const data = await res.json();
    setData(data.items);
    setTotalPages(data.totalPages);
    setLoading(false);
  };
  
  fetchPage();
}, [page]); // Re-fetch when page changes
```

### Navigation Controls
```javascript
<button 
  disabled={page === 1}
  onClick={() => setPage(p => p - 1)}
>
  Previous
</button>

<span>Page {page} of {totalPages}</span>

<button 
  disabled={page === totalPages}
  onClick={() => setPage(p => p + 1)}
>
  Next
</button>
```

### Common Query Params
- `?page=1` - Page number
- `?limit=10` - Items per page
- `?offset=20` - Skip N items
- `?_page=1&_limit=10` - JSONPlaceholder style

---

## 5. Infinite Scroll

### When to Use
- Social media feeds
- Product catalogs
- News feeds
- Long lists where users scroll frequently

### State Management
```javascript
const [items, setItems] = useState([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);
```

### Fetch More Pattern
```javascript
const fetchMore = async () => {
  if (loading || !hasMore) return;
  
  setLoading(true);
  const res = await fetch(`/api/items?page=${page}&limit=20`);
  const newItems = await res.json();
  
  if (newItems.length === 0) {
    setHasMore(false);
  } else {
    setItems(prev => [...prev, ...newItems]); // Append
    setPage(p => p + 1);
  }
  
  setLoading(false);
};
```

### Scroll Detection
```javascript
useEffect(() => {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    // Near bottom (within 100px)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMore();
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [loading, hasMore]);
```

### Optimization Tips
- Add debouncing to scroll handler
- Use `IntersectionObserver` for better performance
- Show loading indicator at bottom
- Implement "Back to Top" button

---

## 6. Debounced Search

### The Problem
Without debouncing, every keystroke triggers an API call:
```
User types "react"
r     → API call
re    → API call
rea   → API call
reac  → API call
react → API call
= 5 API calls! 💸
```

### The Solution: Debouncing
Wait until user stops typing before searching.

### Implementation
```javascript
const [query, setQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

// Debounce logic
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(query);
  }, 500); // Wait 500ms after last keystroke
  
  return () => {
    clearTimeout(handler); // Cancel previous timeout
  };
}, [query]);

// Search when debounced query changes
useEffect(() => {
  if (!debouncedQuery) return;
  
  const search = async () => {
    const results = await fetch(`/api/search?q=${debouncedQuery}`);
    setResults(await results.json());
  };
  
  search();
}, [debouncedQuery]);
```

### Input Component
```javascript
<input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Search..."
/>
```

### Result
```
User types "react"
react (user stops typing)
       ... 500ms delay ...
       → 1 API call ✅
```

### Custom Hook Version
```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
const debouncedQuery = useDebounce(query, 500);
```

---

## 7. Best Practices

### ✅ DO's

**Always Handle Loading States**
```javascript
if (loading) return <Spinner />;
```

**Always Handle Errors**
```javascript
if (error) return <ErrorMessage />;
```

**Use Cleanup Functions**
```javascript
return () => {
  isMounted = false;
  controller.abort();
};
```

**Debounce User Input**
```javascript
useDebounce(searchQuery, 500);
```

**Show User Feedback**
```javascript
{loading && <p>Loading more...</p>}
{!hasMore && <p>No more items</p>}
```

### ❌ DON'Ts

**Don't Forget Dependencies**
```javascript
// ❌ Bad
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId!

// ✅ Good
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

**Don't Ignore Errors**
```javascript
// ❌ Bad
fetch('/api/data').then(res => res.json());

// ✅ Good
try {
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('Failed');
} catch (err) {
  setError(err.message);
}
```

**Don't Fetch in Render**
```javascript
// ❌ Bad - Infinite loop!
function Component() {
  fetchData(); // Runs every render
  return <div>...</div>;
}

// ✅ Good
useEffect(() => {
  fetchData();
}, []);
```

**Don't Store Derived State**
```javascript
// ❌ Bad
const [data, setData] = useState([]);
const [count, setCount] = useState(0); // Redundant!

// ✅ Good
const [data, setData] = useState([]);
const count = data.length; // Compute it
```

---

## 🎯 Quick Reference

| Pattern | When to Use | Key Hook |
|---------|-------------|----------|
| **Basic Fetch** | Simple data loading | `useEffect` |
| **Cleanup** | Prevent memory leaks | `useEffect` return |
| **Pagination** | Large datasets, explicit navigation | `useState` for page |
| **Infinite Scroll** | Feeds, continuous scrolling | Scroll event |
| **Debouncing** | Search, autocomplete | `setTimeout` + cleanup |

---

## 🚀 Testing Your Knowledge

Try building:

1. **User Directory**
   - Fetch users from API
   - Paginate results (10 per page)
   - Search by name (debounced)

2. **Image Gallery**
   - Load images
   - Infinite scroll
   - Loading placeholders

3. **Product Catalog**
   - Fetch products
   - Filter by category
   - Sort by price
   - Paginated results

---

## 📚 Additional Resources

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free REST API for testing
- [React Query](https://tanstack.com/query/latest) - Advanced data fetching library
- [SWR](https://swr.vercel.app/) - React Hooks for data fetching
- [Axios](https://axios-http.com/) - Promise-based HTTP client

---

**Happy Coding! 🎉**
