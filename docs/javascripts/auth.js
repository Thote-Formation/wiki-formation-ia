// ==========================================
// CONFIGURATION SUPABASE & NAVIGATION
// ==========================================
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJKV1QiLCJ9..."; // <--- Ta clé anon complète

// Charger le SDK Supabase dynamiquement si non présent
(function initSupabaseScript() {
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
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  // Détection robuste de la page de connexion
  const currentPath = window.location.pathname.toLowerCase();
const isLoginPage = currentPath.includes('connexion') || currentPath.includes('reinitialisation');

  // Déterminer le chemin de base dynamique (pour éviter les erreurs d'URL absolues)
  const getConnexionUrl = () => {
    // Si on est à la racine du sous-dossier GitHub Pages
    if (window.location.hostname.includes('github.io')) {
      return '/wiki-formation-ia/connexion/';
    }
    return '/connexion/';
  };

  const getHomeUrl = () => {
    if (window.location.hostname.includes('github.io')) {
      return '/wiki-formation-ia/';
    }
    return '/';
  };

  // Récupérer la session active
  const { data: { session } } = await supabase.auth.getSession();

  // 1. SI L'UTILISATEUR N'EST PAS CONNECTÉ
  if (!session) {
    if (!isLoginPage) {
      window.location.href = getConnexionUrl();
    }
    return;
  }

  // 2. VÉRIFICATION DE LA LICENCE
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active')
    .eq('id', session.user.id)
    .maybeSingle();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  if (error || !profile || !profile.is_active || isExpired) {
    if (!isLoginPage) {
      alert("Votre licence d'accès d'un an a expiré ou est inactive.");
      await supabase.auth.signOut();
      window.location.href = getConnexionUrl();
    }
    return;
  }

  // 3. SI CONNECTÉ ET VALIDE SUR LA PAGE DE LOGIN -> Redirection Accueil
  if (isLoginPage) {
    window.location.href = getHomeUrl();
    return;
  }

  // 4. BOUTON DÉCONNEXION
  injectLogoutButton(supabase, getConnexionUrl);
}

function injectLogoutButton(supabase, getConnexionUrl) {
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
        window.location.href = getConnexionUrl();
      };

      headerRight.parentNode.insertBefore(btn, headerRight);
    }
  }
}
