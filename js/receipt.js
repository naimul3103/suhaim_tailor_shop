// Receipt Generation and Management - Modern Minimalist Design
// Version 4.0 - Professional A4 Single Page Receipt

function generateReceipt(data) {
  const receiptContent = document.getElementById("receipt");

  // Fix: Get current language from localStorage or body attribute
  const currentLang =
    localStorage.getItem("preferredLanguage") ||
    document.body.getAttribute("data-lang") ||
    "en";

  // Generate unique receipt ID if not exists
  if (!data.receiptId) {
    data.receiptId = "R" + Date.now().toString().substr(-8);
  }

  // Generate QR Code data
  const qrCodeData = `${window.location.origin}/track?id=${data.receiptId}`;

  const receiptHTML = `
<div class="modern-receipt-wrapper">
  <div class="modern-receipt-container">
    
    <!-- Minimalist Header -->
    <div class="modern-header">
      <div class="header-content">
        <div class="brand-section">
          <div class="brand-icon">
            ✂️
          </div>
          <div class="brand-text">
            <h1 class="brand-name">${getCompanyName(currentLang)}</h1>
            <p class="brand-tagline">${getCompanyTagline(currentLang)}</p>
          </div>
        </div>
        <div class="receipt-badge">
          <span class="badge-label">${getText("receipt", currentLang)}</span>
          <span class="badge-number">#${data.receiptId}</span>
        </div>
      </div>
      <div class="header-contact">
        <span>📞 ${getCompanyPhone()}</span>
        <span>📍 ${getCompanyAddress(currentLang)}</span>
      </div>
    </div>

    <!-- Customer & Order Info Bar -->
    <div class="info-bar">
      <div class="info-group">
        <span class="info-label">${getText("customerName", currentLang)}:</span>
        <span class="info-value">${data.customerName}</span>
      </div>
      <div class="info-group">
        <span class="info-label">${getText("phone", currentLang)}:</span>
        <span class="info-value" dir="ltr">+966${data.phoneNumber}</span>
      </div>
      <div class="info-group">
        <span class="info-label">${getText("orderNo", currentLang)}:</span>
        <span class="info-value">#${data.orderNumber}</span>
      </div>
      <div class="info-group">
        <span class="info-label">${getText("date", currentLang)}:</span>
        <span class="info-value">${formatReceiptDate(
          data.orderDate,
          currentLang
        )}</span>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="receipt-body">
      
      <!-- Left Column -->
      <div class="column-left">
        
        <!-- Measurements -->
        <div class="data-section">
          <h3 class="section-heading">
            📏
            ${getText("measurements", currentLang)}
          </h3>
          <div class="data-grid">
            ${generateMinimalMeasurements(data, currentLang)}
          </div>
        </div>

        <!-- Design -->
        <div class="data-section">
          <h3 class="section-heading">
            🎨
            ${getText("design", currentLang)}
          </h3>
          <div class="data-list">
            ${generateMinimalDesign(data, currentLang)}
          </div>
        </div>

        <!-- Additional Options -->
        ${generateMinimalAdditional(data, currentLang)}
        
        <!-- Notes -->
        ${
          data.notes
            ? `
          <div class="data-section">
            <h3 class="section-heading">
              📝
              ${getText("notes", currentLang)}
            </h3>
            <p class="notes-text">${data.notes}</p>
          </div>
          `
            : ""
        }
      </div>

      <!-- Right Column -->
      <div class="column-right">
        
        <!-- Delivery Info -->
        <div class="delivery-box">
          <div class="delivery-label">${getText("delivery", currentLang)}</div>
          <div class="delivery-date">${formatReceiptDate(
            data.deliveryDate,
            currentLang
          )}</div>
          <div class="delivery-count">${data.thobeCount} ${getText(
    "pcs",
    currentLang
  )}</div>
        </div>

        <!-- QR Code -->
        <div class="qr-box">
          <div id="qrcode" class="qr-code"></div>
          <p class="qr-text">${getText("scanTrack", currentLang)}</p>
        </div>

        <!-- Payment Summary -->
        <div class="payment-box">
          <div class="payment-item">
            <span>${getText("total", currentLang)}</span>
            <span class="amount">${data.totalAmount} ${getText(
    "currency",
    currentLang
  )}</span>
          </div>

          <div class="payment-item">
            <span>${getText("paid", currentLang)}</span>
            <span class="amount paid">${data.paidAmount} ${getText(
    "currency",
    currentLang
  )}</span>
          </div>

          <div class="payment-divider"></div>
          
          <div class="payment-item balance">
            <span>${getText("balance", currentLang)}</span>
            <span class="amount">${data.remainingAmount} ${getText(
    "currency",
    currentLang
  )}</span>
          </div>
        </div>

        <!-- Signature Box -->
        <div class="signature-box">
          <div class="signature-line"></div>
          <p>${getText("signature", currentLang)}</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="modern-footer">
      <div class="footer-terms">
        ${getText("term1", currentLang)} • ${getText("term2", currentLang)}
      </div>
      <div class="footer-thanks">
        ${getText("thankYou", currentLang)}
      </div>
    </div>
  </div>
</div>
  `;

  receiptContent.innerHTML = receiptHTML;

  // Generate QR Code with better error handling
  setTimeout(() => {
    generateQRCode(qrCodeData);
  }, 100);
}

// Generate minimal measurements
function generateMinimalMeasurements(data, lang) {
  const measurements = [
    { key: "length", value: data.length },
    { key: "shoulder", value: data.shoulder },
    { key: "sleeveLength", value: data.sleeveLength },
    { key: "sleeveWidth", value: data.sleeveWidth },
    { key: "chestWidth", value: data.chestWidth },
    { key: "neck", value: data.neck },
    { key: "handWidth", value: data.handWidth },
    { key: "cuffLength", value: data.cuffLength },
  ];

  return measurements
    .filter((m) => m.value && m.value !== "-")
    .map(
      (m) => `
      <div class="data-item">
        <span class="item-label">${getText(m.key, lang)}</span>
        <span class="item-value">${m.value} cm</span>
      </div>
    `
    )
    .join("");
}

// Get SVG for design options
function getDesignSVG(type, value) {
  const svgMap = {
    jubjurType: {
      Ban: `<svg width="50" height="50" viewBox="0 0 100 100">
        <g stroke="black" fill="none" stroke-width="1.5">
          <path d="M40 15 L40 85 L60 85 L60 15" />
          <line x1="40" y1="25" x2="45" y2="25" />
          <line x1="40" y1="30" x2="42" y2="30" />
          <line x1="40" y1="35" x2="45" y2="35" />
          <line x1="40" y1="40" x2="42" y2="40" />
          <line x1="40" y1="45" x2="45" y2="45" />
          <line x1="40" y1="50" x2="42" y2="50" />
          <line x1="40" y1="55" x2="45" y2="55" />
          <line x1="40" y1="60" x2="42" y2="60" />
          <line x1="40" y1="65" x2="45" y2="65" />
          <line x1="40" y1="70" x2="42" y2="70" />
          <line x1="40" y1="75" x2="45" y2="75" />
          <circle cx="50" cy="30" r="2" fill="black" />
          <circle cx="50" cy="50" r="2" fill="black" />
          <circle cx="50" cy="70" r="2" fill="black" />
          <line x1="55" y1="25" x2="60" y2="25" />
          <line x1="58" y1="30" x2="60" y2="30" />
          <line x1="55" y1="35" x2="60" y2="35" />
          <line x1="58" y1="40" x2="60" y2="40" />
          <line x1="55" y1="45" x2="60" y2="45" />
          <line x1="58" y1="50" x2="60" y2="50" />
          <line x1="55" y1="55" x2="60" y2="55" />
          <line x1="58" y1="60" x2="60" y2="60" />
          <line x1="55" y1="65" x2="60" y2="65" />
          <line x1="58" y1="70" x2="60" y2="70" />
          <line x1="55" y1="75" x2="60" y2="75" />
          <line x1="40" y1="80" x2="60" y2="80" />
        </g>
      </svg>`,
      Makfi: `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M40 15 L40 85 L60 85 L60 15 M40 25 L40 75 L60 75" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
      "Ban-II": `<svg width="50" height="50" viewBox="0 0 100 100">
        <g stroke="black" fill="none" stroke-width="1.5">
          <path d="M40 15 L40 75 L50 85 L60 75 L60 15" />
          <line x1="40" y1="25" x2="45" y2="25" />
          <line x1="40" y1="30" x2="42.5" y2="30" />
          <line x1="40" y1="35" x2="45" y2="35" />
          <line x1="40" y1="40" x2="42.5" y2="40" />
          <line x1="40" y1="45" x2="45" y2="45" />
          <line x1="40" y1="50" x2="42.5" y2="50" />
          <line x1="40" y1="55" x2="45" y2="55" />
          <line x1="40" y1="60" x2="42.5" y2="60" />
          <line x1="40" y1="65" x2="45" y2="65" />
          <circle cx="50" cy="30" r="2" fill="black" />
          <circle cx="50" cy="47" r="2" fill="black" />
          <circle cx="50" cy="65" r="2" fill="black" />
          <line x1="55" y1="25" x2="60" y2="25" />
          <line x1="57.5" y1="30" x2="60" y2="30" />
          <line x1="55" y1="35" x2="60" y2="35" />
          <line x1="57.5" y1="40" x2="60" y2="40" />
          <line x1="55" y1="45" x2="60" y2="45" />
          <line x1="57.5" y1="50" x2="60" y2="50" />
          <line x1="55" y1="55" x2="60" y2="55" />
          <line x1="57.5" y1="60" x2="60" y2="60" />
          <line x1="55" y1="65" x2="60" y2="65" />
          <line x1="40" y1="75" x2="60" y2="75" />
        </g>
      </svg>`,
      "Makfi-II": `<svg width="50" height="50" viewBox="0 0 100 100">
        <g stroke="black" fill="none" stroke-width="1.5">
          <path d="M40 15 L40 75 L50 85 L60 75 L60 15" />
          <line x1="40" y1="75" x2="60" y2="75" />
        </g>
      </svg>`,
    },
    pocketType: {
      "Round-I": `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 L70 30 L70 65 Q70 70 65 70 L35 70 Q30 70 30 65 Z M30 45 L50 40 L70 45 M30 50 L50 45 L70 50" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
      "Round-Patch": `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 L70 30 L70 65 Q70 70 65 70 L35 70 Q30 70 30 65 Z" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
      Stitch: `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 L70 30 L70 65 L65 70 L35 70 L30 65 Z M30 42 L70 42 M30 48 L70 48" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
      Square: `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 L70 30 L70 70 L30 70 Z M30 40 L70 40" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
    },
    cuffType: {
      "Cuff-1": `<svg width="50" height="50" viewBox="0 0 100 100">
        <rect x="30" y="30" width="30" height="40" fill="none" stroke="black" stroke-width="1.5" />
        <line x1="60" y1="30" x2="80" y2="30" stroke="black" stroke-width="1.5" />
        <line x1="60" y1="45" x2="80" y2="45" stroke="black" stroke-width="1.5" />
        <line x1="60" y1="55" x2="80" y2="55" stroke="black" stroke-width="1.5" />
        <line x1="60" y1="70" x2="80" y2="70" stroke="black" stroke-width="1.5" />
      </svg>`,
      "Cuff-2": `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 L30 65 L35 70 L60 70 L60 30 Z M50 30 L80 30 M60 47 L75 47 M60 52 L75 52 M45 70 L80 70" stroke="black" fill="none" stroke-width="1.5" />
      </svg>`,
      "Cuff-3": `<svg width="50" height="50" viewBox="0 0 100 100">
        <path d="M30 30 v 20 Q 30 70 45 70 h 15 V30 Z m 23 0 h30 M60 47 h 15m-15 5h15M45 70h35" stroke="#000" fill="none" stroke-width="1.5"/>
      </svg>`,
    },
    collarType: {
      Button: `<svg width="50" height="50" viewBox="0 0 100 100">
        <g stroke="black" fill="none" stroke-width="1.5">
          <path d="M26 44 C 34 36, 66 36, 74 44" stroke-dasharray="4 2" />
          <path d="M26 44 C 18 60, 34 72, 50 72 C 66 72, 82 60, 74 44" />
          <path d="M47 72 L45 58 M54 72 L54 58" />
          <circle cx="50" cy="66" r="2" fill="black" />
          <path d="M26 44 C 30 28, 70 28, 74 44" />
          <path d="M26 44 C 30 64, 70 64, 74 44" />
        </g>
      </svg>`,
      Classic: `<svg width="50" height="50" viewBox="0 0 100 100">
        <g stroke="black" fill="none" stroke-width="1.5">
          <path d="M26 44 C 34 36, 66 36, 74 44" stroke-dasharray="4 2" />
          <path d="M26 44 C 18 60, 34 72, 50 72 C 66 72, 82 60, 74 44" />
          <path d="M50 72 L50 60" />
          <path d="M26 44 C 30 28, 70 28, 74 44" />
          <path d="M26 44 C 30 64, 70 64, 74 44" />
        </g>
      </svg>`,
      Shirt: `<svg width="50" height="50" viewBox="305 300 50 40">
        <g stroke="#000" stroke-width="1">
          <path d="M-412.395-252.788c7.869 6.23 24.59 19.345 34.426 19.345s22.295.655 24.918.327c2.623-.327 22.623-6.557 30.82-21.639s-98.033-4.262-90.164 1.967zm31.311-57.394c18.033-6.23 26.558-1.312 26.232-1.638.326.326-44.264 7.867-26.232 1.638zm22.919-34.115c11.147 14.098 14.754 13.443 14.428 13.117.326.326-25.576-27.215-14.428-13.117zm699.652 645.933 6.874 11.149-10.164 22.623M315.9 302.62l-7.54 11.148 11.148 22.623" opacity="NaN" fill="#fff"/>
          <path d="M316.061 302.947c11.803 15.41 12.131 14.426 13.77 14.754 1.64.328 11.804-15.41 11.478-15.736m-25.576.655c15.738-3.607 14.098-2.624 25.574-.657" opacity="NaN" fill="#fff"/>
          <path d="M321.208 308.952c9.837-3.607 8.812-2.623 15.985-.656m-17.745 27.044 9.865-18.355m.272.272 8.495 17.536" opacity="NaN" fill="none"/>
        </g>
      </svg>`,
    },
  };

  return (svgMap[type] && svgMap[type][value]) || "";
}

// Generate minimal design with SVG images
function generateMinimalDesign(data, lang) {
  const designs = [
    { key: "jubjurType", value: data.jubjurType, type: "jubjurType" },
    { key: "pocketType", value: data.pocketType, type: "pocketType" },
    { key: "cuffType", value: data.cuffType, type: "cuffType" },
    { key: "collarType", value: data.collarType, type: "collarType" },
    { key: "garmentStyle", value: data.garmentStyle },
    { key: "fabricType", value: data.fabricType },
    { key: "color", value: data.color },
  ];

  return designs
    .filter((d) => d.value && d.value !== "-")
    .map((d) => {
      const svg = d.type ? getDesignSVG(d.type, d.value) : "";
      if (svg) {
        return `
            <div class="list-item" style="display: flex; align-items: center; margin-bottom: 10px;">
              <div style="margin-right: 10px; flex-shrink: 0;">
                ${svg}
              </div>
              <span class="item-text"><strong>${getText(
                d.key,
                lang
              )}:</strong> ${d.value}</span>
            </div>
          `;
      }
      return `
          <div class="list-item">
            <span class="item-dot">•</span>
            <span class="item-text"><strong>${getText(d.key, lang)}:</strong> ${
        d.value
      }</span>
          </div>
        `;
    })
    .join("");
}

// Generate minimal additional options
function generateMinimalAdditional(data, lang) {
  const options = [];
  if (data.stitchDouble === "Yes") options.push(getText("doubleStitch", lang));
  if (data.stitchHidden === "Yes") options.push(getText("hiddenStitch", lang));
  if (data.tailorTail === "Yes") options.push(getText("tailorTail", lang));
  if (data.jacket === "Yes") options.push(getText("jacket", lang));
  if (data.embroidery === "Yes") options.push(getText("embroidery", lang));
  if (data.specialRequest === "Yes")
    options.push(getText("specialRequest", lang));

  if (options.length > 0) {
    return `
      <div class="data-section">
        <h3 class="section-heading">
          ➕
          ${getText("additionalServices", lang)}
        </h3>
        <div class="options-pills">
          ${options.map((opt) => `<span class="pill">${opt}</span>`).join("")}
        </div>
      </div>
    `;
  }
  return "";
}

// Updated getText function with language parameter
function getText(key, lang = "en") {
  const texts = {
    en: {
      receipt: "RECEIPT",
      receiptNo: "Receipt No",
      date: "Date",
      customerName: "Customer",
      orderNo: "Order",
      phone: "Phone",
      delivery: "Delivery",
      quantity: "Quantity",
      pcs: "Pcs",
      priority: "Priority",
      normal: "Normal",
      express: "EXPRESS",
      urgent: "URGENT",
      measurements: "Measurements",
      design: "Design & Style",
      scanTrack: "Scan to track",
      notes: "Notes",
      additionalServices: "Additional Services",
      total: "Total",
      paid: "Paid",
      balance: "Balance",
      currency: "SAR",
      term1: "All details verified at order placement",
      term2: "Present receipt at collection",
      signature: "Signature",
      thankYou: "Thank you for your trust!",
      // Measurements
      length: "Length",
      shoulder: "Shoulder",
      sleeveLength: "Sleeve L",
      sleeveWidth: "Sleeve W",
      chestWidth: "Chest",
      neck: "Neck",
      handWidth: "Hand",
      cuffLength: "Cuff",
      // Design
      jubjurType: "Jubjur",
      pocketType: "Pocket",
      cuffType: "Cuff",
      collarType: "Collar",
      garmentStyle: "Style",
      fabricType: "Fabric",
      color: "Color",
      // Additional
      doubleStitch: "Double Stitch",
      hiddenStitch: "Hidden Stitch",
      tailorTail: "Tailor Tail",
      jacket: "Jacket",
      embroidery: "Embroidery",
      specialRequest: "Special Request",
    },
    ar: {
      receipt: "إيصال",
      receiptNo: "رقم الإيصال",
      date: "التاريخ",
      customerName: "العميل",
      orderNo: "الطلب",
      phone: "الهاتف",
      delivery: "التسليم",
      quantity: "الكمية",
      pcs: "قطعة",
      priority: "الأولوية",
      normal: "عادي",
      express: "سريع",
      urgent: "عاجل",
      measurements: "القياسات",
      design: "التصميم والنمط",
      scanTrack: "امسح للتتبع",
      notes: "ملاحظات",
      additionalServices: "خدمات إضافية",
      total: "الإجمالي",
      paid: "المدفوع",
      balance: "المتبقي",
      currency: "ريال",
      term1: "تم التحقق من جميع التفاصيل",
      term2: "قدم الإيصال عند الاستلام",
      signature: "توقيع",
      thankYou: "شكراً لثقتكم!",
      // Measurements
      length: "الطول",
      shoulder: "الكتف",
      sleeveLength: "طول الكم",
      sleeveWidth: "عرض الكم",
      chestWidth: "الصدر",
      neck: "الرقبة",
      handWidth: "اليد",
      cuffLength: "الأساور",
      // Design
      jubjurType: "الجبجور",
      pocketType: "الجيب",
      cuffType: "الكبك",
      collarType: "الياقة",
      garmentStyle: "النمط",
      fabricType: "القماش",
      color: "اللون",
      // Additional
      doubleStitch: "خياطة مزدوجة",
      hiddenStitch: "خياطة مخفية",
      tailorTail: "ذيل الخياط",
      jacket: "جاكيت",
      embroidery: "تطريز",
      specialRequest: "طلب خاص",
    },
    bn: {
      receipt: "রসিদ",
      receiptNo: "রসিদ নং",
      date: "তারিখ",
      customerName: "গ্রাহক",
      orderNo: "অর্ডার",
      phone: "ফোন",
      delivery: "ডেলিভারি",
      quantity: "পরিমাণ",
      pcs: "পিস",
      priority: "অগ্রাধিকার",
      normal: "সাধারণ",
      express: "দ্রুত",
      urgent: "জরুরি",
      measurements: "পরিমাপ",
      design: "ডিজাইন ও স্টাইল",
      scanTrack: "ট্র্যাক করতে স্ক্যান করুন",
      notes: "নোট",
      additionalServices: "অতিরিক্ত সেবা",
      total: "মোট",
      paid: "পরিশোধিত",
      balance: "বকেয়া",
      currency: "রিয়াল",
      term1: "সকল বিবরণ যাচাই করা হয়েছে",
      term2: "সংগ্রহের সময় রসিদ দেখান",
      signature: "স্বাক্ষর",
      thankYou: "আপনার বিশ্বাসের জন্য ধন্যবাদ!",
      // Measurements
      length: "লম্বাই",
      shoulder: "কাঁধ",
      sleeveLength: "হাতার লম্বাই",
      sleeveWidth: "হাতার লুজ",
      chestWidth: "বুকের প্রস্থ",
      neck: "গলা",
      handWidth: "হাতার মুড়ি",
      cuffLength: "কাফ",
      // Design
      jubjurType: "জুব্বুর",
      pocketType: "পকেট",
      cuffType: "কাফ",
      collarType: "কলার",
      garmentStyle: "স্টাইল",
      fabricType: "কাপড়",
      color: "রঙ",
      // Additional
      doubleStitch: "ডাবল সেলাই",
      hiddenStitch: "লুকানো সেলাই",
      tailorTail: "টেইলর টেইল",
      jacket: "জ্যাকেট",
      embroidery: "সূচিকর্ম",
      specialRequest: "বিশেষ অনুরোধ",
    },
  };

  return texts[lang] && texts[lang][key]
    ? texts[lang][key]
    : texts["en"][key] || key;
}

// Updated helper functions with language parameter
function getCompanyName(lang = "en") {
  const names = {
    en: "SUHAIM TAILORING",
    ar: "خياطة سهيم",
    bn: "সুহাইম টেইলারিং",
  };
  return names[lang] || names.en;
}

function getCompanyTagline(lang = "en") {
  const taglines = {
    en: "Premium Men's Tailoring",
    ar: "خياطة رجالية فاخرة",
    bn: "প্রিমিয়াম পুরুষ টেইলারিং",
  };
  return taglines[lang] || taglines.en;
}

function getCompanyPhone() {
  return "+966 55 748 5529";
}

function getCompanyAddress(lang = "en") {
  const addresses = {
    en: "Riyadh, KSA",
    ar: "الرياض، السعودية",
    bn: "রিয়াদ, সৌদি আরব",
  };
  return addresses[lang] || addresses.en;
}

function formatReceiptDate(dateString, lang = "en") {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  if (lang === "ar") {
    return `${year}/${month}/${day}`;
  }
  return `${day}/${month}/${year}`;
}

// Single QR Code Generation function - API based
function generateQRCode(data) {
  const qrcodeElement = document.getElementById("qrcode");
  if (!qrcodeElement) {
    console.error("QR code element not found");
    return;
  }

  // Clear any existing content
  qrcodeElement.innerHTML = "";

  // Use QR Code API service
  const qrSize = 150;
  const qrData = encodeURIComponent(data);

  // Try multiple QR code APIs for redundancy
  const qrApis = [
    `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`,
    `https://chart.googleapis.com/chart?chs=${qrSize}x${qrSize}&cht=qr&chl=${qrData}`,
  ];

  // Create QR code with fallback
  const img = document.createElement("img");
  img.src = qrApis[0];
  img.alt = "QR Code";
  img.style.cssText =
    "width: 100px; height: 100px; border: 1px solid #ddd; padding: 5px; background: white;";

  // Handle error with fallback
  img.onerror = function () {
    this.onerror = null; // Prevent infinite loop
    if (qrApis[1]) {
      this.src = qrApis[1];
    } else {
      // Final fallback - display text
      const receiptId = data.split("=").pop() || data.substr(-8);
      qrcodeElement.innerHTML = `
        <div style="
          width: 100px; 
          height: 100px; 
          border: 2px solid #000; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-direction: column;
          font-size: 10px; 
          text-align: center; 
          padding: 5px;
          box-sizing: border-box;
          background: white;
        ">
          <div style="font-size: 24px; margin-bottom: 5px;">📱</div>
          <div style="font-weight: bold;">TRACK</div>
          <div style="font-size: 10px; margin-top: 2px;">${receiptId}</div>
        </div>
      `;
    }
  };

  qrcodeElement.appendChild(img);
}
