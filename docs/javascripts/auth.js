// ==========================================
// CONFIGURATION SUPABASE
// ==========================================
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; // <--- Ton URL Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk";            // <--- Ta clé API 'anon'

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
  
  // Exempter la page de login du blocage
  const isLoginPage = window.location.pathname.includes('/connexion') || window.location.pathname.endsWith('connexion.html');

  // Vérifier la session active
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Si l'utilisateur n'est pas connecté et qu'il n'est pas sur la page de connexion
    if (!isLoginPage) {
      window.location.href = window.location.origin + '/connexion/';
    }
    return;
  }

  // Vérification de la licence dans la table 'profiles'
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('expires_at, is_active')
    .eq('id', session.user.id)
    .single();

  const now = new Date();
  const expiresAt = profile ? new Date(profile.expires_at) : null;
  const isExpired = expiresAt ? now > expiresAt : true;

  if (error || !profile || !profile.is_active || isExpired) {
    // Si la licence est expirée ou inactive
    if (!isLoginPage) {
      alert("Votre licence d'accès d'un an a expiré ou est inactive.");
      await supabase.auth.signOut();
      window.location.href = window.location.origin + '/connexion/';
    }
    return;
  }

  // Si tout est valide et que l'utilisateur est sur la page de login, on le redirige vers l'accueil
  if (isLoginPage) {
    window.location.href = window.location.origin + '/';
  }

  // Injecter un bouton "Déconnexion" dans le header
  injectLogoutButton(supabase);
}

function injectLogoutButton(supabase) {
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
        window.location.href = window.location.origin + '/connexion/';
      };
      headerRight.parentNode.insertBefore(btn, headerRight);
    }
  }
}
