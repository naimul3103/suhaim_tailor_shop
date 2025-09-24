// Language Management System

const translations = {
  en: {
    // Common
    loading: "Loading...",
    saving: "Saving...",
    search: "Search",
    print: "Print",
    download: "Download",
    close: "Close",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    yes: "Yes",
    no: "No",

    // Navigation
    searchCustomer: "Search Customer",
    trackOrder: "Track Order",
    whatsappSupport: "WhatsApp",

    // Business Info
    businessName: "Suhaim Ibrahim Muhammad Alfadhli Tailoring",
    businessTagline: "Premium Men's Tailoring Services",
    businessAddress: "Riyadh - Al Hamra District - Al Masane Street",
    businessPhone: "Phone: 0557450529 / 0517567996",

    // Form Steps
    stepCustomer: "Customer",
    stepMeasurements: "Measurements",
    stepDesign: "Design",
    stepPayment: "Payment",

    // Customer Information
    customerInfo: "Customer Information",
    customerName: "Customer Name",
    phoneNumber: "Phone Number",
    orderDate: "Order Date",
    deliveryDate: "Delivery Date",
    thobeCount: "Number of Thobes",
    priority: "Priority",
    priorityNormal: "Normal",
    priorityUrgent: "Urgent",
    priorityExpress: "Express (24h)",
    orderNumber: "Order #",

    // Measurements
    measurements: "Measurements",
    loadPrevious: "Load Previous",
    length: "Length",
    shoulder: "Shoulder",
    sleeveLength: "Sleeve Length",
    sleeveWidth: "Sleeve Width",
    chestWidth: "Chest Width",
    neck: "Neck",
    handWidth: "Hand Width",
    cuffLength: "Cuff Length",

    // Design Options
    designOptions: "Design Options",
    jubjurStyle: "Jubjur Style",
    jubjurBan: "Ban",
    jubjurMakfi: "Makfi",
    jubjurBan2: "Ban-II",
    jubjurMakfi2: "Makfi-II",
    pocketStyle: "Pocket Style",
    pocketRound1: "Round-I",
    pocketRoundPatch: "Round Patch",
    pocketStitch: "Stitch",
    pocketSquare: "Square",
    cuffStyle: "Cuff Style",
    cuff1: "Cuff-1",
    cuff2: "Cuff-2",
    cuff3: "Cuff-3",
    collarStyle: "Collar Style",
    collarButton: "Button",
    collarClassic: "Classic",
    collarShirt: "Shirt",
    garmentStyle: "Garment Style",
    styleSaudi: "Saudi",
    styleKuwaiti: "Kuwaiti",
    styleQatari: "Qatari",

    // Additional Options
    additionalOptions: "Additional Options",
    doubleStitch: "Double Stitch",
    hiddenStitch: "Hidden Stitch",
    tailorTail: "Tailor's Tail",
    jacket: "Jacket",
    embroidery: "Embroidery",
    specialRequest: "Special Request",

    // Fabric Details
    fabricDetails: "Fabric Details",
    fabricType: "Fabric Type",
    color: "Color",
    plain: "Plain",
    selectOption: "Select",

    // Payment
    paymentDetails: "Payment Details",
    totalAmount: "Total Amount",
    paidAmount: "Paid Amount",
    remainingAmount: "Remaining Amount",
    paymentMethod: "Payment Method",
    cash: "Cash",
    card: "Card",
    transfer: "Bank Transfer",
    notes: "Notes",

    // Actions
    saveAndPrint: "Save & Print Receipt",
    sendWhatsApp: "Send WhatsApp",
    newOrder: "New Order",

    // Messages
    orderSaved: "Order saved successfully!",
    errorSaving: "Error saving order. Please try again.",
    fieldRequired: "This field is required",
    fillRequired: "Please fill all required fields",
    measurementsLoaded: "Previous measurements loaded",
    noMeasurements: "No previous measurements found",
    errorLoading: "Error loading measurements",
    enterPhone: "Please enter phone number first",

    // Receipt
    receipt: "Receipt",
    receiptId: "Receipt ID",
    orderDetails: "Order Details",
    customerDetails: "Customer Details",
    measurementDetails: "Measurement Details",
    designDetails: "Design Details",
    paymentSummary: "Payment Summary",
    trackingInfo: "Tracking Information",
    thankYou: "Thank you for your trust!",
    scanQR: "Scan QR code to track order",

    // Order Status
    orderStatus: "Order Status",
    statusNew: "New",
    statusProgress: "In Progress",
    statusReady: "Ready",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",

    // Customer Profile
    customerProfile: "Customer Profile",
    searchByPhone: "Search by phone number",
    totalOrders: "Total Orders",
    totalSpent: "Total Spent",
    pendingAmount: "Pending Amount",
    latestMeasurements: "Latest Measurements",
    orderHistory: "Order History",
    noCustomerFound: "No customer found",
    memberSince: "Member since",
  },

  ar: {
    // Common
    loading: "جاري التحميل...",
    saving: "جاري الحفظ...",
    search: "بحث",
    print: "طباعة",
    download: "تحميل",
    close: "إغلاق",
    next: "التالي",
    previous: "السابق",
    submit: "إرسال",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    yes: "نعم",
    no: "لا",

    // Navigation
    searchCustomer: "البحث عن عميل",
    trackOrder: "تتبع الطلب",
    whatsappSupport: "واتساب",

    // Business Info
    businessName: "مؤسسة سجيم إبراهيم محمد الفضلي للخياطة",
    businessTagline: "خدمات الخياطة الرجالية الفاخرة",
    businessAddress: "الرياض - حي الحمراء - شارع المصانع",
    businessPhone: "الهاتف: 0557450529 / 0517567996",

    // Form Steps
    stepCustomer: "العميل",
    stepMeasurements: "القياسات",
    stepDesign: "التصميم",
    stepPayment: "الدفع",

    // Customer Information
    customerInfo: "معلومات العميل",
    customerName: "اسم العميل",
    phoneNumber: "رقم الهاتف",
    orderDate: "تاريخ الطلب",
    deliveryDate: "تاريخ التسليم",
    thobeCount: "عدد الثياب",
    priority: "الأولوية",
    priorityNormal: "عادي",
    priorityUrgent: "عاجل",
    priorityExpress: "سريع (24 ساعة)",
    orderNumber: "رقم الطلب",

    // Measurements
    measurements: "القياسات",
    loadPrevious: "تحميل السابق",
    length: "الطول",
    shoulder: "الكتف",
    sleeveLength: "طول الكم",
    sleeveWidth: "وسع الكم",
    chestWidth: "وسع الصدر",
    neck: "الرقبة",
    handWidth: "وسع اليد",
    cuffLength: "طول الكبك",

    // Design Options
    designOptions: "خيارات التصميم",
    jubjurStyle: "نوع الجبجور",
    jubjurBan: "بان",
    jubjurMakfi: "مخفي",
    jubjurBan2: "بان ٢",
    jubjurMakfi2: "مخفي ٢",
    pocketStyle: "نوع الجيب",
    pocketRound1: "دائري ١",
    pocketRoundPatch: "رقعة دائرية",
    pocketStitch: "مربع",
    pocketSquare: "مربع",
    cuffStyle: "نوع الكبك",
    cuff1: "كبك ١",
    cuff2: "كبك ٢",
    cuff3: "كبك ٣",
    collarStyle: "نوع الياقة",
    collarButton: "بأزرار",
    collarClassic: "كلاسيك",
    garmentStyle: "نوع الثوب",
    styleSaudi: "سعودي",
    styleKuwaiti: "كويتي",
    styleQatari: "قطري",

    // Additional Options
    additionalOptions: "خيارات إضافية",
    doubleStitch: "خياطة مزدوجة",
    hiddenStitch: "خياطة مخفية",
    tailorTail: "ذيل خياط",
    jacket: "جاكيت",
    embroidery: "تطريز",
    specialRequest: "طلب خاص",

    // Fabric Details
    fabricDetails: "تفاصيل القماش",
    fabricType: "نوع القماش",
    color: "اللون",
    plain: "سادة",
    selectOption: "اختر",

    // Payment
    paymentDetails: "تفاصيل الدفع",
    totalAmount: "القيمة الإجمالية",
    paidAmount: "المبلغ المدفوع",
    remainingAmount: "المبلغ المتبقي",
    paymentMethod: "طريقة الدفع",
    cash: "نقداً",
    card: "بطاقة",
    transfer: "تحويل بنكي",
    notes: "ملاحظات",

    // Actions
    saveAndPrint: "حفظ وطباعة الإيصال",
    sendWhatsApp: "إرسال واتساب",
    newOrder: "طلب جديد",

    // Messages
    orderSaved: "تم حفظ الطلب بنجاح!",
    errorSaving: "خطأ في حفظ الطلب. يرجى المحاولة مرة أخرى.",
    fieldRequired: "هذا الحقل مطلوب",
    fillRequired: "يرجى ملء جميع الحقول المطلوبة",
    measurementsLoaded: "تم تحميل القياسات السابقة",
    noMeasurements: "لم يتم العثور على قياسات سابقة",
    errorLoading: "خطأ في تحميل القياسات",
    enterPhone: "يرجى إدخال رقم الهاتف أولاً",

    // Receipt
    receipt: "الإيصال",
    receiptId: "رقم الإيصال",
    orderDetails: "تفاصيل الطلب",
    customerDetails: "تفاصيل العميل",
    measurementDetails: "تفاصيل القياسات",
    designDetails: "تفاصيل التصميم",
    paymentSummary: "ملخص الدفع",
    trackingInfo: "معلومات التتبع",
    thankYou: "شكراً لثقتكم بنا!",
    scanQR: "امسح رمز QR لتتبع الطلب",

    // Order Status
    orderStatus: "حالة الطلب",
    statusNew: "جديد",
    statusProgress: "قيد التنفيذ",
    statusReady: "جاهز",
    statusDelivered: "تم التسليم",
    statusCancelled: "ملغى",

    // Customer Profile
    customerProfile: "ملف العميل",
    searchByPhone: "البحث برقم الهاتف",
    totalOrders: "إجمالي الطلبات",
    totalSpent: "إجمالي المصروف",
    pendingAmount: "المبلغ المعلق",
    latestMeasurements: "آخر القياسات",
    orderHistory: "سجل الطلبات",
    noCustomerFound: "لم يتم العثور على عميل",
    memberSince: "عضو منذ",
  },

  bn: {
    // Common
    loading: "লোড হচ্ছে...",
    saving: "সংরক্ষণ হচ্ছে...",
    search: "অনুসন্ধান",
    print: "প্রিন্ট",
    download: "ডাউনলোড",
    close: "বন্ধ",
    next: "পরবর্তী",
    previous: "পূর্ববর্তী",
    submit: "জমা দিন",
    cancel: "বাতিল",
    delete: "মুছুন",
    edit: "সম্পাদনা",
    save: "সংরক্ষণ",
    yes: "হ্যাঁ",
    no: "না",

    // Navigation
    searchCustomer: "গ্রাহক খুঁজুন",
    trackOrder: "অর্ডার ট্র্যাক করুন",
    whatsappSupport: "হোয়াটসঅ্যাপ",

    // Business Info
    businessName: "সুহাইম ইব্রাহিম মুহাম্মদ আলফাদলি টেইলারিং",
    businessTagline: "প্রিমিয়াম পুরুষদের টেইলারিং সেবা",
    businessAddress: "রিয়াদ - আল হামরা জেলা - আল মাসানে রাস্তা",
    businessPhone: "ফোন: 055785529 / 0517567996",

    // Form Steps
    stepCustomer: "গ্রাহক",
    stepMeasurements: "পরিমাপ",
    stepDesign: "ডিজাইন",
    stepPayment: "পেমেন্ট",

    // Customer Information
    customerInfo: "গ্রাহক তথ্য",
    customerName: "গ্রাহকের নাম",
    phoneNumber: "ফোন নম্বর",
    orderDate: "অর্ডারের তারিখ",
    deliveryDate: "ডেলিভারির তারিখ",
    thobeCount: "পোশাকের সংখ্যা",
    priority: "অগ্রাধিকার",
    priorityNormal: "সাধারণ",
    priorityUrgent: "জরুরি",
    priorityExpress: "এক্সপ্রেস (২৪ ঘন্টা)",
    orderNumber: "অর্ডার #",

    // Measurements
    measurements: "পরিমাপ",
    loadPrevious: "পূর্ববর্তী লোড করুন",
    length: "লম্বাই",
    shoulder: "কাঁধ",
    sleeveLength: "হাতার লম্বাই",
    sleeveWidth: "হাতার লুজ",
    chestWidth: "বুকের প্রস্থ",
    neck: "গলা",
    handWidth: "হাতার মুড়ি",
    cuffLength: "কাফ",

    // Design Options
    designOptions: "ডিজাইন অপশন",
    jubjurStyle: "জুব্জুর স্টাইল",
    jubjurBan: "বান",
    jubjurMakfi: "মাখফি",
    jubjurBan2: "বান-২",
    jubjurMakfi2: "মাখফি-২",
    pocketStyle: "পকেট স্টাইল",
    pocketRound1: "গোল-১",
    pocketRoundPatch: "গোলাকার প্যাচ",
    pocketStitch: "সেলাই",
    pocketSquare: "চৌকো",
    cuffStyle: "কাফ স্টাইল",
    cuff1: "কাফ-১",
    cuff2: "কাফ-২",
    cuff3: "কাফ-৩",
    collarStyle: "কলার স্টাইল",
    collarButton: "বোতাম",
    collarClassic: "ক্লাসিক",
    collarShirt: "শার্ট",
    garmentStyle: "পোশাক স্টাইল",
    styleSaudi: "সৌদি",
    styleKuwaiti: "কুয়েতি",
    styleQatari: "কাতারি",

    // Additional Options
    additionalOptions: "অতিরিক্ত অপশন",
    doubleStitch: "ডাবল সেলাই",
    hiddenStitch: "লুকানো সেলাই",
    tailorTail: "টেইলার টেইল",
    jacket: "জ্যাকেট",
    embroidery: "এমব্রয়ডারি",
    specialRequest: "বিশেষ অনুরোধ",

    // Fabric Details
    fabricDetails: "কাপড়ের বিবরণ",
    fabricType: "কাপড়ের ধরন",
    color: "রং",
    plain: "সাদামাটা",
    selectOption: "নির্বাচন করুন",

    // Payment
    paymentDetails: "পেমেন্ট বিবরণ",
    totalAmount: "মোট পরিমাণ",
    paidAmount: "পরিশোধিত পরিমাণ",
    remainingAmount: "বাকি পরিমাণ",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    cash: "নগদ",
    card: "কার্ড",
    transfer: "ব্যাংক ট্রান্সফার",
    notes: "নোট",

    // Actions
    saveAndPrint: "সংরক্ষণ ও রসিদ প্রিন্ট",
    sendWhatsApp: "হোয়াটসঅ্যাপ পাঠান",
    newOrder: "নতুন অর্ডার",

    // Messages
    orderSaved: "অর্ডার সফলভাবে সংরক্ষিত হয়েছে!",
    errorSaving: "অর্ডার সংরক্ষণে ত্রুটি। আবার চেষ্টা করুন।",
    fieldRequired: "এই ক্ষেত্রটি প্রয়োজনীয়",
    fillRequired: "সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন",
    measurementsLoaded: "পূর্ববর্তী পরিমাপ লোড হয়েছে",
    noMeasurements: "কোন পূর্ববর্তী পরিমাপ পাওয়া যায়নি",
    errorLoading: "পরিমাপ লোড করতে ত্রুটি",
    enterPhone: "প্রথমে ফোন নম্বর লিখুন",

    // Receipt
    receipt: "রসিদ",
    receiptId: "রসিদ আইডি",
    orderDetails: "অর্ডার বিবরণ",
    customerDetails: "গ্রাহক বিবরণ",
    measurementDetails: "পরিমাপ বিবরণ",
    designDetails: "ডিজাইন বিবরণ",
    paymentSummary: "পেমেন্ট সারাংশ",
    trackingInfo: "ট্র্যাকিং তথ্য",
    thankYou: "আপনার বিশ্বাসের জন্য ধন্যবাদ!",
    scanQR: "অর্ডার ট্র্যাক করতে QR কোড স্ক্যান করুন",

    // Order Status
    orderStatus: "অর্ডার স্ট্যাটাস",
    statusNew: "নতুন",
    statusProgress: "প্রক্রিয়াধীন",
    statusReady: "প্রস্তুত",
    statusDelivered: "ডেলিভারি সম্পন্ন",
    statusCancelled: "বাতিল",

    // Customer Profile
    customerProfile: "গ্রাহক প্রোফাইল",
    searchByPhone: "ফোন নম্বর দিয়ে খুঁজুন",
    totalOrders: "মোট অর্ডার",
    totalSpent: "মোট খরচ",
    pendingAmount: "বকেয়া পরিমাণ",
    latestMeasurements: "সর্বশেষ পরিমাপ",
    orderHistory: "অর্ডার ইতিহাস",
    noCustomerFound: "কোন গ্রাহক পাওয়া যায়নি",
    memberSince: "সদস্য সময়কাল",
  },
};

// Get translation
function getTranslation(key) {
  return translations[currentLang][key] || translations["en"][key] || key;
}

// Change language
function changeLanguage(lang) {
  currentLang = lang;
  document.body.setAttribute("data-lang", lang);

  // Update direction
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  // Save preference
  localStorage.setItem("preferredLanguage", lang);

  // Update language selector
  document.getElementById("languageSelect").value = lang;

  // Update all text elements
  updatePageLanguage();
}

// Update page language
function updatePageLanguage() {
  // Update all elements with data-lang attribute
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll("[placeholder]").forEach((element) => {
    const key = element.getAttribute("data-placeholder-key");
    if (key && translations[currentLang][key]) {
      element.placeholder = translations[currentLang][key];
    }
  });

  // Update select options
  document.querySelectorAll("select option[data-lang]").forEach((option) => {
    const key = option.getAttribute("data-lang");
    if (translations[currentLang][key]) {
      option.textContent = translations[currentLang][key];
    }
  });
}

// Export for global use
window.getTranslation = getTranslation;
window.changeLanguage = changeLanguage;
