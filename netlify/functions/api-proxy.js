// netlify/functions/api-proxy.js - Enhanced version
const crypto = require("crypto");

// Decrypt function (server-side)
function decrypt(encryptedData) {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(
    process.env.ENCRYPTION_KEY || "default-key-change-this-in-production!!",
    "utf8"
  ).slice(0, 32);
  const iv = Buffer.alloc(16, 0);

  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

exports.handler = async (event, context) => {
  // Your Google Apps Script URL from environment variable
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: "Server configuration error",
      }),
    };
  }

  // Validate request origin
  const allowedOrigins = [
    "https://samee-tailoring.netlify.app",
    "https://your-custom-domain.com",
    "http://localhost:8888",
  ];

  const origin = event.headers.origin || event.headers.Origin;
  const isAllowed = allowedOrigins.some((allowed) => origin?.includes(allowed));

  if (!isAllowed && process.env.NODE_ENV === "production") {
    return {
      statusCode: 403,
      body: JSON.stringify({
        status: "error",
        message: "Forbidden",
      }),
    };
  }

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
    "X-Powered-By": "Netlify Functions",
  };

  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    let url = GOOGLE_SCRIPT_URL;
    let requestData = null;

    // Handle GET requests
    if (event.httpMethod === "GET") {
      const params = event.queryStringParameters;
      if (params) {
        // Check for encrypted data
        if (params.encrypted) {
          const decryptedParams = decrypt(params.encrypted);
          if (decryptedParams) {
            const queryString = new URLSearchParams(decryptedParams).toString();
            url = `${GOOGLE_SCRIPT_URL}?${queryString}`;
          }
        } else {
          const queryString = new URLSearchParams(params).toString();
          url = `${GOOGLE_SCRIPT_URL}?${queryString}`;
        }
      }

      const response = await fetch(url);
      const data = await response.text();

      return {
        statusCode: 200,
        headers,
        body: data,
      };
    }

    // Handle POST requests
    if (event.httpMethod === "POST") {
      let bodyData = event.body;

      // Check if body is encrypted
      try {
        const parsed = JSON.parse(event.body);
        if (parsed.encrypted) {
          bodyData = JSON.stringify(decrypt(parsed.encrypted));
        }
      } catch (e) {
        // Body is not JSON or not encrypted
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyData,
      });

      const data = await response.text();

      return {
        statusCode: 200,
        headers,
        body: data,
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Method not allowed",
      }),
    };
  } catch (error) {
    console.error("Proxy error:", error);

    // Don't expose error details in production
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Service temporarily unavailable"
        : error.message;

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: errorMessage,
      }),
    };
  }
};
