# Authentification — Wiki Formation IA

<div class="summary-box auth-card">

  <h2>🔒 Espace Apprenant</h2>
  <p class="auth-subtitle">
    Connectez-vous pour accéder à l'ensemble des ressources de la formation.
  </p>

  <form id="login-form" onsubmit="handleLogin(event)">
    
    <div class="auth-field">
      <label for="email">Adresse e-mail :</label>
      <input type="email" id="email" required placeholder="votre.email@domaine.com">
    </div>

    <div class="auth-field">
      <div class="auth-password-header">
        <label for="password">Mot de passe :</label>
        <button type="button" onclick="handleForgotPassword(event)" class="forgot-btn">
          Mot de passe oublié ?
        </button>
      </div>
      <input type="password" id="password" autocomplete="current-password" required placeholder="••••••••">
    </div>

    <div id="login-error" class="auth-alert error"></div>
    <div id="login-success" class="auth-alert success"></div>

    <button type="submit" id="login-btn" class="auth-submit-btn">
      Se connecter
    </button>

  </form>

  <div class="auth-footer">
    ⚖️ <strong>RGPD & Confidentialité :</strong> Vos identifiants sont strictly confidentiels et hébergés dans l'UE. Votre licence d'accès individuelle est accordée pour une durée de 1 an à compter de sa création.
  </div>

</div>
