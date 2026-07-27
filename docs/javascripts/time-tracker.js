(function () {
  const STORAGE_KEY = 'wiki_total_time_spent';
  const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 minutes d'inactivité max

  let timeSpent = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let lastActiveTime = Date.now();
  let intervalId = null;

  // Formater le temps en texte lisible (ex: "1 h 12 min 05 s")
  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num) => String(num).padStart(2, '0');

    if (hrs > 0) {
      return `${hrs} h ${pad(mins)} min ${pad(secs)} s`;
    }
    return `${mins} min ${pad(secs)} s`;
  }

  // Mettre à jour tous les éléments de la page avec l'ID ou la classe correspondante
  function updateDisplay() {
    const formatted = formatTime(timeSpent);
    const elements = document.querySelectorAll('#time-spent-display, .time-spent-badge');
    elements.forEach(el => {
      el.textContent = formatted;
    });
  }

  // Réinitialiser le timer d'inactivité à chaque action utilisateur
  function resetInactivity() {
    lastActiveTime = Date.now();
  }

  // Boucle de comptage exécutée toutes les secondes
  function tick() {
    const isTabVisible = document.visibilityState === 'visible';
    const isUserActive = (Date.now() - lastActiveTime) < INACTIVITY_LIMIT;

    if (isTabVisible && isUserActive) {
      timeSpent += 1;
      localStorage.setItem(STORAGE_KEY, timeSpent.toString());
      updateDisplay();
    }
  }

  // Événements détectant la présence réelle de l'utilisateur
  const userEvents = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
  userEvents.forEach(eventType => {
    window.addEventListener(eventType, resetInactivity, { passive: true });
  });

  // Gestion du changement de visibilité de l'onglet
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      resetInactivity();
    }
  });

  // Lancement du timer global (1 tick = 1 seconde)
  intervalId = setInterval(tick, 1000);

  // Mise à jour de l'affichage au chargement de la page (compatible Instant Navigation MkDocs)
  document.addEventListener('DOMContentLoaded', updateDisplay);
  if (typeof document$ !== 'undefined') {
    document$.subscribe(updateDisplay);
  }
})();
