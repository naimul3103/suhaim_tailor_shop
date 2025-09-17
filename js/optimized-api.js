// optimized-api.js - Batched and optimized API calls
class OptimizedAPI {
  constructor() {
    this.pendingRequests = new Map();
    this.batchTimer = null;
    this.BATCH_DELAY = 50; // ms
  }

  // Batch multiple requests
  async batchRequest(action, params) {
    const key = `${action}_${JSON.stringify(params)}`;

    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    // Create promise for this request
    const promise = new Promise((resolve, reject) => {
      // Add to batch
      this.addToBatch({ action, params, resolve, reject, key });
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  addToBatch(request) {
    // Clear existing timer
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }

    // Set new timer to process batch
    this.batchTimer = setTimeout(() => {
      this.processBatch();
    }, this.BATCH_DELAY);
  }

  async processBatch() {
    const requests = Array.from(this.pendingRequests.values());
    this.pendingRequests.clear();

    // Process all requests in parallel
    await Promise.all(requests);
  }
}

// Singleton instance
const OptimizedAPIInstance = new OptimizedAPI();
