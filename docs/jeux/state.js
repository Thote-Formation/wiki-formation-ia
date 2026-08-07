/* IA Academy — état partagé entre toutes les pages.
   Stockage: localStorage, propre à chaque navigateur/appareil (pas de compte, pas de serveur).
   Pour un classement réel partagé entre utilisateurs, il faudrait brancher ceci sur un backend
   (par ex. le Worker Cloudflare déjà utilisé pour le chatbot Thotie, + Cloudflare KV). */

(function () {
  const STORAGE_KEY = "ia_academy_state";
  const XP_PER_LEVEL = 300; // palier arbitraire, à ajuster librement

  const AVATARS = {
    robot: { emoji: "🤖", label: "Robot" },
    renard: { emoji: "🦊", label: "Renard cyber" },
    chouette: { emoji: "🦉", label: "Chouette IA" },
    chat: { emoji: "🐱", label: "Chat neural" },
  };

  // Modules du parcours. "unlockLevel" = niveau requis pour débloquer.
  // Le contenu réel (logique de jeu) de chaque module reste à intégrer :
  // ces pages sont pour l'instant des coquilles connectées au système d'XP.
  const MODULES = [
    {
      id: "atelier",
      name: "Atelier des neurones",
      desc: "Les bases du fonctionnement d'un réseau de neurones.",
      icon: "grain",
      href: "atelier.html",
      unlockLevel: 1,
      xpReward: 50,
    },
    {
      id: "laboratoire",
      name: "Laboratoire du prompt",
      desc: "Construire et tester un prompt efficace.",
      icon: "terminal",
      href: "laboratoire.html",
      unlockLevel: 1,
      xpReward: 75,
    },
    {
      id: "duel",
      name: "Duel de l'IA",
      desc: "Affronter un adversaire sur un défi de prompt.",
      icon: "sports_esports",
      href: "duel.html",
      unlockLevel: 2,
      xpReward: 100,
    },
  ];

  const QUESTS = [
    { id: "module", label: "Terminer 1 module", xp: 50 },
    { id: "duel", label: "Gagner un duel", xp: 100 },
    { id: "profil", label: "Personnaliser mon profil", xp: 20 },
  ];

  function defaultState() {
    return {
      pseudo: "Toi",
      avatar: "robot",
      xp: 0,
      completedModules: [],
      quests: {},
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      return defaultState();
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function levelInfo(xp) {
    const level = Math.floor(xp / XP_PER_LEVEL) + 1;
    const xpInLevel = xp % XP_PER_LEVEL;
    const xpToNext = XP_PER_LEVEL - xpInLevel;
    const pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
    return { level, xpInLevel, xpToNext, pct };
  }

  let state = loadState();

  function persist() {
    saveState(state);
  }

  function addXp(amount) {
    state.xp = Math.max(0, state.xp + amount);
    persist();
  }

  function toggleQuest(id) {
    const q = QUESTS.find((x) => x.id === id);
    if (!q) return;
    const done = !!state.quests[id];
    state.quests[id] = !done;
    addXp(done ? -q.xp : q.xp);
    persist();
  }

  function completeModule(id) {
    const m = MODULES.find((x) => x.id === id);
    if (!m || state.completedModules.includes(id)) return;
    state.completedModules.push(id);
    addXp(m.xpReward);
    if (!state.quests.module) {
      state.quests.module = true;
      addXp(QUESTS.find((q) => q.id === "module").xp);
    }
    persist();
  }

  function resetState() {
    state = defaultState();
    persist();
    location.reload();
  }

  function setProfile(pseudo, avatar) {
    state.pseudo = pseudo || state.pseudo;
    state.avatar = avatar || state.avatar;
    persist();
  }

  // --- Rendu de la barre de navigation latérale, partagée sur toutes les pages ---
  function renderSidebar(activeId) {
    const mount = document.getElementById("academy-sidebar");
    if (!mount) return;
    const info = levelInfo(state.xp);
    const avatar = AVATARS[state.avatar] || AVATARS.robot;

    const links = [
      { id: "hub", name: "Hub", icon: "map", href: "index.html" },
      ...MODULES.map((m) => ({
        id: m.id,
        name: m.name,
        icon: m.icon,
        href: m.href,
        locked: info.level < m.unlockLevel,
      })),
      { id: "profil", name: "Profil", icon: "person", href: "profil.html" },
    ];

    mount.innerHTML = `
      <div class="mb-8 flex flex-col items-center p-4">
        <div class="w-20 h-20 rounded-xl mb-3 overflow-hidden neo-bevel avatar-emoji text-white">${avatar.emoji}</div>
        <h1 class="font-headline-md text-lg text-primary text-center">IA Academy</h1>
        <p class="text-xs text-on-surface-variant uppercase tracking-wide">Niveau ${info.level} — ${state.pseudo}</p>
      </div>
      <div class="flex flex-col gap-2 px-2">
        ${links
          .map((l) => {
            const isActive = l.id === activeId;
            if (l.locked) {
              return `<div class="flex items-center gap-3 px-4 py-3 rounded-xl text-outline cursor-not-allowed opacity-60" title="Se débloque plus tard">
                <span class="material-symbols-outlined">lock</span>
                <span class="text-sm">${l.name}</span>
              </div>`;
            }
            return `<a href="${l.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive
                ? "bg-primary-container text-on-primary-container font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }">
              <span class="material-symbols-outlined">${l.icon}</span>
              <span class="text-sm">${l.name}</span>
            </a>`;
          })
          .join("")}
      </div>
      <div class="mt-auto p-2">
        <button id="academy-reset-btn" class="w-full flex items-center justify-center gap-2 text-xs text-outline hover:text-error py-3">
          <span class="material-symbols-outlined text-[16px]">restart_alt</span> Réinitialiser ma progression
        </button>
      </div>
    `;
    const resetBtn = document.getElementById("academy-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Effacer ta progression (XP, niveau, quêtes) sur cet appareil ?")) resetState();
      });
    }
  }

  window.Academy = {
    AVATARS,
    MODULES,
    QUESTS,
    get state() {
      return state;
    },
    levelInfo,
    addXp,
    toggleQuest,
    completeModule,
    resetState,
    setProfile,
    renderSidebar,
    persist,
  };
})();
