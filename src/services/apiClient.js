/**
 * Centralized API Client
 * Configured with base URL from environment variable VITE_API_BASE_URL.
 * Supports token injection, structured error handling, timeouts, and cold-start tolerance.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('tmt_admin_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('tmt_admin_token', token);
    } else {
      localStorage.removeItem('tmt_admin_token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('tmt_admin_token');
  }

  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 15000);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // Handle HTTP error responses
      if (!response.ok) {
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errorJson = await response.json();
          if (errorJson.message) {
            errorMessage = errorJson.message;
          } else if (errorJson.errors && Array.isArray(errorJson.errors)) {
            errorMessage = errorJson.errors.join(', ');
          }
        } catch {
          // Response body wasn't JSON
        }

        const err = new Error(errorMessage);
        err.status = response.status;
        throw err;
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection and try again.');
      }
      throw err;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
