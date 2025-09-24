const fs = require("fs");
const path = require("path");

// Create dist directory and subdirectories
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function build() {
  console.log("🚀 Starting build process...");

  try {
    // Ensure dist directories exist
    ensureDirectoryExists("dist");
    ensureDirectoryExists("dist/css");
    ensureDirectoryExists("dist/js");

    // 1. Copy JavaScript files (without minification for now to avoid issues)
    console.log("📦 Copying JavaScript files...");
    const jsFiles = [
      "js/config.js",
      "js/api.js",
      "js/language.js",
      "js/app.js",
      "js/receipt.js",
      "js/auth.js",
      "js/crypto.js",
      "js/optimized-api.js",
      "js/performance-optimizer.js",
    ];

    for (const file of jsFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8");
        const outputFile = path.join("dist", file);
        ensureDirectoryExists(path.dirname(outputFile));
        fs.writeFileSync(outputFile, content);
        console.log(`  ✓ Copied ${file}`);
      }
    }

    // 2. Copy CSS files
    console.log("🎨 Copying CSS files...");
    const cssFiles = [
      "css/main.css",
      "css/form.css",
      "css/receipt.css",
      "css/responsive.css",
    ];

    for (const file of cssFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8");
        const outputFile = path.join("dist", file);
        ensureDirectoryExists(path.dirname(outputFile));
        fs.writeFileSync(outputFile, content);
        console.log(`  ✓ Copied ${file}`);
      }
    }

    // 3. Process HTML files and fix icon issues
    console.log("📝 Processing HTML files...");
    const htmlFiles = [
      "index.html",
      "customer-profile.html",
      "order-status.html",
    ];

    for (const file of htmlFiles) {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, "utf8");

        // Fix Font Awesome icons - ensure HTTPS and add fallback
        content = content.replace(
          /<link\s+rel="stylesheet"\s+href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"]+"/g,
          '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer"'
        );

        fs.writeFileSync(path.join("dist", file), content);
        console.log(`  ✓ Processed ${file}`);
      }
    }

    // 4. Copy images if exists
    if (fs.existsSync("images")) {
      console.log("📁 Copying images...");
      copyRecursiveSync("images", "dist/images");
    }

    // 5. Create netlify.toml for proper configuration
    console.log("⚙️ Creating Netlify configuration...");
    const netlifyConfig = `[build]
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Content-Security-Policy = "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
    fs.writeFileSync("netlify.toml", netlifyConfig);

    // 6. Create _redirects file for Netlify
    fs.writeFileSync("dist/_redirects", "/* /index.html 200");

    // 7. Create a simple icon fallback CSS file
    console.log("🎨 Creating icon fallback CSS...");
    const iconFallbackCSS = `
/* Icon Fallbacks using Unicode */
.fas.fa-cut::before,
.fa-cut::before { content: "✂️"; }
.fas.fa-phone::before,
.fa-phone::before { content: "📞"; }
.fas.fa-map-marker-alt::before,
.fa-map-marker-alt::before { content: "📍"; }
.fas.fa-ruler::before,
.fa-ruler::before { content: "📏"; }
.fas.fa-palette::before,
.fa-palette::before { content: "🎨"; }
.fas.fa-sticky-note::before,
.fa-sticky-note::before { content: "📝"; }
.fas.fa-plus-circle::before,
.fa-plus-circle::before { content: "➕"; }
.fas.fa-user::before,
.fa-user::before { content: "👤"; }
.fas.fa-search::before,
.fa-search::before { content: "🔍"; }
.fas.fa-truck::before,
.fa-truck::before { content: "🚚"; }
.fab.fa-whatsapp::before,
.fa-whatsapp::before { content: "💬"; }
.fas.fa-home::before,
.fa-home::before { content: "🏠"; }
.fas.fa-print::before,
.fa-print::before { content: "🖨️"; }
.fas.fa-save::before,
.fa-save::before { content: "💾"; }
.fas.fa-check::before,
.fa-check::before { content: "✓"; }
.fas.fa-times::before,
.fa-times::before { content: "✕"; }
.fas.fa-edit::before,
.fa-edit::before { content: "✏️"; }
.fas.fa-eye::before,
.fa-eye::before { content: "👁️"; }
.fas.fa-download::before,
.fa-download::before { content: "⬇️"; }
.fas.fa-history::before,
.fa-history::before { content: "🔄"; }
.fas.fa-calendar::before,
.fa-calendar::before { content: "📅"; }
.fas.fa-cog::before,
.fa-cog::before { content: "⚙️"; }
.fas.fa-user-circle::before,
.fa-user-circle::before { content: "👤"; }
.fas.fa-ruler-combined::before,
.fa-ruler-combined::before { content: "📐"; }
.fas.fa-tshirt::before,
.fa-tshirt::before { content: "👔"; }
.fas.fa-money-check-alt::before,
.fa-money-check-alt::before { content: "💰"; }
.fas.fa-arrow-left::before,
.fa-arrow-left::before { content: "←"; }
.fas.fa-arrow-right::before,
.fa-arrow-right::before { content: "→"; }
.fas.fa-users::before,
.fa-users::before { content: "👥"; }
.fas.fa-shopping-bag::before,
.fa-shopping-bag::before { content: "🛍️"; }
.fas.fa-user-cog::before,
.fa-user-cog::before { content: "👤⚙️"; }
.fas.fa-inbox::before,
.fa-inbox::before { content: "📥"; }
.fas.fa-check-circle::before,
.fa-check-circle::before { content: "✅"; }
.fas.fa-exclamation-circle::before,
.fa-exclamation-circle::before { content: "⚠️"; }
.fas.fa-exclamation-triangle::before,
.fa-exclamation-triangle::before { content: "⚠️"; }
.fas.fa-info-circle::before,
.fa-info-circle::before { content: "ℹ️"; }

/* Ensure icons are visible */
[class^="fa-"], [class*=" fa-"] {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}
`;
    fs.writeFileSync("dist/css/icon-fallback.css", iconFallbackCSS);

    // Add icon fallback CSS to all HTML files
    console.log("📝 Adding icon fallback to HTML files...");
    for (const file of htmlFiles) {
      const htmlPath = path.join("dist", file);
      if (fs.existsSync(htmlPath)) {
        let content = fs.readFileSync(htmlPath, "utf8");
        // Add icon fallback CSS after other CSS files
        content = content.replace(
          "</head>",
          '<link rel="stylesheet" href="css/icon-fallback.css">\n</head>'
        );
        fs.writeFileSync(htmlPath, content);
      }
    }

    console.log("✅ Build completed successfully!");
    console.log("📁 Output directory: ./dist");
    console.log("\n🚀 Deploy the 'dist' folder to Netlify");
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
    ensureDirectoryExists(dest);
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
