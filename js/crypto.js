// Crypto utilities for client-side encryption
// This provides basic obfuscation, not military-grade encryption

(function () {
  "use strict";

  // Simple encryption/decryption for client-side storage
  class CryptoUtil {
    constructor() {
      // Generate a unique key based on browser fingerprint
      this.key = this.generateBrowserKey();
    }

    // Generate browser-specific key
    generateBrowserKey() {
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset(),
        screen.width + "x" + screen.height,
        navigator.hardwareConcurrency || 0,
      ].join("|");

      return this.hashCode(fingerprint).toString(36);
    }

    // Simple hash function
    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    }

    // Encode data
    encode(data) {
      try {
        const jsonStr = JSON.stringify(data);
        const encoded = btoa(unescape(encodeURIComponent(jsonStr)));

        // Simple XOR obfuscation
        let obfuscated = "";
        for (let i = 0; i < encoded.length; i++) {
          const charCode =
            encoded.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
          obfuscated += String.fromCharCode(charCode);
        }

        return btoa(obfuscated);
      } catch (error) {
        console.error("Encoding error:", error);
        return null;
      }
    }

    // Decode data
    decode(encodedData) {
      try {
        const obfuscated = atob(encodedData);

        // Reverse XOR obfuscation
        let decoded = "";
        for (let i = 0; i < obfuscated.length; i++) {
          const charCode =
            obfuscated.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
          decoded += String.fromCharCode(charCode);
        }

        const jsonStr = decodeURIComponent(escape(atob(decoded)));
        return JSON.parse(jsonStr);
      } catch (error) {
        console.error("Decoding error:", error);
        return null;
      }
    }

    // Generate secure random token
    generateToken(length = 32) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let token = "";
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);

      for (let i = 0; i < length; i++) {
        token += chars[array[i] % chars.length];
      }

      return token;
    }

    // Hash password (client-side, for comparison)
    async hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password + this.key);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  }

  // Export
  window.CryptoUtil = new CryptoUtil();
})();
