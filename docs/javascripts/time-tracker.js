(function () {
  const STORAGE_KEY = 'wiki_total_time_spent';
  const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 minutes max d'inactivité

  let timeSpent = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let lastActiveTime = Date.now();

  // Formater le temps en texte court (ex: "⏱️ 1h 12m 05s" ou "⏱️ 12m 05s")
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const pad = (num) => String(num).padStart(2, '0');

    if (hrs > 0) {
      return `⏱️ ${hrs}h ${pad(mins)}m ${pad(secs)}s`;
    }
    return `⏱️ ${mins}m ${pad(secs)}s`;
  }

  // Injecter le badge dans le header s'il n'existe pas encore
  function injectHeaderBadge() {
    let badge = document.getElementById('time-spent-display');
    
    if (!badge) {
      // Trouver la zone droite du header (avant la barre de recherche et l'icône)
      const headerRight = document.querySelector('.md-header__option') || document.querySelector('.md-search');
      
      if (headerRight && headerRight.parentNode) {
        badge = document.createElement('div');
        badge.id = 'time-spent-display';
        badge.className = 'header-time-badge';
        // Insérer juste avant les options à droite
        headerRight.parentNode.insertBefore(badge, headerRight);
      }
    }

    if (badge) {
      badge.textContent = formatTime(timeSpent);
    }
  }

  function resetInactivity() {
    lastActiveTime = Date.now();
  }

  function tick() {
    const isTabVisible = document.visibilityState === 'visible';
    const isUserActive = (Date.now() - lastActiveTime) < INACTIVITY_LIMIT;

    if (isTabVisible && isUserActive) {
      timeSpent += 1;
      localStorage.setItem(STORAGE_KEY, timeSpent.toString());
      injectHeaderBadge();
    }
  }

  // Événements d'activité
  ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(e => {
    window.addEventListener(e, resetInactivity, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') resetInactivity();
  });

  // Lancement du timer (1 sec)
  setInterval(tick, 1000);

  // Compatibilité navigation instantanée MkDocs Material
  document.addEventListener('DOMContentLoaded', injectHeaderBadge);
  if (typeof document$ !== 'undefined') {
    document$.subscribe(injectHeaderBadge);
  }
})();
