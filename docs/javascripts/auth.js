// ==========================================
// CONFIGURATION SUPABASE & GITHUB PAGES
// ==========================================
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJKV1QiLCJ9..."; // <--- Remplace avec ta clé anon complète

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

  // Helper pour obtenir les URLs relatives dynamiquement (GitHub Pages ou local)
  const getUrl = (path) => {
    const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
    return window.location.origin + basePath + path;
  };

  // Détection des pages et des flux d'authentification
  const currentPath = window.location.pathname.toLowerCase();
  const currentHash = window.location.hash.toLowerCase();
  const currentSearch = window.location.search.toLowerCase();

  const isLoginPage = currentPath.includes('connexion');
  const isResetPage = currentPath.includes('reinitialisation');
  const isRecoveryFlow = currentHash.includes('type=recovery') || currentSearch.includes('type=recovery');

  // Si l'utilisateur clique sur un lien de réinitialisation de mot de passe venant de son email
  if (isRecoveryFlow && !isResetPage) {
    window.location.href = getUrl('/reinitialisation/') + window.location.hash;
    return;
  }

  // Récupérer la session active
  const { data: { session } } = await supabase.auth.getSession();

  // 1. SI L'UTILISATEUR N'EST PAS CONNECTÉ
  if (!session) {
    // Si on n'est ni sur la page de connexion ni sur la page de réinitialisation -> Redirection vers /connexion/
    if (!isLoginPage && !isResetPage) {
      window.location.href = getUrl('/connexion/');
    }
    return;
  }

  // 2. VÉRIFICATION DE LA LICENCE D'ACCÈS (TABLE 'profiles')
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active')
    .eq('id', session.user.id)
    .maybeSingle();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  // Si licence expirée, inactive ou profil introuvable
  if (error || !profile || !profile.is_active || isExpired) {
    // Si on est sur la page de réinitialisation, on laisse l'utilisateur changer son mot de passe
    if (!isLoginPage && !isResetPage) {
      alert("Votre licence d'accès d'un an a expiré ou est inactive. Contactez votre administrateur.");
      await supabase.auth.signOut();
      window.location.href = getUrl('/connexion/');
    }
    return;
  }

  // 3. SI CONNECTÉ ET VALIDE SUR LA PAGE DE LOGIN -> Redirection vers l'accueil
  if (isLoginPage) {
    window.location.href = getUrl('/');
    return;
  }

  // 4. INJECTER LE BOUTON DÉCONNEXION
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
