// ==========================================
// CONFIGURATION SUPABASE & GITHUB PAGES
// ==========================================
window.SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk";

(function() {
  const currentPath = window.location.pathname.toLowerCase();
  const currentHash = window.location.hash.toLowerCase();
  const currentSearch = window.location.search.toLowerCase();

  // 🛑 SI ON EST SUR LA PAGE DE RÉINITIALISATION OU CONNEXION :
  if (
    currentPath.includes('reinitialisation') || 
    currentPath.includes('connexion') || 
    currentHash.includes('type=recovery') || 
    currentSearch.includes('type=recovery')
  ) {
    console.log("Page d'auth détectée. auth.js ne force pas le contrôle automatique.");
    return;
  }

  // Charger le SDK Supabase si non présent puis contrôler l'accès
  if (!window.supabase) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => initAuthCheck();
    document.head.appendChild(script);
  } else {
    initAuthCheck();
  }
})();

async function initAuthCheck() {
  if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  const supabase = window.supabaseClient;

  const getUrl = (path) => {
    const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
    return window.location.origin + basePath + path;
  };

  // 1. Obtenir la session active
  const { data: { session } } = await supabase.auth.getSession();

  // 2. SI NON CONNECTÉ : Redirection vers la page de connexion
  if (!session) {
    window.location.href = getUrl('/connexion/');
    return;
  }

  // 3. SI CONNECTÉ : VÉRIFICATION DU PROFIL ET DU RÔLE
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active, total_time_seconds, role, first_name, email')
    .eq('id', session.user.id)
    .maybeSingle();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  if (error || !profile || !profile.is_active || isExpired) {
    console.error("Erreur de licence Supabase :", error);
    alert("Votre licence d'accès a expiré ou est inactive.");
    await supabase.auth.signOut();
    window.location.href = getUrl('/connexion/');
    return;
  }

  // 🔒 VÉRIFICATION DE SÉCURITÉ : Restriction de la page Admin
  const isPageAdmin = window.location.pathname.toLowerCase().includes('/admin');
  const isAdmin = profile.role === 'admin';

  if (isPageAdmin && !isAdmin) {
    alert("Accès refusé : cette zone est réservée aux administrateurs.");
    window.location.href = getUrl('/');
    return;
  }

  // Déterminer le prénom (avec fallback sur le début de l'e-mail si non renseigné)
  let firstName = profile.first_name;
  if (!firstName && profile.email) {
    const rawName = profile.email.split('@')[0].split('.')[0];
    firstName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  }

  // 4. Suivi du temps et prénom dans le header (PASSAGE DE firstName ICI !)
  const initialSeconds = (profile && profile.total_time_seconds) ? profile.total_time_seconds : 0;
  initTimeTracker(supabase, session.user.id, initialSeconds, firstName);

  // 5. Injections dans le header (Bouton Admin si autorisé + Déconnexion)
  injectHeaderButtons(supabase, getUrl, isAdmin);
}

// ==========================================
// GESTION DES BOUTONS DU HEADER (ADMIN + DECONNEXION)
// ==========================================
function injectHeaderButtons(supabase, getUrl, isAdmin) {
  const searchBox = document.querySelector('.md-search');
  if (!searchBox || !searchBox.parentNode) return;

  const styleCommon = 'text-decoration: none; padding: 7px 16px; background: rgba(255, 255, 255, 0.18); color: white; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 20px; font-size: 0.9em; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap;';

  // Bouton Admin
  if (isAdmin && !document.getElementById('admin-btn')) {
    const adminBtn = document.createElement('a');
    adminBtn.id = 'admin-btn';
    adminBtn.className = 'header-admin-btn';
    adminBtn.href = getUrl('/admin/');
    adminBtn.textContent = '⚙️';
    adminBtn.style.cssText = styleCommon + ' margin-left: 10px;';
    
    searchBox.parentNode.appendChild(adminBtn);
  }

  // Bouton Déconnexion
  if (!document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.className = 'header-logout-btn';
    logoutBtn.textContent = 'Déconnexion';
    logoutBtn.style.cssText = styleCommon + ' margin-left: 8px;';
    logoutBtn.onclick = async () => {
      await supabase.auth.signOut();
      window.location.href = getUrl('/connexion/');
    };
    
    searchBox.parentNode.appendChild(logoutBtn);
  }
}

// ==========================================
// GESTION DU CHRONOMÈTRE ET MESSAGE BIENVENUE
// ==========================================
function initTimeTracker(supabase, userId, initialTotalSeconds, firstName) {
  const sessionStartTime = Date.now();
  const baseTotalSeconds = initialTotalSeconds;

  function getUpdatedTotalSeconds() {
    const sessionElapsedSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    return baseTotalSeconds + sessionElapsedSeconds;
  }

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const pad = (num) => String(num).padStart(2, '0');

    if (hrs > 0) {
      return `⏱️ ${hrs}h ${pad(mins)}m`;
    }
    return `⏱️ ${mins} min`;
  }

  function updateHeaderBadge(totalSec) {
    let container = document.getElementById('user-info-container');
    
    if (!container) {
      const searchBox = document.querySelector('.md-search');
      if (searchBox && searchBox.parentNode) {
        // Conteneur principal vertical et bien espacé
        container = document.createElement('div');
        container.id = 'user-info-container';
        container.style.cssText = 'display: inline-flex !important; flex-direction: column !important; align-items: flex-start !important; justify-content: center !important; margin-left: 14px; margin-right: 6px; vertical-align: middle; line-height: 1.25;';
        
        // 1. "👋 Bonjour Pierre" (plus grand, net, sans bordure)
        if (firstName) {
          const welcomeLabel = document.createElement('span');
          welcomeLabel.id = 'welcome-text-label';
          welcomeLabel.style.cssText = 'color: #ffffff; font-size: 0.9em; font-weight: 600; white-space: nowrap; text-shadow: 0 1px 2px rgba(0,0,0,0.2);';
          welcomeLabel.innerHTML = `👋 Bonjour <strong style="color: #ffffff;">${firstName}</strong>`;
          container.appendChild(welcomeLabel);
        }

        // 2. Chronomètre (Sans pilule/fond/bordure, plus lisible)
        const badge = document.createElement('div');
        badge.id = 'time-spent-display';
        badge.style.cssText = 'color: rgba(255, 255, 255, 0.9); font-size: 0.88em; font-weight: 600; white-space: nowrap; margin-top: 1px;';
        
        container.appendChild(badge);

        // Insertion
        searchBox.parentNode.appendChild(container);
      }
    }

    const badge = document.getElementById('time-spent-display');
    if (badge) {
      badge.textContent = formatTime(totalSec);
    }
  }

  async function syncTimeToDatabase() {
    const total = getUpdatedTotalSeconds();
    await supabase
      .from('profiles')
      .update({ total_time_seconds: total })
      .eq('id', userId);
  }

  setInterval(syncTimeToDatabase, 30000);

  window.addEventListener('beforeunload', () => {
    syncTimeToDatabase();
  });

  setInterval(() => {
    updateHeaderBadge(getUpdatedTotalSeconds());
  }, 1000);

  updateHeaderBadge(baseTotalSeconds);

  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => updateHeaderBadge(getUpdatedTotalSeconds()));
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const headerTopic = document.querySelector(".md-header__title");
  
  if (headerTopic && !document.querySelector(".header-home-btn")) {
    const homeBtn = document.createElement("a");
    homeBtn.href = document.querySelector("a.md-header__button.md-logo")?.href || "/";
    homeBtn.className = "header-home-btn";
    homeBtn.setAttribute("aria-label", "Accueil");
    homeBtn.title = "Retour à l'accueil";
    homeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    `;
    
    headerTopic.insertAdjacentElement("beforebegin", homeBtn);
  }
});

/* ==========================================================================
   DÉCONNEXION AUTOMATIQUE APRÈS INACTIVITÉ (60 minutes)
   ========================================================================== */
(function autoLogoutModule() {
  const INACTIVITY_LIMIT_MS = 60 * 60 * 1000;
  let inactivityTimer;

  function logoutUser() {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    alert("Vous avez été déconnecté suite à une période d'inactivité de 60 minutes.");
    window.location.reload();
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, INACTIVITY_LIMIT_MS);
  }

  const isAuthenticated = localStorage.getItem("auth") || sessionStorage.getItem("auth");

  if (isAuthenticated) {
    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    activityEvents.forEach(function (eventName) {
      window.addEventListener(eventName, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
  }
})();
