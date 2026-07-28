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
    .select('expires_at, is_active, total_time_seconds, role')
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

  // 4. Suivi du temps dans le header
  const initialSeconds = (profile && profile.total_time_seconds) ? profile.total_time_seconds : 0;
  initTimeTracker(supabase, session.user.id, initialSeconds);

  // 5. Injections dans le header (Bouton Admin si autorisé + Déconnexion)
  injectHeaderButtons(supabase, getUrl, isAdmin);
}

// ==========================================
// GESTION DES BOUTONS DU HEADER (ADMIN + DECONNEXION)
// ==========================================
function injectHeaderButtons(supabase, getUrl, isAdmin) {
  // Cibler l'élément conteneur du header à droite
  const searchBox = document.querySelector('.md-search');
  if (!searchBox || !searchBox.parentNode) return;

  const styleCommon = 'text-decoration: none; padding: 6px 14px; background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 20px; font-size: 0.85em; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap;';

  // Bouton Admin
  if (isAdmin && !document.getElementById('admin-btn')) {
    const adminBtn = document.createElement('a');
    adminBtn.id = 'admin-btn';
    adminBtn.className = 'header-admin-btn';
    adminBtn.href = getUrl('/admin/');
    adminBtn.textContent = '⚙️ Admin';
    adminBtn.style.cssText = styleCommon + ' margin-left: 10px;';
    
    // Placer À DROITE de la barre de recherche
    searchBox.parentNode.appendChild(adminBtn);
  }

  // Bouton Déconnexion
  if (!document.getElementById('logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logout-btn';
    logoutBtn.className = 'header-logout-btn';
    logoutBtn.textContent = 'Déconnexion 🚪';
    logoutBtn.style.cssText = styleCommon + ' margin-left: 8px;';
    logoutBtn.onclick = async () => {
      await supabase.auth.signOut();
      window.location.href = getUrl('/connexion/');
    };
    
    // Placer À DROITE de la barre de recherche
    searchBox.parentNode.appendChild(logoutBtn);
  }
}

// ==========================================
// GESTION DU CHRONOMÈTRE (SANS LES SECONDES)
// ==========================================
function initTimeTracker(supabase, userId, initialTotalSeconds) {
  const sessionStartTime = Date.now();
  const baseTotalSeconds = initialTotalSeconds;

  function getUpdatedTotalSeconds() {
    const sessionElapsedSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    return baseTotalSeconds + sessionElapsedSeconds;
  }

  // Formatage propre : Heures et Minutes uniquement !
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
        badge.style.cssText = 'margin-left: 12px; padding: 6px 14px; background: rgba(255, 255, 255, 0.12); color: white; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 20px; font-size: 0.85em; font-weight: 600; display: inline-flex; align-items: center; white-space: nowrap;';
        
        // Placer À DROITE de la barre de recherche (en premier)
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
