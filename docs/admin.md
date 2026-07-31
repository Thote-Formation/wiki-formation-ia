---
hide:
  - navigation
  - toc
---

# 🛠️ Administration des Accès

<style>
  /* 1. Style des champs de saisie (Inputs visibles et explicites) */
  .admin-input {
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 10px 14px !important;
    font-size: 0.95rem !important;
    font-family: inherit !important;
    border: 1.5px solid #94a3b8 !important; /* Bordure nette */
    border-radius: 8px !important;
    background-color: #f8fafc !important; /* Fond légèrement teinté pour marquer la zone */
    color: #0f172a !important;
    transition: all 0.2s ease !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }

  .admin-input:hover {
    border-color: #64748b !important;
    background-color: #ffffff !important;
  }

  .admin-input:focus {
    outline: none !important;
    border-color: #0d47a1 !important;
    background-color: #ffffff !important;
    box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.2) !important;
  }

  /* Support Mode Sombre pour les Inputs */
  [data-md-color-scheme="slate"] .admin-input {
    background-color: #1e293b !important;
    color: #f8fafc !important;
    border-color: #475569 !important;
  }

  [data-md-color-scheme="slate"] .admin-input:hover,
  [data-md-color-scheme="slate"] .admin-input:focus {
    background-color: #0f172a !important;
    border-color: #60a5fa !important;
  }

  /* 2. Style de la Table des Utilisateurs */
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    color: var(--md-typeset-color);
  }
  .admin-table th, .admin-table td {
    padding: 12px;
    border: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
    text-align: left;
    vertical-align: middle;
  }
  .admin-table th {
    background-color: #0d47a1 !important;
    color: #ffffff !important;
    font-weight: 700;
  }
</style>

<!-- FORMULAIRE D'INVITATION UTILISATEUR -->
<div class="wiki-card prompt-generator" markdown="1">

### ➕ Inviter un nouvel utilisateur

<form id="add-user-form">
  <div class="prompt-generator-grid">
    <div>
      <label for="new-email">Adresse E-mail</label>
      <input type="email" id="new-email" class="admin-input" placeholder="ex: utilisateur@domaine.fr" required>
    </div>
    <div>
      <label for="new-expires">Date d'expiration</label>
      <input type="date" id="new-expires" class="admin-input" required>
    </div>
  </div>
  <div class="wiki-actions">
    <button type="submit" class="wiki-button primary">➕ Inviter l'utilisateur par E-mail</button>
  </div>
</form>

<div id="form-message" style="margin-top: 12px; font-weight: 700;"></div>

</div>

<!-- LISTE DES UTILISATEURS -->
<div class="wiki-card" markdown="1">

### 👥 Utilisateurs enregistrés (<span id="user-count">0</span>)

<div style="overflow-x: auto;">
  <table class="admin-table">
    <thead>
      <tr>
        <th>E-mail</th>
        <th>Statut</th>
        <th>Expiration</th>
        <th>Temps Passé</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="users-table-body">
      <tr>
        <td colspan="5">Chargement de la liste...</td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  document.getElementById('new-expires').value = nextYear.toISOString().split('T')[0];

  const checkSupabase = setInterval(() => {
    if (window.supabaseClient) {
      clearInterval(checkSupabase);
      loadAdminPanel();
    }
  }, 200);
});

function formatSeconds(seconds) {
  if (!seconds) return '0 min';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
}

async function loadAdminPanel() {
  const supabase = window.supabaseClient;
  await fetchUsersList(supabase);

  // Invitation Utilisateur
  document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgDiv = document.getElementById('form-message');
    msgDiv.style.color = '#0d47a1';
    msgDiv.textContent = '⏳ Envoi de l\'invitation...';

    const email = document.getElementById('new-email').value;
    const expiresAt = document.getElementById('new-expires').value + 'T23:59:59Z';
    const randomPassword = Math.random().toString(36).slice(-10) + 'A1!' + Math.random().toString(36).slice(-10);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: randomPassword
    });

    if (error) {
      msgDiv.style.color = '#dc2626';
      msgDiv.textContent = '❌ Erreur : ' + error.message;
      return;
    }

    if (data.user) {
      await supabase.from('profiles').update({
        expires_at: expiresAt,
        is_active: true
      }).eq('id', data.user.id);

      const redirectUrl = window.location.origin + (window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '') + '/reinitialisation/';
      
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      msgDiv.style.color = '#15803d';
      msgDiv.textContent = '✅ Compte créé ! Un e-mail a été envoyé à l\'utilisateur.';
      document.getElementById('add-user-form').reset();
      await fetchUsersList(supabase);
    }
  });
}

async function fetchUsersList(supabase) {
  const tbody = document.getElementById('users-table-body');
  
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="5" style="color:#dc2626; font-weight:700;">Erreur : ${error.message}</td></tr>`;
    return;
  }

  document.getElementById('user-count').textContent = profiles.length;
  tbody.innerHTML = '';

  const now = new Date();

  profiles.forEach(p => {
    const expDate = new Date(p.expires_at);
    const isExpired = expDate < now;
    const isAdmin = p.role === 'admin';
    
    let statusBadge = '<span class="wiki-badge success">Actif</span>';
    if (!p.is_active) {
      statusBadge = '<span class="wiki-badge danger">Inactif</span>';
    } else if (isExpired && !isAdmin) {
      statusBadge = '<span class="wiki-badge warning">Expiré</span>';
    }

    let expirationCell = `<input type="date" class="admin-input" style="padding: 4px 8px !important;" value="${p.expires_at ? p.expires_at.split('T')[0] : ''}" onchange="updateExpiration('${p.id}', this.value)">`;
    
    if (isAdmin) {
      expirationCell = '<span style="font-weight: 700; color: #60a5fa;">Illimité ♾️ (Admin)</span>';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${p.email || 'N/A'}</strong> ${isAdmin ? '👑' : ''}</td>
      <td>${statusBadge}</td>
      <td>${expirationCell}</td>
      <td>${formatSeconds(p.total_time_seconds)}</td>
      <td>
        ${isAdmin ? '<em>Aucune action</em>' : `
          <button type="button" class="wiki-button" style="padding: 4px 12px; min-height: 36px; font-size: 0.82rem;" onclick="toggleActive('${p.id}', ${p.is_active})">
            ${p.is_active ? 'Désactiver' : 'Activer'}
          </button>
        `}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function toggleActive(userId, currentStatus) {
  const supabase = window.supabaseClient;
  await supabase.from('profiles').update({ is_active: !currentStatus }).eq('id', userId);
  fetchUsersList(supabase);
}

async function updateExpiration(userId, newDate) {
  if (!newDate) return;
  const supabase = window.supabaseClient;
  await supabase.from('profiles').update({ expires_at: newDate + 'T23:59:59Z' }).eq('id', userId);
  alert('Date d\'expiration mise à jour !');
  fetchUsersList(supabase);
}
</script>
