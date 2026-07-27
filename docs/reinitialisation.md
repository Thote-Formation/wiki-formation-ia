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

<script>
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

  // Initialisation du client Supabase
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Mise à jour du mot de passe pour la session active (établie via le jeton de l'URL)
  const { data, error } = await supabase.auth.updateUser({
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
    
    // Redirection vers la page de connexion après 2 secondes
    setTimeout(() => {
      const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
      window.location.href = window.location.origin + basePath + '/connexion/';
    }, 2000);
  }
}
</script>
