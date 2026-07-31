# Authentification — Wiki Formation IA

<style>
  /* Container de connexion responsive et centré */
  .auth-card {
    max-width: 440px;
    margin: 2rem auto;
    padding: 24px;
  }

  /* Formulaire */
  .auth-form-group {
    margin-bottom: 16px;
  }

  .auth-form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--md-typeset-color, #1e293b);
  }

  /* Inputs stylisés (Visibilité renforcée WCAG) */
  .auth-input {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 10px 14px !important;
    font-size: 0.95rem !important;
    font-family: inherit !important;
    border: 1.5px solid #94a3b8 !important;
    border-radius: 8px !important;
    background-color: #f8fafc !important;
    color: #0f172a !important;
    transition: all 0.2s ease !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .auth-input:hover {
    border-color: #64748b !important;
    background-color: #ffffff !important;
  }

  .auth-input:focus {
    outline: none !important;
    border-color: #0d47a1 !important;
    background-color: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
  }

  /* Support Mode Sombre pour Inputs */
  [data-md-color-scheme="slate"] .auth-input {
    background-color: #1e293b !important;
    color: #f8fafc !important;
    border-color: #475569 !important;
  }

  [data-md-color-scheme="slate"] .auth-input:hover,
  [data-md-color-scheme="slate"] .auth-input:focus {
    background-color: #0f172a !important;
    border-color: #60a5fa !important;
  }

  /* Bouton Mot de passe oublié */
  .forgot-btn {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--md-primary-fg-color, #0d47a1);
    cursor: pointer;
    text-decoration: underline;
  }

  .forgot-btn:hover {
    opacity: 0.8;
  }

  /* Messages de notification d'état */
  .auth-alert {
    display: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 16px;
    border: 1px solid transparent;
  }

  .auth-alert-error {
    background-color: #fee2e2;
    color: #991b1b;
    border-color: #fca5a5;
  }

  .auth-alert-success {
    background-color: #dcfce7;
    color: #166534;
    border-color: #86efac;
  }

  [data-md-color-scheme="slate"] .auth-alert-error {
    background-color: #450a0a;
    color: #fca5a5;
    border-color: #991b1b;
  }

  [data-md-color-scheme="slate"] .auth-alert-success {
    background-color: #052e16;
    color: #86efac;
    border-color: #166534;
  }

  /* RGPD Footer */
  .auth-rgpd {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
    font-size: 0.8rem;
    color: var(--md-typeset-color);
    opacity: 0.8;
    line-height: 1.4;
    text-align: center;
  }
</style>

<div class="wiki-card auth-card">

  <h2 style="margin-top: 0; text-align: center; font-size: 1.5rem;">🔒 Espace Apprenant</h2>
  <p style="text-align: center; font-size: 0.9rem; margin-bottom: 1.5rem; opacity: 0.9;">
    Connectez-vous pour accéder à l'ensemble des ressources de la formation.
  </p>

  <form id="login-form" onsubmit="handleLogin(event)">
    
    <div class="auth-form-group">
      <label for="email">Adresse e-mail :</label>
      <input type="email" id="email" class="auth-input" required placeholder="votre.email@domaine.com">
    </div>

    <div class="auth-form-group">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <label for="password" style="margin-bottom: 0;">Mot de passe :</label>
        <button type="button" class="forgot-btn" onclick="handleForgotPassword(event)">
          Mot de passe oublié ?
        </button>
      </div>
      <input type="password" id="password" class="auth-input" autocomplete="current-password" required placeholder="••••••••">
    </div>

    <div id="login-error" class="auth-alert auth-alert-error"></div>
    <div id="login-success" class="auth-alert auth-alert-success"></div>

    <div class="wiki-actions" style="margin: 1rem 0 0 0;">
      <button type="submit" id="login-btn" class="wiki-button primary" style="width: 100%; cursor: pointer;">
        Se connecter
      </button>
    </div>

  </form>

  <div class="auth-rgpd">
    ⚖️ <strong>RGPD & Confidentialité :</strong> Vos identifiants sont strictly confidentiels et hébergés dans l'UE. Votre licence d'accès individuelle est accordée pour une durée de 1 an à compter de sa création.
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

    const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
    const redirectUrl = window.location.origin + basePath + '/reinitialisation/';

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
