# Réinitialisation du mot de passe

<div class="summary-box" style="max-width: 480px; margin: 2rem auto; padding: 2rem; border-radius: 12px; background: var(--md-card-bg-color, #ffffff); box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

  <h2 style="margin-top: 0; text-align: center; font-size: 1.5rem;">🔑 Nouveau mot de passe</h2>
  <p style="text-align: center; color: var(--md-default-fg-color--light); font-size: 0.9rem; margin-bottom: 1.5rem;">
    Veuillez saisir votre nouveau mot de passe ci-dessous pour sécuriser votre compte.
  </p>

  <form id="reset-form" onsubmit="handlePasswordUpdate(event)" style="display: flex; flex-direction: column; gap: 1rem;">
    
    <div>
      <label for="new-password" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem;">Nouveau mot de passe :</label>
      <input type="password" id="new-password" required minlength="6" placeholder="••••••••" style="width: 100%; padding: 10px 12px; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;">
    </div>

    <div id="reset-error" style="display: none; color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>
    <div id="reset-success" style="display: none; color: #2e7d32; background: #e8f5e9; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>

    <button type="submit" id="reset-btn" style="width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-top: 0.5rem;">
      Mettre à jour le mot de passe
    </button>

  </form>

</div>

<!-- Chargement unique du SDK Supabase JS -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
// Clés d'accès Supabase (Variables explicites pour éviter tout problème de scope)
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk

Service role
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTEzODMxMiwiZXhwIjoyMTAwNzE0MzEyfQ.-GooX8cqZtGgMWXEf_Il1sLSPqc70VZh64TE3VHRypc"; // <--- Remplace par ta vraie clé anon

let supabaseClient = null;
let isSessionReady = false;

document.addEventListener('DOMContentLoaded', async () => {
  if (!window.supabase) return;

  // Création unique de l'instance Supabase
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Écoute de l'état d'authentification fourni par Supabase
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY' || session) {
      isSessionReady = true;
      console.log("Session de réinitialisation validée.");
    }
  });

  // Vérification si un hash d'ancienne version (#access_token=...) est présent
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = hashParams.get('access_token');
  const refreshToken = hashParams.get('refresh_token');

  if (accessToken && refreshToken) {
    const { error } = await supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    if (!error) isSessionReady = true;
  }
});

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

  if (!supabaseClient && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // Tenter de récupérer la session active si l'événement ne l'a pas encore fait
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session && !isSessionReady) {
    errorDiv.textContent = "La session a expiré ou le lien est invalide. Veuillez effectuer une nouvelle demande.";
    errorDiv.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Mettre à jour le mot de passe";
    return;
  }

  // Application de la mise à jour du mot de passe
  const { error } = await supabaseClient.auth.updateUser({
    password: newPassword
  });

  if (error) {
    errorDiv.textContent = "Erreur : " + error.message;
    errorDiv.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Mettre à jour le mot de passe";
  } else {
    successDiv.textContent = "Mot de passe modifié avec succès ! Redirection vers la connexion...";
    successDiv.style.display = "block";

    // Fermeture de la session temporaire
    await supabaseClient.auth.signOut();

    setTimeout(() => {
      const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
      window.location.href = window.location.origin + basePath + '/connexion/';
    }, 2000);
  }
}
</script>
