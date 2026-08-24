/* Thotie Quest V2 — shell, progression et compatibilité des contenus existants. */
const STATE_KEY = "thotie_quest_state";
const XP_PER_LEVEL = 200;

export const MODULES = [
  { id: "h0", label: "H0 — Lancement", icon: "rocket_launch", href: "/wiki-formation-ia/v2/formation/h0.html", xp: 40 },
  { id: "h1", label: "H1 — Fondamentaux IA", icon: "menu_book", href: "/wiki-formation-ia/v2/formation/h1.html", xp: 75 },
  { id: "h2", label: "H2 — Stratégie IA", icon: "strategy", href: "/wiki-formation-ia/v2/formation/h2.html", xp: 75 },
  { id: "h3", label: "H3 — Prompting CROFT", icon: "terminal", href: "/wiki-formation-ia/v2/formation/h3.html", xp: 75 },
  { id: "h4", label: "H4 — Visuels & médias", icon: "image", href: "/wiki-formation-ia/v2/formation/h4.html", xp: 75 },
  { id: "h5", label: "H5 — Sécurité & RGPD", icon: "security", href: "/wiki-formation-ia/v2/formation/h5.html", xp: 75 },
  { id: "h6", label: "H6 — Inclusion", icon: "accessibility", href: "/wiki-formation-ia/v2/formation/h6.html", xp: 75 },
  { id: "h7", label: "H7 — Éthique & IA Act", icon: "gavel", href: "/wiki-formation-ia/v2/formation/h7.html", xp: 75 }
];

const defaultState = {
  pseudo: "Toi",
  avatar: "🤖",
  xp: 0,
  completedModules: [],
  validatedQuests: [],
  unlockedBadges: ["Explorateur"]
};

function normalise(state) {
  const safe = { ...defaultState, ...(state || {}) };
  safe.xp = Math.max(0, Number(safe.xp) || 0);
  safe.completedModules = Array.isArray(safe.completedModules) ? safe.completedModules : [];
  safe.validatedQuests = Array.isArray(safe.validatedQuests) ? safe.validatedQuests : [];
  safe.unlockedBadges = Array.isArray(safe.unlockedBadges) ? safe.unlockedBadges : defaultState.unlockedBadges;
  return safe;
}

function levelInfo(xp) {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const inLevel = xp % XP_PER_LEVEL;
  return { level, inLevel, pct: Math.round((inLevel / XP_PER_LEVEL) * 100), toNext: XP_PER_LEVEL - inLevel };
}

export class ThoteStore {
  static getState() {
    try { return normalise(JSON.parse(localStorage.getItem(STATE_KEY))); }
    catch (_) { return normalise(); }
  }

  static saveState(state) {
    const safe = normalise(state);
    localStorage.setItem(STATE_KEY, JSON.stringify(safe));
    window.dispatchEvent(new CustomEvent("thote-state-changed", { detail: safe }));
  }

  static addXP(amount) {
    const state = this.getState();
    state.xp += Math.max(0, Number(amount) || 0);
    this.saveState(state);
    return state;
  }

  static completeQuest(questId, xpReward = 25) {
    const state = this.getState();
    if (state.validatedQuests.includes(questId)) return state;
    state.validatedQuests.push(questId);
    const module = MODULES.find((item) => questId === item.id + "_complete");
    if (module && !state.completedModules.includes(module.id)) state.completedModules.push(module.id);
    state.xp += Math.max(0, Number(xpReward) || 0);
    this.unlockBadges(state);
    this.saveState(state);
    return state;
  }

  static completeModule(moduleId, reward) {
    const module = MODULES.find((item) => item.id === moduleId);
    return this.completeQuest(moduleId + "_complete", reward ?? (module ? module.xp : 50));
  }

  static setProfile(pseudo, avatar) {
    const state = this.getState();
    state.pseudo = String(pseudo || state.pseudo).slice(0, 20);
    state.avatar = avatar || state.avatar;
    this.saveState(state);
  }

  static reset() {
    localStorage.removeItem(STATE_KEY);
    window.location.reload();
  }

  static unlockBadges(state) {
    const count = state.completedModules.length;
    if (count >= 1 && !state.unlockedBadges.includes("Premier pas")) state.unlockedBadges.push("Premier pas");
    if (count >= 4 && !state.unlockedBadges.includes("Praticien")) state.unlockedBadges.push("Praticien");
    if (count >= 8 && !state.unlockedBadges.includes("Certifié")) state.unlockedBadges.push("Certifié");
  }
}

function isLocked(module, state) {
  const index = MODULES.findIndex((item) => item.id === module.id);
  return index > 0 && !state.completedModules.includes(MODULES[index - 1].id);
}

function navLink(item, activeId, state) {
  if (item.section) return "<p class=\"quest-nav-section\">" + item.section + "</p>";
  const locked = item.module && isLocked(item.module, state);
  const active = item.id === activeId ? " is-active" : "";
  const status = item.module && state.completedModules.includes(item.module.id) ? "<span class=\"material-symbols-outlined quest-nav-status\">check_circle</span>" : "";
  if (locked) return "<span class=\"quest-nav-link is-locked\"><span class=\"material-symbols-outlined\">lock</span><span>" + item.label + "</span></span>";
  return "<a class=\"quest-nav-link" + active + "\" href=\"" + item.href + "\"><span class=\"material-symbols-outlined\">" + item.icon + "</span><span>" + item.label + "</span>" + status + "</a>";
}

function injectHeader() {
  const el = document.getElementById("v2-header-target");
  if (!el) return;
  el.innerHTML = "<header class=\"quest-topbar\"><a class=\"quest-brand\" href=\"/wiki-formation-ia/v2/index.html\"><span>✦</span><strong>Thotie Quest</strong></a><a class=\"quest-back-link\" href=\"/wiki-formation-ia/\">← Retour au site</a></header>";
}

function injectSidebar(activeId) {
  const el = document.getElementById("v2-left-sidebar-target");
  if (!el) return;
  const state = ThoteStore.getState();
  const items = [
    { id: "home", label: "Hub", icon: "map", href: "/wiki-formation-ia/v2/index.html" },
    { section: "PARCOURS" },
    ...MODULES.map((module) => ({ id: module.id, label: module.label, icon: module.icon, href: module.href, module })),
    { section: "REPÈRES" },
    { id: "rs6776", label: "Certification", icon: "school", href: "/wiki-formation-ia/v2/formation/certification.html" }
  ];
  el.innerHTML = "<nav class=\"quest-sidebar\"><div class=\"quest-profile\"><div class=\"quest-avatar\">" + state.avatar + "</div><strong>" + state.pseudo + "</strong><span>Niveau " + levelInfo(state.xp).level + "</span></div>" + items.map((item) => navLink(item, activeId, state)).join("") + "<button class=\"quest-reset\" type=\"button\">Réinitialiser ma progression</button></nav>";
  const reset = el.querySelector(".quest-reset");
  if (reset) reset.addEventListener("click", () => { if (confirm("Effacer la progression sur cet appareil ?")) ThoteStore.reset(); });
}

function injectProgress() {
  const el = document.getElementById("v2-right-sidebar-target");
  if (!el) return;
  const state = ThoteStore.getState();
  const info = levelInfo(state.xp);
  const remaining = MODULES.filter((m) => !state.completedModules.includes(m.id)).length;
  el.innerHTML = "<aside class=\"quest-progress\"><p class=\"quest-eyebrow\">PROGRESSION</p><h2>Niveau " + info.level + "</h2><p class=\"quest-muted\">" + info.toNext + " XP avant le niveau suivant</p><div class=\"quest-meter\"><span style=\"width:" + info.pct + "%\"></span></div><div class=\"quest-stat\"><strong>" + state.xp + " XP</strong><span>" + state.completedModules.length + "/" + MODULES.length + " modules</span></div><section><p class=\"quest-eyebrow\">BADGES</p><div class=\"quest-badges\">" + state.unlockedBadges.map((badge) => "<span>✦ " + badge + "</span>").join("") + "</div></section><p class=\"quest-muted\">" + remaining + " module(s) à explorer.</p></aside>";
}

function injectFooter() {
  const el = document.getElementById("v2-footer-target");
  if (el) el.innerHTML = "<footer class=\"quest-footer\">Progression enregistrée uniquement sur cet appareil · Formation IA générative</footer>";
}

export function initV2Shell(activePageId = "home") {
  injectHeader();
  injectSidebar(activePageId);
  injectProgress();
  injectFooter();
  window.addEventListener("thote-state-changed", () => {
    injectSidebar(activePageId);
    injectProgress();
  }, { once: true });
}

export { levelInfo };