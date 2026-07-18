const REQUIRED_IMAGE = "./assets/hero-illustration.png";
const NAV_ITEMS = [...document.querySelectorAll("[data-nav]")];
const TAGS = ["All", "Design", "Technology", "SNS", "Competition", "Event", "Hobby"];

const WORKS = [
  {
    id: "uiux",
    title: "問いから始めるUI設計",
    category: "Design",
    summary: "観察からユーザーの迷いを見つけ、画面の構造と言葉を整える。",
    tags: ["Design", "Technology"],
    role: "リサーチ、情報設計、UI設計、プロトタイピング",
    tools: "Figma / Notion / ChatGPT",
    learning: "画面を作る前に、誰のどんな迷いをほどくのかを言語化する大切さ。",
  },
  {
    id: "marugoto",
    title: "まるごと祭 営業",
    category: "Event",
    summary: "企画の価値を、相手の関心や言葉に合わせて届ける。",
    tags: ["Event", "SNS"],
    role: "営業、関係構築、企画説明",
    tools: "Google Workspace / Canva / SNS",
    learning: "相手を知ることが、伝わる提案の最初のデザインになること。",
  },
  {
    id: "hanabi",
    title: "Hanabi 営業・経理",
    category: "Event",
    summary: "表の体験と裏側の数字をつなぎ、続けられる運営を考える。",
    tags: ["Event", "Design"],
    role: "営業、経理補助、運営設計",
    tools: "Spreadsheet / Notion",
    learning: "よい体験は、華やかな表側と地道な裏側の両方でできていること。",
  },
  {
    id: "newspaper",
    title: "しわしわ新聞",
    category: "Writing",
    summary: "日常の小さな発見を、誰かに話したくなる紙面にする。",
    tags: ["Design", "Hobby"],
    role: "企画、編集、ライティング、紙面構成",
    tools: "Illustrator / InDesign / Figma",
    learning: "小さな違和感や好きなものも、編集すれば人に届く物語になること。",
  },
  {
    id: "secom",
    title: "セコム取材",
    category: "Interview",
    summary: "現場の人の声から、仕事や会社の輪郭をストーリーにする。",
    tags: ["Design", "SNS"],
    role: "取材、構成、記事化",
    tools: "Voice memo / Docs / Camera",
    learning: "会社紹介ではなく、人の声から価値を立ち上げる取材の面白さ。",
  },
  {
    id: "ivs",
    title: "IVS / TORYUMON",
    category: "Technology",
    summary: "挑戦する人や新しい技術に会い、自分の問いを更新する。",
    tags: ["Technology", "Competition", "Event"],
    role: "参加、記録、ネットワーキング",
    tools: "note / SNS / Camera",
    learning: "まだ知らない技術も、人に会うことで自分の言葉に変わっていくこと。",
  },
];

const NEWS = [
  {
    title: "Portfolio Renewal",
    category: "Update",
    date: "2026.07",
    summary: "世界観とモーション仕様を整理し、GitHub Pagesで育てていくポートフォリオとして再構成しました。",
  },
  {
    title: "Works will grow",
    category: "Note",
    date: "Coming soon",
    summary: "作品詳細は、noteの更新のように少しずつ追加していく予定です。",
  },
  {
    title: "Fieldwork archive",
    category: "Activity",
    date: "Draft",
    summary: "地域、イベント、人に会いに行った記録を縦タイムラインとして更新していきます。",
  },
];

const state = {
  selectedTag: "All",
  query: "",
  lastFocusedElement: null,
};

const elements = {
  body: document.body,
  opening: document.querySelector(".opening"),
  openingVisual: document.querySelector(".opening-visual"),
  progress: document.querySelector(".loading-progress"),
  particleField: document.querySelector(".particle-field"),
  header: document.querySelector(".site-header"),
  miniGlobe: document.querySelector(".mini-globe"),
  menuButton: document.querySelector(".menu-button"),
  mobileNav: document.querySelector(".mobile-nav"),
  workFilters: document.querySelector("#work-filters"),
  workSearch: document.querySelector("#work-search"),
  workList: document.querySelector("#work-list"),
  newsList: document.querySelector("#news-list"),
  walkLine: document.querySelector(".walk-line"),
  backToTop: document.querySelector(".back-to-top"),
  modal: document.querySelector("#work-modal"),
  modalPanel: document.querySelector(".modal-panel"),
  modalClose: document.querySelector(".modal-close"),
  modalBackdrop: document.querySelector(".modal-backdrop"),
};

function init() {
  createParticles();
  renderNews();
  renderFilters();
  renderWorks();
  bindEvents();
  observeSections();
  runOpening();
  updateScrollEffects();
}

function createParticles() {
  const count = window.matchMedia("(max-width: 640px)").matches ? 18 : 34;
  elements.particleField.innerHTML = Array.from({ length: count }, (_, index) => {
    const left = Math.round((index * 37) % 100);
    const top = Math.round((index * 53) % 100);
    const dx = ((index % 5) - 2) * 9;
    const dy = (((index + 2) % 7) - 3) * 7;
    const duration = 7 + (index % 6);
    return `<span style="left:${left}%;top:${top}%;--dx:${dx}px;--dy:${dy}px;--duration:${duration}s"></span>`;
  }).join("");
}

async function runOpening() {
  const imageReady = preloadImage(REQUIRED_IMAGE);
  window.setTimeout(() => elements.openingVisual.classList.add("is-visible"), 2000);

  for (let value = 0; value <= 99; value += 1) {
    elements.progress.textContent = `${value}%`;
    await wait(progressDelay(value));
  }

  await imageReady;
  elements.progress.textContent = "100%";
  await wait(520);
  elements.opening.classList.add("is-hidden");
  elements.body.classList.remove("is-loading");
  elements.body.classList.add("ready");
}

function progressDelay(value) {
  if (value < 18) return 28 + (value % 3) * 10;
  if (value < 52) return 16 + (value % 5) * 8;
  if (value < 82) return 24 + (value % 4) * 12;
  return 36 + (value % 6) * 16;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
  });
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function bindEvents() {
  elements.workSearch.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    renderWorks();
  });

  elements.menuButton.addEventListener("click", toggleMobileMenu);
  elements.mobileNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) closeMobileMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  });

  elements.backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });

  elements.modalClose.addEventListener("click", closeModal);
  elements.modalBackdrop.addEventListener("click", () => {
    if (!window.matchMedia("(max-width: 640px)").matches) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!elements.mobileNav.hidden) closeMobileMenu();
      if (!elements.modal.hidden) closeModal();
    }
  });

  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  window.addEventListener("resize", updateScrollEffects);
}

function renderNews() {
  if (!NEWS.length) {
    elements.newsList.innerHTML = `<p class="empty-state">NEWSはこれから追加されます。</p>`;
    return;
  }

  elements.newsList.innerHTML = NEWS.slice(0, 3).map((item) => `
    <article class="news-card">
      <span>${escapeHtml(item.category)}</span>
      <time>${escapeHtml(item.date)}</time>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
    </article>
  `).join("");
}

function renderFilters() {
  elements.workFilters.innerHTML = TAGS.map((tag) => `
    <button class="tag-button" type="button" aria-pressed="${tag === state.selectedTag}" data-tag="${escapeHtml(tag)}">
      ${escapeHtml(tag)}
    </button>
  `).join("");

  elements.workFilters.querySelectorAll("[data-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTag = button.dataset.tag;
      renderFilters();
      renderWorks();
    });
  });
}

function renderWorks() {
  const query = state.query.toLowerCase();
  const filtered = WORKS.filter((work) => {
    const matchesTag = state.selectedTag === "All" || work.tags.includes(state.selectedTag);
    const haystack = [work.title, work.summary, work.category, ...work.tags].join(" ").toLowerCase();
    return matchesTag && (!query || haystack.includes(query));
  });

  if (!filtered.length) {
    elements.workList.innerHTML = `<p class="empty-state">該当する作品が見つかりませんでした。</p>`;
    return;
  }

  elements.workList.innerHTML = filtered.map((work) => `
    <button class="work-item" type="button" data-work-id="${escapeHtml(work.id)}">
      <span>${escapeHtml(work.category)}</span>
      <h3>${escapeHtml(work.title)}</h3>
      <p>${escapeHtml(work.summary)}</p>
      <div class="work-tags">
        ${work.tags.map((tag) => `<b>${escapeHtml(tag)}</b>`).join("")}
      </div>
    </button>
  `).join("");

  elements.workList.querySelectorAll("[data-work-id]").forEach((button, index) => {
    button.style.transitionDelay = `${index * 80}ms`;
    button.addEventListener("click", () => openModal(button.dataset.workId, button));
    workObserver.observe(button);
  });
}

const workObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.16 }
);

function openModal(workId, trigger) {
  const work = WORKS.find((item) => item.id === workId);
  if (!work) return;

  state.lastFocusedElement = trigger;
  document.querySelector("#work-modal-category").textContent = work.category;
  document.querySelector("#work-modal-title").textContent = work.title;
  document.querySelector("#work-modal-summary").textContent = work.summary;
  document.querySelector("#work-modal-role").textContent = work.role;
  document.querySelector("#work-modal-tools").textContent = work.tools;
  document.querySelector("#work-modal-learning").textContent = work.learning;
  document.querySelector("#work-modal-link").href = `#${work.id}`;

  elements.modal.hidden = false;
  elements.body.classList.add("modal-open");
  elements.modalClose.focus();
}

function closeModal() {
  elements.modal.hidden = true;
  elements.body.classList.remove("modal-open");
  state.lastFocusedElement?.focus();
}

function toggleMobileMenu() {
  const willOpen = elements.mobileNav.hidden;
  elements.mobileNav.hidden = !willOpen;
  elements.body.classList.toggle("menu-open", willOpen);
  elements.menuButton.setAttribute("aria-expanded", String(willOpen));
}

function closeMobileMenu() {
  elements.mobileNav.hidden = true;
  elements.body.classList.remove("menu-open");
  elements.menuButton.setAttribute("aria-expanded", "false");
  elements.menuButton.focus();
}

function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrentNav(visible.target.dataset.section);
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  document.querySelectorAll(".section-observe").forEach((section) => observer.observe(section));
}

function setCurrentNav(section) {
  NAV_ITEMS.forEach((item) => {
    if (item.dataset.nav === section) {
      item.setAttribute("aria-current", "location");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function updateScrollEffects() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, scrollY / max);

  elements.header.classList.toggle("is-scrolled", scrollY > 40);
  elements.backToTop.classList.toggle("is-visible", scrollY > 720);
  elements.miniGlobe?.style.setProperty("--globe-rotation", `${Math.round(progress * 540)}deg`);

  if (elements.walkLine) {
    const rect = elements.walkLine.getBoundingClientRect();
    const raw = (window.innerHeight * 0.72 - rect.top) / (window.innerHeight * 0.52);
    const walk = Math.max(0, Math.min(1, raw));
    elements.walkLine.style.setProperty("--walk-progress", String(Math.round(walk * 100)));
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
