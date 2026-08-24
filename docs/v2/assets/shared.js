/**
 * Thote IA V2 - State Manager & Shared Shell Injector
 */

const STATE_KEY = 'thotie_quest_state';

const defaultState = {
  xp: 0,
  level: 1,
  completedModules: [],
  validatedQuests: [],
  unlockedBadges: ['novice']
};

export class ThoteStore {
  static getState() {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch (e) {
      return defaultState;
    }
  }

  static saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('thote-state-changed', { detail: state }));
  }

  static addXP(amount) {
    const state = this.getState();
    state.xp += amount;
    // Calcul simple de niveau : +1 niveau tous les 100 XP
    const newLevel = Math.floor(state.xp / 100) + 1;
    if (newLevel > state.level) {
      state.level = newLevel;
      alert(`\ud83c\udf89 F\u00e9licitations ! Vous avez atteint le niveau ${newLevel} !`);
    }
    this.saveState(state);
  }

  static completeQuest(questId, xpReward = 25) {
    const state = this.getState();
    if (!state.validatedQuests.includes(questId)) {
      state.validatedQuests.push(questId);
      this.saveState(state);
      this.addXP(xpReward);
    }
  }
}

export function initV2Shell(activePageId = 'home') {
  injectHeader();
  injectLeftSidebar(activePageId);
  injectRightSidebar();
  injectFooter();

  // Re-render automatique au changement d'\u00e9tat
  window.addEventListener('thote-state-changed', () => {
    updateRightSidebar();
  });
}

function injectHeader() {
  const el = document.getElementById('v2-header-target');
  if (!el) return;
  el.innerHTML = `
    <header class="v2-header glass-panel">
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="material-symbols-outlined" style="color:var(--primary); font-size:32px;">psychology</span>
        <div>
          <h2 style="font-size:1.1rem; margin:0;">Thote IA <span style="color:var(--secondary); font-size:0.8rem;">V2</span></h2>
          <span class="label-tech" style="color:var(--text-muted);">Certification RS6776</span>
        </div>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <a href="/v2/" class="wiki-btn wiki-btn-secondary" style="font-size:0.8rem;">
          <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
          Retour site V1
        </a>
      </div>
    </header>
  `;
}

function injectLeftSidebar(activeId) {
  const el = document.getElementById('v2-left-sidebar-target');
  if (!el) return;

  const links = [
    { section: "G\u00c9N\u00c9RAL" },
    { id: "home", label: "Accueil", icon: "grid_view", href: "/v2/index.html" },
    { id: "rs6776", label: "Certification RS6776", icon: "school", href: "/v2/certification.html" },
    
    { section: "PARCOURS H0 - H7" },
    { id: "h0", label: "H0 — Lancement", icon: "rocket_launch", href: "/v2/formation/h0.html" },
    { id: "h1", label: "H1 — Fondamentaux & ROFT", icon: "menu_book", href: "/v2/formation/h1.html" },
    { id: "h2", label: "H2 — Strat\u00e9gie IA", icon: "strategy", href: "/v2/formation/h2.html" },
    { id: "h3", label: "H3 — Prompting CROFT", icon: "terminal", href: "/v2/formation/h3.html" },
    { id: "h4", label: "H4 — Visuels & M\u00e9dias", icon: "image", href: "/v2/formation/h4.html" },
    { id: "h5", label: "H5 — S\u00e9curit\u00e9 & RGPD", icon: "security", href: "/v2/formation/h5.html" },
    { id: "h6", label: "H6 — Inclusivit\u00e9", icon: "accessibility", href: "/v2/formation/h6.html" },
    { id: "h7", label: "H7 — \u00c9thique & IA Act", icon: "gavel", href: "/v2/formation/h7.html" },
    
    { section: "OUTILS & JEUX" },
    { id: "outils", label: "Outils Interactifs", icon: "build", href: "/v2/outils/index.html" },
    { id: "jeux", label: "Thotie Quest Hub", icon: "sports_esports", href: "/v2/jeux/index.html" }
  ];

  let html = `<nav class="glass-panel neo-bevel" style="padding: 16px; height: 100%;">`;
  links.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-title label-tech">${item.section}</div>`;
    } else {
      const activeClass = item.id === activeId ? 'active' : '';
      html += `
        <a href="${item.href}" class="nav-link ${activeClass}">
          <span class="material-symbols-outlined">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      `;
    }
  });
  html += `</nav>`;
  el.innerHTML = html;
}

function injectRightSidebar() {
  const el = document.getElementById('v2-right-sidebar-target');
  if (!el) return;
  el.innerHTML = `<aside id="right-sidebar-content" class="glass-panel neo-bevel" style="padding:20px; height:100%;"></aside>`;
  updateRightSidebar();
}

function updateRightSidebar() {
  const el = document.getElementById('right-sidebar-content');
  if (!el) return;

  const state = ThoteStore.getState();
  const xpNext = state.level * 100;
  const progressPercent = Math.min(100, Math.floor(((state.xp % 100) / 100) * 100));

  el.innerHTML = `
    <h3 style="font-size:1rem; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
      <span class="material-symbols-outlined" style="color:var(--tertiary);">analytics</span>
      Progression V2
    </h3>

    <div class="widget-stat glass-panel" style="background:var(--surface-low);">
      <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
        <span>Niveau <strong>${state.level}</strong></span>
        <span style="color:var(--primary);">${state.xp} XP</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <div class="widget-stat glass-panel" style="background:var(--surface-low);">
      <div class="label-tech" style="margin-bottom:8px; color:var(--text-muted);">Qu\u00eates valid\u00e9es</div>
      <div style="font-size:1.4rem; font-weight:700; color:var(--secondary);">
        ${state.validatedQuests.length} <span style="font-size:0.8rem; color:var(--text-muted);">accomplies</span>
      </div>
    </div>

    <div class="widget-stat glass-panel" style="background:var(--surface-low);">
      <div class="label-tech" style="margin-bottom:8px; color:var(--text-muted);">Badges obtenus</div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        ${state.unlockedBadges.map(b => `<span class="glass-panel" style="padding:4px 8px; font-size:0.75rem; color:var(--tertiary); border-color:var(--tertiary);">\ud83d\udee1\ufe0f ${b}</span>`).join('')}
      </div>
    </div>
  `;
}

function injectFooter() {
  const el = document.getElementById('v2-footer-target');
  if (!el) return;
  el.innerHTML = `
    <footer class="v2-footer">
      Assistance IA (IA Act) & Donn\u00e9es h\u00e9berg\u00e9es en UE (RGPD) \u2014 Thote IA V2
    </footer>
  `;
}
