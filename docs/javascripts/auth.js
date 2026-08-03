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

  // 📌 4. TITRE AVEC PRÉNOM + BIENVENUE EN SOUS-TITRE
  updateHeaderTitle(firstName);

  // 5. Suivi du temps (Chrono à droite)
  const initialSeconds = (profile && profile.total_time_seconds) ? profile.total_time_seconds : 0;
  initTimeTracker(supabase, session.user.id, initialSeconds);

  // 6. Injections dans le header (Boutons Admin ⚙️ + Déconnexion ⏻)
  injectHeaderButtons(supabase, getUrl, isAdmin);
}

// ==========================================
// PERSONNALISATION DU TITRE DU HEADER (SUR 2 LIGNES)
// ==========================================
function updateHeaderTitle(firstName) {
  function applyTitle() {
    const titleElement = document.querySelector('.md-header__title .md-ellipsis') || document.querySelector('.md-header__title');
    if (titleElement) {
      // Forcer un conteneur en flex column pour aligner le message et le sous-titre
      titleElement.style.cssText = "display: inline-flex !important; flex-direction: column !important; justify-content: center !important; line-height: 1.25 !important; vertical-align: middle;";
      
      const nameText = firstName ? `Bonjour ${firstName}` : "Bonjour";
      
      titleElement.innerHTML = `
        <span style="font-size: 1.15em; font-weight: 700; color: #ffffff;">{nameText}$👋</span>
        <span style="font-size: 0.78em; font-weight: 400; color: rgba(255, 255, 255, 0.85); margin-top: 1px;">Bienvenue sur ta formation IA générative</span>
      `;
    }
  }

  applyTitle();
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => applyTitle());
  }
}

// ==========================================
// GESTION DES BOUTONS DU HEADER (ADMIN + DECONNEXION)
// ==========================================
function injectHeaderButtons(supabase, getUrl, isAdmin) {
  const searchBox = document.querySelector('.md-search');
  if (!searchBox || !searchBox.parentNode) return;

  const styleIconBtn = 'text-decoration: none; width: 36px; height: 36px; padding: 0; background: rgba(255, 255, 255, 0.18); color: white; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 50%; font-size: 1.1em; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; white-space: nowrap; line-height: 1; vertical-align: middle; box-sizing: border-box;';

  // Bouton Admin ⚙️
  if (isAdmin && !document.getElementById('admin-btn')) {
    const adminBtn = document.createElement('a');
    adminBtn.id = 'admin-btn';
    adminBtn.className = 'header-admin-btn';
    adminBtn.href = getUrl('/admin/');
    adminBtn.textContent = '⚙️';
    adminBtn.title = "Panneau d'administration";
    adminBtn.style.cssText = styleIconBtn + ' margin-left: 10px;';
    
    searchBox.parentNode.appendChild(adminBtn);
  }

  // Bouton Déconnexion ⏻
  if (!document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.className = 'header-logout-btn';
    logoutBtn.textContent = '⏻';
    logoutBtn.title = "Se déconnecter";
    logoutBtn.style.cssText = styleIconBtn + ' margin-left: 8px; font-size: 1.2em;';
    logoutBtn.onclick = async () => {
      await supabase.auth.signOut();
      window.location.href = getUrl('/connexion/');
    };
    
    searchBox.parentNode.appendChild(logoutBtn);
  }
}

// ==========================================
// GESTION DU CHRONOMÈTRE SEUL (À DROITE)
// ==========================================
function initTimeTracker(supabase, userId, initialTotalSeconds) {
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
    let badge = document.getElementById('time-spent-display');
    
    if (!badge) {
      const searchBox = document.querySelector('.md-search');
      if (searchBox && searchBox.parentNode) {
        badge = document.createElement('div');
        badge.id = 'time-spent-display';
        badge.style.cssText = 'color: #ffffff; font-size: 1.05em; font-weight: 600; white-space: nowrap; margin-left: 14px; margin-right: 6px; display: inline-flex; align-items: center; vertical-align: middle; text-shadow: 0 1px 2px rgba(0,0,0,0.25);';
        
        searchBox.parentNode.appendChild(badge);
      }
    }

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
