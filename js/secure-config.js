// js/secure-config.js
const SecureConfig = (function () {
  // Your encoded URL (from Step 1)
  const encodedUrl =
    "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J4ZTA4YXVPMTllQU5ucGJHZVJMeVdzanlTX2NLdFdUVmZLR2FVVXBodEM4Q2s1STJGUDhCb2lkbHRKQ01mdl9ZTWsvZXhlYw=="; // PUT YOUR ENCODED URL HERE

  // Decode when needed
  function getApiUrl() {
    try {
      return atob(encodedUrl);
    } catch (e) {
      console.error("Failed to decode URL");
      return null;
    }
  }

  return {
    API_URL: getApiUrl(),
  };
})();

window.SecureConfig = SecureConfig;
