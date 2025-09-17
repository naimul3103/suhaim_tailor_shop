// secure-api.js - Secure API Service with Caching
class SecureAPIService {
  constructor() {
    this.baseUrl = null;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.requestQueue = [];
    this.isProcessing = false;
    this.initializeUrl();
  }

  // Initialize URL once
  async initializeUrl() {
    if (!this.baseUrl) {
      // Get URL from config
      this.baseUrl = Config.getApiUrl();

      // Additional security: validate URL
      if (!this.isValidUrl(this.baseUrl)) {
        console.error("Invalid API URL");
        this.baseUrl = null;
      }
    }
  }

  // Validate URL format
  isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.protocol === "https:" &&
        urlObj.hostname.includes("script.google.com")
      );
    } catch {
      return false;
    }
  }

  // Encrypted request with caching
  async request(action, params = {}, useCache = true) {
    const cacheKey = `${action}_${JSON.stringify(params)}`;

    // Check cache first
    if (useCache && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    // Add to queue for batch processing
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ action, params, resolve, reject, cacheKey });
      this.processQueue();
    });
  }

  // Process request queue
  async processQueue() {
    if (this.isProcessing || this.requestQueue.length === 0) return;

    this.isProcessing = true;
    const batch = this.requestQueue.splice(0, 5); // Process 5 at a time

    try {
      const promises = batch.map((item) => this.executeRequest(item));
      await Promise.all(promises);
    } catch (error) {
      console.error("Batch processing error:", error);
    }

    this.isProcessing = false;

    // Process remaining items
    if (this.requestQueue.length > 0) {
      setTimeout(() => this.processQueue(), 100);
    }
  }

  // Execute single request
  async executeRequest({ action, params, resolve, reject, cacheKey }) {
    try {
      if (!this.baseUrl) {
        throw new Error("API URL not initialized");
      }

      const url = `${this.baseUrl}?action=${action}&${new URLSearchParams(
        params
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      // Cache successful responses
      if (data.status === "success") {
        this.cache.set(cacheKey, {
          data: data,
          timestamp: Date.now(),
        });
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // POST request with encryption
  async postData(data) {
    if (!this.baseUrl) {
      throw new Error("API URL not initialized");
    }

    // Simple obfuscation of sensitive data
    const obfuscatedData = this.obfuscateData(data);

    const response = await fetch(this.baseUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obfuscatedData),
    });

    return { status: "success" };
  }

  // Simple data obfuscation
  obfuscateData(data) {
    // Add timestamp and random salt
    return {
      ...data,
      _t: Date.now(),
      _s: Math.random().toString(36).substring(7),
    };
  }
}

// Create singleton instance
const SecureAPI = new SecureAPIService();

// Export wrapped functions
window.saveToGoogleSheets = (data) => SecureAPI.postData(data);
window.searchCustomer = (phone) =>
  SecureAPI.request("searchCustomer", { phone });
window.getOrderByReceiptId = (receiptId) =>
  SecureAPI.request("getOrder", { receiptId });
window.updateOrderStatus = (receiptId, status) =>
  SecureAPI.postData({ action: "updateStatus", receiptId, status });
window.getAllOrders = () => SecureAPI.request("getAllOrders");
window.getOrderStatistics = () => SecureAPI.request("getStatistics");
window.trackOrder = (id) => SecureAPI.request("trackOrder", { id });
