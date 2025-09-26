// Main Application JavaScript

// Global Variables
let currentStep = 1;
const totalSteps = 4;
let formData = {};
let currentLang = "en";

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Generate or retrieve Order Number
  generateOrderNumber(false); // false means don't force new number

  // Set default dates
  setDefaultDates();

  // Check for prefilled data
  checkPrefillData();

  // Initialize form listeners
  initializeFormListeners();

  // Set language from localStorage or default
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  changeLanguage(savedLang);

  // Initialize QR code library
  if (typeof QRCode !== "undefined") {
    console.log("QR Code library loaded");
  }
}

// Generate unique order number
function generateOrderNumber(forceNew = true) {
  // Check if we should use existing order number
  if (!forceNew) {
    const existingOrderNumber = sessionStorage.getItem("currentOrderNumber");
    if (existingOrderNumber) {
      document.getElementById("orderNumber").textContent = existingOrderNumber;
      return existingOrderNumber;
    }
  }

  // Generate new order number
  let counter = parseInt(sessionStorage.getItem("orderCounter") || "0");
  counter++;
  if (counter > 9999) {
    counter = 1;
  }
  sessionStorage.setItem("orderCounter", counter.toString());
  const orderNumber = `ORD-${String(counter).padStart(4, "0")}`;

  // Store the current order number
  sessionStorage.setItem("currentOrderNumber", orderNumber);
  document.getElementById("orderNumber").textContent = orderNumber;
  return orderNumber;
}

// Set default dates
function setDefaultDates() {
  const today = new Date();
  const delivery = new Date();
  delivery.setDate(today.getDate() + 7);

  document.querySelector('input[name="orderDate"]').valueAsDate = today;
  document.querySelector('input[name="deliveryDate"]').valueAsDate = delivery;
}

// Check for prefilled customer data
function checkPrefillData() {
  const prefillData = localStorage.getItem("prefillCustomer");
  if (prefillData) {
    const data = JSON.parse(prefillData);

    // Fill customer information
    if (data.name)
      document.querySelector('input[name="customerName"]').value = data.name;
    if (data.phone)
      document.querySelector('input[name="phoneNumber"]').value = data.phone;

    // Fill measurements
    if (data.measurements) {
      Object.keys(data.measurements).forEach((key) => {
        const input = document.querySelector(`input[name="${key}"]`);
        if (input && data.measurements[key] !== "-") {
          input.value = data.measurements[key];
        }
      });
    }

    // Clear prefill data
    localStorage.removeItem("prefillCustomer");

    // Show notification
    showNotification("Customer data loaded successfully", "success");
  }
}

// Initialize form listeners
function initializeFormListeners() {
  // Payment calculation
  document
    .getElementById("totalAmount")
    .addEventListener("input", calculateRemaining);
  document
    .getElementById("paidAmount")
    .addEventListener("input", calculateRemaining);

  // Form submission
  document
    .getElementById("tailorForm")
    .addEventListener("submit", handleFormSubmit);

  // Priority change listener
  document
    .querySelector('select[name="priority"]')
    .addEventListener("change", function () {
      if (this.value === "express") {
        showNotification(
          "Express delivery will incur additional charges",
          "info"
        );
      }
    });
}

// Calculate remaining amount
function calculateRemaining() {
  const total = parseFloat(document.getElementById("totalAmount").value) || 0;
  const paid = parseFloat(document.getElementById("paidAmount").value) || 0;
  const remaining = total - paid;

  document.getElementById("remainingAmount").value = remaining.toFixed(2);

  // Add visual feedback
  const remainingInput = document.getElementById("remainingAmount");
  if (remaining > 0) {
    remainingInput.style.color = "#ef4444";
  } else if (remaining === 0) {
    remainingInput.style.color = "#22c55e";
  } else {
    remainingInput.style.color = "#f59e0b";
  }
}

// function updateNavigationButtons() {
//   const prevBtn = document.getElementById("prevBtn");
//   const nextBtn = document.getElementById("nextBtn");
//   const submitBtn = document.getElementById("submitBtn");

//   // Show/hide previous button

//   // Show/hide next/submit buttons
//   if (currentStep === totalSteps) {
//     nextBtn.style.display = "none";
//     submitBtn.style.display = "flex";
//   } else {
//     nextBtn.style.display = "flex";
//     submitBtn.style.display = "none";
//   }
// }

// Validate current step

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();

  //   if (!validateStep(currentStep)) return;

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<span class="loading"></span> ' + getTranslation("saving");
  submitBtn.disabled = true;

  // Collect form data
  formData = collectFormData();

  try {
    // Save to Google Sheets
    const response = await saveToGoogleSheets(formData);

    // Generate receipt
    generateReceipt(formData);

    // Show receipt modal
    document.getElementById("receiptModal").classList.add("show");

    // Send notifications
    await sendNotifications(formData);

    showNotification(getTranslation("orderSaved"), "success");

    // Clear the current order number from session storage
    // This will ensure a new number is generated for the next order
    sessionStorage.removeItem("currentOrderNumber");

    // DON'T generate new order number here - wait for user action
    // The new number will be generated when:
    // 1. User clicks "New Order" button
    // 2. User refreshes the page
    // 3. User navigates away and comes back
  } catch (error) {
    console.error("Error saving order:", error);
    showNotification(getTranslation("errorSaving"), "error");
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// Collect form data
function collectFormData() {
  const form = document.getElementById("tailorForm");
  const data = {
    orderNumber: document.getElementById("orderNumber").textContent,
    receiptId: generateReceiptId(),
    timestamp: new Date().toISOString(),
    language: currentLang,

    // Customer Information
    customerName: form.customerName.value,
    phoneNumber: form.phoneNumber.value,
    orderDate: form.orderDate.value,
    deliveryDate: form.deliveryDate.value,
    thobeCount: form.thobeCount.value,
    priority: form.priority.value,

    // Measurements
    length: form.length.value || "-",
    shoulder: form.shoulder.value || "-",
    sleeveLength: form.sleeveLength.value || "-",
    sleeveWidth: form.sleeveWidth.value || "-",
    chestWidth: form.chestWidth.value || "-",
    neck: form.neck.value || "-",
    handWidth: form.handWidth.value || "-",
    cuffLength: form.cuffLength.value || "-",

    // Design Options
    jubjurType: form.jubjurType.value || "-",
    pocketType: form.pocketType.value || "-",
    cuffType: form.cuffType.value || "-",
    collarType: form.collarType.value || "-",
    garmentStyle: form.garmentStyle.value || "-",

    // Additional Options
    stitchDouble: form.stitchDouble.checked ? "Yes" : "No",
    stitchHidden: form.stitchHidden.checked ? "Yes" : "No",
    tailorTail: form.tailorTail.checked ? "Yes" : "No",
    jacket: form.jacket.checked ? "Yes" : "No",
    embroidery: form.embroidery.checked ? "Yes" : "No",
    specialRequest: form.specialRequest.checked ? "Yes" : "No",

    // Fabric Details
    fabricType: form.fabricType.value || "-",
    color: form.color.value || "-",
    plain: form.plain.value || "-",

    // Payment
    totalAmount: form.totalAmount.value || "0",
    paidAmount: form.paidAmount.value || "0",
    remainingAmount: form.remainingAmount.value || "0",
    paymentMethod: form.paymentMethod.value,

    // Notes
    notes: form.notes.value || "",
  };

  return data;
}

// Generate receipt ID
function generateReceiptId() {
  return "RCP" + Date.now().toString().slice(-8);
}

// Load last measurements
async function loadLastMeasurements() {
  const phone = document.querySelector('input[name="phoneNumber"]').value;

  if (!phone) {
    showNotification(getTranslation("enterPhone"), "warning");
    return;
  }

  // Get the Load Previous button and store original content
  const loadPrevBtn =
    document.querySelector('button[onclick*="loadLastMeasurements"]') ||
    document.querySelector('.btn-outline[onclick*="loadLastMeasurements"]') ||
    document.querySelector("button.btn-outline");

  let originalBtnContent = "";
  let originalBtnDisabled = false;

  if (loadPrevBtn) {
    originalBtnContent = loadPrevBtn.innerHTML;
    originalBtnDisabled = loadPrevBtn.disabled;

    // Add loading animation
    loadPrevBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    loadPrevBtn.disabled = true;
  }

  try {
    const response = await searchCustomer(phone);

    if (response.status === "success" && response.orders.length > 0) {
      const lastOrder = response.orders[0];

      // Fill customer name and measurements (text inputs)
      const textFields = [
        "customerName",
        "length",
        "shoulder",
        "sleeveLength",
        "sleeveWidth",
        "chestWidth",
        "neck",
        "handWidth",
        "cuffLength",
      ];

      textFields.forEach((field) => {
        const input = document.querySelector(`input[name="${field}"]`);
        if (input && lastOrder[field] && lastOrder[field] !== "-") {
          input.value = lastOrder[field];
        }
      });

      // Fill radio button fields (jubjurType, pocketType, cuffType, collarType)
      const radioFields = [
        "jubjurType",
        "pocketType",
        "cuffType",
        "collarType",
      ];

      radioFields.forEach((field) => {
        if (lastOrder[field] && lastOrder[field] !== "-") {
          const radio = document.querySelector(
            `input[name="${field}"][value="${lastOrder[field]}"]`
          );
          if (radio) {
            radio.checked = true;
          }
        }
      });

      // Fill select fields (garmentStyle, priority)
      const selectFields = ["garmentStyle", "priority"];

      selectFields.forEach((field) => {
        if (lastOrder[field] && lastOrder[field] !== "-") {
          const select = document.querySelector(`select[name="${field}"]`);
          if (select) {
            select.value = lastOrder[field];
          }
        }
      });

      // Fill checkbox fields (additional options)
      const checkboxFields = [
        "stitchDouble",
        "stitchHidden",
        "tailorTail",
        "jacket",
        "embroidery",
        "specialRequest",
      ];

      checkboxFields.forEach((field) => {
        const checkbox = document.querySelector(`input[name="${field}"]`);
        if (checkbox) {
          // Check if the value is "Yes", true, or 1
          checkbox.checked =
            lastOrder[field] === "Yes" ||
            lastOrder[field] === true ||
            lastOrder[field] === 1 ||
            lastOrder[field] === "1";
        }
      });

      // Fill other customer fields (except payment)
      if (lastOrder.thobeCount) {
        const thobeCountInput = document.querySelector(
          'input[name="thobeCount"]'
        );
        if (thobeCountInput) {
          thobeCountInput.value = lastOrder.thobeCount;
        }
      }

      // Fill notes if exists
      if (lastOrder.notes) {
        const notesTextarea = document.querySelector('textarea[name="notes"]');
        if (notesTextarea) {
          notesTextarea.value = lastOrder.notes;
        }
      }

      showNotification(getTranslation("measurementsLoaded"), "success");
    } else {
      showNotification(getTranslation("noMeasurements"), "info");
    }
  } catch (error) {
    console.error("Error loading measurements:", error);
    showNotification(getTranslation("errorLoading"), "error");
  } finally {
    // Restore original button state
    if (loadPrevBtn) {
      loadPrevBtn.innerHTML = originalBtnContent;
      loadPrevBtn.disabled = originalBtnDisabled;
    }
  }
}

// WhatsApp Integration
function openWhatsApp() {
  const phone = "966557485529"; // Business WhatsApp number
  const message = encodeURIComponent(
    "Hello, I would like to inquire about tailoring services."
  );
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function sendWhatsApp() {
  const customerPhone = formData.phoneNumber.replace(/\D/g, "");
  const message = generateWhatsAppMessage(formData);
  window.open(
    `https://wa.me/966${customerPhone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function generateWhatsAppMessage(data) {
  let message = "";

  if (currentLang === "ar") {
    message = `مرحباً ${data.customerName},\n\n`;
    message += `شكراً لطلبك من مؤسسة سجيم إبراهيم محمد الفضلي للخياطة.\n\n`;
    message += `📋 تفاصيل الطلب:\n`;
    message += `رقم الطلب: ${data.orderNumber}\n`;
    message += `رقم الإيصال: ${data.receiptId}\n`;
    message += `تاريخ التسليم: ${formatDate(data.deliveryDate)}\n`;
    message += `عدد الثياب: ${data.thobeCount}\n\n`;
    message += `💰 الدفع:\n`;
    message += `الإجمالي: ${data.totalAmount} ريال\n`;
    message += `المدفوع: ${data.paidAmount} ريال\n`;
    message += `المتبقي: ${data.remainingAmount} ريال\n\n`;
    message += `📍 العنوان: الرياض - حي الحمراء - شارع المصانع\n`;
    message += `📞 للاستفسار: 0557450529\n\n`;
    message += `يمكنك تتبع طلبك من خلال الرابط:\n`;
    message += `${window.location.origin}/order-status.html?id=${data.receiptId}`;
  } else if (currentLang === "bn") {
    message = `হ্যালো ${data.customerName},\n\n`;
    message += `সামি ইব্রাহিম মুহাম্মদ আলফাদলি টেইলারিং থেকে আপনার অর্ডারের জন্য ধন্যবাদ।\n\n`;
    message += `📋 অর্ডার বিবরণ:\n`;
    message += `অর্ডার নম্বর: ${data.orderNumber}\n`;
    message += `রসিদ নম্বর: ${data.receiptId}\n`;
    message += `ডেলিভারি তারিখ: ${formatDate(data.deliveryDate)}\n`;
    message += `পোশাক সংখ্যা: ${data.thobeCount}\n\n`;
    message += `💰 পেমেন্ট:\n`;
    message += `মোট: ${data.totalAmount} রিয়াল\n`;
    message += `পরিশোধিত: ${data.paidAmount} রিয়াল\n`;
    message += `বাকি: ${data.remainingAmount} রিয়াল\n\n`;
    message += `📍 ঠিকানা: রিয়াদ - আল হামরা জেলা - আল মাসানে রাস্তা\n`;
    message += `📞 যোগাযোগ: 0557450529\n\n`;
    message += `আপনার অর্ডার ট্র্যাক করুন:\n`;
    message += `${window.location.origin}/order-status.html?id=${data.receiptId}`;
  } else {
    message = `Hello ${data.customerName},\n\n`;
    message += `Thank you for your order at Samee Ibrahim Muhammad Alfadhli Tailoring.\n\n`;
    message += `📋 Order Details:\n`;
    message += `Order Number: ${data.orderNumber}\n`;
    message += `Receipt ID: ${data.receiptId}\n`;
    message += `Delivery Date: ${formatDate(data.deliveryDate)}\n`;
    message += `Number of Thobes: ${data.thobeCount}\n\n`;
    message += `💰 Payment:\n`;
    message += `Total: ${data.totalAmount} SAR\n`;
    message += `Paid: ${data.paidAmount} SAR\n`;
    message += `Remaining: ${data.remainingAmount} SAR\n\n`;
    message += `📍 Address: Riyadh - Al Hamra District - Al Masane Street\n`;
    message += `📞 Contact: 0557450529\n\n`;
    message += `Track your order:\n`;
    message += `${window.location.origin}/order-status.html?id=${data.receiptId}`;
  }

  return message;
}

// Send notifications (WhatsApp/SMS)
async function sendNotifications(data) {
  // This would integrate with actual SMS/WhatsApp API
  // For now, we'll just log the intent
  console.log("Sending notifications for order:", data.orderNumber);

  // Store notification preferences
  const notifications = {
    orderConfirmation: true,
    readyForPickup: false,
    delivered: false,
  };

  localStorage.setItem(
    `notifications_${data.receiptId}`,
    JSON.stringify(notifications)
  );
}

// New Order
function newOrder() {
  // Reset form
  document.getElementById("tailorForm").reset();

  // Generate new order number only when creating a new order
  generateOrderNumber(true); // true means force new number
  setDefaultDates();

  // Hide receipt modal
  document.getElementById("receiptModal").classList.remove("show");

  // Update navigation buttons
  // updateNavigationButtons();

  scrollToTop();
}

//   addd--__-------------__--------------------
//   --__-------------__--------------------
// Print Receipt - Fixed to prevent duplicate windows
let isPrinting = false; // Flag to prevent duplicate print calls

function printReceipt() {
  // Prevent duplicate print calls
  if (isPrinting) {
    return;
  }
  isPrinting = true;

  const receiptContent = document.getElementById("receipt");
  if (!receiptContent) {
    console.error("Element with ID 'receipt' not found.");
    isPrinting = false;
    return;
  }

  // Get order number for filename
  const orderNumberElement = receiptContent.querySelector(".badge-number");
  const orderNumber = orderNumberElement
    ? orderNumberElement.textContent.trim()
    : "Receipt";

  // Create offscreen iframe
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.left = "-9999px";
  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = win.document;

  // Get all necessary resources
  const cssLink = document.querySelector('link[href*="receipt.css"]');
  const cssHref = cssLink
    ? cssLink.href
    : `${window.location.origin}/css/receipt.css`;

  // Check for Font Awesome
  const fontAwesomeLink = document.querySelector(
    'link[href*="fontawesome"], link[href*="font-awesome"], link[href*="fa"]'
  );
  const fontAwesomeHref = fontAwesomeLink
    ? fontAwesomeLink.href
    : "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";

  // Check for Google Fonts (Inter)
  const interFontHref =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

  // Build the document
  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order-${orderNumber}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${interFontHref}" rel="stylesheet">
    <link rel="stylesheet" href="${fontAwesomeHref}">
    <link rel="stylesheet" href="${cssHref}">
</head>
<body>
    ${receiptContent.outerHTML}
</body>
</html>`);
  doc.close();

  // Enhanced cleanup
  function cleanup() {
    setTimeout(() => {
      if (iframe && iframe.parentNode) {
        document.body.removeChild(iframe);
      }
      isPrinting = false; // Reset the flag
    }, 100);
  }

  // Print execution with proper timing
  function executePrint() {
    try {
      win.focus();

      // Handle print completion
      if (win.matchMedia) {
        const mediaQueryList = win.matchMedia("print");
        mediaQueryList.addListener(function (mql) {
          if (!mql.matches) {
            cleanup();
          }
        });
      }

      win.onafterprint = cleanup;
      win.print();
    } catch (err) {
      console.error("Print error:", err);
      cleanup();
    }
  }

  // Wait for all resources to load
  let resourcesLoaded = 0;
  const totalResources = 3; // CSS, Font Awesome, Google Fonts
  let hasExecuted = false; // Prevent multiple executions

  function checkResourcesAndPrint() {
    if (hasExecuted) return;

    resourcesLoaded++;
    if (resourcesLoaded >= totalResources) {
      hasExecuted = true;
      // All resources loaded, wait a bit for rendering
      setTimeout(executePrint, 300);
    }
  }

  // Monitor CSS loading
  const checkCSS = setInterval(() => {
    if (hasExecuted) {
      clearInterval(checkCSS);
      return;
    }

    try {
      const testEl = doc.body.querySelector(".modern-receipt-container");
      if (testEl) {
        const styles = win.getComputedStyle(testEl);
        if (styles.fontFamily.includes("Inter")) {
          clearInterval(checkCSS);
          checkResourcesAndPrint();
        }
      }
    } catch (e) {}
  }, 50);

  // Timeout fallback
  setTimeout(() => {
    clearInterval(checkCSS);
    if (!hasExecuted && iframe.parentNode) {
      hasExecuted = true;
      executePrint();
    }
  }, 3000);

  // Monitor iframe load - use addEventListener instead of onload
  iframe.addEventListener("load", () => {
    if (!hasExecuted) {
      checkResourcesAndPrint();
    }
  });

  // Monitor window load
  win.addEventListener("load", () => {
    if (!hasExecuted) {
      checkResourcesAndPrint();
    }
  });
}

//---------------------------------------------------------------------------

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "exclamation-circle"
            : "info-circle"
        }"></i>
        <span>${message}</span>
    `;

  // Add to container or create one
  let container = document.getElementById("notificationContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "notificationContainer";
    container.style.cssText =
      "position: fixed; top: 80px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
    document.body.appendChild(container);
  }

  container.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };

  if (currentLang === "ar") {
    return date.toLocaleDateString("ar-SA", options);
  } else if (currentLang === "bn") {
    return date.toLocaleDateString("bn-BD", options);
  } else {
    return date.toLocaleDateString("en-US", options);
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Export functions for global use
// window.nextStep = nextStep;
// window.previousStep = previousStep;
window.loadLastMeasurements = loadLastMeasurements;
window.openWhatsApp = openWhatsApp;
window.sendWhatsApp = sendWhatsApp;
window.printReceipt = printReceipt;
window.newOrder = newOrder;
