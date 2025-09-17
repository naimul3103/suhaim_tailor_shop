(function () {
  "use strict";

  const API_URL = (() => {
    const encoded =
      "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4ZTA4YXVPMTllQU5ucGJHZVJMeVdzanlTX2NLdFdUVmZLR2FVVXBodEM4Q2s1STJGUDhCb2lkbHRKQ01mdl9ZTWsvZXhlYw==";
    return atob(encoded);
  })();

  // Simple memory cache (no complex operations)
  const cache = new Map();
  const CACHE_TIME = 2 * 60 * 1000; // 2 minutes only

  // Quick cache check
  function getCached(key) {
    const item = cache.get(key);
    if (item && Date.now() - item.time < CACHE_TIME) {
      console.log("Using cached data for:", key);
      return item.data;
    }
    cache.delete(key); // Remove expired
    return null;
  }

  // Quick cache save
  function setCached(key, data) {
    cache.set(key, { data, time: Date.now() });

    // Limit cache size to prevent memory issues
    if (cache.size > 20) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }

  // Main fetch function - SIMPLIFIED
  async function fetchFromAPI(params = {}) {
    // Build URL
    const url = new URL(API_URL);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    const urlString = url.toString();

    // Check cache
    const cached = getCached(urlString);
    if (cached) return cached;

    try {
      // Try direct fetch first (fastest)
      const response = await fetch(urlString, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCached(urlString, data);
        return data;
      }
    } catch (error) {
      console.log("Direct fetch failed, using JSONP fallback");
    }

    // JSONP fallback for CORS issues
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Request timeout"));
      }, 15000); // 15 second timeout

      const callbackName = "cb" + Date.now();

      window[callbackName] = function (data) {
        clearTimeout(timeout);
        delete window[callbackName];
        document.body.removeChild(script);
        setCached(urlString, data);
        resolve(data);
      };

      const script = document.createElement("script");
      script.onerror = function () {
        clearTimeout(timeout);
        delete window[callbackName];
        document.body.removeChild(script);
        reject(new Error("Failed to load data"));
      };

      const separator = urlString.includes("?") ? "&" : "?";
      script.src = `${urlString}${separator}callback=${callbackName}`;
      document.body.appendChild(script);
    });
  }

  // POST request - SIMPLIFIED
  async function postToAPI(data) {
    try {
      // Simple validation
      if (!data.customerName || !data.phoneNumber) {
        throw new Error("Missing required fields");
      }

      // Add timestamp
      data.timestamp = new Date().toISOString();

      // Send request (no-cors mode for Google Apps Script)
      await fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain", // Changed from application/json
        },
        body: JSON.stringify(data),
      });

      // Clear cache after save
      cache.clear();

      return { status: "success" };
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    }
  }

  // Public API functions - SIMPLIFIED

  window.saveToGoogleSheets = async function (data) {
    console.log("Saving order...");
    return await postToAPI(data);
  };

  window.searchCustomer = async function (phone) {
    console.log("Searching customer:", phone);
    try {
      return await fetchFromAPI({
        action: "searchCustomer",
        phone: phone,
      });
    } catch (error) {
      console.error("Search error:", error);
      return {
        status: "error",
        customer: null,
        orders: [],
        message: "Could not search customer",
      };
    }
  };

  window.getOrderByReceiptId = async function (receiptId) {
    try {
      return await fetchFromAPI({
        action: "getOrder",
        receiptId: receiptId,
      });
    } catch (error) {
      console.error("Get order error:", error);
      return {
        status: "error",
        message: "Could not fetch order",
      };
    }
  };

  window.updateOrderStatus = async function (receiptId, status) {
    try {
      // Ensure required payload
      const payload = {
        action: "updateStatus",
        receiptId: receiptId,
        status: status,
        customerName: currentUpdateOrder?.customerName || "Unknown",
        phoneNumber: currentUpdateOrder?.phoneNumber || "N/A",
        timestamp: new Date().toISOString(),
      };

      await postToAPI(payload);
      cache.clear();

      // Update the status badge in the table instantly
      const row = document
        .querySelector(`button.action-btn-update[onclick*="${receiptId}"]`)
        ?.closest("tr");

      if (row) {
        const badge = row.querySelector(".order-status-badge");
        if (badge) {
          badge.textContent = status;
          badge.className = "order-status-badge " + getStatusClass(status);
        }
      }

      return { status: "success" };
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  window.getAllOrders = async function () {
    try {
      return await fetchFromAPI({
        action: "getAllOrders",
      });
    } catch (error) {
      console.error("Get all orders error:", error);
      return {
        status: "error",
        orders: [],
        message: "Could not fetch orders",
      };
    }
  };

  window.getOrderStatistics = async function () {
    try {
      return await fetchFromAPI({
        action: "getStatistics",
      });
    } catch (error) {
      console.error("Statistics error:", error);
      return {
        status: "error",
        statistics: {},
        message: "Could not fetch statistics",
      };
    }
  };

  window.trackOrder = async function (id) {
    try {
      return await fetchFromAPI({
        action: "trackOrder",
        id: id,
      });
    } catch (error) {
      console.error("Track order error:", error);
      return {
        status: "error",
        message: "Could not track order",
      };
    }
  };

  // Clear cache function
  window.clearAPICache = function () {
    cache.clear();
    console.log("API cache cleared");
  };

  // Handle Google's JSONP response
  window.handleGoogleResponse = function (data) {
    console.log("Google Apps Script response received");
    return data;
  };
})();
