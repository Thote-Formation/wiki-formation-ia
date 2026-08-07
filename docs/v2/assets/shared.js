/**
 * Shared V2 Engine — Thote Formation IA (Sidebar & Gamification Pattern)
 */

const STORAGE_KEY_QUEST = 'thotie_quest_state';
const STORAGE_KEY_PROGRESS = 'wiki_progress_v1';

const getBasePath = () => {
  const path = window.location.pathname;
  if (path.includes('/formation/') || path.includes('/certification/') || path.includes('/outils/') || path.includes('/ressources/')) {
    return '../';
  }
  return './';
};

const BASE = getBasePath();

const NAV_STRUCTURE = [
  { label: 'Accueil', url: BASE + 'index.html', icon: 'home' },
  { 
    label: 'Certification RS6776', 
    icon: 'verified',
    children: [
      { label: 'Présentation RS6776', url: BASE + 'certification/index.html' },
      { label: 'Évaluation d\'entrée', url: BASE + 'certification/evaluation.html' }
    ]
  },
  { 
    label: 'Parcours de Formation', 
    icon: 'auto_stories',
    children: [
      { label: 'H0 — Lancement', url: BASE + 'formation/h0.html' },
      { label: 'H1 — Fondamentaux & ROFT', url: BASE + 'formation/h1.html' },
      { label: 'H2 — Stratégie d\'implémentation', url: BASE + 'formation/h2.html' },
      { label: 'H3 — Structurer un prompt', url: BASE + 'formation/h3.html' },
      { label: 'H4 — Créer des visuels', url: BASE + 'formation/h4.html' },
      { label: 'H5 — Confidentialité & Sécurité', url: BASE + 'formation/h5.html' },
      { label: 'H6 — Accessibilité & Inclusivité', url: BASE + 'formation/h6.html' },
      { label: 'H7 — Éthique, IA Act, Biais', url: BASE + 'formation/h7.html' },
      { label: 'Quiz Final Certifiant', url: BASE + 'formation/quiz-final.html' }
    ]
  },
  { 
    label: 'Outils Interactifs', 
    icon: 'build',
    children: [
      { label: 'Vue d\'ensemble', url: BASE + 'outils/index.html' },
      { label: 'Générateur CROFT', url: BASE + 'outils/croft.html' },
      { label: 'Masqueur RGPD', url: BASE + 'outils/anonymiseur.html' },
      { label: 'Prompt Visuel', url: BASE + 'outils/visuel.html' },
      { label: 'Anti-Hallucinations', url: BASE + 'outils/anti-hallucinations.html' },
      { label: 'Calculateur de Tokens', url: BASE + 'outils/tokens.html' },
      { label: 'Audit Biais', url: BASE + 'outils/audit-biais.html' }
    ]
  },
  { 
    label: 'Ressources', 
    icon: 'folder_open',
    children: [
      { label: 'Cas Pratiques Métiers', url: BASE + 'ressources/cas-pratiques.html' },
      { label: 'Comparatif LLM', url: BASE + 'ressources/comparatif.html' },
      { label: 'Veille & Articles', url: BASE + 'ressources/articles.html' },
      { label: 'Glossaire IA', url: BASE + 'ressources/glossaire.html' }
    ]
  },
  { label: 'Thotie Quest Hub', url: BASE + '../jeux/index.html', icon: 'sports_esports', highlight: true }
];

class V2App {
  constructor() {
    this.state = this.loadQuestState();
    this.progress = this.loadProgressState();
    this.initShell();
  }

  loadQuestState() {
    const defaultState = { xp: 0, level: 1, avatar: '🤖', modulesCompleted: [] };
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUEST);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch (e) { return defaultState; }
  }

  loadProgressState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  }

  saveQuestState() {
    localStorage.setItem(STORAGE_KEY_QUEST, JSON.stringify(this.state));
    this.updateUserWidget();
  }

  addXP(amount) {
    this.state.xp += amount;
    this.state.level = Math.floor(this.state.xp / 100) + 1;
    this.saveQuestState();
  }

  initShell() {
    document.addEventListener('DOMContentLoaded', () => {
      this.injectSidebar();
      this.updateUserWidget();
    });
  }

  injectSidebar() {
    // Si la page a un conteneur d'accueil header, on s'assure de cibler la sidebar
    let sidebar = document.getElementById('site-sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.id = 'site-sidebar';
      document.body.prepend(sidebar);
    }

    const currentPath = window.location.pathname;

    let navHTML = '<nav class="sidebar-nav">';
    NAV_STRUCTURE.forEach(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = currentPath.includes(item.url) || (hasChildren && item.children.some(c => currentPath.includes(c.url)));

      navHTML += `
        <div class="nav-section ${isActive ? 'active' : ''}">
          <a href="${item.url || '#'}" class="nav-header-link ${item.highlight ? 'highlight-link' : ''}">
            <span class="material-symbols-outlined">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </a>
          ${hasChildren ? `
            <div class="nav-children">
              ${item.children.map(child => {
                const isChildActive = currentPath.includes(child.url);
                return `
                  <a href="${child.url}" class="nav-child-link ${isChildActive ? 'child-active' : ''}">
                    <span class="material-symbols-outlined" style="font-size:14px;">chevron_right</span>
                    ${child.label}
                  </a>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
    });
    navHTML += '</nav>';

    sidebar.innerHTML = `
      <div class="sidebar-brand">
        <div class="brand-logo">T</div>
        <div class="brand-info">
          <span class="brand-title">THOTE IA</span>
          <span class="brand-sub">Académie V2</span>
        </div>
      </div>

      <!-- Widget Profil Gamifié Lateral -->
      <div class="profile-card glass-panel">
        <div class="avatar-box">${this.state.avatar}</div>
        <div class="profile-details">
          <div class="profile-level">Niveau <span id="sidebar-level">${this.state.level}</span></div>
          <div class="xp-text"><span id="sidebar-xp">${this.state.xp}</span> XP</div>
          <div class="xp-bar-container">
            <div id="sidebar-xp-bar" class="xp-bar-fill"></div>
          </div>
        </div>
      </div>

      ${navHTML}

      <div class="sidebar-footer">
        <a href="/" class="v1-link">
          <span class="material-symbols-outlined">arrow_back</span>
          Retour Site Original V1
        </a>
      </div>
    `;
  }

  updateUserWidget() {
    const levelEl = document.getElementById('sidebar-level');
    const xpEl = document.getElementById('sidebar-xp');
    const barEl = document.getElementById('sidebar-xp-bar');
    if (levelEl && xpEl && barEl) {
      levelEl.textContent = this.state.level;
      xpEl.textContent = this.state.xp;
      const progressInLevel = this.state.xp % 100;
      barEl.style.width = `${progressInLevel}%`;
    }
  }
}

window.v2App = new V2App();
