/**
 * Shared V2 Engine — Thote Formation IA
 * Gère le state local, l'injection dynamique Header/Footer et le suivi de progression.
 */

const STORAGE_KEY_QUEST = 'thotie_quest_state';
const STORAGE_KEY_PROGRESS = 'wiki_progress_v1';

// Navigation structurelle synchronisée avec mkdocs.yml
const NAV_STRUCTURE = [
  { label: 'Accueil', url: '/v2/index.html', icon: 'home' },
  { 
    label: 'Certification RS6776', 
    icon: 'verified',
    children: [
      { label: 'Présentation RS6776', url: '/v2/certification/index.html' },
      { label: 'Évaluation d\'entrée', url: '/v2/certification/evaluation.html' }
    ]
  },
  { 
    label: 'Parcours', 
    icon: 'auto_stories',
    children: [
      { label: 'H0 — Lancement', url: '/v2/formation/h0.html' },
      { label: 'H1 — Fondamentaux & ROFT', url: '/v2/formation/h1.html' },
      { label: 'H2 — Stratégie d\'implémentation', url: '/v2/formation/h2.html' },
      { label: 'H3 — Structurer un prompt', url: '/v2/formation/h3.html' },
      { label: 'H4 — Créer des visuels', url: '/v2/formation/h4.html' },
      { label: 'H5 — Confidentialité & Sécurité', url: '/v2/formation/h5.html' },
      { label: 'H6 — Accessibilité & Inclusivité', url: '/v2/formation/h6.html' },
      { label: 'H7 — Éthique, IA Act, Biais', url: '/v2/formation/h7.html' },
      { label: 'Quiz Final Certifiant', url: '/v2/formation/quiz-final.html' }
    ]
  },
  { 
    label: 'Outils Interactifs', 
    icon: 'build',
    children: [
      { label: 'Vue d\'ensemble', url: '/v2/outils/index.html' },
      { label: 'Générateur CROFT', url: '/v2/outils/croft.html' },
      { label: 'Masqueur RGPD', url: '/v2/outils/anonymiseur.html' },
      { label: 'Prompt Visuel', url: '/v2/outils/visuel.html' },
      { label: 'Anti-Hallucinations', url: '/v2/outils/anti-hallucinations.html' },
      { label: 'Calculateur de Tokens', url: '/v2/outils/tokens.html' },
      { label: 'Audit Biais & Inclusivité', url: '/v2/outils/audit-biais.html' }
    ]
  },
  { 
    label: 'Ressources', 
    icon: 'folder_open',
    children: [
      { label: 'Cas Pratiques Métiers', url: '/v2/ressources/cas-pratiques.html' },
      { label: 'Comparatif LLM', url: '/v2/ressources/comparatif.html' },
      { label: 'Veille & Articles', url: '/v2/ressources/articles.html' },
      { label: 'Glossaire IA', url: '/v2/ressources/glossaire.html' }
    ]
  },
  { label: 'Thotie Quest', url: '/jeux/index.html', icon: 'sports_esports', highlight: true }
];

class V2App {
  constructor() {
    this.state = this.loadQuestState();
    this.progress = this.loadProgressState();
    this.initShell();
  }

  loadQuestState() {
    const defaultState = {
      xp: 0,
      level: 1,
      avatar: '🤖',
      questsCompleted: [],
      modulesCompleted: []
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUEST);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch (e) {
      return defaultState;
    }
  }

  loadProgressState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
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
      this.injectHeader();
      this.injectFooter();
      this.updateUserWidget();
    });
  }

  injectHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    const currentPath = window.location.pathname;

    let navHTML = '<ul class="main-nav">';
    NAV_STRUCTURE.forEach(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = currentPath.includes(item.url) || (hasChildren && item.children.some(c => currentPath.includes(c.url)));

      navHTML += `
        <li class="nav-item ${isActive ? 'active' : ''}">
          <a href="${item.url || '#'}" class="nav-link">
            <span class="material-symbols-outlined">${item.icon}</span>
            ${item.label}
            ${hasChildren ? '<span class="material-symbols-outlined" style="font-size:16px;">expand_more</span>' : ''}
          </a>
          ${hasChildren ? `
            <div class="dropdown-menu">
              ${item.children.map(child => `
                <a href="${child.url}" class="dropdown-link">${child.label}</a>
              `).join('')}
            </div>
          ` : ''}
        </li>
      `;
    });
    navHTML += '</ul>';

    header.innerHTML = `
      <div class="header-container">
        <a href="/v2/index.html" class="brand">
          <div class="brand-logo">T</div>
          <div class="brand-text">THOTE <span>FORMATION V2</span></div>
        </a>

        ${navHTML}

        <div class="user-widget">
          <span style="font-size:1.2rem;">${this.state.avatar}</span>
          <div>
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-main);">
              Niv. <span id="widget-level">${this.state.level}</span>
            </div>
            <div class="xp-bar-container">
              <div id="widget-xp-bar" class="xp-bar-fill"></div>
            </div>
          </div>
          <a href="/v2/index.html" style="color:var(--text-muted); text-decoration:none;" title="Site V1 original">
            <span class="material-symbols-outlined" style="font-size:18px;">open_in_new</span>
          </a>
        </div>
      </div>
    `;
  }

  injectFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-container">
        <div>
          <strong>Thote Formation IA</strong> — Certification RS6776 | Assistance IA & Conformité RGPD / IA Act (UE)
        </div>
        <div class="footer-links">
          <a href="/">Retour V1 Originale</a>
          <a href="/jeux/index.html">Thotie Quest Hub</a>
          <a href="/v2/ressources/glossaire.html">Glossaire</a>
        </div>
      </div>
    `;
  }

  updateUserWidget() {
    const levelEl = document.getElementById('widget-level');
    const barEl = document.getElementById('widget-xp-bar');
    if (levelEl && barEl) {
      levelEl.textContent = this.state.level;
      const progressInLevel = this.state.xp % 100;
      barEl.style.width = `${progressInLevel}%`;
    }
  }
}

// Instance globale
window.v2App = new V2App();
