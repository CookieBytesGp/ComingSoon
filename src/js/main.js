/**
 * Coming Soon — main script
 * Clock, theme toggle, language (en/fa), mobile carousel.
 */

(function () {
  "use strict";

  var STORAGE_THEME = "coming-soon-theme";
  var STORAGE_LANG = "coming-soon-lang";

  // ——— Countdown timer to launch ———
  var LAUNCH_DATE = new Date("2026-09-21T00:00:00");
  function updateCountdown() {
    var el = document.querySelector("[data-countdown]");
    if (!el) return;

    var now = new Date();
    var diff = LAUNCH_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      el.textContent = "00:00:00";
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var remainder = totalSeconds % 86400;
    var h = Math.floor(remainder / 3600);
    remainder = remainder % 3600;
    var m = Math.floor(remainder / 60);
    var s = remainder % 60;

    var parts = [];
    if (days > 0) {
      parts.push(String(days).padStart(2, "0"));
    }
    parts.push(String(h).padStart(2, "0"));
    parts.push(String(m).padStart(2, "0"));
    parts.push(String(s).padStart(2, "0"));

    el.textContent = parts.join(":");
  }
  var countdownEl = document.querySelector("[data-countdown]");
  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ——— Theme toggle (dark / light) ———
  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_THEME) || "dark";
    } catch (e) {
      return "dark";
    }
  }
  function setTheme(value) {
    var root = document.documentElement;
    if (value === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
    try {
      localStorage.setItem(STORAGE_THEME, value);
    } catch (e) {}
    updateThemeButtons();
  }
  function updateThemeButtons() {
    var isDark = document.documentElement.classList.contains("dark");
    document.querySelectorAll("#theme-toggle, #theme-toggle-mobile").forEach(function (btn) {
      if (!btn) return;
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    });
  }
  function initTheme() {
    var saved = getTheme();
    setTheme(saved);
  }
  document.querySelectorAll("#theme-toggle, #theme-toggle-mobile").forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  });

  // ——— Language toggle (en / fa) ———
  function getLang() {
    try {
      return localStorage.getItem(STORAGE_LANG) || "en";
    } catch (e) {
      return "en";
    }
  }
  function setLang(value) {
    var root = document.documentElement;
    root.setAttribute("lang", value === "fa" ? "fa" : "en");
    root.setAttribute("dir", value === "fa" ? "rtl" : "ltr");
    try {
      localStorage.setItem(STORAGE_LANG, value);
    } catch (e) {}
    updateLangButtons();
    applyTranslations(value);
  }
  function updateLangButtons() {
    var lang = getLang();
    // Show the CURRENT language on the button (not the next one)
    var label = lang === "fa" ? "FA" : "EN";
    document.querySelectorAll("#lang-toggle, #lang-toggle-mobile").forEach(function (btn) {
      if (!btn) return;
      btn.textContent = label;
    });
  }
  // Simple key/value translations for EN / FA.
  // You can extend this object with more keys as needed.
  var TRANSLATIONS = {
    en: {
      "hero.line1": "Next Gen",
      "hero.line2": "Digital Interface",
      "hero.tagline": "Monitoring system integrity and data flow streams.",
      "hero.releaseLabel": "Site release",
      "hero.maintenanceCta": "Under maintenance / Follow us",

      "nav.comingSoon.heading": "Coming Soon (00)",
      "nav.comingSoon.placeholder": "Placeholder content for Coming Soon. This area will later show the real page for this tab.",

      "about.headingLine1": "WHO WE",
      "about.headingLine2": "ARE",
      "about.body":
        "CookieBytes is an engineering-driven group founded in 1400 (2021). We build tools and experiences that bridge design and code, with a focus on modular architecture, clarity, and long-term maintainability.",
      "about.badge.team": "TEAM",
      "about.badge.vision": "VISION",
      "about.storyCta": "Our story",
      "about.servicesCta": "Our services",
      "about.coords": "Location: Iran, Khorasan Razavi, Mashhad",
      "about.server": "",

      "works.dotnet.apiGateway.title": "API Gateway",
      "works.dotnet.apiGateway.status": "DEPLOYED",
      "works.dotnet.apiGateway.desc": "REST API and auth layer for microservices.",
      "works.dotnet.apiGateway.meta": "SIZE: 45MB · UPDATED: 2d AGO",

      "works.dotnet.dataPipeline.title": "Data Pipeline",
      "works.dotnet.dataPipeline.status": "STABLE",
      "works.dotnet.dataPipeline.desc": "ETL and background jobs on .NET Core.",
      "works.dotnet.dataPipeline.meta": "SIZE: 120MB · UPDATED: 1w AGO",

      "works.wordpress.clientPortal.title": "Client Portal",
      "works.wordpress.clientPortal.status": "LIVE",
      "works.wordpress.clientPortal.desc": "Custom theme and plugins for client dashboard.",
      "works.wordpress.clientPortal.meta": "SIZE: 28MB · UPDATED: 5d AGO",

      "works.angular.adminSpa.title": "Admin SPA",
      "works.angular.adminSpa.status": "BETA",
      "works.angular.adminSpa.desc": "Internal tools and reporting dashboard.",
      "works.angular.adminSpa.meta": "SIZE: 12MB · UPDATED: 1d AGO",

      "works.other.cliTools.title": "CLI Tools",
      "works.other.cliTools.status": "ARCHIVED",
      "works.other.cliTools.desc": "Scripts and automation utilities.",
      "works.other.cliTools.meta": "SIZE: 8MB · UPDATED: 2024-10",

      "social.liveFeed.header": "Activity log",
      "social.feed.bigApp": "Big application · HamNava app on Phase 2",
      "social.feed.chatNuget": "NuGet packages · chat package on tests",
      "social.feed.frontHelperNpm": "NPM publishing · front helper published",
      "social.feed.bigProject": "Big project · 1001Shab website on launch",
      "social.feed.wpProject": "WP project · Yildiz furniture stores online",
      "social.feed.mediaNuget": "NuGet package · media library on tests",
      "social.feed.centralSite": "Central · CookieBytes website on demo",
      "social.feed.notificationNuget": "NuGet package · notification package on tests",
      "social.feed.time.2h": "2h ago",
      "social.feed.time.5h": "5h ago",
      "social.feed.time.1d": "1d ago",
      "social.feed.time.2d": "2d ago",
      "social.feed.time.3d": "3d ago",
      "social.engagementLabel": "Engagement",

      "social.communityCard.title": "Community",
      "social.githubCard.title": "GitHub",
      "social.github.reposLabel": "Modules",
      "social.github.reposValue": "4 publishing modules",
      "social.github.highlight": "Pinned: cookiebytes-os",
      "social.updatesCard.title": "Updates",
      "social.status.signal": "SIGNAL",
      "social.status.strong": "STRONG",
      "social.status.secure": "SECURE",
      "social.status.stable": "STABLE",
      "social.status.encrypted": "ENCRYPTED",

      "modal.story.badge": "Group story",
      "modal.story.title": "How CookieBytes started",
      "modal.story.p1":
        "Our story started with a simple need: bring order to our work, organize our assets, and create a space where projects could grow without chaos. What began as a small cleanup quickly turned into a deeper interest in modularity, clean architecture, and scalable design principles.",
      "modal.story.p2":
        "Over time, that mindset shaped us into a team that cares about clarity, structure, and long-term thinking. We learned how powerful a well-designed system can be—and how, when it is done right, it unlocks creativity instead of getting in the way.",
      "modal.story.p3":
        "Now we are stepping into a new phase. We want to build systems that are not only reliable and scalable, but also meaningful, elegant, and distinctly ours. We know we are still at the beginning of a long road—one that leads to bigger projects, stronger infrastructure, and a community of developers who enjoy understanding how things work under the hood.",
      "modal.story.p4":
        "Our aim is to nurture a nerd-driven culture: a place where curiosity is valued, knowledge is shared, and people are encouraged to dig deeper, learn more, and build boldly.",

      "modal.services.badge": "Services",
      "modal.services.title": "What we can do for you",
      "modal.services.p1":
        "We help you turn ideas into a clear and strong digital presence. We take time to understand your goals, shape your story, and design a clean, scalable system that represents you on the web.",
      "modal.services.p2":
        "Whether you need a personal brand, a business platform, or a full digital ecosystem, we design it in a modular, future-ready way so it can grow with you instead of holding you back.",
      "modal.services.p3":
        "The result is a reliable digital identity that feels professional and intentional, while still being uniquely yours.",
      "modal.contactSend.badge": "Send email",
      "modal.contactSend.title": "Choose recipient",
      "modal.contactSend.desc": "Send your message and subject to one of the addresses below.",

      "contact.senderLabel": "Your name",
      "contact.subjectLabel": "Project subject",
      "contact.payloadLabel": "Project details",
      "contact.senderPlaceholder": "Tell us your name or team name...",
      "contact.subjectPlaceholder": "What do you want to create?",
      "contact.messagePlaceholder": "Share what you have in mind, any context, constraints, or ideas.",
      "contact.counter": "0/2048 BYTES",
      "contact.transmit": "TRANSMIT",
      "contact.senderTypeLabel": "I am contacting as",
      "contact.senderType.personal": "Individual",
      "contact.senderType.organization": "Organization",
      "contact.genderLabel": "Profile",
      "contact.gender.male": "Male",
      "contact.gender.female": "Female",
      "contact.group.heading": "Group contact",
      "contact.support1.heading": "Support 01",
      "contact.support2.heading": "Support 02",
      "contact.label.phone": "Phone",
      "contact.label.email": "Email",
      "contact.menu.sendEmail": "Send email",
      "contact.menu.chooseChannel": "Choose channel",
      "contact.menu.email": "Email",
      "contact.menu.sms": "Message",
      "contact.menu.sendSms": "Send message",
      "contact.error.senderRequired": "Please enter your name or team name.",
      "contact.error.subjectRequired": "Please enter a subject for your message.",
      "contact.error.messageRequired": "Please enter some details in the message field.",

      "nav.comingSoon.badge": "Coming Soon",
      "nav.comingSoon.title": "Coming Soon",
      "nav.comingSoon.desc": "Launch details and countdown to CookieBytes OS.",

      "nav.about.badge": "About",
      "nav.about.title": "About",
      "nav.about.desc": "Who we are and how CookieBytes OS was born.",

      "nav.works.badge": "Works",
      "nav.works.title": "Works",
      "nav.works.desc": "Selected projects, case studies, and experiments.",

      "nav.social.badge": "Social",
      "nav.social.title": "Social Media",
      "nav.social.desc": "Latest updates and streams from our channels.",

      "nav.contact.badge": "Contact",
      "nav.contact.title": "Contact",
      "nav.contact.desc": "Say hello, request a demo, or collaborate.",

      "ui.themeToggle.aria": "Toggle dark mode",
      "ui.themeToggle.title": "Dark / Light",
      "ui.langToggle.aria": "Switch language",
      "ui.langToggle.title": "English / فارسی"
    },
    fa: {
      "hero.line1": "نسل بعدی",
      "hero.line2": "رابط دیجیتال",
      "hero.tagline": "پایش سلامت سیستم و جریان‌های داده.",
      "hero.releaseLabel": "انتشار سایت",
      "hero.maintenanceCta": "در حال بروز رسانی / با ما همراه باشید",

      "nav.comingSoon.heading": "به‌زودی (۰۰)",
      "nav.comingSoon.placeholder": "محتوای موقت برای بخش به‌زودی. بعداً صفحه اصلی این تب اینجا نمایش داده می‌شود.",

      "about.headingLine1": "ما که",
      "about.headingLine2": "هستیم",
      "about.body":
        "گروه ما در سال ۱۴۰۰ شمسی با یک هدف ساده شروع شد: نظم‌دادن به کارها، دسته‌بندی دارایی‌ها و ساختن یک پایه‌ی تمیز برای آینده. امروز هم با همین نگاه، ابزارها و سیستم‌های ماژولاری می‌سازیم که بین طراحی و مهندسی تعادل ایجاد می‌کند و رشد آینده را ساده‌تر می‌کند.",
      "about.badge.team": "تیم",
      "about.badge.vision": "چشم‌انداز",
      "about.storyCta": "داستان ما",
      "about.servicesCta": "خدمات ما",
      "about.coords": "مکان: ایران، خراسان رضوی، مشهد",
      "about.server": "",

      "works.dotnet.apiGateway.title": "درگاه API",
      "works.dotnet.apiGateway.status": "در حال اجرا",
      "works.dotnet.apiGateway.desc": "لایه REST API و احراز هویت برای میکروسرویس‌ها.",
      "works.dotnet.apiGateway.meta": "حجم: ۴۵ مگابایت · به‌روزرسانی: ۲ روز پیش",

      "works.dotnet.dataPipeline.title": "مسیر داده",
      "works.dotnet.dataPipeline.status": "پایدار",
      "works.dotnet.dataPipeline.desc": "ETL و پردازش‌های پس‌زمینه بر پایه .NET Core.",
      "works.dotnet.dataPipeline.meta": "حجم: ۱۲۰ مگابایت · به‌روزرسانی: ۱ هفته پیش",

      "works.wordpress.clientPortal.title": "پرتال مشتری",
      "works.wordpress.clientPortal.status": "فعال",
      "works.wordpress.clientPortal.desc": "قالب و افزونه‌های سفارشی برای داشبورد مشتری.",
      "works.wordpress.clientPortal.meta": "حجم: ۲۸ مگابایت · به‌روزرسانی: ۵ روز پیش",

      "works.angular.adminSpa.title": "پنل ادمین SPA",
      "works.angular.adminSpa.status": "بتا",
      "works.angular.adminSpa.desc": "ابزارهای داخلی و داشبورد گزارش‌گیری.",
      "works.angular.adminSpa.meta": "حجم: ۱۲ مگابایت · به‌روزرسانی: ۱ روز پیش",

      "works.other.cliTools.title": "ابزارهای خط فرمان",
      "works.other.cliTools.status": "آرشیو شده",
      "works.other.cliTools.desc": "اسکریپت‌ها و ابزارهای خودکارسازی.",
      "works.other.cliTools.meta": "حجم: ۸ مگابایت · به‌روزرسانی: ۲۰۲۴-۱۰",

      "social.liveFeed.header": "گزارش فعالیت‌ها",
      "social.feed.bigApp": "اپلیکیشن بزرگ · HamNava در فاز دوم",
      "social.feed.chatNuget": "پکیج‌های NuGet · پکیج چت در حال تست",
      "social.feed.frontHelperNpm": "انتشار NPM · پکیج front-helper منتشر شد",
      "social.feed.bigProject": "پروژه بزرگ · وب‌سایت ۱۰۰۱شب در آستانه لانچ",
      "social.feed.wpProject": "پروژه وردپرس · فروشگاه آنلاین Yildiz Furniture",
      "social.feed.mediaNuget": "پکیج NuGet · Media Library در حال تست",
      "social.feed.centralSite": "مرکز · وب‌سایت CookieBytes روی دموی عمومی",
      "social.feed.notificationNuget": "پکیج NuGet · پکیج نوتیفیکیشن در حال تست",
      "social.feed.time.2h": "۲ ساعت پیش",
      "social.feed.time.5h": "۵ ساعت پیش",
      "social.feed.time.1d": "۱ روز پیش",
      "social.feed.time.2d": "۲ روز پیش",
      "social.feed.time.3d": "۳ روز پیش",
      "social.engagementLabel": "میزان تعامل",

      "social.communityCard.title": "کامیونیتی",
      "social.githubCard.title": "گیت‌هاب",
      "social.github.reposLabel": "ماژول‌ها",
      "social.github.reposValue": "۴ ماژول منتشرشده",
      "social.github.highlight": "Pinned: cookiebytes-os",
      "social.updatesCard.title": "به‌روزرسانی‌ها",
      "social.status.signal": "سیگنال",
      "social.status.strong": "قوی",
      "social.status.secure": "ایمن",
      "social.status.stable": "پایدار",
      "social.status.encrypted": "رمزشده",

      "modal.story.badge": "داستان گروه",
      "modal.story.title": "CookieBytes چطور شکل گرفت",
      "modal.story.p1":
        "داستان ما با یک نیاز ساده شروع شد: نظم‌دادن به کارها، دسته‌بندی دارایی‌ها و ساختن فضایی که پروژه‌ها بتوانند بدون هرج‌ومرج در آن رشد کنند. چیزی که در ابتدا فقط یک تلاش کوچک برای مرتب‌سازی بود، خیلی زود تبدیل شد به علاقه‌ای عمیق به ماژولار بودن، معماری تمیز و اصول طراحی مقیاس‌پذیر.",
      "modal.story.p2":
        "در طول زمان، این طرز فکر ما را به تیمی تبدیل کرد که به شفافیت، ساختار و تفکر بلندمدت اهمیت می‌دهد. فهمیدیم که یک سیستم خوب‌طراحی‌شده چقدر می‌تواند قدرتمند باشد—و چطور می‌تواند خلاقیت را آزاد کند، نه محدود.",
      "modal.story.p3":
        "حالا وارد مرحله‌ی جدیدی شده‌ایم. هدف ما ساخت سیستم‌هایی است که نه‌تنها قابل‌اعتماد و مقیاس‌پذیر باشند، بلکه معنا‌دار، زیبا و کاملاً منحصربه‌فرد هم باشند. ما تازه اول راهیم—راهی که به پروژه‌های بزرگ‌تر، زیرساخت‌های قوی‌تر و جامعه‌ای از توسعه‌دهندگان منتهی می‌شود که عاشق فهمیدن پشت‌صحنه‌ی کارها هستند.",
      "modal.story.p4":
        "هدف ما ساختن یک فرهنگ نِردی است: جایی که کنجکاوی ارزش دارد، دانش به اشتراک گذاشته می‌شود و همه تشویق می‌شوند عمیق‌تر یاد بگیرند، بیشتر بسازند و جسورانه‌تر حرکت کنند.",

      "modal.services.badge": "خدمات",
      "modal.services.title": "ما چه کمکی می‌کنیم",
      "modal.services.p1":
        "ما به شما کمک می‌کنیم ایده‌هایتان را به یک حضور دیجیتال واضح و قدرتمند تبدیل کنید. روند کار ما ساده اما دقیق است: هدف‌های شما را می‌فهمیم، داستانتان را شکل می‌دهیم و یک سیستم تمیز و مقیاس‌پذیر برای حضورتان در وب طراحی می‌کنیم.",
      "modal.services.p2":
        "چه به یک برند شخصی نیاز داشته باشید، چه یک پلتفرم تجاری یا یک اکوسیستم کامل دیجیتال، ما آن را به‌صورت ماژولار و آینده‌نگر طراحی می‌کنیم تا همراه شما رشد کند، نه در برابر شما.",
      "modal.services.p3":
        "در نهایت، یک هویت دیجیتال قابل‌اعتماد خواهید داشت که هم حرفه‌ای و معنادار است و هم به‌خوبی با شخصیت و هویت شما هم‌خوانی دارد.",
      "modal.contactSend.badge": "ارسال ایمیل",
      "modal.contactSend.title": "انتخاب گیرنده",
      "modal.contactSend.desc": "موضوع و متن خود را به یکی از آدرس‌های زیر ارسال کنید.",

      "contact.senderLabel": "هویت فرستنده",
      "contact.subjectLabel": "موضوع پروژه",
      "contact.payloadLabel": "جزئیات پروژه",
      "contact.senderPlaceholder": "نام خودتان یا نام تیم را بنویسید...",
      "contact.subjectPlaceholder": "درباره چه پروژه‌ای می‌خواهید صحبت کنید؟",
      "contact.messagePlaceholder": "آنچه در ذهن دارید، جزئیات، محدودیت‌ها و ایده‌ها را بنویسید.",
      "contact.counter": "۰/۲۰۴۸ بایت",
      "contact.transmit": "ارسال",
      "contact.senderTypeLabel": "نوع ارسال‌کننده",
      "contact.senderType.personal": "شخص حقیقی",
      "contact.senderType.organization": "سازمان / کسب‌وکار",
      "contact.genderLabel": "پروفایل",
      "contact.gender.male": "آقا",
      "contact.gender.female": "خانم",
      "contact.group.heading": "ارتباط با گروه",
      "contact.support1.heading": "پشتیبانی ۰۱",
      "contact.support2.heading": "پشتیبانی ۰۲",
      "contact.label.phone": "تلفن",
      "contact.label.email": "ایمیل",
      "contact.menu.sendEmail": "ارسال ایمیل",
      "contact.menu.chooseChannel": "انتخاب روش ارسال",
      "contact.menu.email": "ایمیل",
      "contact.menu.sms": "پیام",
      "contact.menu.sendSms": "ارسال پیام",
      "contact.error.senderRequired": "لطفاً نام خود یا نام مجموعه را وارد کنید.",
      "contact.error.subjectRequired": "لطفاً یک موضوع برای پیام خود بنویسید.",
      "contact.error.messageRequired": "لطفاً متن یا توضیحات درخواست را وارد کنید.",

      "nav.comingSoon.badge": "به‌زودی",
      "nav.comingSoon.title": "به‌زودی",
      "nav.comingSoon.desc": "جزئیات لانچ و شمارش معکوس CookieBytes OS.",

      "nav.about.badge": "درباره ما",
      "nav.about.title": "درباره",
      "nav.about.desc": "ما چه کسانی هستیم و CookieBytes OS چطور متولد شد.",

      "nav.works.badge": "کارها",
      "nav.works.title": "کارها",
      "nav.works.desc": "پروژه‌های منتخب، مطالعات موردی و آزمایش‌ها.",

      "nav.social.badge": "اجتماعی",
      "nav.social.title": "شبکه‌ها",
      "nav.social.desc": "آخرین به‌روزرسانی‌ها و استریم‌ها از کانال‌های ما.",

      "nav.contact.badge": "تماس",
      "nav.contact.title": "تماس",
      "nav.contact.desc": "سلام بفرستید، دموی محصول بخواهید یا برای همکاری پیام بدهید.",

      "ui.themeToggle.aria": "تغییر حالت روشن / تیره",
      "ui.themeToggle.title": "تیره / روشن",
      "ui.langToggle.aria": "تغییر زبان",
      "ui.langToggle.title": "English / فارسی"
    },
  };

  function applyTranslations(lang) {
    var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var text = dict[key];
      if (typeof text === "string") {
        el.textContent = text;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      var text = dict[key];
      if (typeof text === "string") {
        el.setAttribute("placeholder", text);
      }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (!key) return;
      var text = dict[key];
      if (typeof text === "string") {
        el.setAttribute("title", text);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      if (!key) return;
      var text = dict[key];
      if (typeof text === "string") {
        el.setAttribute("aria-label", text);
      }
    });
  }
  function initLang() {
    var saved = getLang();
    setLang(saved);
  }
  document.querySelectorAll("#lang-toggle, #lang-toggle-mobile").forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      var lang = getLang();
      setLang(lang === "fa" ? "en" : "fa");
    });
  });

  // ——— Carousel: right-rail cards + left content sync ———
  var track = document.getElementById("carousel-track");
  var slides = document.querySelectorAll(".carousel-slide");
  // Shared active index for wheel + click
  var carouselActiveIndex = 0;

  function initSlidePages(slidesList) {
    var pages = document.querySelectorAll(".slide-page");
    if (!pages.length) return function () {};

    var hero = document.getElementById("hero-view");
    var slidePagesSection = document.getElementById("slide-pages");
    var currentIndex = -1;

    function setActive(index, source) {
      var prevIndex = currentIndex;

      // clamp
      if (index < 0) index = 0;
      if (index >= slidesList.length) index = slidesList.length - 1;
      if (index === currentIndex) return;
      currentIndex = index;
      // Keep global index in sync for navigation shortcuts
      carouselActiveIndex = index;

      // When hero (index 0) is active, let clicks pass through slide pages
      if (slidePagesSection) {
        slidePagesSection.style.pointerEvents = index === 0 ? "none" : "auto";
      }

      var isRtl = document.documentElement.getAttribute("dir") === "rtl";
      var sign = isRtl ? -1 : 1;

      // Animate the previous "content" out (hero or page)
      if (prevIndex === 0 && hero) {
        hero.style.opacity = "0";
        hero.style.transform = "translateX(" + 24 * sign + "px)";
        hero.style.pointerEvents = "none";
      } else if (prevIndex > 0 && prevIndex < pages.length) {
        var prevPage = pages[prevIndex];
        prevPage.classList.add("page-visible");
        prevPage.style.opacity = "0";
        prevPage.style.transform = "translateX(" + 24 * sign + "px)";
        prevPage.style.pointerEvents = "none";
      }

      // Animate the new "content" in
      if (index === 0 && hero) {
        // Hero coming in
        hero.style.transition = "none";
        hero.style.opacity = "0";
        hero.style.pointerEvents = "none";
        hero.style.transform = "translateX(" + -24 * sign + "px)";
        void hero.offsetWidth; // force reflow
        hero.style.transition = "";
        hero.style.opacity = "1";
        hero.style.transform = "translateX(0)";
        hero.style.pointerEvents = "auto";

        // Hide all slide pages
        pages.forEach(function (page) {
          page.classList.remove("page-visible");
          page.style.opacity = "0";
          page.style.pointerEvents = "none";
        });
      } else {
        // A slide page is coming in
        if (hero) {
          hero.style.opacity = "0";
          hero.style.transform = "translateX(" + 24 * sign + "px)";
          hero.style.pointerEvents = "none";
        }

        if (index < pages.length) {
          var nextPage = pages[index];
          nextPage.style.transition = "none";
          nextPage.style.opacity = "0";
          nextPage.style.pointerEvents = "none";
          nextPage.style.transform = "translateX(" + -24 * sign + "px)";
          void nextPage.offsetWidth; // force reflow
          nextPage.style.transition = "";
          nextPage.classList.add("page-visible");
          nextPage.style.opacity = "1";
          nextPage.style.transform = "translateX(0)";
          nextPage.style.pointerEvents = "auto";
        }
      }

      slidesList.forEach(function (slideEl, i) {
        if (i === index) {
          slideEl.classList.add("is-active");
        } else {
          slideEl.classList.remove("is-active");
        }
      });
    }

    // Default: Coming Soon hero
    setActive(0, "init");

    return setActive;
  }

  if (track && slides.length) {
    var setActive = initSlidePages(slides);

    // Click: always activate the clicked card (desktop + mobile); on desktop keep card in view by centering in track
    slides.forEach(function (slide, index) {
      slide.addEventListener("click", function () {
        setActive(index, "click");
        if (window.matchMedia("(min-width: 768px)").matches) {
          scrollTrackToCenterSlide(track, slide);
        }
      });
    });

    // Scroll only the carousel track so the slide is centered (avoids document scroll pushing card out of view).
    function scrollTrackToCenterSlide(trackEl, slideEl) {
      if (!trackEl || !slideEl) return;
      var trackRect = trackEl.getBoundingClientRect();
      var slideRect = slideEl.getBoundingClientRect();
      var slideHeight = slideEl.offsetHeight;
      var trackHeight = trackEl.clientHeight;
      var slideTopInContent = (slideRect.top - trackRect.top) + trackEl.scrollTop;
      var maxScroll = trackEl.scrollHeight - trackHeight;
      var targetScrollTop = slideTopInContent + (slideHeight / 2) - (trackHeight / 2);
      targetScrollTop = Math.max(0, Math.min(maxScroll, Math.round(targetScrollTop)));
      trackEl.scrollTo({ top: targetScrollTop, behavior: "smooth" });
    }

    // Combined wheel handler:
    // - On desktop: use vertical wheel to move selection and scroll the right rail (track only).
    // - On mobile: convert vertical wheel to horizontal scroll (for touchpads).
    track.addEventListener(
      "wheel",
      function (e) {
        var isDesktop = window.matchMedia("(min-width: 768px)").matches;
        var isMobile = !isDesktop;

        if (isDesktop) {
          // Only react to primarily vertical motion
          if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
          e.preventDefault();

          var direction = e.deltaY > 0 ? 1 : -1;
          var nextIndex = carouselActiveIndex + direction;
          if (nextIndex < 0) nextIndex = 0;
          if (nextIndex >= slides.length) nextIndex = slides.length - 1;
          if (nextIndex === carouselActiveIndex) return;

          var targetSlide = slides[nextIndex];
          scrollTrackToCenterSlide(track, targetSlide);

          setActive(nextIndex, "wheel-desktop");
        } else if (isMobile) {
          // Help touchpads that send vertical wheel as scroll Y on mobile widths
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            track.scrollLeft += e.deltaY;
          }
        }
      },
      { passive: false }
    );

    // Mobile: when user scrolls horizontally, keep active card/content in sync.
    // Use getBoundingClientRect so the "centered" slide works with any scroll container,
    // padding, and RTL (offsetLeft/scrollLeft can be misleading in RTL).
    function updateActiveFromMobileScroll() {
      var isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) return;

      var trackRect = track.getBoundingClientRect();
      var visibleCenter = trackRect.left + track.clientWidth / 2;

      var bestIndex = 0;
      var bestDist = Infinity;

      slides.forEach(function (slide, idx) {
        var r = slide.getBoundingClientRect();
        var slideCenter = r.left + r.width / 2;
        var dist = Math.abs(slideCenter - visibleCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = idx;
        }
      });

      // Edge: when center-based choice is card 1 or card n-2, allow first/last to become active
      // only if that card is completely in view (not partially visible).
      var edge =
        bestIndex === 1 || bestIndex === slides.length - 2;
      var tol = 1;

      function fullyInView(slide) {
        var r = slide.getBoundingClientRect();
        return (
          r.left >= trackRect.left - tol &&
          r.right <= trackRect.right + tol
        );
      }

      if (edge) {
        if (fullyInView(slides[0])) {
          bestIndex = 0;
        } else if (fullyInView(slides[slides.length - 1])) {
          bestIndex = slides.length - 1;
        }
      }

      setActive(bestIndex, "scroll-mobile");
    }

    function onMobileScrollOrTouch() {
      var isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) return;
      if (tickingMobile) return;
      tickingMobile = true;
      requestAnimationFrame(function () {
        updateActiveFromMobileScroll();
        tickingMobile = false;
      });
    }

    var tickingMobile = false;
    track.addEventListener("scroll", onMobileScrollOrTouch);
    track.addEventListener("touchmove", onMobileScrollOrTouch, { passive: true });
    track.addEventListener("touchend", onMobileScrollOrTouch, { passive: true });
  }

  // ——— Modals (About: story / services) ———
  (function initModals() {
    var triggers = document.querySelectorAll("[data-modal-trigger]");
    if (!triggers.length) return;

    function openModal(id) {
      var modal = document.querySelector('[data-modal="' + id + '"]');
      if (!modal) return;
      modal.classList.remove("hidden");
      if (!modal.classList.contains("flex")) {
        modal.classList.add("flex");
      }
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      var focusTarget = modal.querySelector("[data-modal-close]") || modal;
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus();
      }
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      modal.setAttribute("aria-hidden", "true");

      var anyOpen = document.querySelector('[data-modal].flex:not(.hidden)');
      if (!anyOpen) {
        document.body.style.overflow = "";
      }
    }

    triggers.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-modal-trigger");
        if (!id) return;
        openModal(id);
      });
    });

    document.querySelectorAll("[data-modal]").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target && e.target.hasAttribute("data-modal-close")) {
          closeModal(modal);
        }
      });
      modal.querySelectorAll("[data-modal-close]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          closeModal(modal);
        });
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var open = document.querySelector('[data-modal].flex:not(.hidden)');
      if (open) {
        closeModal(open);
      }
    });
  })();

  // ——— Contact fingerprint action menu ———
  (function initContactActionMenu() {
    var trigger = document.querySelector("[data-contact-trigger]");
    var menu = document.querySelector("[data-contact-menu]");
    var backBtn = document.querySelector("[data-contact-back]");
    if (!trigger || !menu) return;

    var isMobile = function () {
      return window.matchMedia("(max-width: 767px)").matches;
    };

    var senderInput = document.querySelector('input[name="sender"]');
    var subjectInput = document.querySelector('input[name="subject"]');
    var messageInput = document.querySelector('textarea[name="message"]');
    var errorBox = document.querySelector("[data-contact-validation-errors]");

    function getContactValues() {
      var senderTypeEl = document.querySelector('input[name="senderType"]:checked');
      var senderType = senderTypeEl ? senderTypeEl.value : "";
      var senderGenderEl =
        senderType === "personal"
          ? document.querySelector('input[name="senderGender"]:checked')
          : null;
      return {
        sender: senderInput ? senderInput.value.trim() : "",
        subject: subjectInput ? subjectInput.value.trim() : "",
        message: messageInput ? messageInput.value.trim() : "",
        senderType: senderType,
        senderGender: senderGenderEl ? senderGenderEl.value : "",
      };
    }

    function markFieldError(inputEl, hasError) {
      if (!inputEl) return;
      var packet = inputEl.closest(".contact-input-packet");
      if (!packet) return;
      if (hasError) {
        packet.classList.add("contact-field-error");
      } else {
        packet.classList.remove("contact-field-error");
      }
    }

    function validateContact() {
      var v = getContactValues();
      var errors = [];

      var senderEmpty = !v.sender;
      var subjectEmpty = !v.subject;
      var messageEmpty = !v.message;

      markFieldError(senderInput, senderEmpty);
      markFieldError(subjectInput, subjectEmpty);
      markFieldError(messageInput, messageEmpty);

      if (!errorBox) {
        return !(senderEmpty || subjectEmpty || messageEmpty);
      }

      var lang = getLang();
      var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

      if (senderEmpty) {
        errors.push(
          dict["contact.error.senderRequired"] || "Please enter your name or team name."
        );
      }
      if (subjectEmpty) {
        errors.push(
          dict["contact.error.subjectRequired"] || "Please enter a subject for your message."
        );
      }
      if (messageEmpty) {
        errors.push(
          dict["contact.error.messageRequired"] ||
            "Please enter some details in the message field."
        );
      }

      if (errors.length) {
        errorBox.innerHTML = errors
          .map(function (msg) {
            return "<div>• " + msg + "</div>";
          })
          .join("");
        errorBox.classList.remove("hidden");
        return false;
      } else {
        errorBox.innerHTML = "";
        errorBox.classList.add("hidden");
        return true;
      }
    }

    function attachFieldValidation(inputEl) {
      if (!inputEl) return;
      ["blur", "input"].forEach(function (evt) {
        inputEl.addEventListener(evt, function () {
          validateContact();
        });
      });
    }

    attachFieldValidation(senderInput);
    attachFieldValidation(subjectInput);
    attachFieldValidation(messageInput);

    function makeContactBody(lang, v) {
      var lines = [];
      var isPersonal = v.senderType === "personal";

      if (lang === "fa") {
        var greeting = "با سلام";
        if (isPersonal) {
          var genderWord =
            v.senderGender === "female"
              ? "خانم"
              : v.senderGender === "male"
              ? "آقای"
              : "";
          var namePart = v.sender ? (genderWord ? genderWord + " " + v.sender : v.sender) : "";
          if (namePart) {
            lines.push(greeting + "، از طرف " + namePart);
          } else {
            lines.push(greeting);
          }
        } else {
          if (v.sender) {
            lines.push(greeting + "، از طرف مجموعه " + v.sender);
          } else {
            lines.push(greeting);
          }
        }

        if (v.subject) {
          lines.push("موضوع: «" + v.subject + "»");
        }
        if (v.message) {
          lines.push("");
          lines.push("جزئیات درخواست:");
          lines.push(v.message);
        }
      } else {
        var intro = "Hello";
        if (isPersonal && v.sender) {
          var genderEn =
            v.senderGender === "female"
              ? "Ms."
              : v.senderGender === "male"
              ? "Mr."
              : "";
          if (genderEn) {
            intro += ", this is " + genderEn + " " + v.sender;
          } else {
            intro += ", this is " + v.sender;
          }
        } else if (!isPersonal && v.sender) {
          intro += ", from " + v.sender;
        }
        lines.push(intro + ".");

        if (v.subject) {
          lines.push("Project subject: " + v.subject);
        }
        if (v.message) {
          lines.push("");
          lines.push("Details and context:");
          lines.push(v.message);
        }
      }

      return lines.join("\n");
    }

    function buildEmailHref(to) {
      var v = getContactValues();
      var lang = getLang();
      var subject =
        v.subject || (v.sender ? "Contact from " + v.sender : "CookieBytes contact");
      var body = makeContactBody(lang, v);

      var params = [];
      if (subject) params.push("subject=" + encodeURIComponent(subject));
      if (body) params.push("body=" + encodeURIComponent(body));
      var query = params.length ? "?" + params.join("&") : "";
      return "mailto:" + to + query;
    }

    function buildSmsHref(phone) {
      var v = getContactValues();
      var lang = getLang();
      var body = makeContactBody(lang, v);
      var query = body ? "?body=" + encodeURIComponent(body) : "";
      return "sms:" + phone + query;
    }

    function renderDesktopEmailOptions() {
      var lang = getLang();
      var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      var sendEmailLabel = dict["contact.menu.sendEmail"] || "Send email";
      var groupLabel = dict["contact.group.heading"] || "Group contact";
      var support1Label = dict["contact.support1.heading"] || "Support 01";
      var support2Label = dict["contact.support2.heading"] || "Support 02";
      menu.innerHTML = [
        '<div class="text-primary text-xs font-bold tracking-widest uppercase mb-1">' + sendEmailLabel + "</div>",
        '<button type="button" data-contact-email="group" class="block w-full text-left mb-1 hover:text-primary transition-colors">' + groupLabel + ': cookiebytesgp@gmail.com</button>',
        '<button type="button" data-contact-email="s1" class="block w-full text-left mb-1 hover:text-primary transition-colors">' + support1Label + ': mohamadazadi1369@gmail.com</button>',
        '<button type="button" data-contact-email="s2" class="block w-full text-left hover:text-primary transition-colors">' + support2Label + ': mkooshafar2@gmail.com</button>',
      ].join("");
    }

    function renderMobileRoot() {
      var lang = getLang();
      var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      var chooseLabel = dict["contact.menu.chooseChannel"] || "Choose channel";
      var emailLabel = dict["contact.menu.email"] || "Email";
      var smsLabel = dict["contact.menu.sms"] || "Message";
      menu.innerHTML = [
        '<div class="text-primary text-xs font-bold tracking-widest uppercase mb-1">' + chooseLabel + "</div>",
        '<div class="flex gap-2">',
        '<button type="button" data-contact-step="email" class="flex-1 px-2 py-1 border border-primary/40 rounded hover:bg-primary/10 hover:text-primary transition-colors">' + emailLabel + "</button>",
        '<button type="button" data-contact-step="sms" class="flex-1 px-2 py-1 border border-primary/40 rounded hover:bg-primary/10 hover:text-primary transition-colors">' + smsLabel + "</button>",
        "</div>",
      ].join("");
    }

    function renderMobileEmailOptions() {
      var lang = getLang();
      var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      var sendEmailLabel = dict["contact.menu.sendEmail"] || "Send email";
      var groupLabel = dict["contact.group.heading"] || "Group contact";
      var support1Label = dict["contact.support1.heading"] || "Support 01";
      var support2Label = dict["contact.support2.heading"] || "Support 02";
      menu.innerHTML = [
        '<div class="text-primary text-xs font-bold tracking-widest uppercase mb-1">' + sendEmailLabel + "</div>",
        '<button type="button" data-contact-email="group" class="block w-full text-left mb-1 hover:text-primary transition-colors">' + groupLabel + ': cookiebytesgp@gmail.com</button>',
        '<button type="button" data-contact-email="s1" class="block w-full text-left mb-1 hover:text-primary transition-colors">' + support1Label + ': mohamadazadi1369@gmail.com</button>',
        '<button type="button" data-contact-email="s2" class="block w-full text-left hover:text-primary transition-colors">' + support2Label + ': mkooshafar2@gmail.com</button>',
      ].join("");
    }

    function renderMobileSmsOptions() {
      var lang = getLang();
      var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      var sendSmsLabel = dict["contact.menu.sendSms"] || "Send message";
      var support1Label = dict["contact.support1.heading"] || "Support 01";
      var support2Label = dict["contact.support2.heading"] || "Support 02";
      menu.innerHTML = [
        '<div class="text-primary text-xs font-bold tracking-widest uppercase mb-1">' + sendSmsLabel + "</div>",
        '<button type="button" data-contact-sms="s1" class="block w-full text-left mb-1 hover:text-primary transition-colors">' + support1Label + ': +98 938 438 3901</button>',
        '<button type="button" data-contact-sms="s2" class="block w-full text-left hover:text-primary transition-colors">' + support2Label + ': +98 996 337 8452</button>',
      ].join("");
    }

    var formWrapper = document.querySelector("[data-contact-form]");
    var cardsWrapper = document.querySelector("[data-contact-cards]");
    var genderGroup = document.querySelector("[data-gender-group]");
    var typeRadios = document.querySelectorAll('input[name="senderType"]');
    var mobileFormOpen = false;

    function showMobileForm() {
      mobileFormOpen = true;
      if (formWrapper) formWrapper.classList.add("contact-form-visible");
      if (cardsWrapper) cardsWrapper.classList.add("contact-cards-hidden");
      trigger.classList.add("contact-fingerprint-active");
      if (backBtn) backBtn.classList.add("contact-back-visible");
    }

    function resetMobileView() {
      mobileFormOpen = false;
      if (formWrapper) formWrapper.classList.remove("contact-form-visible");
      if (cardsWrapper) cardsWrapper.classList.remove("contact-cards-hidden");
      trigger.classList.remove("contact-fingerprint-active");
      if (backBtn) backBtn.classList.remove("contact-back-visible");
    }

    function updateGenderVisibility() {
      if (!genderGroup || !typeRadios.length) return;
      var isPersonal = false;
      typeRadios.forEach(function (r) {
        if (r.checked && r.value === "personal") isPersonal = true;
      });
      genderGroup.style.display = isPersonal ? "" : "none";
    }
    updateGenderVisibility();
    typeRadios.forEach(function (r) {
      r.addEventListener("change", updateGenderVisibility);
    });

    var contactModal = document.querySelector('[data-modal="contact-send"]');

    function openContactModal() {
      if (!contactModal) return;
      contactModal.classList.remove("hidden");
      contactModal.classList.add("flex");
      contactModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeContactModal() {
      if (!contactModal) return;
      contactModal.classList.add("hidden");
      contactModal.classList.remove("flex");
      contactModal.setAttribute("aria-hidden", "true");
      var anyOpen = document.querySelector('[data-modal].flex:not(.hidden)');
      if (!anyOpen) document.body.style.overflow = "";
    }

    function openMenu() {
      menu.classList.remove("hidden");
      if (isMobile()) {
        renderMobileRoot();
      } else {
        renderDesktopEmailOptions();
      }
      document.addEventListener("click", onDocumentClick, true);
    }

    function closeMenu() {
      menu.classList.add("hidden");
      document.removeEventListener("click", onDocumentClick, true);
    }

    function onDocumentClick(e) {
      if (trigger.contains(e.target) || menu.contains(e.target)) return;
      closeMenu();
    }

    trigger.addEventListener("click", function () {
      if (isMobile()) {
        if (!mobileFormOpen) {
          showMobileForm();
          return;
        }
      }
      if (isMobile()) {
        if (menu.classList.contains("hidden")) {
          openMenu();
        } else {
          closeMenu();
        }
      } else {
        if (contactModal && contactModal.classList.contains("hidden")) {
          if (!validateContact()) return;
          openContactModal();
        } else if (contactModal && !contactModal.classList.contains("hidden")) {
          closeContactModal();
        }
      }
    });

    if (contactModal) {
      contactModal.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-contact-modal-email]");
        if (!btn) return;
        if (!validateContact()) return;
        var target = btn.getAttribute("data-contact-modal-email");
        var to =
          target === "group"
            ? "cookiebytesgp@gmail.com"
            : target === "s1"
            ? "mohamadazadi1369@gmail.com"
            : "mkooshafar2@gmail.com";
        window.location.href = buildEmailHref(to);
        closeContactModal();
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
        resetMobileView();
      });
    }

    menu.addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-contact-step]");
      if (stepBtn) {
        var step = stepBtn.getAttribute("data-contact-step");
        if (step === "email") {
          renderMobileEmailOptions();
        } else if (step === "sms") {
          renderMobileSmsOptions();
        }
        return;
      }

      var emailBtn = e.target.closest("[data-contact-email]");
      if (emailBtn) {
        if (!validateContact()) return;
        var target = emailBtn.getAttribute("data-contact-email");
        var to =
          target === "group"
            ? "cookiebytesgp@gmail.com"
            : target === "s1"
            ? "mohamadazadi1369@gmail.com"
            : "mkooshafar2@gmail.com";
        window.location.href = buildEmailHref(to);
        closeMenu();
        if (isMobile()) resetMobileView();
        return;
      }

      var smsBtn = e.target.closest("[data-contact-sms]");
      if (smsBtn) {
        if (!validateContact()) return;
        var sTarget = smsBtn.getAttribute("data-contact-sms");
        var phone = sTarget === "s1" ? "+989384383901" : "+989963378452";
        window.location.href = buildSmsHref(phone);
        closeMenu();
        if (isMobile()) resetMobileView();
      }
    });
  })();

  // ——— Works: accordion with animated open/close (class-driven so CSS transitions run) ———
  (function initWorksAccordion() {
    var worksPage = document.querySelector(".works-page");
    if (!worksPage) return;
    var folders = worksPage.querySelectorAll("details.works-folder");
    var OPEN_CLASS = "works-folder-open";

    function closeFolder(detailsEl) {
      var content = detailsEl.querySelector(".works-folder-content");
      if (!content) return;
      detailsEl.classList.remove(OPEN_CLASS);
      content.addEventListener("transitionend", function te(e) {
        if (e.propertyName !== "max-height") return;
        content.removeEventListener("transitionend", te);
        detailsEl.open = false;
      });
    }

    function openFolder(detailsEl) {
      detailsEl.classList.add(OPEN_CLASS);
      detailsEl.open = true;
    }

    folders.forEach(function (detailsEl) {
      if (detailsEl.hasAttribute("open")) detailsEl.classList.add(OPEN_CLASS);
      detailsEl.querySelector("summary").addEventListener("click", function (e) {
        e.preventDefault();
        var isOpen = detailsEl.classList.contains(OPEN_CLASS);
        if (isOpen) {
          closeFolder(detailsEl);
        } else {
          folders.forEach(function (other) {
            if (other !== detailsEl && other.classList.contains(OPEN_CLASS)) closeFolder(other);
          });
          openFolder(detailsEl);
        }
      });
    });
  })();

  // ——— Init ———
  initTheme();
  initLang();
})();
