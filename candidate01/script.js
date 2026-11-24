/* CJ웰케어 메인 — Lenis + GSAP ScrollTrigger + Splitting
   라이브러리가 없거나 reduced motion이면 정적 레이아웃 그대로 둔다. */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 767px)');
  const hasLibs = window.gsap && window.ScrollTrigger;
  const motion = !reduce && hasLibs;

  // GSAP 색 보간용 (CSS의 --sky-* 와 같은 값)
  const SKY = { dawn: '#fcf0e3', morning: '#d9ecfa', day: '#fff6e0', evening: '#f8d8c3', night: '#151b33', everyday: '#fdfcfa' };

  /* ---------- Header ---------- */
  const gnb = document.querySelector('.gnb');
  const menuBtn = gnb.querySelector('.gnb__menu');
  let menuOpen = false;
  const syncHeader = () => {
    if (menuOpen) return;
    gnb.dataset.state = window.scrollY > 80 ? 'scrolled' : 'top';
  };
  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    menuBtn.setAttribute('aria-expanded', String(menuOpen));
    menuBtn.querySelector('.visually-hidden').textContent = menuOpen ? '메뉴 닫기' : '메뉴 열기';
    gnb.dataset.state = menuOpen ? 'open' : (window.scrollY > 80 ? 'scrolled' : 'top');
  });
  addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* ---------- 메가 메뉴: PC 마우스 오버·키보드 포커스 (모바일은 햄버거 목록) ---------- */
  const desktopNav = matchMedia('(min-width: 861px)');
  const items = [...gnb.querySelectorAll('.gnb__item')].filter((li) => li.querySelector('.mega'));
  let megaTimer = 0;
  const openMega = (li) => {
    clearTimeout(megaTimer);
    if (!desktopNav.matches) return;
    items.forEach((it) => {
      const on = it === li;
      it.classList.toggle('is-open', on);
      it.querySelector('.gnb__top').setAttribute('aria-expanded', String(on));
    });
    if (li) gnb.dataset.mega = ''; else delete gnb.dataset.mega;
  };
  const closeMegaSoon = () => { clearTimeout(megaTimer); megaTimer = setTimeout(() => openMega(null), 140); };
  items.forEach((li) => {
    li.addEventListener('mouseenter', () => openMega(li));
    li.addEventListener('focusin', () => openMega(li));
  });
  gnb.querySelectorAll('.gnb__item:not(:has(.mega))').forEach((li) => li.addEventListener('mouseenter', () => openMega(null)));
  gnb.querySelector('.gnb__nav').addEventListener('mouseleave', closeMegaSoon);
  gnb.addEventListener('focusout', (e) => { if (!gnb.contains(e.relatedTarget)) openMega(null); });
  gnb.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = gnb.querySelector('.gnb__item.is-open .gnb__top');
    openMega(null);
    if (open) open.focus();
  });
  gnb.querySelector('.gnb__dim').addEventListener('mouseenter', () => openMega(null));
  desktopNav.addEventListener('change', () => openMega(null));

  /* ---------- Hero video ---------- */
  const video = document.querySelector('.hero__video');
  if (mobile.matches && video.dataset.posterMo) video.poster = video.dataset.posterMo;
  let heroVisible = true;
  let heroCovered = false;
  const syncVideo = () => {
    if (reduce) return; // 정적 poster 유지
    if (heroVisible && !heroCovered) video.play().catch(() => {});
    else video.pause();
  };
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; syncVideo(); })
    .observe(document.querySelector('.hero'));
  document.addEventListener('visibilitychange', () => (document.hidden ? video.pause() : syncVideo()));

  /* ---------- 과학 레이어: 버튼(정보 쪽)으로 패널을 연다 ---------- */
  const closeAllSci = () => document.querySelectorAll('.scene__panel.is-open').forEach((p) => {
    p.classList.remove('is-open');
    document.querySelector(`[aria-controls="${p.querySelector('.card__sci').id}"]`).setAttribute('aria-expanded', 'false');
  });
  document.querySelectorAll('.scene__toggle').forEach((toggle) => {
    const sci = document.getElementById(toggle.getAttribute('aria-controls'));
    const panel = sci.closest('.scene__panel');
    const set = (open) => {
      panel.classList.remove('is-peek');
      panel.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) sci.querySelector('.sci__more').focus({ preventScroll: true });
    };
    toggle.addEventListener('click', () => set(!panel.classList.contains('is-open')));
    sci.querySelector('.card__close').addEventListener('click', () => { set(false); toggle.focus({ preventScroll: true }); });
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) { set(false); toggle.focus(); }
    });
  });

  /* ---------- R&D: 영상 배경 (화면 밖이면 정지) ---------- */
  const rndVideo = document.querySelector('.rnd__video');
  if (rndVideo && !reduce) {
    new IntersectionObserver(([e]) => (e.isIntersecting ? rndVideo.play().catch(() => {}) : rndVideo.pause()))
      .observe(rndVideo.parentElement);
  }

  if (!motion) return;

  /* ================= Motion ================= */
  root.classList.add('motion');
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelector('.skip').addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo('#journey', { immediate: true });
    });
  }

  /* ---------- 1. Hero: 글자 등장 → 실험실의 빛이 아침이 된다 ---------- */
  const line1 = document.querySelector('.hero__line1');
  if (window.Splitting) Splitting({ target: line1, by: 'chars' });
  const chars = line1.querySelectorAll('.char');
  gsap.from('.hero__copy1 .eyebrow', { autoAlpha: 0, y: 12, duration: 0.8, delay: 0.2, ease: 'power2.out' });
  gsap.from(chars.length ? chars : line1, {
    autoAlpha: 0, yPercent: 60, filter: 'blur(8px)',
    duration: 1.1, stagger: 0.07, delay: 0.35, ease: 'expo.out',
  });

  // 하루 흐름 레이어: 해·달이 화면 전체를 가로지르는 큰 호 위를 이동 (레이어 기준 %)
  const loop = document.querySelector('.dayloop');
  const loopSun = loop.querySelector('.dayloop__sun');
  const loopMoon = loop.querySelector('.dayloop__moon');
  const times = loop.querySelectorAll('.dayloop__time span');
  const INK = '#111826'; // --ink, --ink-2 (oklch는 GSAP이 보간하지 못해 hex로)
  const INK2 = '#3a4353';
  const SUN = '#f46622'; // --sun
  const NIGHT_WORD = '#3b3a8c'; // '밤' 기본색
  const GRAY = '#c4c7cf'; // 지금이 아닌 단어 (밝은 하늘 위)
  const GRAY_NIGHT = '#4b5172'; // 지금이 아닌 단어 (밤하늘 위)
  const words = gsap.utils.toArray('.hero__l2a > span'); // 아침 · 부터 · 밤 · 까지,
  gsap.set(words, { color: GRAY });
  const sunPath = { p: 0 };
  const moonPath = { p: 0.08 };
  const placeLoopOrb = (el, p) => {
    // PC: 문구를 피해 오른쪽 하늘에 큰 호 / 모바일: 문구 위쪽 하늘에 낮은 호 (SVG path와 같은 값)
    const a = Math.PI * (1 - p);
    const [cx, rx, cy, ry] = mobile.matches ? [50, 52, 34, 22] : [84, 22, 100, 80];
    el.style.left = `${cx + rx * Math.cos(a)}%`;
    el.style.top = `${cy - ry * Math.sin(a)}%`;
  };
  placeLoopOrb(loopSun, 0);

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6,
      onUpdate: (st) => {
        const covered = st.animation.time() > 0.7;
        if (covered !== heroCovered) { heroCovered = covered; syncVideo(); }
      },
    },
  })
    .to('.hero__cue', { autoAlpha: 0, duration: 0.08 }, 0)
    .to('.hero__copy1', { yPercent: -40, autoAlpha: 0, duration: 0.3 }, 0.06)
    .to(video, { scale: 1.08, filter: 'brightness(1.55) saturate(0.55)', duration: 0.6 }, 0)
    .to('.hero__shade', { autoAlpha: 0, duration: 0.35 }, 0.1)
    .fromTo('.hero__glow', { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1.3, duration: 0.3 }, 0.12)
    .fromTo('.hero__light', { autoAlpha: 0, yPercent: 35 }, { autoAlpha: 1, yPercent: 0, duration: 0.45 }, 0.22)
    .to('.hero__glow', { autoAlpha: 0, duration: 0.2 }, 0.5)
    .fromTo('.hero__dawn', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power1.out' }, 0.56)
    .fromTo('.hero__l2b, .hero__sub', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.05 }, 0.66)
    // 문구 뒤에서 하루가 한 번 흐른다: 아침 → 낮 → 저녁 → 밤 → 다시 새벽
    .fromTo(loop, { backgroundColor: 'rgba(252, 240, 227, 0)' }, { backgroundColor: '#fdfcf8', duration: 0.07, immediateRender: false }, 0.9)
    .to(loop, { backgroundColor: SKY.morning, duration: 0.08 }, 0.97)
    .to(loop, { backgroundColor: SKY.day, duration: 0.15 }, 1.1)
    .to(loop, { backgroundColor: SKY.evening, duration: 0.15 }, 1.3)
    .to(loop, { backgroundColor: '#5d4b78', duration: 0.07 }, 1.5) // 해 질 녘 보랏빛을 거쳐 밤으로 (회색으로 탁해지지 않게)
    .to(loop, { backgroundColor: SKY.night, duration: 0.08 }, 1.57)
    .fromTo(sunPath, { p: 0 }, { p: 1, duration: 0.74, onUpdate: () => placeLoopOrb(loopSun, sunPath.p) }, 0.88)
    .to(loopSun, { autoAlpha: 0, duration: 0.08 }, 1.56)
    .fromTo(loopMoon, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, immediateRender: false }, 1.56)
    .fromTo(moonPath, { p: 0.08 }, { p: 0.42, duration: 0.25, onUpdate: () => placeLoopOrb(loopMoon, moonPath.p) }, 1.56)
    .fromTo('.hero__line2', { color: INK }, { color: '#ffffff', duration: 0.1, immediateRender: false }, 1.52)
    .fromTo('.hero__l2b, .hero__sub', { color: INK2 }, { color: 'rgba(255, 255, 255, 0.82)', duration: 0.1, immediateRender: false }, 1.52)
    .fromTo('.hero__vision', { color: '#d9612a' }, { color: '#f4c98f', duration: 0.1, immediateRender: false }, 1.52)
    .fromTo(words[2], { color: NIGHT_WORD }, { color: '#b9b6ff', duration: 0.1, immediateRender: false }, 1.52)
    .fromTo(loop, { color: INK }, { color: '#ffffff', duration: 0.1, immediateRender: false }, 1.52)
    .to(times[0], { autoAlpha: 1, duration: 0.05 }, 0.92)
    .to(times[0], { autoAlpha: 0, duration: 0.05 }, 1.14)
    .to(times[1], { autoAlpha: 1, duration: 0.05 }, 1.18)
    .to(times[1], { autoAlpha: 0, duration: 0.05 }, 1.34)
    .to(times[2], { autoAlpha: 1, duration: 0.05 }, 1.38)
    .to(times[2], { autoAlpha: 0, duration: 0.05 }, 1.54)
    .to(times[3], { autoAlpha: 1, duration: 0.05 }, 1.58)
    // 처음엔 모두 회색 → 지금 시간대의 단어만 색을 띤다: 아침·낮엔 '아침', 저녁·밤엔 '밤'
    .fromTo(words[0], { color: GRAY }, { color: SUN, duration: 0.06, immediateRender: false }, 0.9)
    .fromTo(words[0], { color: SUN }, { color: GRAY, duration: 0.06, immediateRender: false }, 1.34)
    .fromTo(words[2], { color: GRAY }, { color: NIGHT_WORD, duration: 0.06, immediateRender: false }, 1.34)
    .fromTo([words[0], words[1], words[3]], { color: GRAY }, { color: GRAY_NIGHT, duration: 0.1, immediateRender: false }, 1.52)
    // 밤에서 끝난다: 문장이 밤하늘 위에서 완성되고, 그대로 연구소(R&D)로 이어진다
    .to(times[3], { autoAlpha: 0, duration: 0.05 }, 1.84)
    .fromTo(words[0], { color: GRAY_NIGHT }, { color: SUN, duration: 0.1, immediateRender: false }, 1.84)
    .fromTo([words[1], words[3]], { color: GRAY_NIGHT }, { color: '#ffffff', duration: 0.1, immediateRender: false }, 1.84)
    .to({}, { duration: 0.1 });

  /* ---------- 2. 하루 여정: 화면 고정, 시간대마다 주력 브랜드 1개 ---------- */
  const scenes = gsap.utils.toArray('.scene');
  const stackItems = gsap.utils.toArray('.day__stack li');
  const sun = document.querySelector('.day__sun');
  const moon = document.querySelector('.day__moon');
  const SCENE_SKY = [SKY.morning, SKY.day, SKY.evening, SKY.night];
  const last = scenes.length - 1;

  const stageEl = document.querySelector('.day__stage');
  const everyday = document.querySelector('.everyday');
  // R&D 끝의 그라데이션이 연구소의 어둠을 새벽빛까지 데려온다 → 여기서 새벽빛 → 맑은 아침 하늘
  gsap.set(stageEl, { backgroundColor: SKY.dawn });
  gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '.day', start: 'top 70%', end: 'top top', scrub: true } })
    .fromTo(stageEl, { backgroundColor: SKY.dawn }, { backgroundColor: '#fdfcf8', immediateRender: false })
    .to(stageEl, { backgroundColor: SKY.morning });
  gsap.set(scenes.slice(1), { autoAlpha: 0 });
  gsap.set(stackItems.slice(1), { autoAlpha: 0, y: -16 });

  // 해/달: 하늘 전체를 가로지르는 큰 호 위를 이동 (stage 기준 %)
  const arcPos = (p) => {
    const a = Math.PI * (1 - p);
    return { x: 50 + 52 * Math.cos(a), y: 100 - 82 * Math.sin(a) };
  };
  const placeOrb = (el, p) => { const { x, y } = arcPos(p); el.style.left = `${x}%`; el.style.top = `${y}%`; };

  const dayTl = gsap.timeline({ defaults: { ease: 'none' } });
  dayTl.addLabel('s0', 0);
  for (let i = 1; i <= last; i++) {
    const prev = scenes[i - 1];
    const next = scenes[i];
    dayTl
      .to(prev, { autoAlpha: 0, y: -40, duration: 0.25, ease: 'power1.in' }, i - 0.6)
      .fromTo(stageEl, { backgroundColor: SCENE_SKY[i - 1] }, { backgroundColor: SCENE_SKY[i], duration: 0.45, immediateRender: false }, i - 0.6)
      .fromTo(next, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power1.out' }, i - 0.35)
      .fromTo(next.querySelector('.scene__panel'), { scale: 0.94 }, { scale: 1, duration: 0.3, ease: 'power2.out' }, i - 0.35)
      .to(stackItems[i], { autoAlpha: 1, y: 0, duration: 0.2 }, i - 0.3)
      .addLabel(`s${i}`, i);
  }
  dayTl.to({}, { duration: 0.35 });

  // 과학 레이어 살짝 보여 주기: 장면이 처음 나타나면 원료명·근거가 아래에서 올라왔다 내려간다 (장면마다 한 번)
  const peeked = new Set();
  let peekTimers = [];
  const peekSci = (scene) => {
    peekTimers.forEach(clearTimeout);
    peekTimers = [];
    document.querySelectorAll('.scene__panel.is-peek').forEach((p) => p.classList.remove('is-peek'));
    const card = scene.querySelector('.card.has-sci');
    if (!card || peeked.has(card)) return;
    peekTimers.push(setTimeout(() => {
      if (card.classList.contains('is-open')) return;
      peeked.add(card);
      card.classList.add('is-peek'); // 먼저 붙여야 모바일에서 줄어든 높이로 잰다
      const tag = card.querySelector('.sci__tag');
      card.style.setProperty('--peek', `${Math.max(0, tag.offsetTop - 22)}px`);
      peekTimers.push(setTimeout(() => card.classList.remove('is-peek'), 2800));
    }, 650));
  };

  let current = -1;
  const setActive = (idx) => {
    if (idx === current) return;
    current = idx;
    closeAllSci();
    peekSci(scenes[idx]);
    stackItems.forEach((li, i) => li.classList.toggle('is-active', i === idx));
    stageEl.classList.toggle('is-night', idx === last);
  };

  const dayST = ScrollTrigger.create({
    trigger: '.day', start: 'top top', end: 'bottom bottom',
    animation: dayTl, scrub: 0.5,
    snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
    onUpdate: (st) => {
      const t = st.progress * dayTl.duration();
      setActive(Math.min(last, Math.max(0, Math.round(t))));
      // 해: 아침→저녁, 달: 밤
      const sunP = Math.min(1, t / (last - 0.3));
      placeOrb(sun, 0.12 + sunP * 0.76);
      sun.style.opacity = t > last - 0.35 ? 0 : 1;
      const moonP = Math.max(0, t - (last - 0.3)) / 0.65;
      placeOrb(moon, 0.38 + Math.min(1, moonP) * 0.12);
      moon.style.opacity = Math.min(1, moonP * 3);
    },
  });

  // 오른쪽 스택: 해당 시간대로 이동
  document.querySelectorAll('[data-goto]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const y = dayST.start + (dayST.end - dayST.start) * (dayTl.labels[`s${a.dataset.goto}`] / dayTl.duration());
      if (lenis) lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Every day: 하루 여정의 밤 → 다시 밝은 바탕
  gsap.fromTo(everyday, { backgroundColor: SKY.night }, {
    backgroundColor: SKY.everyday, ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: '.everyday', start: 'top 95%', end: 'top 45%', scrub: true },
  });

  // 헤드라인·카드 등장
  gsap.utils.toArray('.everyday__head').forEach((el) => {
    gsap.from(el.children, {
      autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.08, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true },
    });
  });
  // R&D 연구의 흐름: 01 → 02 → 03 차례로 / 하루로 넘어가는 다리
  const SCI_SPEED = 1.15; // 과학 파트 연출 속도 (1 = 기준, 클수록 빠름)
  // ④ 제품 개발 4단계: 선이 01 → 04로 그어지며 단계가 차례로
  const steps = gsap.utils.toArray('.flow--4 .flow__step');
  gsap.set(steps, { '--ln': 0, '--nd': 0 });
  const flowTl = gsap.timeline({ scrollTrigger: { trigger: '.flow--4', start: 'top 70%', once: true } });
  flowTl.timeScale(SCI_SPEED);
  steps.forEach((st, i) => {
    const at = i * 0.6;
    flowTl.to(st, { '--nd': 1, duration: 0.4, ease: 'none' }, at)
      .to(st, { '--ln': 1, duration: 0.8, ease: 'power2.inOut' }, at + 0.1)
      .from(st.children, { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, at + 0.3);
  });
  gsap.from('.bridge > *', {
    autoAlpha: 0, y: 32, duration: 1, stagger: 0.12, ease: 'expo.out',
    scrollTrigger: { trigger: '.bridge', start: 'top 85%', once: true },
  });
  gsap.from('.vision__inner > *', {
    autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.vision', start: 'top 80%', once: true },
  });
  /* ---------- sci3: 과학 파트 글 연출 (화면 안쪽에 들어왔을 때 한 번) ---------- */
  // ① 제목: 두 줄이 한 줄씩 밀려 올라온다 → 리드·링크
  const headTl = gsap.timeline({ scrollTrigger: { trigger: '.rnd__head', start: 'top 70%', once: true } })
    .from('.rnd__head .eyebrow', { autoAlpha: 0, y: 20, duration: 0.9, ease: 'expo.out' })
    .from('.rnd__head h2 .ln > span', { yPercent: 108, duration: 1.3, stagger: 0.28, ease: 'expo.out' }, 0.15)
    .from('.rnd__lead, .rnd__link', { autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.14, ease: 'expo.out' }, 0.85);

  // ② '최초' 밑줄·빛 ③ 시험 설계 3줄이 차례로
  const designRows = gsap.utils.toArray('.proof__design li');
  gsap.set('.proof__title .mark', { '--ln': 0, '--glint': '100%', '--glow': '0px', '--glow-a': 0 });
  gsap.set(designRows, { '--ln': 0 });
  const proofTl = gsap.timeline({ scrollTrigger: { trigger: '.proof', start: 'top 65%', once: true } })
    .from('.proof', { autoAlpha: 0, y: 40, duration: 1.1, ease: 'expo.out' })
    .from('.proof__main > *', { autoAlpha: 0, y: 24, duration: 1.0, stagger: 0.18, ease: 'expo.out' }, 0.25)
    // '최초': 문장이 자리 잡은 뒤 밑줄·빛·글로우가 함께 시작 (빛은 한 번 더 스친다)
    .to('.proof__title .mark', { '--ln': 1, duration: 1.2, ease: 'power2.inOut' }, 1.3)
    .to('.proof__title .mark', { '--glint': '0%', duration: 1.6, ease: 'power1.inOut' }, 1.3)
    .to('.proof__title .mark', { '--glow': '30px', '--glow-a': 1, duration: 1.0, ease: 'power2.out' }, 1.3)
    .to('.proof__title .mark', { '--glow': '16px', '--glow-a': 0.75, duration: 1.4, ease: 'power2.inOut' }, 2.4)
    .set('.proof__title .mark', { '--glint': '100%' }, 3.3)
    .to('.proof__title .mark', { '--glint': '0%', duration: 1.6, ease: 'power1.inOut' }, 3.4)
    .from('.proof__label', { autoAlpha: 0, duration: 0.8 }, 1.0)
    .from(designRows, { autoAlpha: 0, x: -16, duration: 1.0, stagger: 0.45, ease: 'expo.out' }, 1.4)
    .to(designRows, { '--ln': 1, duration: 1.0, stagger: 0.45, ease: 'power2.out' }, 1.55)
    .from('.proof__note', { autoAlpha: 0, y: 12, duration: 0.9, ease: 'expo.out' }, 2.9);
  headTl.timeScale(SCI_SPEED); proofTl.timeScale(SCI_SPEED);
  gsap.from('.everyday__feature', {
    autoAlpha: 0, y: 48, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.everyday__feature', start: 'top 85%', once: true },
  });
  gsap.from('.everyday__list > li', {
    autoAlpha: 0, y: 48, duration: 0.9, stagger: 0.08, ease: 'expo.out',
    scrollTrigger: { trigger: '.everyday__list', start: 'top 85%', once: true },
  });

  /* ---------- 3. R&D 숫자: 자릿수별로 돌아가는 롤링 카운터 ---------- */
  document.querySelectorAll('.stat__num[data-count]').forEach((el, k) => {
    const text = Number(el.dataset.count).toLocaleString('ko-KR');
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const odo = document.createElement('span');
    odo.className = 'odo';
    odo.setAttribute('aria-hidden', 'true');
    const strips = [];
    [...text].forEach((ch) => {
      if (!/\d/.test(ch)) {
        const sep = document.createElement('span');
        sep.className = 'odo__sep';
        sep.textContent = ch;
        odo.append(sep);
        return;
      }
      const d = Number(ch);
      const loops = 1 + strips.length; // 오른쪽 자리일수록 더 많이 돈다
      const col = document.createElement('span');
      col.className = 'odo__col';
      const strip = document.createElement('span');
      strip.className = 'odo__strip';
      for (let i = 0; i <= loops * 10 + d; i++) {
        const n = document.createElement('span');
        n.textContent = i % 10;
        strip.append(n);
      }
      col.append(strip);
      odo.append(col);
      strips.push({ strip, index: loops * 10 + d });
    });
    el.append(odo);
    // 숫자가 화면 안쪽(아래에서 약 40%)까지 올라온 뒤 시작, 네 숫자가 차례로 천천히 돈다
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 62%', once: true } });
    strips.forEach(({ strip, index }, i) => {
      tl.fromTo(strip, { y: 0 }, { y: `${-index}em`, duration: 2.6 + i * 0.35, ease: 'power3.out' }, 0.15 + k * 0.18 + i * 0.1);
    });
  });

  // 폰트·이미지 로드 후 위치 재계산
  addEventListener('load', () => ScrollTrigger.refresh());
})();
