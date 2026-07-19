(() => {
  const DATA = window.PORTFOLIO_DATA;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isPagesSite = window.location.pathname.includes("/-/");
  const SITE_PREFIX = isPagesSite ? "/-" : "";
  const PUBLIC_ROOT = isPagesSite ? "/-" : "";
  const app = document.querySelector("#app");
  let modalOrigin = null;
  const pagePath = () => window.location.pathname.replace(/\/+$/, "") || "/";

  function asset(path) {
    return `${PUBLIC_ROOT}/${path.replace(/^\//, "")}`;
  }

  function route(path) {
    const normalized = path.replace(/^\/+/, "");
    return `${PUBLIC_ROOT}/${normalized}`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function globe(className = "") {
    return `<span class="globe ${className}" aria-hidden="true"><svg viewBox="0 0 240 280"><circle cx="120" cy="112" r="78"/><ellipse cx="120" cy="112" rx="78" ry="23"/><ellipse cx="120" cy="112" rx="48" ry="78"/><ellipse cx="120" cy="112" rx="20" ry="78"/><path d="M45 96c45 15 105 15 150 0"/><path d="M45 128c48-13 104-13 150 0"/><path class="globe-stand" d="M180 43c38 36 42 105 8 145"/><path class="globe-stand" d="M92 204h74"/><path class="globe-stand" d="M120 190v34"/><path class="globe-stand" d="M88 226h70"/></svg></span>`;
  }

  function orbitItem(name) {
    return `<span class="orbit-item orbit-${name}" data-item="${name}" aria-hidden="true"><i></i></span>`;
  }

  function header(active = "top") {
    const items = [["TOP", ""], ["ABOUT", "about/"], ["NEWS", "news/"], ["WORKS", "works/"], ["CONTACT", "contact/"]];
    return `<header class="site-header"><a class="site-brand" data-route href="${route("")}" aria-label="TOPへ戻る">${globe("brand-globe")}<span><strong>Kokone Imaizumi</strong><small>Portfolio</small></span></a><nav class="desktop-nav" aria-label="メインナビゲーション">${items.map(([label, path]) => `<a data-route class="${active === label.toLowerCase() ? "is-active" : ""}" ${active === label.toLowerCase() ? 'aria-current="page"' : ""} href="${path ? route(path) : route("")}">${label}</a>`).join("")}</nav><button class="menu-button" type="button" aria-expanded="false" aria-controls="mobile-navigation"><span class="menu-icon" aria-hidden="true"></span><span>Menu</span></button><nav class="mobile-nav" id="mobile-navigation" aria-label="モバイルナビゲーション" hidden>${items.map(([label, path]) => `<a data-route href="${path ? route(path) : route("")}">${label}</a>`).join("")}</nav></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="footer-brand"><p class="eyebrow">Kokone Imaizumi</p><p class="footer-message">まだ知らないを、<br />おもしろいへ。</p></div><div class="footer-links"><p class="eyebrow">Connect</p>${DATA.socials.map((item) => `<a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${item.label}${item.external ? '<span aria-hidden="true">↗</span>' : ""}</a>`).join("")}</div><div class="footer-end"><a data-route class="text-link" href="${route("contact/")}">Contact <span aria-hidden="true">↗</span></a><small>© ${escapeHtml(DATA.settings.copyright)}</small></div></footer>`;
  }

  function pageFrame(content, active, options = {}) {
    document.body.className = options.home ? "is-loading" : "ready";
    app.innerHTML = `${options.home ? opening() : ""}${header(active)}<main id="main-content" tabindex="-1">${content}</main>${footer()}<button class="back-to-top" type="button" aria-label="ページの先頭へ戻る">↑</button><div class="modal-root" id="modal-root" hidden></div>`;
    bindCommon();
    if (options.home) runOpening();
  }

  function opening() {
    return `<div class="opening" aria-label="Opening animation"><div class="particle-field" aria-hidden="true"></div><div class="opening-stage" aria-hidden="true"><div class="opening-globe">${globe()}</div><div class="opening-orbit">${["book", "coffee", "pc", "camera", "ticket", "leaf", "headphones"].map(orbitItem).join("")}</div><img class="opening-girl" src="${asset("assets/girl-walk.png")}" alt="" /></div><p class="loading-progress" aria-live="polite">0%</p></div>`;
  }

  function renderHome() {
    const news = DATA.news.slice(0, 3);
    const works = DATA.works.filter((work) => work.featured).sort((a, b) => a.order - b.order).slice(0, 6);
    pageFrame(`<section class="hero" id="top" aria-labelledby="hero-title"><div class="hero-copy"><p id="hero-title">まだ知らないを、<br />おもしろいへ。</p><span></span></div><div class="hero-stage"><div class="hero-globe">${globe()}</div><div class="hero-orbit orbit-wide">${["book", "coffee", "pc", "camera"].map(orbitItem).join("")}</div><div class="hero-orbit orbit-high">${["ticket", "leaf", "headphones"].map(orbitItem).join("")}</div><img class="hero-girl" src="${asset("assets/girl-walk.png")}" alt="地球儀の前を歩く今泉心寧のイラスト" /></div><p class="hero-role">Designer / Planner</p><div class="hero-name"><p>Kokone Imaizumi</p><span>Portfolio</span></div><a class="scroll-cue" href="#about"><span>Scroll</span><i aria-hidden="true"></i></a></section><section class="home-about page-section" id="about" data-section="about"><div class="section-label"><span>01</span><span>About</span></div><div class="about-preview"><div class="about-figure"><img src="${asset("assets/girl-walk.png")}" alt="" /></div><div class="about-copy"><p class="eyebrow">人に会い、問いを見つけ、伝わる形をデザインする。</p><h2>人の面白さを見つけて、<br />形にする人。</h2><p>${escapeHtml(DATA.profile.body)}</p><a data-route class="text-link" href="${route("about/")}">About <span aria-hidden="true">↗</span></a></div></div></section><section class="home-news page-section" id="news" data-section="news"><div class="section-heading"><div class="section-label"><span>02</span><span>News</span></div><h2>最近の、まだ知らない。</h2><p>会いに行ったこと、考えたこと、つくったもの。</p></div><div class="news-grid">${news.map(newsCard).join("")}</div><a data-route class="text-link section-link" href="${route("news/")}">View all news <span aria-hidden="true">↗</span></a></section><section class="home-works page-section" id="works" data-section="works"><div class="section-heading"><div class="section-label"><span>03</span><span>Works Journey</span></div><h2>歩きながら、集めてきたもの。</h2><p>作品の奥には、いつも誰かの声や場所の空気がある。</p></div><div class="journey"><div class="journey-track" aria-hidden="true"><span class="journey-line"></span><span class="journey-dot dot-a"></span><span class="journey-dot dot-b"></span><span class="journey-dot dot-c"></span><span class="journey-dot dot-d"></span><span class="journey-dot dot-e"></span><span class="journey-dot dot-f"></span><img class="journey-girl" src="${asset("assets/girl-walk.png")}" alt="" /></div><div class="journey-grid">${works.map((work, index) => workCard(work, index % 2 === 0 ? "left" : "right")).join("")}</div></div><a data-route class="text-link section-link" href="${route("works/")}">View all works <span aria-hidden="true">↗</span></a></section><section class="home-ending page-section" aria-labelledby="ending-title"><div class="ending-thread" aria-hidden="true"><span></span><span></span><span></span></div><p class="eyebrow">All the things I met along the way.</p><h2 id="ending-title">まだ知らないを、<br />おもしろいへ。</h2><p>人と出会い、問いを見つけ、伝わる形へ。</p></section>`, "top", { home: true });
  }

  function pageHero(number, title, lead, className = "") {
    return `<section class="page-hero ${className}"><div class="page-hero-meta"><span>${number}</span><span>${title}</span></div><div><p class="eyebrow">Kokone Imaizumi Portfolio</p><h1>${title}</h1><p class="page-lead">${lead}</p></div><div class="page-hero-mark">${globe("page-globe")}<span aria-hidden="true">✦</span></div></section>`;
  }

  function renderAbout() {
    pageFrame(`${pageHero("01", "About", "人が好きだから、まず話を聞く。") }<section class="content-section about-intro"><div class="section-label"><span>Profile</span></div><div class="rich-copy"><h2>${DATA.profile.intro}</h2><p>${DATA.profile.body}</p><p>${DATA.profile.message}</p></div></section><section class="content-section timeline-wrap"><div class="section-label"><span>Timeline</span><span>How I move</span></div><div class="timeline">${DATA.timeline.map((item) => `<article class="timeline-item"><span class="timeline-number">${item.year}</span><div><p class="eyebrow">${item.title}</p><h3>${item.heading}</h3><p>${item.body}</p></div></article>`).join("")}</div></section><section class="content-section skills-wrap"><div class="section-label"><span>Skills</span><span>What I bring</span></div><div class="skill-grid">${DATA.skills.map((skill) => `<article class="skill-item"><p class="eyebrow">${skill.label}</p><h3>${skill.title}</h3><p>${skill.body}</p></article>`).join("")}</div></section><section class="quote-section"><p>「まだ知らない」を、<br />一緒に面白がる。</p><a data-route class="text-link" href="${route("contact/")}">Let's talk <span aria-hidden="true">↗</span></a></section>`, "about");
  }

  function newsCard(item) {
    return `<article class="news-card"><div class="news-card-top"><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.category)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p>${item.type === "article" ? `<a data-route class="text-link" href="${route(`news/${item.slug}/`)}">Read more <span aria-hidden="true">↗</span></a>` : "<span class=\"news-note\">Short note</span>"}</article>`;
  }

  function renderNews() {
    pageFrame(`${pageHero("02", "News", "会いに行ったこと、考えたこと、つくったもの。") }<section class="content-section listing-section"><div class="listing-intro"><p class="eyebrow">Notes from the field</p><p>活動の途中で見つけたことを、短い記録と記事にして残します。</p></div><div class="news-list-page">${DATA.news.map(newsCard).join("")}</div></section>`, "news");
  }

  function renderNewsDetail(slug) {
    const item = DATA.news.find((news) => news.slug === slug && news.type === "article");
    if (!item) return renderNotFound();
    pageFrame(`${pageHero("02", "News", item.title, "detail-hero") }<article class="article-page"><div class="article-meta"><time>${item.date}</time><span>${item.category}</span></div><div class="article-body">${item.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div><a data-route class="text-link" href="${route("news/")}">Back to news <span aria-hidden="true">↗</span></a></article>`, "news");
  }

  function workCard(work, side = "grid") {
    return `<article class="work-card work-card-${side}" data-work-id="${work.id}"><a data-route href="${route(`works/${work.slug}/`)}" class="work-card-link"><div class="work-image"><img src="${asset("assets/hero-illustration.png")}" alt="${escapeHtml(work.title)}のイメージ" loading="lazy" /><span class="work-number">0${work.order}</span></div><div class="work-card-copy"><div class="work-card-meta"><span>${escapeHtml(work.category)}</span><span>${escapeHtml(work.year)}</span></div><h3>${escapeHtml(work.title)}</h3><p>${escapeHtml(work.summary)}</p><div class="tag-list">${work.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div></div></a><button class="work-quick-view" type="button" data-modal-work="${work.id}" aria-label="${escapeHtml(work.title)}の概要を見る">＋</button></article>`;
  }

  function renderWorks() {
    pageFrame(`${pageHero("03", "Works", "人、場所、問い。出会ったものを、伝わる形へ。") }<section class="content-section works-listing"><div class="works-toolbar"><div class="filter-list" role="group" aria-label="作品をタグで絞り込む">${DATA.tags.map((tag) => `<button type="button" data-filter="${tag}" aria-pressed="${tag === "All"}">${tag}</button>`).join("")}</div><label class="search-box"><span>Search</span><input type="search" data-search placeholder="作品・タグ・ツールを探す" /></label></div><div class="works-grid" data-works-grid>${DATA.works.map((work) => workCard(work)).join("")}</div><p class="empty-state" data-empty hidden>該当する作品が見つかりませんでした。<br />条件を変えてもう一度お試しください。</p></section>`, "works");
    bindWorkFilters();
  }

  function renderWorkDetail(slug) {
    const work = DATA.works.find((item) => item.slug === slug);
    if (!work) return renderNotFound();
    pageFrame(`${pageHero("03", "Works", work.title, "detail-hero") }<article class="work-detail"><div class="detail-lead"><div><p class="eyebrow">${work.category} / ${work.year}</p><h2>${work.summary}</h2></div><div class="tag-list">${work.tags.map((tag) => `<span>${tag}</span>`).join("")}</div></div><div class="detail-image"><img src="${asset("assets/hero-illustration.png")}" alt="${escapeHtml(work.title)}のメインビジュアル" /></div><div class="detail-columns"><div class="detail-story"><h3>Overview</h3><p>${work.body}</p>${work.sections.map((section) => `<section><p class="eyebrow">${section}</p><p>${placeholderFor(section, work)}</p></section>`).join("")}</div><aside class="detail-facts"><dl><div><dt>Role</dt><dd>${work.role}</dd></div><div><dt>Tools</dt><dd>${work.tools.join(" / ")}</dd></div><div><dt>Learning</dt><dd>${work.learning}</dd></div></dl></aside></div><div class="detail-footer"><a data-route class="text-link" href="${route("works/")}">Back to works <span aria-hidden="true">↗</span></a><a data-route class="text-link" href="${route("contact/")}">Let's talk <span aria-hidden="true">↗</span></a></div></article>`, "works");
  }

  function placeholderFor(section, work) {
    const map = { 背景: work.body, 課題: "誰に、どの場面で、何が伝わりにくいのかを観察し、最初の問いを置きました。", プロセス: "観察、問いの整理、試作、フィードバック、調整の順番で進めました。", デザイン: "情報の優先順位と読むリズムを整え、必要なものが自然に見える構成を考えました。", 学び: work.learning, 担当: work.role, 工夫: "相手の言葉を起点に、伝える順番と見せ方を組み替えました。", 取材: "相手の話を急いで結論へ運ばず、言葉の背景まで聞くことを大切にしました。", 編集: "拾った言葉の温度を残しながら、読む人が迷わない順番へ編集しました。", 記録: "出会った人の言葉と、自分の問いが変わった瞬間を記録しました。" };
    return map[section] || work.body;
  }

  function renderContact() {
    pageFrame(`${pageHero("04", "Contact", "まだ形になっていないことも、話すところから。") }<section class="content-section contact-page"><div class="contact-message"><p class="eyebrow">Let's connect</p><h2>企画、デザイン、取材、イベント、言葉にすること。</h2><p>小さな違和感やアイデアから、一緒に始められます。</p></div><div class="contact-list">${DATA.socials.map((item) => `<a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}><span>${item.label}</span><span aria-hidden="true">↗</span></a>`).join("")}</div></section>`, "contact");
  }

  function renderNotFound() {
    pageFrame(`${pageHero("404", "Not found", "まだ知らない場所みたいです。", "not-found-hero") }<section class="not-found"><img src="${asset("assets/girl-walk.png")}" alt="少し困った様子のイラスト" /><div><h2>ページが移動したか、<br />URLが違っているようです。</h2><a data-route class="text-link" href="${route("")}">Back to top <span aria-hidden="true">↗</span></a></div></section>`, "");
  }

  function bindCommon() {
    document.querySelectorAll("[data-route]").forEach((link) => {
      if (link.dataset.routeBound === "true") return;
      link.dataset.routeBound = "true";
      link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || link.target === "_blank") return;
      event.preventDefault();
      const url = new URL(href, window.location.href);
      history.pushState({}, "", url.pathname + url.search);
      renderRoute();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
    const menuButton = document.querySelector(".menu-button");
    const mobileNav = document.querySelector(".mobile-nav");
    if (menuButton && menuButton.dataset.bound !== "true") menuButton.addEventListener("click", () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });
    if (menuButton) menuButton.dataset.bound = "true";
    mobileNav?.querySelectorAll("a").forEach((link) => {
      if (link.dataset.menuBound === "true") return;
      link.dataset.menuBound = "true";
      link.addEventListener("click", () => {
      mobileNav.hidden = true;
      document.body.classList.remove("menu-open");
      });
    });
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop && backToTop.dataset.bound !== "true") {
      backToTop.dataset.bound = "true";
      backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
    }
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      if (link.dataset.anchorBound === "true") return;
      link.dataset.anchorBound = "true";
      link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      });
    });
    if (!window.__portfolioScrollBound) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.__portfolioScrollBound = true;
    }
    if (!window.__portfolioKeyBound) {
      window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
      window.__portfolioKeyBound = true;
    }
    handleScroll();
  }

  function bindWorkFilters() {
    const grid = document.querySelector("[data-works-grid]");
    const empty = document.querySelector("[data-empty]");
    const buttons = [...document.querySelectorAll("[data-filter]")];
    const search = document.querySelector("[data-search]");
    let selected = "All";
    function update() {
      const query = (search.value || "").trim().toLowerCase();
      const filtered = DATA.works.filter((work) => {
        const matchesTag = selected === "All" || work.tags.includes(selected);
        const text = [work.title, work.summary, work.category, work.role, ...work.tags, ...work.tools].join(" ").toLowerCase();
        return matchesTag && (!query || text.includes(query));
      });
      grid.innerHTML = filtered.map((work) => workCard(work)).join("");
      empty.hidden = filtered.length > 0;
      grid.hidden = filtered.length === 0;
      bindCommon();
    }
    buttons.forEach((button) => button.addEventListener("click", () => { selected = button.dataset.filter; buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button))); update(); }));
    search.addEventListener("input", update);
  }

  function openModal(workId) {
    const work = DATA.works.find((item) => item.id === workId);
    if (!work) return;
    const root = document.querySelector("#modal-root");
    modalOrigin = document.activeElement;
    root.hidden = false;
    document.body.classList.add("modal-open");
    root.innerHTML = `<div class="modal-backdrop" data-close-modal></div><section class="work-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close-modal aria-label="閉じる">×</button><p class="eyebrow">${work.category} / ${work.year}</p><h2 id="modal-title">${work.title}</h2><p class="modal-summary">${work.summary}</p><dl class="modal-facts"><div><dt>Role</dt><dd>${work.role}</dd></div><div><dt>Tools</dt><dd>${work.tools.join(" / ")}</dd></div><div><dt>Learning</dt><dd>${work.learning}</dd></div></dl><a data-route class="text-link" href="${route(`works/${work.slug}/`)}">詳しく見る <span aria-hidden="true">↗</span></a></section>`;
    root.querySelectorAll("[data-close-modal]").forEach((item) => item.addEventListener("click", closeModal));
    root.querySelector(".modal-close").focus();
    bindCommon();
  }

  function closeModal() {
    const root = document.querySelector("#modal-root");
    if (!root || root.hidden) return;
    root.hidden = true;
    root.innerHTML = "";
    document.body.classList.remove("modal-open");
    if (modalOrigin && typeof modalOrigin.focus === "function") modalOrigin.focus();
    modalOrigin = null;
  }

  function handleScroll() {
    const header = document.querySelector(".site-header");
    const topButton = document.querySelector(".back-to-top");
    header?.classList.toggle("is-scrolled", window.scrollY > 32);
    topButton?.classList.toggle("is-visible", window.scrollY > 600);
    const globeElement = document.querySelector(".brand-globe");
    if (globeElement) globeElement.style.setProperty("--rotation", `${Math.round(window.scrollY * 0.22)}deg`);
    const journey = document.querySelector(".journey");
    if (journey) {
      const rect = journey.getBoundingClientRect();
      const progress = Math.max(0, Math.min(100, ((window.innerHeight * 0.72 - rect.top) / Math.max(1, rect.height - window.innerHeight * 0.18)) * 100));
      journey.style.setProperty("--journey-progress", `${progress}%`);
      journey.querySelector(".journey-girl")?.style.setProperty("--journey-x", `${progress}%`);
      journey.querySelectorAll(".work-card").forEach((card, index) => card.classList.toggle("is-near", progress > index * 16 && progress < (index + 1) * 18));
    }
  }

  function runOpening() {
    const opening = document.querySelector(".opening");
    const stage = document.querySelector(".opening-stage");
    const progress = document.querySelector(".loading-progress");
    const particles = document.querySelector(".particle-field");
    if (!opening) return;
    const count = window.innerWidth < 640 ? 18 : 36;
    particles.innerHTML = Array.from({ length: count }, (_, index) => `<i style="--x:${(index * 37) % 100}%;--y:${(index * 53) % 100}%;--delay:${index % 7}s;--drift:${(index % 5) * 5 - 10}px"></i>`).join("");
    if (reducedMotion) {
      progress.textContent = "100%";
      stage.classList.add("is-globe-visible", "is-girl-visible", "is-items-visible");
      window.setTimeout(() => finishOpening(opening), 500);
      return;
    }
    let value = 0;
    const tick = () => {
      progress.textContent = `${value}%`;
      if (value < 100) {
        value += 1;
        const delay = value < 12 ? 48 : value < 28 ? 30 : value < 82 ? 18 + (value % 5) * 8 : 45 + (value % 6) * 18;
        window.setTimeout(tick, delay);
      }
    };
    tick();
    window.setTimeout(() => stage.classList.add("is-globe-visible"), 2000);
    window.setTimeout(() => stage.classList.add("is-girl-visible"), 3250);
    window.setTimeout(() => stage.classList.add("is-items-visible"), 5050);
    window.setTimeout(() => finishOpening(opening), 7800);
  }

  function finishOpening(opening) {
    const progress = opening.querySelector(".loading-progress");
    progress.textContent = "100%";
    opening.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    document.body.classList.add("ready");
  }

  function renderRoute() {
    const path = pagePath();
    if (path === "/" || path === SITE_PREFIX) return renderHome();
    const aboutPath = SITE_PREFIX + "/about";
    const newsPath = SITE_PREFIX + "/news";
    const worksPath = SITE_PREFIX + "/works";
    const contactPath = SITE_PREFIX + "/contact";
    if (path === aboutPath) return renderAbout();
    if (path === newsPath) return renderNews();
    if (path.startsWith(newsPath + "/")) return renderNewsDetail(path.split("/").filter(Boolean).pop());
    if (path === worksPath) return renderWorks();
    if (path.startsWith(worksPath + "/")) return renderWorkDetail(path.split("/").filter(Boolean).pop());
    if (path === contactPath) return renderContact();
    renderNotFound();
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-modal-work]");
    if (button) { event.preventDefault(); openModal(button.dataset.modalWork); }
  });
  window.addEventListener("popstate", renderRoute);
  renderRoute();
})();
