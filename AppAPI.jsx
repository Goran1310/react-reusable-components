import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

/**
 * 🌐 API Integration & Data Fetching Demo
 * 
 * Demonstrates:
 * ✅ Fetch API with loading/error states
 * ✅ useEffect cleanup patterns
 * ✅ Async data handling
 * ✅ Pagination
 * ✅ Infinite scroll
 * ✅ Search with debouncing
 */

export default function AppAPI() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <>
      <Navbar />
      <div style={styles.container}>
      <h1 style={styles.title}>🌐 API Integration & Data Fetching</h1>
      <p style={styles.subtitle}>
        Real-world patterns for fetching and managing data
      </p>

      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button
          style={activeTab === "basic" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("basic")}
        >
          Basic Fetch
        </button>
        <button
          style={activeTab === "pagination" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("pagination")}
        >
          Pagination
        </button>
        <button
          style={activeTab === "infinite" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("infinite")}
        >
          Infinite Scroll
        </button>
        <button
          style={activeTab === "search" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("search")}
        >
          Debounced Search
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.content}>
        {activeTab === "basic" && <BasicFetch />}
        {activeTab === "pagination" && <PaginatedPosts />}
        {activeTab === "infinite" && <InfiniteScroll />}
        {activeTab === "search" && <DebouncedSearch />}
      </div>

      {/* Info Panel */}
      <div style={styles.infoPanel}>
        <h3>💡 What You're Learning:</h3>
        <ul style={{ textAlign: "left", lineHeight: "1.8" }}>
          <li><strong>Loading States</strong> - Show feedback while data loads</li>
          <li><strong>Error Handling</strong> - Gracefully handle network failures</li>
          <li><strong>Cleanup Patterns</strong> - Prevent memory leaks</li>
          <li><strong>Pagination</strong> - Load data in chunks</li>
          <li><strong>Infinite Scroll</strong> - Load more as user scrolls</li>
          <li><strong>Debouncing</strong> - Optimize search performance</li>
        </ul>
        <p style={{ fontSize: "0.9rem", color: "#adb5bd", marginTop: "1rem" }}>
          Using JSONPlaceholder API - a free REST API for testing
        </p>
      </div>
    </div>
    </>
  );
}

// ===================================
// 1. Basic Fetch with Loading & Error
// ===================================
function BasicFetch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Cleanup pattern

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
        
        if (!res.ok) throw new Error("Network response was not ok");
        
        const data = await res.json();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div style={styles.centerContent}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: "1rem" }}>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorBox}>
        <h3>❌ Error</h3>
        <p>{error}</p>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 style={styles.sectionTitle}>📝 Recent Posts ({posts.length})</h2>
      <div style={styles.postList}>
        {posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postId}>#{post.id}</div>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>
      <div style={styles.codeInfo}>
        <strong>✅ Patterns Used:</strong>
        <ul>
          <li>async/await for cleaner code</li>
          <li>isMounted flag prevents memory leaks</li>
          <li>Loading and error states for better UX</li>
          <li>useEffect cleanup function</li>
        </ul>
      </div>
    </div>
  );
}

// ===================================
// 2. Pagination
// ===================================
function PaginatedPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages] = useState(10); // JSONPlaceholder has ~100 posts
  const postsPerPage = 10;

  useEffect(() => {
    let isMounted = true;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`
        );
        const data = await res.json();
        
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPage();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div>
      <div style={styles.paginationHeader}>
        <h2 style={styles.sectionTitle}>📄 Page {page} of {totalPages}</h2>
        <div style={styles.paginationControls}>
          <button
            style={page === 1 ? styles.buttonDisabled : styles.buttonSmall}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Previous
          </button>
          <span style={styles.pageIndicator}>Page {page}</span>
          <button
            style={page === totalPages ? styles.buttonDisabled : styles.buttonSmall}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      </div>

      {loading ? (
        <div style={styles.centerContent}>
          <div style={styles.spinner}></div>
        </div>
      ) : (
        <div style={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <div style={styles.postId}>#{post.id}</div>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postBody}>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.codeInfo}>
        <strong>✅ Pagination Pattern:</strong>
        <ul>
          <li>Track current page in state</li>
          <li>Fetch new data when page changes</li>
          <li>Use _page and _limit query params</li>
          <li>Disable buttons at boundaries</li>
        </ul>
      </div>
    </div>
  );
}

// ===================================
// 3. Infinite Scroll
// ===================================
function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch more posts
  const fetchMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
        setPage((p) => p + 1);
      }
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMore();
  }, []);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div>
      <h2 style={styles.sectionTitle}>♾️ Infinite Scroll ({posts.length} posts loaded)</h2>
      <p style={styles.hint}>👇 Scroll down to load more posts automatically</p>

      <div style={styles.postList}>
        {posts.map((post, index) => (
          <div key={`${post.id}-${index}`} style={styles.postCard}>
            <div style={styles.postId}>#{post.id}</div>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>

      {loading && (
        <div style={styles.centerContent}>
          <div style={styles.spinner}></div>
          <p>Loading more posts...</p>
        </div>
      )}

      {!hasMore && (
        <div style={styles.endMessage}>
          <p>🎉 You've reached the end!</p>
        </div>
      )}

      <div style={styles.codeInfo}>
        <strong>✅ Infinite Scroll Pattern:</strong>
        <ul>
          <li>Detect when user nears bottom of page</li>
          <li>Fetch next page and append to existing list</li>
          <li>Use scroll event listener with cleanup</li>
          <li>Track hasMore to stop fetching</li>
        </ul>
      </div>
    </div>
  );
}

// ===================================
// 4. Debounced Search
// ===================================
function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait 500ms after user stops typing

    return () => {
      clearTimeout(handler); // Cancel timeout on every keystroke
    };
  }, [query]);

  // Fetch when debounced query changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    let isMounted = true;

    const searchPosts = async () => {
      try {
        setLoading(true);
        setSearchCount((c) => c + 1);
        
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${debouncedQuery}`
        );
        const data = await res.json();

        if (isMounted) {
          setResults(data.slice(0, 20)); // Limit to 20 results
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    searchPosts();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  return (
    <div>
      <h2 style={styles.sectionTitle}>🔍 Search Posts with Debouncing</h2>
      
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Type to search posts... (try 'sunt' or 'qui')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.searchStats}>
          {loading && <span>🔄 Searching...</span>}
          {!loading && debouncedQuery && (
            <span>
              Found {results.length} results • API calls: {searchCount}
            </span>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div style={styles.postList}>
          {results.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <div style={styles.postId}>#{post.id}</div>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postBody}>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && debouncedQuery && results.length === 0 && (
        <div style={styles.noResults}>
          <p>No results found for "{debouncedQuery}"</p>
          <p style={{ fontSize: "0.9rem", color: "#adb5bd" }}>
            Try searching for common words like "sunt", "qui", or "et"
          </p>
        </div>
      )}

      <div style={styles.codeInfo}>
        <strong>✅ Debouncing Pattern:</strong>
        <ul>
          <li>Wait 500ms after user stops typing</li>
          <li>Prevents excessive API calls</li>
          <li>Cancel previous timeout on each keystroke</li>
          <li>Much better performance and UX</li>
        </ul>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          💡 Without debouncing, each keystroke = 1 API call. With debouncing, you only search once!
        </p>
      </div>
    </div>
  );
}

// ===================================
// Styles
// ===================================
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#f8f9fa",
  },
  title: {
    color: "#61DAFB",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    color: "#adb5bd",
    marginBottom: "2rem",
  },
  tabContainer: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tab: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#21222A",
    color: "#f8f9fa",
    border: "2px solid #495057",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  tabActive: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#61DAFB",
    color: "#282D35",
    border: "2px solid #61DAFB",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
  content: {
    backgroundColor: "#21222A",
    padding: "2rem",
    borderRadius: "8px",
    minHeight: "400px",
  },
  sectionTitle: {
    color: "#61DAFB",
    marginTop: 0,
    marginBottom: "1.5rem",
  },
  postList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  postCard: {
    backgroundColor: "#1a1b21",
    padding: "1.5rem",
    borderRadius: "6px",
    border: "1px solid #495057",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  postId: {
    display: "inline-block",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#61DAFB",
    color: "#282D35",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
  },
  postTitle: {
    color: "#f8f9fa",
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    textTransform: "capitalize",
  },
  postBody: {
    color: "#adb5bd",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    margin: 0,
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #495057",
    borderTop: "4px solid #61DAFB",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorBox: {
    backgroundColor: "#3a1e20",
    padding: "2rem",
    borderRadius: "8px",
    border: "2px solid #dc3545",
    textAlign: "center",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  },
  buttonSmall: {
    padding: "0.5rem 1rem",
    backgroundColor: "#61DAFB",
    color: "#282D35",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  buttonDisabled: {
    padding: "0.5rem 1rem",
    backgroundColor: "#495057",
    color: "#adb5bd",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "not-allowed",
    opacity: 0.5,
  },
  paginationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  pageIndicator: {
    color: "#f8f9fa",
    fontWeight: "600",
  },
  searchContainer: {
    marginBottom: "2rem",
  },
  searchInput: {
    width: "100%",
    padding: "1rem",
    fontSize: "1rem",
    backgroundColor: "#1a1b21",
    color: "#f8f9fa",
    border: "2px solid #495057",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  searchStats: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#adb5bd",
  },
  noResults: {
    textAlign: "center",
    padding: "3rem",
    color: "#adb5bd",
  },
  hint: {
    color: "#adb5bd",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  endMessage: {
    textAlign: "center",
    padding: "2rem",
    color: "#61DAFB",
    fontSize: "1.1rem",
  },
  infoPanel: {
    marginTop: "2rem",
    padding: "1.5rem",
    backgroundColor: "#21222A",
    borderRadius: "8px",
    borderLeft: "4px solid #61DAFB",
  },
  codeInfo: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#1a1b21",
    borderRadius: "6px",
    borderLeft: "3px solid #28a745",
    fontSize: "0.9rem",
    lineHeight: "1.6",
  },
};
