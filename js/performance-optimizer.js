// performance-optimizer.js
class PerformanceOptimizer {
  constructor() {
    this.initializeOptimizations();
  }

  initializeOptimizations() {
    // 1. Preload critical resources
    this.preloadResources();

    // 2. Implement lazy loading
    this.setupLazyLoading();

    // 3. Setup request debouncing
    this.setupDebouncing();

    // 4. Enable local storage caching
    this.setupLocalCache();
  }

  // Preload critical resources
  preloadResources() {
    // Preload fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.as = "font";
    fontLink.href =
      "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2";
    fontLink.crossOrigin = "anonymous";
    document.head.appendChild(fontLink);

    // Preconnect to Google APIs
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://script.google.com";
    document.head.appendChild(preconnect);
  }

  // Setup lazy loading for images and components
  setupLazyLoading() {
    // Lazy load images
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Debounce search and API calls
  setupDebouncing() {
    window.debounce = function (func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
  }

  // Local storage caching
  setupLocalCache() {
    window.LocalCache = {
      set: (key, data, expiryMinutes = 10) => {
        const item = {
          data: data,
          expiry: Date.now() + expiryMinutes * 60 * 1000,
        };
        localStorage.setItem(key, JSON.stringify(item));
      },

      get: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.data;
      },

      clear: () => {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith("cache_")) {
            localStorage.removeItem(key);
          }
        });
      },
    };
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  new PerformanceOptimizer();
});
