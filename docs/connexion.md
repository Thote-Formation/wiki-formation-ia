# Authentification — Wiki Formation IA

<div class="auth-login-card">

  <h2 class="auth-login-title">🔒 Espace Apprenant</h2>
  <p class="auth-login-subtitle">
    Connectez-vous pour accéder à l'ensemble des ressources de la formation.
  </p>

  <form id="login-form" onsubmit="handleLogin(event)" class="auth-login-form">
    
    <div class="auth-login-field">
      <label for="email">Adresse e-mail :</label>
      <input type="email" id="email" required placeholder="votre.email@domaine.com">
    </div>

    <div class="auth-login-field">
      <div class="auth-login-pass-row">
        <label for="password">Mot de passe :</label>
        <button type="button" onclick="handleForgotPassword(event)" class="auth-login-forgot">
          Mot de passe oublié ?
        </button>
      </div>
      <input type="password" id="password" autocomplete="current-password" required placeholder="••••••••">
    </div>

    <div id="login-error" class="auth-login-alert error"></div>
    <div id="login-success" class="auth-login-alert success"></div>

    <button type="submit" id="login-btn" class="auth-login-btn">
      Se connecter
    </button>

  </form>

  <div class="auth-login-footer">
    ⚖️ <strong>RGPD & Confidentialité :</strong> Vos identifiants sont strictement confidentiels et hébergés dans l'UE. Votre licence d'accès individuelle est accordée pour une durée de 1 an à compter de sa création.
  </div>

</div>
