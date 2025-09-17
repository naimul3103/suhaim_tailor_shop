const fs = require("fs");
const path = require("path");
const { minify: minifyJS } = require("terser");
const CleanCSS = require("clean-css");
const minifyHTML = require("html-minifier").minify;

// Create dist directory
if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
  fs.mkdirSync("dist/css");
  fs.mkdirSync("dist/js");
}

async function build() {
  console.log("🚀 Starting build process...");

  try {
    // 1. Process JavaScript files
    console.log("📦 Minifying JavaScript...");
    const jsFiles = [
      "js/config.js",
      "js/api.js",
      "js/language.js",
      "js/app.js",
      "js/receipt.js",
    ];

    for (const file of jsFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8");
        const minified = await minifyJS(content, {
          compress: {
            drop_console: process.env.NODE_ENV === "production",
            drop_debugger: true,
          },
          mangle: true,
        });

        const outputFile = path.join("dist", file.replace(".js", ".min.js"));
        fs.writeFileSync(outputFile, minified.code);
      }
    }

    // 2. Process CSS files
    console.log("🎨 Minifying CSS...");
    const cssFiles = [
      "css/main.css",
      "css/form.css",
      "css/receipt.css",
      "css/responsive.css",
    ];

    for (const file of cssFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8");
        const minified = new CleanCSS({}).minify(content);

        const outputFile = path.join("dist", file.replace(".css", ".min.css"));
        fs.writeFileSync(outputFile, minified.styles);
      }
    }

    // 3. Process HTML files
    console.log("📝 Processing HTML files...");
    const htmlFiles = [
      "index.html",
      "customer-profile.html",
      "order-status.html",
    ];

    for (const file of htmlFiles) {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");

        // Replace .js with .min.js and .css with .min.css
        content = content.replace(/\.js"/g, '.min.js"');
        content = content.replace(/\.css"/g, '.min.css"');

        // Minify HTML
        const minified = minifyHTML(content, {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        });

        fs.writeFileSync(path.join("dist", file), minified);
      }
    }

    // 4. Copy other necessary files
    console.log("📁 Copying additional files...");

    // Copy images if exists
    if (fs.existsSync("images")) {
      copyRecursiveSync("images", "dist/images");
    }

    // Create _redirects file for Netlify
    fs.writeFileSync("dist/_redirects", "/* /index.html 200");

    // Create manifest.json for PWA
    const manifest = {
      name: "Samee Tailoring System",
      short_name: "Samee Tailor",
      description: "Professional Tailoring Order Management",
      start_url: "/",
      display: "standalone",
      theme_color: "#2563eb",
      background_color: "#ffffff",
      icons: [
        {
          src: "/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };
    fs.writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2));

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Helper function to copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Run build
build();
