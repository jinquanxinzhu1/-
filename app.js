const STORAGE_KEY = "school-field-guide-state-v2";
const DEFAULT_CATEGORY = "all";

const PEOPLE = [
  {
    id: "fresh-001",
    kind: "新入生",
    grade: "1年",
    name: "伊吹 さくら",
    nickname: "さく",
    hometown: "徳島県神山町",
    hobby: "写真と川辺の散歩",
    ambition: "地域の風景を残せるデザイナーになる",
    profileExtra: "好きな食べ物: すだちうどん / 一言: 夕方の空が好き",
  },
  {
    id: "fresh-002",
    kind: "新入生",
    grade: "1年",
    name: "瀬尾 湊",
    nickname: "みなと",
    hometown: "香川県高松市",
    hobby: "ボードゲームとラジオ",
    ambition: "人を笑顔にするサービスをつくる",
    profileExtra: "好きなこと: 深夜の作業通話 / 一言: 初対面は緊張しがち",
  },
  {
    id: "fresh-003",
    kind: "新入生",
    grade: "1年",
    name: "多田 凪",
    nickname: "なぎ",
    hometown: "岡山県倉敷市",
    hobby: "映像編集とサッカー観戦",
    ambition: "映像で学校の魅力を伝えたい",
    profileExtra: "好きな食べ物: プリン / 一言: 朝は少し弱い",
  },
  {
    id: "student-001",
    kind: "在校生",
    grade: "2年",
    name: "秋月 楓",
    nickname: "ふう",
    hometown: "兵庫県神戸市",
    hobby: "UIデザインと喫茶店めぐり",
    ambition: "使う人に寄り添うプロダクトをつくる",
    profileExtra: "好きなもの: レトロ建築 / 一言: 困っていたらすぐ声をかけてほしい",
  },
  {
    id: "student-002",
    kind: "在校生",
    grade: "3年",
    name: "日向 蓮",
    nickname: "れん",
    hometown: "福岡県福岡市",
    hobby: "ドローン撮影とキャンプ",
    ambition: "テクノロジーで地域課題を解決する",
    profileExtra: "好きな食べ物: カレー / 一言: 外で作業するのが好き",
  },
  {
    id: "student-003",
    kind: "在校生",
    grade: "4年",
    name: "高瀬 真白",
    nickname: "ましろ",
    hometown: "京都府京都市",
    hobby: "プログラミングと短歌",
    ambition: "言葉と技術の両方で人を支える",
    profileExtra: "好きな時間: 雨の日の朝 / 一言: 相談歓迎",
  },
  {
    id: "staff-001",
    kind: "スタッフ",
    grade: "教員",
    name: "篠原 奏",
    nickname: "しのはら先生",
    hometown: "愛媛県松山市",
    hobby: "木工と読書",
    ambition: "学ぶ楽しさを日常に混ぜる",
    profileExtra: "担当: プロジェクト演習 / 一言: 手を動かして考える派",
  },
  {
    id: "staff-002",
    kind: "スタッフ",
    grade: "教員",
    name: "早瀬 悠",
    nickname: "はやせ先生",
    hometown: "東京都三鷹市",
    hobby: "料理と登山",
    ambition: "挑戦のハードルを下げる場をつくる",
    profileExtra: "担当: デザイン基礎 / 一言: 小さな違和感を大切にする",
  },
  {
    id: "staff-003",
    kind: "スタッフ",
    grade: "スタッフ",
    name: "相馬 あかり",
    nickname: "あかりさん",
    hometown: "高知県高知市",
    hobby: "手帳づくりと散歩",
    ambition: "安心して相談できる学校を支える",
    profileExtra: "担当: 学生サポート / 一言: 雑談も歓迎",
  },
];

const elements = {};
const state = loadState();
let currentTab = "home";
let currentCategory = DEFAULT_CATEGORY;
let searchQuery = "";
let selectedPersonId = null;
let activeStream = null;
let lastCandidateIds = [];
let challengePersonId = null;

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  seedState();
  attachEvents();
  renderAll();
});

function bindElements() {
  elements.statsGrid = document.getElementById("stats-grid");
  elements.missionsList = document.getElementById("missions-list");
  elements.recentList = document.getElementById("recent-list");
  elements.setupList = document.getElementById("setup-list");
  elements.categoryTabs = document.getElementById("category-tabs");
  elements.collectionGrid = document.getElementById("collection-grid");
  elements.collectionProgress = document.getElementById("collection-progress");
  elements.searchInput = document.getElementById("search-input");
  elements.detailView = document.getElementById("detail-view");
  elements.cameraVideo = document.getElementById("camera-video");
  elements.cameraPlaceholder = document.getElementById("camera-placeholder");
  elements.scanStatus = document.getElementById("scan-status");
  elements.candidateSection = document.getElementById("candidate-section");
  elements.candidateGrid = document.getElementById("candidate-grid");
  elements.challengeSection = document.getElementById("challenge-section");
  elements.challengeCard = document.getElementById("challenge-card");
  elements.scanKindFilter = document.getElementById("scan-kind-filter");
  elements.scanGradeFilter = document.getElementById("scan-grade-filter");
  elements.personCardTemplate = document.getElementById("person-card-template");
  elements.refreshMissionsButton = document.getElementById("refresh-missions-button");
  elements.resetDataButton = document.getElementById("reset-data-button");
  elements.backToCollectionButton = document.getElementById("back-to-collection-button");
  elements.exportDataButton = document.getElementById("export-data-button");
  elements.importDataInput = document.getElementById("import-data-input");
  elements.importStatus = document.getElementById("import-status");
  elements.addPersonForm = document.getElementById("add-person-form");
  elements.rosterList = document.getElementById("roster-list");
}

function attachEvents() {
  document.querySelectorAll("[data-open-tab]").forEach((button) => {
    button.addEventListener("click", () => openTab(button.dataset.openTab));
  });

  document.getElementById("start-camera-button").addEventListener("click", startCamera);
  document.getElementById("stop-camera-button").addEventListener("click", stopCamera);
  document.getElementById("scan-button").addEventListener("click", handleScan);
  elements.scanKindFilter.addEventListener("change", () => {
    renderScanGradeOptions();
  });
  elements.searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value.trim();
    renderCollection();
  });
  elements.refreshMissionsButton.addEventListener("click", () => {
    state.missions = buildMissions(true);
    persistState();
    renderHome();
  });
  elements.resetDataButton.addEventListener("click", () => {
    if (!window.confirm("進捗・メモ・ミッションを初期化しますか？")) return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });
  elements.backToCollectionButton.addEventListener("click", () => openTab("collection"));
  elements.exportDataButton.addEventListener("click", exportData);
  elements.importDataInput.addEventListener("change", importData);
  elements.addPersonForm.addEventListener("submit", addPerson);
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Failed to load state", error);
    return {};
  }
}

function seedState() {
  const today = getTodayKey();
  state.progress = state.progress || {};
  state.memos = state.memos || {};
  state.selfEdits = state.selfEdits || {};
  state.customPeople = state.customPeople || [];
  state.photos = state.photos || {};
  state.recent = state.recent || [];
  state.lastOpenedTab = state.lastOpenedTab || "home";

  getAllPeople().forEach((person) => {
    if (!state.progress[person.id]) {
      state.progress[person.id] = {
        recognitionCount: 0,
        correctCount: 0,
        wrongCount: 0,
        unlockedLevel: 0,
        status: "未習得",
        lastSeenAt: null,
      };
    }
  });

  if (!state.missions || state.missions.date !== today) {
    state.missions = buildMissions(false);
  }

  currentTab = state.lastOpenedTab;
  renderScanGradeOptions();
  persistState();
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function openTab(tab) {
  currentTab = tab;
  state.lastOpenedTab = tab;
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.openTab === tab);
  });
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.tabPanel !== tab);
  });
  const homePanel = document.querySelector(".home-panel");
  homePanel.classList.toggle("hidden", tab !== "home");

  if (tab === "detail") renderDetail();
  if (tab === "collection") renderCollection();
  if (tab === "data") renderDataPanel();

  persistState();
}

function renderAll() {
  renderHome();
  renderCategoryTabs();
  renderCollection();
  renderDetail();
  renderDataPanel();
  openTab(currentTab);
}

function renderHome() {
  const stats = buildStats();
  elements.statsGrid.innerHTML = stats
    .map(
      (item) => `
        <article class="stat-card">
          <p class="eyebrow">${item.label}</p>
          <strong>${item.value}</strong>
          <p class="small-copy">${item.caption}</p>
        </article>
      `
    )
    .join("");

  const missions = getMissionPeople();
  elements.missionsList.innerHTML = missions
    .map((person) => {
      const progress = getPersonProgress(person.id);
      const missionDone = state.missions.completedIds.includes(person.id);
      return `
        <div class="mission-item">
          <div>
            <strong>${person.name}</strong>
            <p class="mission-line">${person.kind} / ${person.grade} / ${progress.status}</p>
          </div>
          <span class="mini-badge">${missionDone ? "達成" : "未達成"}</span>
        </div>
      `;
    })
    .join("");

  const recentPeople = state.recent
    .map((id) => getPersonById(id))
    .filter(Boolean)
    .slice(0, 3);
  elements.recentList.innerHTML =
    recentPeople.length > 0
      ? recentPeople
          .map(
            (person) => `
              <div class="recent-item">
                <div>
                  <strong>${person.name}</strong>
                  <p class="recent-line">認識 ${getPersonProgress(person.id).recognitionCount} 回 / 正解 ${getPersonProgress(person.id).correctCount} 回</p>
                </div>
                <button class="ghost-button small" type="button" onclick="window.appOpenDetail('${person.id}')">見る</button>
              </div>
            `
          )
          .join("")
      : `<div class="recent-item"><div><strong>まだ記録がありません</strong><p class="recent-line">カメラ認識からスタートできます。</p></div></div>`;

  elements.setupList.innerHTML = buildSetupItems()
    .map(
      (item) => `
        <div class="mission-item">
          <div>
            <strong>${item.title}</strong>
            <p class="mission-line">${item.caption}</p>
          </div>
          <span class="mini-badge">${item.done ? "完了" : "未完了"}</span>
        </div>
      `
    )
    .join("");
}

function renderCategoryTabs() {
  const categories = [
    { key: "all", label: "すべて" },
    { key: "新入生", label: "新入生" },
    { key: "在校生", label: "在校生" },
    { key: "スタッフ", label: "スタッフ" },
  ];

  elements.categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button
          class="pill-button ${currentCategory === category.key ? "is-active" : ""}"
          type="button"
          data-category="${category.key}"
        >
          ${category.label}
        </button>
      `
    )
    .join("");

  elements.categoryTabs.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.dataset.category;
      renderCategoryTabs();
      renderCollection();
    });
  });
}

function renderCollection() {
  const filtered = getAllPeople().filter((person) => {
    const matchesCategory = currentCategory === "all" || person.kind === currentCategory;
    const merged = buildMergedPerson(person.id);
    const haystack = [merged.name, merged.nickname, merged.hometown, merged.profileExtra].join(" ");
    const matchesSearch = !searchQuery || haystack.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completed = filtered.filter((person) => getPersonProgress(person.id).status === "既習得").length;
  elements.collectionProgress.innerHTML = `
    <div>
      <p class="eyebrow">Collection Progress</p>
      <strong>${filtered.length}人中 ${completed}人を覚えた</strong>
    </div>
    <span class="mini-badge">${Math.round((completed / Math.max(filtered.length, 1)) * 100)}%</span>
  `;

  elements.collectionGrid.innerHTML = "";
  filtered.forEach((person) => {
    elements.collectionGrid.appendChild(buildPersonCard(person.id));
  });
}

function buildPersonCard(personId) {
  const template = elements.personCardTemplate.content.cloneNode(true);
  const person = buildMergedPerson(personId);
  const progress = getPersonProgress(personId);
  const node = template.querySelector(".card-surface");

  template.querySelector(".avatar-shell").appendChild(buildAvatarImage(person));
  template.querySelector(".person-role").textContent = `${person.kind} / ${person.grade}`;
  const status = template.querySelector(".status-badge");
  status.textContent = progress.status;
  status.dataset.status = progress.status;
  template.querySelector(".person-name").textContent = getDisplayName(personId);
  template.querySelector(".person-subline").textContent = getSubline(personId);
  template.querySelector(".meter-fill").style.width = `${getMemoryScore(personId)}%`;
  template.querySelector(".meter-label").textContent = `記憶度 ${getMemoryScore(personId)}%`;

  node.addEventListener("click", () => {
    selectedPersonId = personId;
    openTab("detail");
  });

  return template;
}

function renderDetail() {
  if (!selectedPersonId) {
    elements.detailView.innerHTML = `
      <div class="detail-shell">
        <p class="small-copy">図鑑から人物を選ぶと詳細を表示します。</p>
      </div>
    `;
    return;
  }

  const person = buildMergedPerson(selectedPersonId);
  const progress = getPersonProgress(selectedPersonId);
  const unlockedFields = getUnlockedFields(selectedPersonId);
  const memo = state.memos[selectedPersonId] || "";
  const selfEdit = state.selfEdits[selectedPersonId] || {};
  const photoRegistered = Boolean(state.photos[selectedPersonId]);

  elements.detailView.innerHTML = `
    <div class="detail-shell">
      <section class="detail-header">
        <div class="detail-photo">${buildAvatarMarkup(person)}</div>
        <div>
          <p class="eyebrow">${person.kind}</p>
          <h3 class="detail-title">${getDisplayName(selectedPersonId)}</h3>
          <ul class="meta-list">
            <li>${person.grade}</li>
            <li>習得状態: ${progress.status}</li>
            <li>認識 ${progress.recognitionCount} 回 / 正解 ${progress.correctCount} 回</li>
          </ul>
        </div>
      </section>

      <section class="detail-section">
        <div class="card-header">
          <div>
            <p class="eyebrow">Unlocked Profile</p>
            <h3>解放済みプロフィール</h3>
          </div>
          <span class="mini-badge">Lv.${progress.unlockedLevel}</span>
        </div>
        <div class="field-list">
          ${unlockedFields
            .map(
              ([label, value]) => `
                <article class="field-card">
                  <p class="field-label">${label}</p>
                  <p class="field-value">${escapeHtml(value)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="detail-section">
        <div class="card-header">
          <div>
            <p class="eyebrow">Memo</p>
            <h3>自分用メモ</h3>
          </div>
        </div>
        <textarea id="memo-input" placeholder="会話のきっかけや覚え方を書けます。">${escapeHtml(memo)}</textarea>
        <div class="button-row">
          <button class="primary-button" type="button" id="save-memo-button">メモを保存</button>
        </div>
      </section>

      <section class="detail-section">
        <div class="card-header">
          <div>
            <p class="eyebrow">Self Update</p>
            <h3>本人が追加入力できる内容</h3>
          </div>
        </div>
        <div class="input-row">
          <label>
            <span class="field-label">ニックネーム</span>
            <input id="edit-nickname" value="${escapeAttribute(selfEdit.nickname || "")}" />
          </label>
          <label>
            <span class="field-label">趣味</span>
            <input id="edit-hobby" value="${escapeAttribute(selfEdit.hobby || "")}" />
          </label>
          <label>
            <span class="field-label">野心</span>
            <input id="edit-ambition" value="${escapeAttribute(selfEdit.ambition || "")}" />
          </label>
          <label>
            <span class="field-label">自由記述</span>
            <textarea id="edit-extra" placeholder="自分のことをひとことで紹介">${escapeHtml(selfEdit.profileExtra || "")}</textarea>
          </label>
        </div>
        <div class="button-row">
          <button class="secondary-button" type="button" id="save-self-edit-button">追加入力を保存</button>
        </div>
      </section>

      <section class="detail-section">
        <div class="card-header">
          <div>
            <p class="eyebrow">Photo</p>
            <h3>顔写真を登録する</h3>
          </div>
          <span class="mini-badge">${photoRegistered ? "登録済み" : "未登録"}</span>
        </div>
        <label class="ghost-button file-button inline">
          <input id="detail-photo-input" type="file" accept="image/*" hidden />
          写真を選ぶ
        </label>
      </section>
    </div>
  `;

  document.getElementById("save-memo-button").addEventListener("click", saveMemo);
  document.getElementById("save-self-edit-button").addEventListener("click", saveSelfEdit);
  document.getElementById("detail-photo-input").addEventListener("change", updatePersonPhoto);
}

function saveMemo() {
  state.memos[selectedPersonId] = document.getElementById("memo-input").value.trim();
  persistState();
  renderDetail();
}

function saveSelfEdit() {
  state.selfEdits[selectedPersonId] = {
    nickname: document.getElementById("edit-nickname").value.trim(),
    hobby: document.getElementById("edit-hobby").value.trim(),
    ambition: document.getElementById("edit-ambition").value.trim(),
    profileExtra: document.getElementById("edit-extra").value.trim(),
  };
  persistState();
  renderAll();
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    elements.scanStatus.textContent = "このブラウザではカメラに対応していません。";
    return;
  }

  try {
    activeStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    elements.cameraVideo.srcObject = activeStream;
    await elements.cameraVideo.play();
    elements.cameraPlaceholder.classList.add("hidden");
    elements.scanStatus.textContent = "カメラを起動しました。相手を写して「認識する」を押してください。";
  } catch (error) {
    console.error(error);
    elements.scanStatus.textContent = "カメラを起動できませんでした。権限を確認してください。";
  }
}

function stopCamera() {
  if (activeStream) {
    activeStream.getTracks().forEach((track) => track.stop());
    activeStream = null;
  }
  elements.cameraVideo.srcObject = null;
  elements.cameraPlaceholder.classList.remove("hidden");
  elements.scanStatus.textContent = "カメラを停止しました。";
}

function handleScan() {
  lastCandidateIds = pickCandidateIds();
  if (lastCandidateIds.length === 0) {
    elements.scanStatus.textContent = "条件に合う人物がいません。名簿を追加するか、絞り込みを解除してください。";
    elements.candidateSection.classList.add("hidden");
    elements.challengeSection.classList.add("hidden");
    return;
  }
  elements.candidateSection.classList.remove("hidden");
  elements.challengeSection.classList.add("hidden");
  elements.scanStatus.textContent = "候補を表示しました。正しい人物を選んでください。";
  elements.candidateGrid.innerHTML = "";

  lastCandidateIds.forEach((personId) => {
    const button = document.createElement("button");
    button.className = "card-surface";
    button.type = "button";
    const person = buildMergedPerson(personId);
    const progress = getPersonProgress(personId);
    button.innerHTML = `
      <div class="avatar-shell">${buildAvatarMarkup(person)}</div>
      <div class="person-card-body">
        <div class="person-card-topline">
          <p class="person-role">${person.kind}</p>
          <span class="status-badge" data-status="${progress.status}">${progress.status}</span>
        </div>
        <h3 class="person-name">${person.grade}</h3>
        <p class="person-subline">候補として表示中</p>
      </div>
    `;
    button.addEventListener("click", () => beginChallenge(personId));
    elements.candidateGrid.appendChild(button);
  });
}

function beginChallenge(personId) {
  challengePersonId = personId;
  updateRecognition(personId);
  elements.challengeSection.classList.remove("hidden");
  const person = buildMergedPerson(personId);

  elements.challengeCard.innerHTML = `
    <div class="challenge-layout">
      <div class="challenge-photo">${buildAvatarMarkup(person)}</div>
      <form class="answer-form" id="answer-form">
        <div>
          <p class="eyebrow">${person.kind} / ${person.grade}</p>
          <h3>${person.grade}のこの人の名前は？</h3>
          <p class="small-copy">まずは思い出して入力してみてください。正解後に図鑑が更新されます。</p>
        </div>
        <input class="answer-input" id="answer-input" type="text" placeholder="名前を入力" autocomplete="off" />
        <div class="button-row">
          <button class="primary-button" type="submit">答える</button>
          <button class="ghost-button" type="button" id="skip-answer-button">わからない</button>
        </div>
        <div id="feedback-container"></div>
      </form>
    </div>
  `;

  document.getElementById("answer-form").addEventListener("submit", submitAnswer);
  document.getElementById("skip-answer-button").addEventListener("click", () => {
    registerAnswerResult(personId, false);
    renderFeedback(personId, false);
  });

  renderAll();
}

function submitAnswer(event) {
  event.preventDefault();
  const answer = document.getElementById("answer-input").value.trim();
  if (!answer) return;
  const personId = challengePersonId;
  const person = buildMergedPerson(personId);
  const normalizedAnswer = normalizeText(answer);
  const accepted = [person.name, person.nickname]
    .filter(Boolean)
    .map((value) => normalizeText(value));
  const isCorrect = accepted.some((candidate) => normalizedAnswer.includes(candidate) || candidate.includes(normalizedAnswer));
  registerAnswerResult(personId, isCorrect);
  renderFeedback(personId, isCorrect);
}

function renderFeedback(personId, isCorrect) {
  const person = buildMergedPerson(personId);
  const container = document.getElementById("feedback-container");
  container.innerHTML = `
    <div class="feedback-box" data-tone="${isCorrect ? "success" : "miss"}">
      ${
        isCorrect
          ? `正解です。${person.name} を覚えた記録を更新しました。`
          : `正解は ${person.name} です。図鑑でプロフィールを見て復習できます。`
      }
    </div>
    <div class="button-row">
      <button class="secondary-button" type="button" id="open-detail-after-answer">図鑑で見る</button>
      <button class="ghost-button" type="button" id="scan-again-button">続けて認識する</button>
    </div>
  `;

  document.getElementById("open-detail-after-answer").addEventListener("click", () => {
    selectedPersonId = personId;
    renderAll();
    openTab("detail");
  });
  document.getElementById("scan-again-button").addEventListener("click", () => {
    elements.challengeSection.classList.add("hidden");
    elements.candidateSection.classList.add("hidden");
    elements.scanStatus.textContent = "次の人を認識できます。";
  });
}

function updateRecognition(personId) {
  const progress = getPersonProgress(personId);
  progress.recognitionCount += 1;
  progress.lastSeenAt = new Date().toISOString();
  markRecent(personId);
  updateMission(personId);
  refreshPersonProgress(personId);
  persistState();
}

function registerAnswerResult(personId, isCorrect) {
  const progress = getPersonProgress(personId);
  if (isCorrect) {
    progress.correctCount += 1;
  } else {
    progress.wrongCount += 1;
  }
  refreshPersonProgress(personId);
  persistState();
  renderAll();
}

function refreshPersonProgress(personId) {
  const progress = getPersonProgress(personId);
  progress.unlockedLevel = getUnlockLevel(personId);
  progress.status = computeStatus(personId);
}

function getPersonProgress(personId) {
  return state.progress[personId];
}

function getMissionPeople() {
  return state.missions.personIds.map((id) => getPersonById(id)).filter(Boolean);
}

function buildMissions(forceNew) {
  const allPeople = getAllPeople();
  const candidates = allPeople
    .slice()
    .sort((a, b) => missionScore(b.id) - missionScore(a.id))
    .slice(0, 6);
  const picked = shuffle(candidates).slice(0, 3).map((person) => person.id);
  return {
    date: getTodayKey(),
    personIds: forceNew ? shuffle(allPeople).slice(0, 3).map((person) => person.id) : picked,
    completedIds: [],
  };
}

function missionScore(personId) {
  const progress = getPersonProgress(personId);
  let score = 0;
  if (progress.status === "未習得") score += 10;
  if (progress.status === "うろ覚え") score += 7;
  score += Math.max(0, 4 - progress.correctCount);
  score += Math.max(0, 3 - progress.recognitionCount);
  return score;
}

function updateMission(personId) {
  if (state.missions.personIds.includes(personId) && !state.missions.completedIds.includes(personId)) {
    state.missions.completedIds.push(personId);
  }
}

function buildStats() {
  const allPeople = getAllPeople();
  const values = allPeople.map((person) => getPersonProgress(person.id));
  const mastered = values.filter((item) => item.status === "既習得").length;
  const fuzzy = values.filter((item) => item.status === "うろ覚え").length;
  const unseen = values.filter((item) => item.status === "未習得").length;
  const missionDone = state.missions.completedIds.length;
  return [
    { label: "図鑑達成", value: `${Math.round((mastered / Math.max(allPeople.length, 1)) * 100)}%`, caption: "既習得の人数ベース" },
    { label: "未習得", value: unseen, caption: "まだ出会いが少ない人" },
    { label: "うろ覚え", value: fuzzy, caption: "もう少しで覚えられそう" },
    { label: "今日の進捗", value: `${missionDone}/3`, caption: "デイリーミッション" },
  ];
}

function computeStatus(personId) {
  const progress = getPersonProgress(personId);
  const score = getMemoryScore(personId);
  if (score >= 70 || progress.correctCount >= 3) return "既習得";
  if (progress.recognitionCount >= 1 || progress.correctCount >= 1) return "うろ覚え";
  return "未習得";
}

function getMemoryScore(personId) {
  const progress = getPersonProgress(personId);
  return Math.min(100, progress.recognitionCount * 12 + progress.correctCount * 22 - progress.wrongCount * 6);
}

function getUnlockLevel(personId) {
  const progress = getPersonProgress(personId);
  if (progress.correctCount >= 3 || getMemoryScore(personId) >= 75) return 4;
  if (progress.correctCount >= 2 || progress.recognitionCount >= 3) return 3;
  if (progress.correctCount >= 1 || progress.recognitionCount >= 2) return 2;
  return progress.recognitionCount >= 1 ? 1 : 0;
}

function getUnlockedFields(personId) {
  const person = buildMergedPerson(personId);
  const level = getUnlockLevel(personId);
  const fields = [
    ["名前", person.name],
    ["学年", person.grade],
  ];
  if (level >= 2) {
    fields.push(["あだ名", person.nickname || "未設定"]);
    fields.push(["出身地", person.hometown || "未設定"]);
  }
  if (level >= 3) fields.push(["趣味", person.hobby || "未設定"]);
  if (level >= 4) {
    fields.push(["野心", person.ambition || "未設定"]);
    fields.push(["プロフィール", person.profileExtra || "未設定"]);
  }
  return fields;
}

function getDisplayName(personId) {
  const person = buildMergedPerson(personId);
  return getUnlockLevel(personId) >= 1 ? person.name : `${person.grade} のだれか`;
}

function getSubline(personId) {
  const person = buildMergedPerson(personId);
  const level = getUnlockLevel(personId);
  if (level >= 4) return person.profileExtra;
  if (level >= 3) return `趣味: ${person.hobby}`;
  if (level >= 2) return `${person.nickname} / ${person.hometown}`;
  return "まずは名前を当ててみよう";
}

function buildMergedPerson(personId) {
  const base = getPersonById(personId);
  const edit = state.selfEdits[personId] || {};
  return {
    ...base,
    ...Object.fromEntries(Object.entries(edit).filter(([, value]) => value)),
  };
}

function getPersonById(personId) {
  return getAllPeople().find((person) => person.id === personId);
}

function pickCandidateIds() {
  const filtered = getScanPool();
  const weighted = filtered
    .slice()
    .sort((a, b) => candidatePriority(b.id) - candidatePriority(a.id))
    .slice(0, 6);
  return shuffle(weighted).slice(0, 3).map((person) => person.id);
}

function markRecent(personId) {
  state.recent = [personId, ...state.recent.filter((id) => id !== personId)].slice(0, 8);
}

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
}

function getTodayKey() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function normalizeText(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function buildAvatarImage(person) {
  const image = document.createElement("img");
  image.src = buildAvatarSrc(person);
  image.alt = `${person.name} のプロフィール画像`;
  return image;
}

function buildAvatarMarkup(person) {
  const src = buildAvatarSrc(person);
  return `<img src="${src}" alt="${escapeAttribute(person.name)} のプロフィール画像" />`;
}

function buildAvatarSrc(person) {
  return state.photos[person.id] || buildAvatarDataUrl(person);
}

function buildAvatarDataUrl(person) {
  const initials = person.name.slice(0, 2);
  const hue = Math.abs(hashCode(person.id)) % 360;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="hsl(${hue} 42% 72%)" />
          <stop offset="100%" stop-color="hsl(${(hue + 35) % 360} 36% 56%)" />
        </linearGradient>
      </defs>
      <rect width="320" height="400" rx="36" fill="url(#g)" />
      <circle cx="160" cy="138" r="64" fill="rgba(255,255,255,0.34)" />
      <path d="M72 340c18-54 62-82 88-82s70 28 88 82" fill="rgba(255,255,255,0.28)" />
      <text x="160" y="218" font-family="Avenir Next, Hiragino Sans, sans-serif" font-size="44" text-anchor="middle" fill="rgba(255,255,255,0.95)">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function hashCode(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

window.appOpenDetail = (personId) => {
  selectedPersonId = personId;
  renderDetail();
  openTab("detail");
};

function getAllPeople() {
  return [...PEOPLE, ...state.customPeople];
}

function getScanPool() {
  const kind = elements.scanKindFilter?.value || "all";
  const grade = elements.scanGradeFilter?.value || "all";
  return getAllPeople().filter((person) => {
    const matchesKind = kind === "all" || person.kind === kind;
    const matchesGrade = grade === "all" || person.grade === grade;
    return matchesKind && matchesGrade;
  });
}

function candidatePriority(personId) {
  const progress = getPersonProgress(personId);
  const recentPenalty = state.recent.slice(0, 3).includes(personId) ? -2 : 0;
  return missionScore(personId) + recentPenalty + (state.photos[personId] ? 2 : 0);
}

function renderScanGradeOptions() {
  if (!elements.scanKindFilter || !elements.scanGradeFilter) return;
  const kind = elements.scanKindFilter.value;
  const grades = [...new Set(getAllPeople().filter((person) => kind === "all" || person.kind === kind).map((person) => person.grade))];
  elements.scanGradeFilter.innerHTML = [`<option value="all">すべて</option>`, ...grades.map((grade) => `<option value="${escapeAttribute(grade)}">${grade}</option>`)].join("");
}

function buildSetupItems() {
  const allPeople = getAllPeople();
  const photoCount = Object.keys(state.photos).length;
  return [
    {
      title: "名簿が3人以上ある",
      caption: `現在 ${allPeople.length} 人登録済み`,
      done: allPeople.length >= 3,
    },
    {
      title: "写真を登録する",
      caption: `現在 ${photoCount} 人分の写真あり`,
      done: photoCount >= 3,
    },
    {
      title: "今日の3人を回す",
      caption: `ミッション ${state.missions.completedIds.length}/3`,
      done: state.missions.completedIds.length >= 3,
    },
  ];
}

function renderDataPanel() {
  if (!elements.rosterList) return;
  const people = getAllPeople();
  elements.rosterList.innerHTML = people
    .map((person) => {
      const progress = getPersonProgress(person.id);
      return `
        <div class="recent-item">
          <div class="roster-item">
            <strong>${person.name}</strong>
            <p class="recent-line">${person.kind} / ${person.grade} / ${progress.status}</p>
          </div>
          <div class="button-row compact">
            <button class="ghost-button small" type="button" onclick="window.appOpenDetail('${person.id}')">詳細</button>
            ${state.customPeople.some((item) => item.id === person.id) ? `<button class="ghost-button small danger-button" type="button" onclick="window.appRemovePerson('${person.id}')">削除</button>` : ""}
          </div>
        </div>
      `;
    })
    .join("");
}

async function updatePersonPhoto(event) {
  const file = event.target.files?.[0];
  if (!file || !selectedPersonId) return;
  state.photos[selectedPersonId] = await fileToDataUrl(file);
  persistState();
  renderAll();
}

async function addPerson(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const id = `custom-${Date.now()}`;
  const person = {
    id,
    name: String(form.get("name") || "").trim(),
    kind: String(form.get("kind") || "").trim(),
    grade: String(form.get("grade") || "").trim(),
    nickname: String(form.get("nickname") || "").trim(),
    hometown: String(form.get("hometown") || "").trim(),
    hobby: String(form.get("hobby") || "").trim(),
    ambition: String(form.get("ambition") || "").trim(),
    profileExtra: String(form.get("profileExtra") || "").trim(),
  };
  if (!person.name || !person.kind || !person.grade) return;
  state.customPeople.push(person);
  state.progress[id] = {
    recognitionCount: 0,
    correctCount: 0,
    wrongCount: 0,
    unlockedLevel: 0,
    status: "未習得",
    lastSeenAt: null,
  };
  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) {
    state.photos[id] = await fileToDataUrl(photo);
  }
  event.currentTarget.reset();
  renderScanGradeOptions();
  if (!state.missions.personIds.length) state.missions = buildMissions(false);
  persistState();
  renderAll();
  elements.importStatus.textContent = `${person.name} を名簿に追加しました。`;
}

async function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    state.customPeople = Array.isArray(parsed.customPeople) ? parsed.customPeople : state.customPeople;
    state.photos = parsed.photos && typeof parsed.photos === "object" ? parsed.photos : state.photos;
    state.memos = parsed.memos && typeof parsed.memos === "object" ? parsed.memos : state.memos;
    state.selfEdits = parsed.selfEdits && typeof parsed.selfEdits === "object" ? parsed.selfEdits : state.selfEdits;
    state.progress = parsed.progress && typeof parsed.progress === "object" ? parsed.progress : state.progress;
    state.recent = Array.isArray(parsed.recent) ? parsed.recent : state.recent;
    seedState();
    renderAll();
    elements.importStatus.textContent = "JSON を読み込みました。";
  } catch (error) {
    console.error(error);
    elements.importStatus.textContent = "読み込みに失敗しました。JSON 形式を確認してください。";
  } finally {
    event.target.value = "";
  }
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    customPeople: state.customPeople,
    photos: state.photos,
    progress: state.progress,
    memos: state.memos,
    selfEdits: state.selfEdits,
    recent: state.recent,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `school-field-guide-${getTodayKey()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  elements.importStatus.textContent = "現在のデータを書き出しました。";
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

window.appRemovePerson = (personId) => {
  if (!window.confirm("この人物を名簿から削除しますか？")) return;
  state.customPeople = state.customPeople.filter((person) => person.id !== personId);
  delete state.photos[personId];
  delete state.progress[personId];
  delete state.memos[personId];
  delete state.selfEdits[personId];
  state.recent = state.recent.filter((id) => id !== personId);
  state.missions.personIds = state.missions.personIds.filter((id) => id !== personId);
  state.missions.completedIds = state.missions.completedIds.filter((id) => id !== personId);
  if (selectedPersonId === personId) selectedPersonId = null;
  renderScanGradeOptions();
  persistState();
  renderAll();
};
