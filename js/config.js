// Secure Configuration Manager
const AppConfig = (function () {
  "use strict";

  // Encrypted configuration
  const encryptedConfig = {
    // These will be replaced with environment variables on Netlify
    apiEndpoint: "NETLIFY_API_ENDPOINT",
    apiKey: "NETLIFY_API_KEY",
    spreadsheetId: "NETLIFY_SPREADSHEET_ID",
  };

  // Simple obfuscation for client-side (not true encryption)
  const obfuscate = (str) => btoa(str).split("").reverse().join("");
  const deobfuscate = (str) => atob(str.split("").reverse().join(""));

  // Runtime configuration
  const getRuntimeConfig = () => {
    // In production, these will be replaced by Netlify
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      // Development config (still obfuscated)
      return {
        apiEndpoint: deobfuscate("==QbvNmLn5Wa0VGZ"),
        apiKey: "dev-key",
        spreadsheetId: "dev-sheet",
      };
    }

    // Production config from Netlify environment
    return {
      apiEndpoint: window.NETLIFY_API_ENDPOINT || encryptedConfig.apiEndpoint,
      apiKey: window.NETLIFY_API_KEY || encryptedConfig.apiKey,
      spreadsheetId:
        window.NETLIFY_SPREADSHEET_ID || encryptedConfig.spreadsheetId,
    };
  };

  return {
    get: (key) => {
      const config = getRuntimeConfig();
      return config[key] || null;
    },
    isProduction: () =>
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1",
  };
})();
