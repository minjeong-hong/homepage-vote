/* CJ Wellcare mockup — shared header/footer + small interactions.
   Header/footer are rendered from JS so every page shares one source and the
   mockup still works when opened straight from the file system (no fetch). */
(function () {
  "use strict";

  var ICON = {
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>'
  };

  var NAV = [
    {
      id: "science", label: "Science", ko: "과학", href: "science.html", science: true,
      intro: { title: "과학이 먼저입니다", text: "김치 유래 유산균 3,500여 개에서 시작한 CJ의 연구부터 CJ바이오사이언스 협업까지, 마이크로바이옴 근거를 공개합니다." },
      links: [
        ["science.html#overview", "우리의 과학", "Science Overview"],
        ["science.html#chain", "기술 → 제품 → 고객", "연구가 일상이 되는 과정"],
        ["science.html#microbiome", "마이크로바이옴 연구", "4가지 연구 축"],
        ["science.html#strains", "균주 라이브러리", "CJLP133 외 대표 균주 5종"],
        ["science.html#bioscience", "CJ바이오사이언스 협업", "MAC · RB101"],
        ["evidence.html", "연구 근거 · 논문", "인체적용시험 · 논문 19편"]
      ],
      feature: { img: "assets/img/gen/microbiome-abstract.jpg", kicker: "Evidence at a glance", title: "인체적용시험과 논문을 한눈에", href: "evidence.html" }
    },
    {
      id: "solutions", label: "Solutions", ko: "솔루션", href: "solutions.html",
      intro: { title: "고민에서 시작하는 솔루션", text: "장 건강부터 이너뷰티, 수면, 기초영양, K-웰니스까지. 12개 브랜드를 고민별로 찾아보세요." },
      links: [
        ["solutions.html#gut", "장 건강", "바이오코어 · 맥플랜"],
        ["solutions.html#beauty", "이너뷰티", "이너비"],
        ["solutions.html#mental", "수면 · 두뇌", "멜라메이트 · 메모리메이트"],
        ["solutions.html#nutrition", "기초영양", "닥터뉴트리 · 아이시안 외"],
        ["solutions.html#kwellness", "K-웰니스", "한뿌리 · 제일건강원"],
        ["brand-biocore.html", "브랜드 상세 예시", "바이오코어 BYOCORE"]
      ],
      feature: { img: "assets/img/kv/macplan.jpg", kicker: "New · with CJ Bioscience", title: "미생물을 위한 식사, 맥플랜", href: "solutions.html#gut" }
    },
    {
      id: "lifestyle", label: "K-Lifestyle", ko: "라이프스타일", href: "lifestyle.html",
      intro: { title: "하루 전체를 위한 웰니스", text: "아침 유산균부터 나이트 루틴까지, 한국인의 일상에서 길어 올린 웰니스 습관을 제안합니다." },
      links: [
        ["lifestyle.html#routine", "24시간 웰니스 루틴", "Morning · Day · Night"],
        ["lifestyle.html#journal", "웰니스 저널", "연구원이 검수한 건강 정보"],
        ["lifestyle.html#heritage", "K-웰니스 헤리티지", "발효 · 흑삼 · 보양"],
        ["lifestyle.html#newsletter", "뉴스레터", "매달 한 번, 루틴 레터"]
      ],
      feature: { img: "assets/img/gen/lifestyle-hero.jpg", kicker: "K-Wellness Heritage", title: "발효의 지혜를 오늘의 루틴으로", href: "lifestyle.html#heritage" }
    },
    {
      id: "news", label: "Newsroom", ko: "뉴스룸", href: "news.html",
      intro: { title: "CJ웰케어의 소식", text: "신제품, 연구 성과, 캠페인 소식을 전합니다." },
      links: [
        ["news.html", "보도자료", "Press Release"],
        ["news.html#campaign", "캠페인", "Campaign"],
        ["news.html#notice", "공지 · 결산공고", "Notice"]
      ]
    },
    {
      id: "about", label: "About", ko: "회사소개", href: "about.html",
      intro: { title: "The K-Lifestyle Wellness Solution Provider", text: "2002년 CJ뉴트라에서 시작해 2022년 독립한 헬스케어 솔루션 전문 기업입니다." },
      links: [
        ["about.html#vision", "비전 · 미션", "Vision & Mission"],
        ["about.html#values", "핵심가치", "Core Values"],
        ["about.html#ceo", "CEO 메시지", "대표이사 인사말"],
        ["about.html#history", "연혁", "2002 – Present"],
        ["about.html#contact", "문의", "Contact"],
        ["sitemap.html", "사이트맵", "메뉴 구조 제안"]
      ]
    }
  ];

  var page = document.body.getAttribute("data-page") || "";

  function megaHTML(n) {
    var links = n.links.map(function (l) {
      return '<li><a href="' + l[0] + '"><strong>' + l[1] + "</strong><span>" + l[2] + "</span></a></li>";
    }).join("");
    var feature = n.feature
      ? '<a class="mega__feature" href="' + n.feature.href + '"><img src="' + n.feature.img + '" alt="" loading="lazy"><div><span class="caption" style="color:#fff;opacity:.85">' + n.feature.kicker + "</span><b>" + n.feature.title + "</b></div></a>"
      : "<div></div>";
    return '<div class="mega" role="region" aria-label="' + n.label + ' 하위 메뉴"><div class="container mega__inner">' +
      '<div class="mega__intro"><span class="eyebrow">' + n.label + '</span><p class="h4">' + n.intro.title + '</p><p class="body-s">' + n.intro.text + "</p></div>" +
      '<ul class="mega__links">' + links + "</ul>" + feature + "</div></div>";
  }

  // Mockup notes: the top ribbon (contest note, version links, people-photo switch) and the footer mockup/AI note.
  // variants/package_v1.py sets this to false for the v1-only submission.
  var MOCK_NOTES = false;

  function headerHTML() {
    var items = NAV.map(function (n) {
      var cur = n.id === page ? ' aria-current="page"' : "";
      var cls = "gnb__link" + (n.science ? " gnb__link--science" : "");
      var dot = n.science ? '<span class="dot" aria-hidden="true"></span>' : "";
      return '<li class="gnb__item"><a class="' + cls + '" href="' + n.href + '"' + cur + ">" + n.label + dot + "</a>" + megaHTML(n) + "</li>";
    }).join("");
    // Same page in the other design versions (folders are siblings in the submission zip)
    function versionLinks() {
      var VERSIONS = [["mockup", "v1 CJ 브랜드"], ["mockup-hig", "v2 Apple HIG"], ["mockup-seed", "v3 SEED"], ["mockup-seed-cj", "v4 SEED × CJ 컬러"]];
      var parts = location.pathname.split("/"), file = parts.pop() || "index.html", dir = parts.pop();
      return '<span class="ver">버전 비교' + VERSIONS.map(function (v) {
        return '<a href="../' + v[0] + "/" + file + '"' + (v[0] === dir ? ' aria-current="page"' : "") + ">" + v[1] + "</a>";
      }).join("") + "</span>";
    }
    function peopleSwitch() {
      return '<span class="ppl">인물 사진' + [["base", "기본"], ["idol", "아이돌 스타일"]].map(function (m) {
        return '<button type="button" data-people="' + m[0] + '" aria-pressed="' + (m[0] === peopleMode() ? "true" : "false") + '">' + m[1] + "</button>";
      }).join("") + "</span>";
    }
    return (MOCK_NOTES ? '<div class="mock-ribbon"><b>CJ웰케어 홈페이지 아이디어 공모전</b> 제출용 디자인 목업입니다 · 콘텐츠는 기존 CJ웰케어 자료 기반, 일부 이미지는 AI 생성' + versionLinks() + peopleSwitch() + '</div>' : "") +
      '<header class="site-header" id="siteHeader"><div class="container site-header__inner">' +
      '<a class="site-logo" href="index.html" aria-label="CJ WELLCARE 홈"><img src="assets/img/logo/cj-wellcare.png" alt="CJ WELLCARE"></a>' +
      '<nav aria-label="주 메뉴" style="height:100%"><ul class="gnb">' + items + "</ul></nav>" +
      '<div class="header-util"><div class="lang" aria-label="언어 선택"><b>KR</b><span aria-hidden="true">·</span><a href="#" aria-disabled="true">EN</a></div>' +
      '<button class="icon-btn" type="button" aria-label="검색">' + ICON.search + "</button>" +
      '<a class="btn btn--dark btn--s" href="https://www.cjthemarket.com/" target="_blank" rel="noopener">' + ICON.bag.replace("<svg", '<svg style="width:18px;height:18px"') + "제품 구매</a></div>" +
      "</div></header>";
  }

  function footerHTML() {
    var cols = NAV.map(function (n) {
      var lis = n.links.slice(0, 6).map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("");
      return '<div class="footer-col"><h4>' + n.label + "</h4><ul>" + lis + "</ul></div>";
    }).join("");
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer-top"><div class="footer-brand"><img src="assets/img/logo/cj-wellcare.png" alt="CJ WELLCARE">' +
      '<p class="vision">The K-Lifestyle<br>Wellness Solution Provider</p>' +
      "<p>과학적 전문성과 고객에 대한 깊은 이해를 바탕으로 건강한 라이프스타일의 새로운 가치를 창출합니다.</p></div>" + cols + "</div>" +
      '<div class="footer-bottom"><div><p class="legal"><a href="#">개인정보처리방침</a><a href="sitemap.html">사이트맵</a></p>' +
      "<p style=\"margin-top:12px\">씨제이웰케어㈜ · 대표이사 윤상배 · 고객행복센터 1666-5543 (평일 09:00–18:00, 점심 12:00–13:00)</p>" +
      "<p>Copyright © 2026 CJ WELLCARE. All rights reserved.</p>" +
      (MOCK_NOTES ? '<p style="margin-top:8px;color:var(--gray-500)">본 페이지는 공모전 제출용 목업으로, 일부 이미지는 AI로 생성되었으며 실제 인물·제품이 아닙니다.</p>' : "") + "</div>" +
      '<div class="footer-social"><a href="https://www.instagram.com/cjwellcare_official/" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.insta + '</a><a href="https://www.youtube.com/@cjwellcare" target="_blank" rel="noopener" aria-label="YouTube">' + ICON.yt + "</a></div></div>" +
      "</div></footer>";
  }

  // People photos: original set vs a K-pop-idol-style set at assets/img/idol/<same path> (same size and crop).
  // Chosen in the ribbon; kept in ?people=idol (so it survives version links and file:// opening) and localStorage.
  var IDOL = ["gen/about-hero", "gen/hero-home", "gen/journal-walk", "gen/routine-day", "gen/routine-morning", "gen/routine-night",
    "gen/story-life", "gen/story-research", "home/brand-beauty-card", "home/brand-gut-card", "home/brand-mental-card",
    "rnd/strain-cjlp133", "rnd/strain-cjls03"];
  // explicit choice (URL first, then storage) or null; the URL wins so a stale per-file store (Firefox file://) cannot override it
  function peopleChoice() {
    var q = /[?&]people=(idol|base)\b/.exec(location.search);
    if (q) return q[1];
    try { var v = localStorage.getItem("wc-people"); return v === "idol" || v === "base" ? v : null; } catch (e) { return null; }
  }
  function peopleMode() { return peopleChoice() || "base"; }
  function applyPeople(mode, explicit) {
    document.querySelectorAll("img").forEach(function (img) {
      var src = img.getAttribute("src") || "";
      IDOL.forEach(function (p) {
        var base = "assets/img/" + p + ".jpg", idol = "assets/img/idol/" + p + ".jpg";
        var next = mode === "idol" ? src.replace(base, idol) : src.replace(idol, base);
        if (next !== src) { img.setAttribute("src", next); src = next; }
      });
    });
    // carry the choice on same-site page links (other versions included)
    document.querySelectorAll("a[href]").forEach(function (a) {
      var m = /^([^:?#]*\.html)(\?[^#]*)?(#.*)?$/.exec(a.getAttribute("href"));
      if (!m) return;
      var q = (m[2] || "").replace(/^\?/, "").split("&").filter(function (kv) { return kv && kv.indexOf("people=") !== 0; });
      if (mode === "idol" || explicit) q.push("people=" + mode);
      a.setAttribute("href", m[1] + (q.length ? "?" + q.join("&") : "") + (m[3] || ""));
    });
    document.querySelectorAll(".mock-ribbon [data-people]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-people") === mode ? "true" : "false");
    });
  }

  var h = document.getElementById("site-header");
  if (h) h.outerHTML = headerHTML();
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = footerHTML();
  // The people-photo switch lives in the ribbon: without it (v1 submission) photos stay exactly as shipped, whatever
  // a stored or URL choice from the comparison build says — the submission has no assets/img/idol/ to swap to.
  if (MOCK_NOTES) applyPeople(peopleMode(), peopleChoice() !== null);
  document.querySelectorAll(".mock-ribbon [data-people]").forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.getAttribute("data-people");
      try { localStorage.setItem("wc-people", mode); } catch (e) { /* file:// or private mode: the URL still carries it */ }
      var url = location.pathname + location.search.replace(/([?&])people=(idol|base)&?/, "$1").replace(/[?&]$/, "");
      url += (url.indexOf("?") < 0 ? "?" : "&") + "people=" + mode + location.hash;
      try { history.replaceState(null, "", url); } catch (e) { /* ignore */ }
      applyPeople(mode, true);
    });
  });

  // Arrow icons: <i data-ico="arrow"></i>
  document.querySelectorAll("[data-ico]").forEach(function (el) {
    var k = el.getAttribute("data-ico");
    if (ICON[k]) el.outerHTML = ICON[k];
  });

  // Header shadow on scroll
  var header = document.getElementById("siteHeader");
  function onScroll() { if (header) header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Tabs: [data-tabs] > button[aria-controls]
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = group.querySelectorAll("button[aria-controls]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (o) {
          var on = o === b;
          o.setAttribute("aria-selected", on ? "true" : "false");
          var p = document.getElementById(o.getAttribute("aria-controls"));
          if (p) p.hidden = !on;
        });
      });
    });
  });

  // Filters: [data-filter-group="name"] buttons[data-filter], items [data-filter-item="name"][data-cat="a b"]
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var name = group.getAttribute("data-filter-group");
    var items = document.querySelectorAll('[data-filter-item="' + name + '"]');
    var btns = group.querySelectorAll("button[data-filter]");
    var empty = document.querySelector('[data-filter-empty="' + name + '"]');
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
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var val = b.getAttribute("data-filter");
        apply(val);
        // keep the URL in step with the selected filter (no scroll jump)
        if (history.replaceState) history.replaceState(null, "", val === "all" ? location.pathname + location.search : "#" + val); // keep ?people=…
      });
    });
    // Same-page menu links (e.g. GNB "이너뷰티" while on solutions.html#gut) only change the hash,
    // so apply on first load and on every hashchange.
    function fromHash() {
      var hash = (location.hash || "").slice(1);
      // empty hash (e.g. Back from #campaign) resets to "all"; other section anchors (#publications) leave the filter alone
      if (!hash) apply("all");
      else if (group.querySelector('button[data-filter="' + hash + '"]')) apply(hash);
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
  });

  // Reveal on scroll
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Sub-nav active state follows scroll
  var sub = document.querySelector(".subnav");
  if (sub && "IntersectionObserver" in window) {
    var links = sub.querySelectorAll('a[href^="#"]');
    var map = {};
    links.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t) map[t.id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (a) { a.classList.remove("is-active"); });
          map[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  }
})();
