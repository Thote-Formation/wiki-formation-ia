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
      <label for="password" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.4rem;">Mot de passe :</label>
      <input type="password" id="password" required placeholder="••••••••" style="width: 100%; padding: 10px 12px; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; font-size: 0.95rem; box-sizing: border-box;">
    </div>

    <div id="login-error" style="display: none; color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 6px; font-size: 0.85rem; text-align: center;"></div>

    <button type="submit" id="login-btn" style="width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s; margin-top: 0.5rem;">
      Se connecter
    </button>

  </form>

  <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(0,0,0,0.1); font-size: 0.75rem; color: #666; line-height: 1.4; text-align: center;">
    ⚖️ <strong>RGPD & Confidentialité :</strong> Vos identifiants sont strictement confidentiels et hébergés dans l'UE. Votre licence d'accès individuelle est accordée pour une durée de 1 an à compter de sa création.
  </div>

</div>

<script>
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const errorDiv = document.getElementById('login-error');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  btn.disabled = true;
  btn.textContent = "Vérification...";
  errorDiv.style.display = "none";

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorDiv.textContent = "Identifiants incorrects ou compte introuvable.";
    errorDiv.style.display = "block";
    btn.disabled = false;
    btn.textContent = "Se connecter";
  } else {
    // La vérification de licence et redirection se fait par auth.js
    window.location.href = window.location.origin + '/';
  }
}
</script>
