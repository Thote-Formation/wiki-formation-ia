# Authentification — Wiki Formation IA

<div class="summary-box" style="max-width: 480px; margin: 2rem auto; padding: 2rem; border-radius: 12px; background: var(--md-card-bg-color, #ffffff); box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

  <h2 style="margin-top: 0; text-align: center; font-size: 1.5rem;">🔒 Espace Apprenant</h2>
  <p style="text-align: center; color: var(--md-default-fg-color--light); font-size: 0.9rem; margin-bottom: 1.5rem;">
    Connectez-vous pour accéder à l'ensemble des ressources de la formation.
  </p>

  <form id="login-form" onsubmit="handleLogin(event)" style="display: flex; flex-direction: column; gap: 1rem;">
    
    <div>
      <label for="email" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem;">Adresse e-mail :</label>
      <input type="email" id="email" required placeholder="votre.email@domaine.com" style="width: 100%; padding: 10px 12px; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;">
    </div>

    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <label for="password" style="font-weight: 600; font-size: 0.85rem;">Mot de passe :</label>
        <button type="button" onclick="handleForgotPassword(event)" style="background: none; border: none; padding: 0; font-size: 0.8rem; color: #1976d2; cursor: pointer; text-decoration: underline;">
          Mot de passe oublié ?
        </button>
      </div>
      <input type="password" id="password" autocomplete="current-password" required placeholder="••••••••" style="width: 100%; padding: 10px 12px; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;">
    </div>

    <div id="login-error" style="display: none; color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>
    <div id="login-success" style="display: none; color: #2e7d32; background: #e8f5e9; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>

    <button type="submit" id="login-btn" style="width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-top: 0.5rem;">
      Se connecter
    </button>

  </form>

  <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1); font-size: 0.75rem; color: #666; line-height: 1.4; text-align: center;">
    ⚖️ <strong>RGPD & Confidentialité :</strong> Vos identifiants sont strictement confidentiels et hébergés dans l'UE. Votre licence d'accès individuelle est accordée pour une durée de 1 an à compter de sa création.
  </div>

</div>

<!-- Chargement du SDK Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
// Utilisation du scope window pour éviter les conflits avec auth.js
window.SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
window.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk";

function getSupabaseClient() {
  if (!window.supabase) {
    throw new Error("SDK Supabase non chargé");
  }
  if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  return window.supabaseClient;
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const errorDiv = document.getElementById('login-error');
  const successDiv = document.getElementById('login-success');
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  btn.disabled = true;
  btn.textContent = "Vérification...";
  errorDiv.style.display = "none";
  successDiv.style.display = "none";

  try {
    const supabase = getSupabaseClient();
    
    // 1. Authentification
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      errorDiv.textContent = "Identifiants incorrects ou compte introuvable.";
      errorDiv.style.display = "block";
      btn.disabled = false;
      btn.textContent = "Se connecter";
      return;
    }

    // 2. Vérification de la licence dans 'profiles'
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('expires_at, is_active')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (profileError || !profile) {
      console.error("Erreur profil :", profileError);
      errorDiv.textContent = "Impossible de récupérer votre profil d'accès.";
      errorDiv.style.display = "block";
      await supabase.auth.signOut();
      btn.disabled = false;
      btn.textContent = "Se connecter";
      return;
    }

    // 3. Contrôle de validité de la licence
    const now = new Date();
    const expirationDate = new Date(profile.expires_at);

    if (!profile.is_active || expirationDate < now) {
      errorDiv.textContent = "Votre licence d'accès a expiré ou est inactive.";
      errorDiv.style.display = "block";
      await supabase.auth.signOut();
      btn.disabled = false;
      btn.textContent = "Se connecter";
      return;
    }

    // 4. Succès et redirection
    successDiv.textContent = "Connexion réussie ! Redirection...";
    successDiv.style.display = "block";
    
    setTimeout(() => {
      const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
      window.location.href = window.location.origin + basePath + '/';
    }, 1000);

  } catch (err) {
    errorDiv.textContent = "Erreur de connexion : " + err.message;
    errorDiv.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Se connecter";
  }
}

// GESTION DU MOT DE PASSE OUBLIÉ
async function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const errorDiv = document.getElementById('login-error');
  const successDiv = document.getElementById('login-success');

  errorDiv.style.display = "none";
  successDiv.style.display = "none";

  if (!email) {
    errorDiv.textContent = "Veuillez d'abord saisir votre adresse e-mail dans le champ ci-dessus.";
    errorDiv.style.display = "block";
    return;
  }

  try {
    const supabase = getSupabaseClient();

    const redirectUrl = window.location.hostname.includes('github.io') 
      ? 'https://Thote-Formation.github.io/wiki-formation-ia/reinitialisation/'
      : window.location.origin + '/reinitialisation/';

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      errorDiv.textContent = "Erreur lors de l'envoi : " + error.message;
      errorDiv.style.display = "block";
    } else {
      successDiv.textContent = "Un e-mail de réinitialisation vient de vous être envoyé !";
      successDiv.style.display = "block";
    }
  } catch (err) {
    errorDiv.textContent = "Erreur de configuration : " + err.message;
    errorDiv.style.display = "block";
  }
}
</script>
