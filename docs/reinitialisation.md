# Réinitialisation du mot de passe

<div class="summary-box" style="max-width: 480px; margin: 2rem auto; padding: 2rem; border-radius: 12px; background: var(--md-card-bg-color, #ffffff); box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

  <h2 style="margin-top: 0; text-align: center; font-size: 1.5rem;">🔑 Nouveau mot de passe</h2>
  <p style="text-align: center; color: var(--md-default-fg-color--light); font-size: 0.9rem; margin-bottom: 1.5rem;">
    Veuillez saisir votre nouveau mot de passe ci-dessous pour sécuriser votre compte.
  </p>

  <div id="session-warning" style="display: block; background: #fff3cd; color: #856404; padding: 12px; border-radius: 6px; font-size: 0.85rem; text-align: center; margin-bottom: 1rem;">
    ⏳ Validation du lien de sécurité en cours...
  </div>

<!-- FORMULAIRE DE RÉINITIALISATION -->
<form id="reset-form" onsubmit="handlePasswordUpdate(event)" style="display: flex; flex-direction: column; gap: 1rem;">
  
  <div>
    <label for="new-password" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem;">
      Nouveau mot de passe :
    </label>
    
    <!-- Input avec un placeholder clair et explicite -->
    <input 
      type="password" 
      id="new-password" 
      required 
      minlength="8" 
      placeholder="Entrez votre nouveau mot de passe" 
      oninput="validatePasswordRules(this.value)"
      style="width: 100%; padding: 10px 12px; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;"
    >

    <!-- Exigences et consignes de sécurité du mot de passe -->
    <div id="password-rules" style="margin-top: 0.6rem; font-size: 0.8rem; background: rgba(0,0,0,0.03); padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.06);">
      <span style="font-weight: 600; display: block; margin-bottom: 4px; color: var(--md-default-fg-color--light);">
        📋 Consignes de sécurité :
      </span>
      <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.5; color: var(--md-default-fg-color--light);">
        <li id="rule-length">Au moins 8 caractères</li>
        <li id="rule-uppercase">Au moins une lettre majuscule</li>
        <li id="rule-number">Au moins un chiffre</li>
      </ul>
    </div>
  </div>

  <div id="reset-error" style="display: none; color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>
  <div id="reset-success" style="display: none; color: #2e7d32; background: #e8f5e9; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>

  <button type="submit" id="reset-btn" disabled style="width: 100%; padding: 12px; background: #ccc; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: not-allowed; transition: background 0.2s; margin-top: 0.5rem;">
    Mettre à jour le mot de passe
  </button>

</form>

<!-- MENTION INFORMATION RGPD -->
<div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.08); font-size: 0.75rem; color: var(--md-default-fg-color--light); text-align: center; line-height: 1.4;">
  🔒 <strong>Protection des données :</strong> Les données collectées (adresse email, informations de connexion) sont hébergées dans l'Union Européenne (Suède) via Supabase et sont uniquement utilisées pour l'authentification et le suivi de formation conformément au RGPD.
</div>

</div>

<!-- SDK Supabase -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk"; // <--- Mets ta nouvelle clé anon ici !

let supabaseClient = null;

function unlockForm() {
  const warning = document.getElementById('session-warning');
  const btn = document.getElementById('reset-btn');
  if (warning) warning.style.display = 'none';
  if (btn) {
    btn.disabled = false;
    btn.style.background = '#1976d2';
    btn.style.cursor = 'pointer';
  }
}

function showError(msg) {
  const warning = document.getElementById('session-warning');
  if (warning) {
    warning.style.background = '#ffebee';
    warning.style.color = '#d32f2f';
    warning.innerHTML = "⚠️ " + msg;
  }
}

async function verifyAndInit() {
  if (!window.supabase) return;

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 1. Écoute directe des événements d'authentification Supabase
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log("Auth Event:", event);
    if (session) {
      unlockForm();
    }
  });

  // 2. Extraction du token/code dans l'URL
  const fullUrl = window.location.href;
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const searchParams = new URLSearchParams(window.location.search);

  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');
  const code = searchParams.get('code');

  try {
    if (accessToken && refreshToken) {
      const { data, error } = await supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (!error && data.session) {
        unlockForm();
        return;
      }
    } else if (code) {
      const { data, error } = await supabaseClient.auth.exchangeCodeForSession(code);
      if (!error && data.session) {
        unlockForm();
        return;
      }
    }

    // 3. Si aucun paramètre n'est trouvé dans l'URL, vérifier si la session existe déjà
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
      unlockForm();
    } else {
      setTimeout(() => {
        // Si toujours rien au bout de 2,5s
        const currentSession = supabaseClient.auth.getSession();
        currentSession.then(({ data }) => {
          if (data.session) unlockForm();
          else showError("Lien expiré ou invalide. Veuillez renvoyer une demande depuis la page de connexion.");
        });
      }, 2500);
    }
  } catch (err) {
    showError("Erreur d'initialisation : " + err.message);
  }
}

// Lancement immédiat
verifyAndInit();

async function handlePasswordUpdate(e) {
  e.preventDefault();
  const btn = document.getElementById('reset-btn');
  const errorDiv = document.getElementById('reset-error');
  const successDiv = document.getElementById('reset-success');
  const newPassword = document.getElementById('new-password').value;

  btn.disabled = true;
  btn.textContent = "Mise à jour en cours...";
  errorDiv.style.display = "none";
  successDiv.style.display = "none";

  const { error } = await supabaseClient.auth.updateUser({
    password: newPassword
  });

  if (error) {
    errorDiv.textContent = "Erreur : " + error.message;
    errorDiv.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Mettre à jour le mot de passe";
  } else {
    successDiv.textContent = "Mot de passe modifié avec succès ! Redirection...";
    successDiv.style.display = "block";
    
    await supabaseClient.auth.signOut();

    setTimeout(() => {
      const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
      window.location.href = window.location.origin + basePath + '/connexion/';
    }, 2000);
  }
}
</script>
