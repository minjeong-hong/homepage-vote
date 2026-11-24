/* CJ Wellcare mockup v8 (SEED 적용) — shared page banner / top navigation / closing section / footer + interactions.
   Header and footer are rendered from JS so every page shares one source and the mockup still works
   when opened straight from the file system (no fetch, no modules, no storage). */
(function () {
  "use strict";

  var S = ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  var F = ' viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"';
  var ICON = {
    arrow: '<svg class="icon icon--arrow"' + S + '><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev: '<svg class="icon"' + S + '><path d="M6 9l6 6 6-6"/></svg>',
    left: '<svg class="icon"' + S + '><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg class="icon"' + S + '><path d="M9 6l6 6-6 6"/></svg>',
    ext: '<svg class="icon"' + S + '><path d="M7 17L17 7M9 7h8v8"/></svg>',
    bag: '<svg class="icon"' + S + '><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    mail: '<svg class="icon"' + S + '><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>',
    insta: '<svg class="icon"' + S + '><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    yt: '<svg class="icon"' + S + '><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
    empty: '<svg class="icon"' + S + '><path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M4 7l2-3h12l2 3M9 12h6"/></svg>',
    /* SEED: Callout · Page Banner의 앞 아이콘은 Fill 타입 */
    info: '<svg class="icon"' + F + '><path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4.8a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM10.9 11h2.2v6.4h-2.2z"/></svg>',
    warn: '<svg class="icon"' + F + '><path fill-rule="evenodd" d="M12 2.6c.5 0 1 .3 1.3.8l8.6 15c.6 1-.1 2.2-1.3 2.2H3.4c-1.200 0-1.900-1.200-1.300-2.200l8.600-15c.3-.5.800-.8 1.300-.8zM10.900 9v5.400h2.200V9zm1.100 6.800a1.300 1.300 0 1 0 0 2.600 1.300 1.300 0 0 0 0-2.600z"/></svg>',
    check: '<svg class="icon"' + F + '><path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.900 7.800l-5.600 5.700a1 1 0 0 1-1.400 0l-2.800-2.800 1.400-1.400 2.100 2.100 4.900-5z"/></svg>',
    flask: '<svg class="icon"' + F + '><path fill-rule="evenodd" d="M9 2h6v2h-1v5.300l5.300 9.200A2.300 2.300 0 0 1 17.300 22H6.700a2.300 2.300 0 0 1-2-3.500L10 9.300V4H9zm.700 12l-1.700 3h8l-1.700-3z"/></svg>',
    bell: '<svg class="icon"' + F + '><path d="M12 2a7 7 0 0 0-7 7v3.600l-1.700 3.200A1.500 1.500 0 0 0 4.600 18h14.800a1.500 1.500 0 0 0 1.300-2.200L19 12.600V9a7 7 0 0 0-7-7zm-2.500 17.500a2.500 2.500 0 0 0 5 0z"/></svg>'
  };

  // GNB follows the menu drawn in the contest brief: Health · Science · Products · Learn · About
  var NAV = [
    {
      id: "health", label: "Health", href: "health.html",
      intro: { title: "고민에서 시작하세요", text: '장 건강부터 이너뷰티, 수면&nbsp;· 두뇌, 기초영양, <span class="text-nowrap">K-웰니스까지.</span> 내 몸의 <span class="text-nowrap">고민에서 출발해</span> 근거와 제품을 함께 볼 수 있어요.' },
      links: [
        ["health.html#gut", "장 건강", "Gut Health"],
        ["health.html#beauty", "이너뷰티", "Beauty"],
        ["health.html#mental", "수면&nbsp;· 두뇌", "Mental"],
        ["health.html#nutrition", "기초영양", "Basic Nutrition"],
        ["health.html#kwellness", '<span class="text-nowrap">K-웰니스</span>', '<span class="text-nowrap">K-Wellness</span>'],
        ["health.html#routine", "24시간 웰니스 루틴", "Morning&nbsp;· Day&nbsp;· Night"]
      ],
      feature: { img: "assets/img/gen/routine-morning.jpg", kicker: "24H Routine", title: "아침부터 밤까지, 하루의 흐름대로", href: "health.html#routine" }
    },
    {
      id: "science", label: "Science", href: "science.html", science: true,
      intro: { title: "근거가 먼저예요", text: '김치 유래 유산균 3,500여\u00a0개에서 <span class="text-nowrap">시작한 CJ의 연구와</span> <span class="text-nowrap">CJ바이오사이언스가 더한</span> <span class="text-nowrap">마이크로바이옴 기술을</span> 공개해요.' },
      links: [
        ["science.html#overview", "과학 한눈에", "Overview"],
        ["science.html#chain", "기술 → 제품 → 고객", "연구가 일상이 되는 과정"],
        ["science.html#microbiome", "마이크로바이옴 연구", "4가지 연구 축"],
        ["science.html#strains", "핵심 균주 자산", "CJLP133 외 대표 균주 5종"],
        ["evidence.html", "연구 성과&nbsp;· 논문", "인체적용시험&nbsp;· 논문 19편"],
        ["science.html#partners", "연구 파트너", "CJ바이오사이언스 외"]
      ],
      feature: { img: "assets/img/gen/micro-hero.jpg", kicker: "Evidence at a glance", title: "인체적용시험과 논문 19편을 한눈에", href: "evidence.html" }
    },
    {
      id: "products", label: "Products", href: "products.html",
      intro: { title: "12개 브랜드, 하나의 기준", text: '모든 브랜드는 <span class="text-nowrap">과학적 근거에서</span> 출발해요. 브랜드마다 담긴 균주와 기술을 <span class="text-nowrap">함께 확인해 보세요.</span>' },
      links: [
        ["products.html", "전체 브랜드", "12 Brands"],
        ["brand-biocore.html", "바이오코어", "고함량&nbsp;· 고기능성 유산균"],
        ["products.html#gut", "맥플랜", "MAC 식이섬유&nbsp;· NEW"],
        ["products.html#beauty", "이너비", "이너뷰티"],
        ["products.html#mental", "멜라메이트&nbsp;· 메모리메이트", "수면&nbsp;· 두뇌"],
        ["products.html#kwellness", "한뿌리&nbsp;· 제일건강원", '<span class="text-nowrap">K-웰니스</span>']
      ],
      feature: { img: "assets/img/kv/macplan.jpg", kicker: "New&nbsp;· with CJ Bioscience", title: "미생물을 위한 식사, 맥플랜", href: "products.html#gut" }
    },
    {
      id: "learn", label: "Learn", href: "learn.html",
      intro: { title: "과학으로 읽는 일상", text: '연구원이 검수한 웰니스 저널과 <span class="text-nowrap">K-웰니스 이야기,</span><br>CJ웰케어의 새 소식을 전해요.' },
      links: [
        ["learn.html#journal", "웰니스 저널", "연구원이 검수한 건강 정보"],
        ["learn.html#heritage", '<span class="text-nowrap">K-웰니스</span> 헤리티지', "발효&nbsp;· 흑삼&nbsp;· 보양"],
        ["learn.html#letter", "웰니스 레터", "한 달에 한 번, 뉴스레터"],
        ["news.html", "뉴스룸", "보도자료&nbsp;· 캠페인&nbsp;· 공고"]
      ],
      feature: { img: "assets/img/gen/journal-ferment.jpg", kicker: "Wellness Journal", title: "김치 한 접시에 담긴 미생물 이야기", href: "learn.html#journal" }
    },
    {
      id: "about", label: "About", href: "about.html",
      intro: { title: 'The <span class="text-nowrap">K-Lifestyle</span> Wellness <span class="text-nowrap">Solution Provider</span>', text: '2002년 CJ뉴트라에서 시작해 <span class="text-nowrap">2022년 독립한</span> 헬스케어 솔루션 <span class="text-nowrap">전문 기업이에요.</span>' },
      links: [
        ["about.html#vision", "비전&nbsp;· 미션", "Vision & Mission"],
        ["about.html#values", "핵심가치&nbsp;· 성장 전략", "Core Values"],
        ["about.html#ceo", "CEO 메시지", "대표이사 인사말"],
        ["about.html#history", "연혁", "2002&nbsp;– Present"],
        ["about.html#contact", "고객센터&nbsp;· 문의", "Contact"],
        ["sitemap.html", "메뉴 구성 제안", "사이트맵"]
      ],
      feature: { img: "assets/img/gen/about-team.jpg", kicker: "Our Vision", title: '한국인의 일상에서 <span class="text-nowrap">검증한 웰니스를</span> 세계로', href: "about.html#vision" }
    }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function listItem(href, title, detail, prefix) {
    return '<a class="list-item" href="' + href + '">' + (prefix || "") +
      '<span class="list-item__body"><span class="list-item__title">' + title + "</span>" +
      (detail ? '<span class="list-item__detail">' + detail + "</span>" : "") + "</span>" +
      '<span class="list-item__suffix">' + ICON.right + "</span></a>";
  }

  function dropHTML(n) {
    var links = n.links.map(function (l) { return "<li>" + listItem(l[0], l[1], l[2]) + "</li>"; }).join("");
    return '<div class="drop" role="region" aria-label="' + n.label + ' 하위 메뉴"><div class="container drop__inner">' +
      '<div class="drop__intro"><p class="label' + (n.science ? " label--brand" : "") + '">' + n.label + '</p><p class="title-3">' + n.intro.title + '</p><p class="body-3">' + n.intro.text + "</p></div>" +
      '<ul class="drop__links">' + links + "</ul>" +
      '<a class="drop__feature" href="' + n.feature.href + '"><img src="' + n.feature.img + '" alt="" loading="lazy"><div><span class="caption">' + n.feature.kicker + "</span><b>" + n.feature.title + "</b></div></a>" +
      "</div></div>";
  }

  function headerHTML() {
    var items = NAV.map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      var cls = "gnb__link" + (n.science ? " gnb__link--science" : "");
      return '<li class="gnb__item"><a class="' + cls + '" href="' + n.href + '"' + cur + "><span>" + n.label + "</span>" + ICON.chev + "</a>" + dropHTML(n) + "</li>";
    }).join("");
    return '<a class="skip-link action-button action-button--neutral-solid" href="#main">본문으로 건너뛰기</a>' +
      '<a class="page-banner" href="products.html#gut"><span class="container page-banner__inner">' + ICON.bell +
      '<span class="page-banner__title">새 브랜드</span><span>미생물을 위한 식사가 시작돼요. 맥플랜 MAC PLAN</span>' +
      '<span class="page-banner__link">만나보기' + ICON.right + "</span></span></a>" +
      '<header class="site-header" id="siteHeader"><div class="container site-header__inner">' +
      '<a class="site-logo" href="index.html" aria-label="CJ WELLCARE 홈"><img src="assets/img/logo/cj-wellcare.png" alt="CJ WELLCARE"></a>' +
      '<nav aria-label="주 메뉴"><ul class="gnb">' + items + "</ul></nav>" +
      '<div class="header-util"><div class="lang" aria-label="언어 선택"><b>KR</b><a href="#" data-soon aria-disabled="true" title="English (준비 중)">EN</a></div>' +
      '<a class="util-link" href="news.html">뉴스룸</a><a class="util-link" href="about.html#contact">고객센터</a>' +
      '<a class="action-button action-button--neutral-weak" href="https://www.cjthemarket.com/" target="_blank" rel="noopener">' + ICON.bag + "제품 구매</a></div>" +
      "</div></header>";
  }

  // Closing section: newsletter field + three ways further in (SEED List with thumbnails), then the footer.
  var EXPLORE = [
    ["evidence.html", "assets/img/gen/micro-hero.jpg", "Science", "인체적용시험과 논문 19편을 한눈에 확인하세요"],
    ["learn.html#journal", "assets/img/gen/journal-ferment.jpg", "Learn", "김치 한 접시에 담긴 미생물 이야기"],
    ["news.html", "assets/img/news/news-1.jpg", "Newsroom", '<span class="text-nowrap">5070 세대 맞춤 식후 케어</span> <span class="text-nowrap">‘RB101 유산균&amp;효소’</span> 출시']
  ];
  function closingHTML() {
    var rows = EXPLORE.map(function (n) {
      return listItem(n[0], n[3], n[2], '<span class="list-item__prefix"><img src="' + n[1] + '" alt="" loading="lazy"></span>');
    }).join("");
    return '<section class="closing" aria-label="CJ웰케어 더 알아보기"><div class="container closing__grid">' +
      '<div class="stack stack--x4" id="letter-box"><p class="label">Wellness Letter</p><h2 class="title-2">한 달에 한 번,<br>웰니스 레터를 받아보세요</h2>' +
      '<form class="subscribe field" novalidate><label class="field__label" for="ft-email">이메일 주소</label>' +
      '<div class="field__row"><input class="text-input" id="ft-email" type="email" autocomplete="email" placeholder="이메일 주소를 입력해 주세요">' +
      '<button class="action-button action-button--large action-button--neutral-solid" type="submit">구독하기</button></div>' +
      '<p class="field__desc">최신 연구 소식과 계절별 루틴, 신제품 소식을 보내드려요.</p></form></div>' +
      '<div><p class="list-header">Explore CJ Wellcare</p><div class="list list--boxed">' + rows + "</div></div>" +
      "</div></section>";
  }

  function footerHTML() {
    var cols = NAV.map(function (n) {
      var lis = n.links.map(function (l) { return '<li><a href="' + l[0] + '"><span>' + l[1] + "</span></a></li>"; }).join("");
      return '<div class="footer-col"><h2>' + n.label + "</h2><ul>" + lis + "</ul></div>";
    }).join("");
    return closingHTML() + '<footer class="site-footer"><div class="container">' +
      '<div class="footer-nav"><div class="footer-brand"><img src="assets/img/logo/cj-wellcare.png" alt="CJ WELLCARE">' +
      '<p class="vision text-nowrap">The K-Lifestyle<br>Wellness Solution Provider</p>' +
      "<p>과학적 전문성과 고객에 대한 깊은 이해를 바탕으로 건강한 라이프스타일의 새로운 가치를 창출합니다.</p></div>" + cols + "</div>" +
      '<div class="footer-info"><p class="footer-policy"><a href="#" data-soon aria-disabled="true" title="준비 중">개인정보처리방침</a><a href="news.html#notice">결산공고</a><a href="sitemap.html">사이트맵</a></p>' +
      '<p class="footer-biz"><span>씨제이웰케어㈜</span><span>대표이사 윤상배</span></p>' +
      "<p>고객행복센터 1666-5543 (평일 09:00–18:00, 점심 12:00–13:00)</p>" +
      '<div class="footer-last"><p>Copyright © 2026 CJ WELLCARE. All rights reserved.</p>' +
      '<div class="footer-social"><a class="icon-button icon-button--ghost" href="https://www.instagram.com/cjwellcare_official/" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.insta +
      '</a><a class="icon-button icon-button--ghost" href="https://www.youtube.com/@cjwellcare" target="_blank" rel="noopener" aria-label="YouTube">' + ICON.yt + "</a></div></div></div>" +
      "</div></footer>";
  }

  var h = document.getElementById("site-header");
  if (h) h.outerHTML = headerHTML();
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = footerHTML();

  // Icons: <i data-ico="arrow"></i>
  document.querySelectorAll("[data-ico]").forEach(function (el) {
    var k = el.getAttribute("data-ico");
    if (ICON[k]) el.outerHTML = ICON[k];
  });

  // Links whose page is outside this mockup (English site, privacy policy) stay put instead of jumping to the top
  document.querySelectorAll("a[data-soon]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // Snackbar (SEED): bottom centre, one at a time, leaves by itself; hovering or focusing it holds it.
  var snackRegion = document.createElement("div");
  snackRegion.className = "snackbar-region";
  snackRegion.setAttribute("role", "status");
  snackRegion.setAttribute("aria-live", "polite");
  document.body.appendChild(snackRegion);
  var snackTimer = null;
  function snackbar(text) {
    clearTimeout(snackTimer);
    while (snackRegion.firstChild) snackRegion.removeChild(snackRegion.firstChild);
    var bar = document.createElement("div");
    bar.className = "snackbar";
    bar.textContent = text;
    snackRegion.appendChild(bar);
    function hide() { clearTimeout(snackTimer); if (bar.parentNode) bar.parentNode.removeChild(bar); }
    function arm() { clearTimeout(snackTimer); snackTimer = setTimeout(hide, 6000); }
    bar.addEventListener("mouseenter", function () { clearTimeout(snackTimer); });
    bar.addEventListener("mouseleave", arm);
    arm();
  }

  // Newsletter forms (SEED Field): this is a static proposal, so say so instead of silently doing nothing.
  // Wrong address → error state on the field with how to fix it; valid address → snackbar + the note stays under the field.
  document.querySelectorAll("form.subscribe").forEach(function (form) {
    var input = form.querySelector("input[type=email]");
    var desc = form.querySelector(".field__desc");
    var err = document.createElement("p");
    err.className = "field__error";
    err.setAttribute("role", "alert");
    err.hidden = true;
    form.appendChild(err);
    var note = document.createElement("p");
    note.className = "field__desc subscribe__msg";
    note.hidden = true;
    form.appendChild(note);
    if (input) input.addEventListener("input", function () { form.classList.remove("is-invalid"); input.removeAttribute("aria-invalid"); err.hidden = true; if (desc) desc.hidden = false; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = input && input.value.trim() !== "" && input.checkValidity();
      if (!ok) {
        form.classList.add("is-invalid");
        if (input) { input.setAttribute("aria-invalid", "true"); input.focus(); }
        err.textContent = "이메일 주소를 확인해 주세요. 예: name@example.com";
        err.hidden = false; note.hidden = true;
        if (desc) desc.hidden = true;
        return;
      }
      form.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
      err.hidden = true;
      if (desc) desc.hidden = true;
      note.textContent = "제안용 목업 화면이라 실제 구독 신청은 되지 않아요.";
      note.hidden = false;
      snackbar("제안용 목업 화면이라 실제 구독 신청은 되지 않아요");
    });
  });

  // Header hairline once content scrolls under it (SEED elevation: same level, so a line instead of a shadow)
  var header = document.getElementById("siteHeader");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 48); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Close an open dropdown after a click on one of its links. A same-page anchor leaves the pointer over the menu,
  // so :hover alone would keep the panel open on top of the section just jumped to; reopen once the pointer leaves.
  var gnbItems = document.querySelectorAll(".gnb__item");
  gnbItems.forEach(function (item) {
    item.querySelectorAll(".drop a").forEach(function (a) {
      a.addEventListener("click", function () {
        item.classList.add("is-closed");
        if (document.activeElement) document.activeElement.blur();
      });
    });
    item.addEventListener("mouseleave", function () { item.classList.remove("is-closed"); });
    item.addEventListener("mouseenter", function () { item.classList.remove("is-closed"); });
    item.addEventListener("focusin", function () { item.classList.remove("is-closed"); });
  });
  // Escape closes the open menu. If the focus is on a link inside it, the focus goes back to the 1Depth link first,
  // so it is never left on a link that has just been hidden. The menu opens again when the pointer or the focus re-enters.
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    gnbItems.forEach(function (item) {
      var inside = item.contains(document.activeElement);
      if (!inside && !item.matches(":hover")) return;
      var trigger = item.querySelector(".gnb__link");
      if (inside && trigger && document.activeElement !== trigger) trigger.focus();   // fires focusin, which reopens: close after it
      item.classList.add("is-closed");
    });
  });

  // Tabs (SEED line tabs): [data-tabs] > button[role=tab][aria-controls]; arrow keys move between tabs
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = Array.prototype.slice.call(group.querySelectorAll("button[aria-controls]"));
    function select(b, focus) {
      btns.forEach(function (o) {
        var on = o === b;
        o.setAttribute("aria-selected", on ? "true" : "false");
        o.tabIndex = on ? 0 : -1;
        var p = document.getElementById(o.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
      if (focus) b.focus();
    }
    btns.forEach(function (b, i) {
      b.tabIndex = b.getAttribute("aria-selected") === "true" ? 0 : -1;
      b.addEventListener("click", function () { select(b, false); });
      b.addEventListener("keydown", function (e) {
        var to = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? btns.length - 1 : null;
        if (to === null) return;
        e.preventDefault();
        select(btns[(to + btns.length) % btns.length], true);
      });
    });
  });

  // Filters (SEED chips): [data-filter-group="name"] button[data-filter]; items [data-filter-item="name"][data-cat="a b"]
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var name = group.getAttribute("data-filter-group");
    var items = document.querySelectorAll('[data-filter-item="' + name + '"]');
    var btns = group.querySelectorAll("button[data-filter]");
    var empty = document.querySelector('[data-filter-empty="' + name + '"]');
    var list = document.querySelector('[data-filter-list="' + name + '"]');
    function apply(val) {
      var shown = 0;
      btns.forEach(function (o) { o.setAttribute("aria-pressed", o.getAttribute("data-filter") === val ? "true" : "false"); });
      items.forEach(function (it) {
        var cats = (it.getAttribute("data-cat") || "").split(" ");
        var hide = val !== "all" && cats.indexOf(val) === -1;
        it.classList.toggle("is-hidden", hide);
        if (!hide) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (list) list.hidden = shown === 0;
    }
    function setHash(val) {
      if (!group.hasAttribute("data-filter-hash") || !history.replaceState) return;
      // the filter is already applied; the address is a nicety (Safari can refuse replaceState on file://)
      try { history.replaceState(null, "", val === "all" ? location.pathname + location.search : "#" + val); } catch (e) { /* keep the current address */ }
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var val = b.getAttribute("data-filter");
        apply(val);
        setHash(val);
      });
    });
    document.querySelectorAll('[data-filter-reset="' + name + '"]').forEach(function (b) {
      b.addEventListener("click", function () { apply("all"); setHash("all"); });
    });
    // Menu links such as products.html#gut select the matching filter, on load and on hash change
    if (group.hasAttribute("data-filter-hash")) {
      var fromHash = function () {
        var hash = (location.hash || "").slice(1);
        if (!hash) apply("all");
        else if (group.querySelector('button[data-filter="' + hash + '"]')) apply(hash);
      };
      fromHash();
      window.addEventListener("hashchange", fromHash);
      // A menu link to the hash that is already in the address fires no hashchange (the address can be stale
      // when replaceState was refused), so apply the filter from the link itself as well.
      document.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a[href]") : null;
        if (!a || a.pathname !== location.pathname) return;
        var hash = (a.hash || "").slice(1);
        if (hash && group.querySelector('button[data-filter="' + hash + '"]')) apply(hash);
      });
    }
  });

  // Rail (carousel): [data-rail] wraps .rail, [data-rail-prev], [data-rail-next], .rail__bar i
  document.querySelectorAll("[data-rail]").forEach(function (wrap) {
    var rail = wrap.querySelector(".rail");
    var prev = wrap.querySelector("[data-rail-prev]");
    var next = wrap.querySelector("[data-rail-next]");
    var bar = wrap.querySelector(".rail__bar i");
    if (!rail) return;
    function step() { var c = rail.children[0]; return c ? c.getBoundingClientRect().width + 24 : 544; }
    function update() {
      var max = rail.scrollWidth - rail.clientWidth;
      var ratio = max > 0 ? rail.scrollLeft / max : 0;
      var w = Math.max(12, Math.min(100, (rail.clientWidth / rail.scrollWidth) * 100));
      if (bar) { bar.style.width = w + "%"; bar.style.left = (100 - w) * ratio + "%"; }
      if (prev) prev.disabled = rail.scrollLeft < 4;
      if (next) next.disabled = rail.scrollLeft > max - 4;
    }
    // asked each time, so a reduced-motion setting changed after load is respected too
    function reduced() { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    function move(dir) { rail.scrollBy({ left: dir * step(), behavior: reduced() ? "auto" : "smooth" }); }
    if (prev) prev.addEventListener("click", function () { move(-1); });
    if (next) next.addEventListener("click", function () { move(1); });
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  // Sub-navigation tabs: the active tab follows scroll
  var sub = document.querySelector(".subnav");
  if (sub && "IntersectionObserver" in window) {
    var links = sub.querySelectorAll('a.tab[href^="#"]');
    var map = {};
    links.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t) map[t.id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
          map[e.target.id].classList.add("is-active");
          map[e.target.id].setAttribute("aria-current", "location");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  }
})();
