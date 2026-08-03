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

  // 4. Suivi du temps dans le header
  const initialSeconds = (profile && profile.total_time_seconds) ? profile.total_time_seconds : 0;
  initTimeTracker(supabase, session.user.id, initialSeconds);

  // 5. Injections dans le header (Bonjour Prénom + Bouton Admin si autorisé + Déconnexion)
  injectHeaderButtons(supabase, getUrl, isAdmin, firstName);
}

// ==========================================
// GESTION DES BOUTONS ET INFORMATIONS DU HEADER
// ==========================================
function injectHeaderButtons(supabase, getUrl, isAdmin, firstName) {
  const searchBox = document.querySelector('.md-search');
  if (!searchBox || !searchBox.parentNode) return;

  // Style agrandi & équilibré
  const styleCommon = 'text-decoration: none; padding: 7px 16px; background: rgba(255, 255, 255, 0.18); color: white; border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 20px; font-size: 0.9em; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap;';

  // Badge Bonjour Prénom
  if (firstName && !document.getElementById('welcome-user-badge')) {
    const welcomeBadge = document.createElement('span');
    welcomeBadge.id = 'welcome-user-badge';
    welcomeBadge.style.cssText = 'color: #ffffff; font-size: 0.9em; font-weight: 600; margin-left: 12px; white-space: nowrap; display: inline-flex; align-items: center;';
    welcomeBadge.innerHTML = `👋 Bonjour <strong style="color: #93c5fd; margin-left: 4px;">${firstName}</strong>`;
    
    searchBox.parentNode.appendChild(welcomeBadge);
  }

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
// GESTION DU CHRONOMÈTRE
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
        badge.className = 'header-time-badge';
        // Ajustement taille badge chrono
        badge.style.cssText = 'margin-left: 14px; padding: 7px 16px; background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 20px; font-size: 0.9em; font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;';
        
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
    
    // Insertion juste à côté du titre/logo dans le header
    headerTopic.insertAdjacentElement("beforebegin", homeBtn);
  }
});
/* ==========================================================================
   DÉCONNEXION AUTOMATIQUE APRÈS INACTIVITÉ (60 minutes)
   ========================================================================== */
(function autoLogoutModule() {
  const INACTIVITY_LIMIT_MS = 60 * 60 * 1000; // 60 minutes en millisecondes
  let inactivityTimer;

  // Fonction qui effectue la déconnexion
  function logoutUser() {
    // Supprime la session (ajuste la clé si la tienne est différente, ex: 'auth', 'isLoggedIn', etc.)
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    
    // Alerte discrète ou redirection immédiate
    alert("Vous avez été déconnecté suite à une période d'inactivité de 60 minutes.");
    window.location.reload(); // Ou redirige vers la page de login
  }

  // Fonction pour réinitialiser le chronomètre d'inactivité
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, INACTIVITY_LIMIT_MS);
  }

  // Vérifier si l'utilisateur est actuellement connecté avant d'activer le listener
  // (Ajuste selon la façon dont tu vérifies la connexion dans ton auth.js)
  const isAuthenticated = localStorage.getItem("auth") || sessionStorage.getItem("auth");

  if (isAuthenticated) {
    // Événements écoutés pour détecter l'activité de l'utilisateur
    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

    activityEvents.forEach(function (eventName) {
      window.addEventListener(eventName, resetInactivityTimer, { passive: true });
    });

    // Lancer le timer au chargement de la page
    resetInactivityTimer();
  }
})();
