/**
 * API Service for Portfolio Data
 * Handles API requests with timeout, error handling, and caching
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10);

// Cache storage
const cache = new Map();
// Shorter cache for development - change to 5 * 60 * 1000 for production
const CACHE_DURATION = 30 * 1000; // 30 seconds (was 5 minutes)

/**
 * Create a fetch request with timeout
 */
async function fetchWithTimeout(url, options = {}, timeout = API_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

/**
 * Check if cached data is still valid
 */
function isCacheValid(key) {
  const cached = cache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < CACHE_DURATION;
}

/**
 * Get cached data
 */
function getCached(key) {
  if (isCacheValid(key)) {
    return cache.get(key).data;
  }
  cache.delete(key);
  return null;
}

/**
 * Set cached data
 */
function setCached(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Clear cache for a specific endpoint
 */
export function clearCache(endpoint) {
  const keysToDelete = [];
  for (const key of cache.keys()) {
    if (key.startsWith(endpoint)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(key => cache.delete(key));
}

/**
 * Clear all cache
 */
export function clearAllCache() {
  cache.clear();
}

/**
 * Make API request with caching and error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;

  // Check cache first
  const cached = getCached(cacheKey);
  if (cached && !options.skipCache) {
    return cached;
  }

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache successful responses
    if (options.method === 'GET' || !options.method) {
      setCached(cacheKey, data);
    }

    return data;
  } catch (error) {
    // If we have cached data, return it even if expired
    if (cached) {
      console.warn(`API request failed, using stale cache: ${error.message}`);
      return cached;
    }
    throw error;
  }
}

/**
 * API methods
 */
export const api = {
  // Projects
  getProjects: () => apiRequest('/api/projects'),
  getProject: (id) => apiRequest(`/api/projects/${id}`),
  createProject: (data) => {
    clearCache('/api/projects');
    return apiRequest('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateProject: (id, data) => {
    clearCache('/api/projects');
    return apiRequest(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteProject: (id) => {
    clearCache('/api/projects');
    return apiRequest(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Skills
  getSkills: () => apiRequest('/api/skills'),
  getSkill: (id) => apiRequest(`/api/skills/${id}`),
  createSkill: (data) => {
    clearCache('/api/skills');
    return apiRequest('/api/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateSkill: (id, data) => {
    clearCache('/api/skills');
    return apiRequest(`/api/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteSkill: (id) => {
    clearCache('/api/skills');
    return apiRequest(`/api/skills/${id}`, {
      method: 'DELETE',
    });
  },

  // About
  getAbout: () => apiRequest('/api/about'),
  updateAbout: (data) => {
    clearCache('/api/about');
    return apiRequest('/api/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Hero
  getHero: () => apiRequest('/api/hero'),
  updateHero: (data) => {
    clearCache('/api/hero');
    return apiRequest('/api/hero', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Contact
  getContact: () => apiRequest('/api/contact'),
  updateContact: (data) => {
    clearCache('/api/contact');
    return apiRequest('/api/contact', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  sendContactMessage: (data) => apiRequest('/api/contact/message', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Blog
  getBlogPosts: () => apiRequest('/api/blog'),
  getBlogPost: (id) => apiRequest(`/api/blog/${id}`),
  createBlogPost: (data) => apiRequest('/api/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateBlogPost: (id, data) => apiRequest(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteBlogPost: (id) => apiRequest(`/api/blog/${id}`, {
    method: 'DELETE',
  }),

  // Health check
  healthCheck: () => apiRequest('/api/health'),
};

export default api;

