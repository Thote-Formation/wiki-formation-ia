// ==========================================
// CONFIGURATION SUPABASE & GITHUB PAGES
// ==========================================
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJKV1QiLCJ9..."; // <--- Remplace avec ta clé anon complète
const BASE_PATH = "/wiki-formation-ia"; // Chemin de base sur GitHub Pages

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
  
  // Vérifier si la page actuelle est la page de connexion
  const isLoginPage = window.location.pathname.includes('/connexion');

  // Récupérer la session active
  const { data: { session } } = await supabase.auth.getSession();

  // 1. SI L'UTILISATEUR N'EST PAS CONNECTÉ
  if (!session) {
    if (!isLoginPage) {
      // Redirection vers la page de connexion
      window.location.href = window.location.origin + BASE_PATH + '/connexion/';
    }
    return;
  }

  // 2. VÉRIFICATION DE LA LICENCE (TABLE 'profiles')
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active')
    .eq('id', session.user.id)
    .single();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  // Si erreur, compte inactif ou licence expirée
  if (error || !profile || !profile.is_active || isExpired) {
    if (!isLoginPage) {
      alert("Votre licence d'accès d'un an a expiré ou est inactive. Contactez votre administrateur.");
      await supabase.auth.signOut();
      window.location.href = window.location.origin + BASE_PATH + '/connexion/';
    }
    return;
  }

  // 3. SI DÉJÀ CONNECTÉ ET VALIDE SUR LA PAGE DE LOGIN -> Redirection vers l'accueil
  if (isLoginPage) {
    window.location.href = window.location.origin + BASE_PATH + '/';
    return;
  }

  // 4. INJECTER LE BOUTON DÉCONNEXION DANS LE HEADER
  injectLogoutButton(supabase);
}

function injectLogoutButton(supabase) {
  let btn = document.getElementById('logout-btn');
  
  if (!btn) {
    // Cibler les options du header (à côté du toggle thème / recherche)
    const headerRight = document.querySelector('.md-header__option') || document.querySelector('.md-search');
    
    if (headerRight && headerRight.parentNode) {
      btn = document.createElement('button');
      btn.id = 'logout-btn';
      btn.className = 'header-logout-btn';
      btn.textContent = 'Déconnexion 🚪';
      
      btn.onclick = async () => {
        await supabase.auth.signOut();
        window.location.href = window.location.origin + BASE_PATH + '/connexion/';
      };

      headerRight.parentNode.insertBefore(btn, headerRight);
    }
  }
}
