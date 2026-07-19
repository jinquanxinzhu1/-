window.PORTFOLIO_DATA = {
  settings: {
    name: "Kokone Imaizumi",
    title: "Kokone Imaizumi Portfolio",
    tagline: "まだ知らないを、おもしろいへ。",
    description: "人に会い、問いを見つけ、伝わる形をデザインする。",
    email: "hello@example.com",
    copyright: "2026 Kokone Imaizumi",
  },
  socials: [
    { label: "Mail", href: "mailto:hello@example.com" },
    { label: "Instagram", href: "https://www.instagram.com/", external: true },
    { label: "Facebook", href: "https://www.facebook.com/", external: true },
    { label: "note", href: "https://note.com/", external: true },
    { label: "GitHub", href: "https://github.com/jinquanxinzhu1", external: true },
  ],
  tags: ["All", "Design", "Technology", "SNS", "Competition", "Event", "Hobby"],
  profile: {
    intro: "人の面白さを見つけて、形にする人。",
    body: "UI/UX、取材、営業、イベント運営、地域フィールドワーク、AI、言葉。ばらばらに見える活動の中心には、いつも「会いに行く」「聞いてみる」「伝わる形にする」があります。",
    message: "人が好きだから、まず話を聞く。知らないものに出会ったら、少し立ち止まって、その面白さが誰かに届く形を考えます。",
  },
  timeline: [
    { year: "01", title: "Meet", heading: "まず会いに行く", body: "知らない人、会社、地域、技術。興味の入口は、いつも足を運ぶことから始まる。" },
    { year: "02", title: "Listen", heading: "問いを見つける", body: "話を聞き、違和感や面白さを拾い、まだ名前のない問いを言葉にする。" },
    { year: "03", title: "Shape", heading: "伝わる形にする", body: "UI、記事、イベント、営業資料、SNS、企画として、人に届く形へ編集する。" },
  ],
  skills: [
    { label: "Design", title: "UI / UX", body: "観察、情報設計、ワイヤーフレーム、プロトタイピング" },
    { label: "People", title: "Interview", body: "取材、ヒアリング、関係づくり、問いの発見" },
    { label: "Shape", title: "Planning", body: "企画、イベント、営業、SNS、文章の編集" },
  ],
  news: [
    { id: "portfolio-renewal", slug: "portfolio-renewal", type: "article", date: "2026.07.19", category: "Update", title: "Portfolio Renewal", summary: "世界観とモーション仕様を整理し、歩きながら経験を集めるポートフォリオとして再構成しました。", body: ["このサイトは、作品を並べるだけの場所ではなく、今泉心寧がどんなふうに世界を見ているかを伝えるための場所です。", "人に会い、問いを見つけ、伝わる形へデザインする。その流れを、OpeningからEndingまで一つの物語として設計しました。"] },
    { id: "fieldwork-notes", slug: "fieldwork-notes", type: "short", date: "2026.06.28", category: "Activity", title: "Fieldwork notes", summary: "地域、イベント、人に会いに行った記録を少しずつ追加していきます。" },
    { id: "new-things", slug: "new-things", type: "short", date: "2026.05.14", category: "Note", title: "New things, slowly", summary: "知らない技術に触れるときは、まず小さく試して、自分の言葉にしてみる。" },
  ],
  works: [
    { id: "uiux", slug: "uiux-question", order: 1, title: "問いから始めるUI設計", category: "Design", year: "2026", summary: "観察からユーザーの迷いを見つけ、画面の構造と言葉を整える。", body: "誰の、どんな迷いをほどくのか。画面を作る前に問いを置くところから始めたUI/UXの記録です。", tags: ["Design", "Technology"], role: "リサーチ / 情報設計 / UI設計", tools: ["Figma", "Notion", "ChatGPT"], learning: "見た目を整える前に、相手の状況を理解すること。", featured: true, sections: ["背景", "課題", "プロセス", "デザイン", "学び"] },
    { id: "marugoto", slug: "marugoto-festival", order: 2, title: "まるごと祭 営業", category: "Event", year: "2025", summary: "企画の価値を、相手の関心や言葉に合わせて届ける。", body: "相手のことを知り、必要な情報を組み替えて伝える。営業をコミュニケーションのデザインとして考えた活動です。", tags: ["Event", "SNS"], role: "営業 / 関係構築 / 企画説明", tools: ["Google Workspace", "Canva", "SNS"], learning: "相手を知ることが、伝わる提案の最初のデザインになること。", featured: true, sections: ["背景", "担当", "工夫", "学び"] },
    { id: "hanabi", slug: "hanabi", order: 3, title: "Hanabi 営業・経理", category: "Event", year: "2025", summary: "表の体験と裏側の数字をつなぎ、続けられる運営を考える。", body: "イベントの華やかさを支える運営と数字の仕事。人が集まる場を続けるための仕組みを見つめました。", tags: ["Event", "Design"], role: "営業 / 経理補助 / 運営設計", tools: ["Spreadsheet", "Notion"], learning: "よい体験は、表側と裏側の両方でできていること。", featured: true, sections: ["背景", "担当", "学び"] },
    { id: "newspaper", slug: "shiwashiwa-newspaper", order: 4, title: "しわしわ新聞", category: "Writing", year: "2025", summary: "日常の小さな発見を、誰かに話したくなる紙面にする。", body: "自分の中にある小さな違和感や好きなものを、紙面のリズムへ編集した自主制作です。", tags: ["Design", "Hobby"], role: "企画 / 編集 / ライティング", tools: ["Illustrator", "InDesign", "Figma"], learning: "編集することで、身近なものが誰かに届く物語になること。", featured: true, sections: ["背景", "プロセス", "デザイン", "学び"] },
    { id: "secom", slug: "secom-interview", order: 5, title: "セコム取材", category: "Interview", year: "2025", summary: "現場の人の声から、仕事や会社の輪郭をストーリーにする。", body: "会社を紹介するのではなく、そこで働く人の声から仕事の意味を立ち上げる取材です。", tags: ["Design", "SNS"], role: "取材 / 構成 / 記事化", tools: ["Voice memo", "Docs", "Camera"], learning: "人の言葉には、説明だけでは伝わらない温度があること。", featured: true, sections: ["背景", "取材", "編集", "学び"] },
    { id: "ivs", slug: "ivs-toryumon", order: 6, title: "IVS / TORYUMON", category: "Technology", year: "2025", summary: "挑戦する人や新しい技術に会い、自分の問いを更新する。", body: "まだ知らない技術と、それを使って前へ進もうとする人に会った記録。参加して終わりにせず、言葉に残しました。", tags: ["Technology", "Competition", "Event"], role: "参加 / 記録 / ネットワーキング", tools: ["note", "SNS", "Camera"], learning: "人に会うことで、知らない技術が自分の言葉に変わること。", featured: true, sections: ["背景", "記録", "学び"] },
  ],
};
