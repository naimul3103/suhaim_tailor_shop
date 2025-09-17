function generateReceipt(data) {
  const receiptContent = document.getElementById("receipt");

  // Determine current language
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
            <i class="fas fa-cut"></i>
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
        <span><i class="fas fa-phone"></i> ${getCompanyPhone()}</span>
        <span><i class="fas fa-map-marker-alt"></i> ${getCompanyAddress(
          currentLang
        )}</span>
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
            <i class="fas fa-ruler"></i>
            ${getText("measurements", currentLang)}
          </h3>
          <div class="data-grid">
            ${generateMinimalMeasurements(data, currentLang)}
          </div>
        </div>

        <!-- Design -->
        <div class="data-section">
          <h3 class="section-heading">
            <i class="fas fa-palette"></i>
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
              <i class="fas fa-sticky-note"></i>
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

  // Generate QR Code
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

// Generate minimal design
function generateMinimalDesign(data, lang) {
  const designs = [
    { key: "jubjurType", value: data.jubjurType },
    { key: "pocketType", value: data.pocketType },
    { key: "cuffType", value: data.cuffType },
    { key: "collarType", value: data.collarType },
    { key: "garmentStyle", value: data.garmentStyle },
    { key: "fabricType", value: data.fabricType },
    { key: "color", value: data.color },
  ];

  return designs
    .filter((d) => d.value && d.value !== "-")
    .map(
      (d) => `
      <div class="list-item">
        <span class="item-dot">•</span>
        <span class="item-text"><strong>${getText(d.key, lang)}:</strong> ${
        d.value
      }</span>
      </div>
    `
    )
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
          <i class="fas fa-plus-circle"></i>
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

// getText function with language parameter
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
      signture: "Signature",
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
      signature: "توقيع ",
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
      signture: "স্বাক্ষর",
      thankYou: "আপনার বিশ্বাসের জন্য ধন্যবাদ!",
      // Measurements
      length: "দৈর্ঘ্য",
      shoulder: "কাঁধ",
      sleeveLength: "হাতা দৈর্ঘ্য",
      sleeveWidth: "হাতা প্রস্থ",
      chestWidth: "বুক",
      neck: "গলা",
      handWidth: "হাত",
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

//helper functions with language parameter
function getCompanyName(lang = "en") {
  const names = {
    en: "SUHAIM TAILORING",
    ar: "خياطة سامي",
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

// Generate QR Code (unchanged)
function generateQRCode(data) {
  const qrcodeElement = document.getElementById("qrcode");
  if (qrcodeElement) {
    qrcodeElement.innerHTML = "";
    try {
      new QRCode(qrcodeElement, {
        text: data,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L,
      });
    } catch (error) {
      console.error("QR Code error:", error);
      qrcodeElement.innerHTML = `<div style="padding: 10px; border: 1px solid #ddd; font-size: 10px;">Track: ${data.substr(
        -8
      )}</div>`;
    }
  }
}
