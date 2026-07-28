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
  // On laisse la page gérer elle-même son flux d'authentification pour éviter les conflits !
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

  // 3. SI CONNECTÉ : VÉRIFICATION DE LA LICENCE DANS PROFILES
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active, total_time_seconds')
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

  // 4. Lancement du suivi du temps en direct dans le header
  const initialSeconds = (profile && profile.total_time_seconds) ? profile.total_time_seconds : 0;
  initTimeTracker(supabase, session.user.id, initialSeconds);

  // 5. Si tout est valide, injection du bouton de déconnexion
  injectLogoutButton(supabase, getUrl);
}

// ==========================================
// GESTION DU CHRONOMÈTRE ET SYNCHRO SUPABASE
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
    const secs = seconds % 60;
    const pad = (num) => String(num).padStart(2, '0');

    if (hrs > 0) {
      return `⏱️ ${hrs}h ${pad(mins)}m ${pad(secs)}s`;
    }
    return `⏱️ ${mins}m ${pad(secs)}s`;
  }

  function updateHeaderBadge(totalSec) {
    let badge = document.getElementById('time-spent-display');
    
    if (!badge) {
      const headerRight = document.querySelector('.md-header__option') || document.querySelector('.md-search');
      if (headerRight && headerRight.parentNode) {
        badge = document.createElement('div');
        badge.id = 'time-spent-display';
        badge.className = 'header-time-badge';
        headerRight.parentNode.insertBefore(badge, headerRight);
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

  // Sauvegarde auto toutes les 30 sec
  setInterval(syncTimeToDatabase, 30000);

  // Sauvegarde à la fermeture
  window.addEventListener('beforeunload', () => {
    syncTimeToDatabase();
  });

  // Mise à jour chaque seconde sur la page
  setInterval(() => {
    updateHeaderBadge(getUpdatedTotalSeconds());
  }, 1000);

  updateHeaderBadge(baseTotalSeconds);

  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => updateHeaderBadge(getUpdatedTotalSeconds()));
  }
}

function injectLogoutButton(supabase, getUrl) {
  let btn = document.getElementById('logout-btn');
  if (!btn) {
    const headerRight = document.querySelector('.md-header__option') || document.querySelector('.md-search');
    if (headerRight && headerRight.parentNode) {
      btn = document.createElement('button');
      btn.id = 'logout-btn';
      btn.className = 'header-logout-btn';
      btn.textContent = 'Déconnexion 🚪';
      btn.onclick = async () => {
        await supabase.auth.signOut();
        window.location.href = getUrl('/connexion/');
      };
      headerRight.parentNode.insertBefore(btn, headerRight);
    }
  }
}
