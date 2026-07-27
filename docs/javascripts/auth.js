// ==========================================
// CONFIGURATION SUPABASE & GITHUB PAGES
// ==========================================
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJKV1QiLCJ9..."; // <--- Mets ta vraie clé anon ici !

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

  const getUrl = (path) => {
    const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
    return window.location.origin + basePath + path;
  };

  const currentPath = window.location.pathname.toLowerCase();
  const currentHash = window.location.hash.toLowerCase();
  const currentSearch = window.location.search.toLowerCase();

  const isLoginPage = currentPath.includes('connexion');
  const isResetPage = currentPath.includes('reinitialisation');
  const hasRecoveryToken = currentHash.includes('type=recovery') || currentSearch.includes('type=recovery') || currentHash.includes('access_token=') || currentSearch.includes('code=');

  // 🛑 RÈGLE D'OR : Si on est sur la page de réinitialisation OU qu'un jeton est dans l'URL, ON NE REDIRIGE JAMAIS !
  if (isResetPage || hasRecoveryToken) {
    // Si l'URL a un jeton mais qu'on n'est pas encore sur /reinitialisation/, on l'y emmène avec ses paramètres
    if (hasRecoveryToken && !isResetPage) {
      window.location.href = getUrl('/reinitialisation/') + window.location.hash + window.location.search;
    }
    return;
  }

  // Obtenir la session active
  const { data: { session } } = await supabase.auth.getSession();

  // 1. NON CONNECTÉ
  if (!session) {
    if (!isLoginPage) {
      window.location.href = getUrl('/connexion/');
    }
    return;
  }

  // 2. CONNECTÉ : VÉRIFICATION DE LICENCE
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active')
    .eq('id', session.user.id)
    .maybeSingle();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  if (error || !profile || !profile.is_active || isExpired) {
    alert("Votre licence d'accès a expiré ou est inactive.");
    await supabase.auth.signOut();
    window.location.href = getUrl('/connexion/');
    return;
  }

  // Si déjà connecté et sur la page de connexion -> redirection accueil
  if (isLoginPage) {
    window.location.href = getUrl('/');
    return;
  }

  injectLogoutButton(supabase, getUrl);
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
