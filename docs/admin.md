---
hide:
  - navigation
  - toc
---

# 🛠️ Administration des Accès

<style>
  .admin-card {
    background: var(--md-card-bg-color, #ffffff);
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  .admin-form-group {
    margin-bottom: 15px;
  }
  .admin-form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .admin-form-group input, .admin-form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }
  .admin-btn-submit {
    background-color: #28a745;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  .admin-btn-submit:hover { background-color: #218838; }
  
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  .admin-table th, .admin-table td {
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    text-align: left;
  }
  .admin-table th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  .badge-active { color: #28a745; font-weight: bold; }
  .badge-inactive { color: #dc3545; font-weight: bold; }
  .badge-expired { color: #ffc107; font-weight: bold; }
  
  .action-btn {
    padding: 4px 8px;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 0.85em;
  }
  .btn-toggle { background-color: #17a2b8; }
  .btn-toggle:hover { background-color: #138496; }
</style>

<!-- FORMULAIRE D'INVITATION UTILISATEUR -->
<div class="admin-card">
  <h3>➕ Inviter un nouvel utilisateur</h3>
  <form id="add-user-form">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
      <div class="admin-form-group">
        <label for="new-email">Adresse E-mail</label>
        <input type="email" id="new-email" placeholder="utilisateur@domaine.fr" required>
      </div>
      <div class="admin-form-group">
        <label for="new-expires">Date d'expiration</label>
        <input type="date" id="new-expires" required>
      </div>
    </div>
    <button type="submit" class="admin-btn-submit" style="margin-top: 10px;">➕ Inviter l'utilisateur par E-mail</button>
  </form>
  <div id="form-message" style="margin-top: 10px; font-weight: bold;"></div>
</div>

<!-- LISTE DES UTILISATEURS -->
<div class="admin-card">
  <h3>👥 Utilisateurs enregistrés (<span id="user-count">0</span>)</h3>
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
    msgDiv.style.color = '#007bff';
    msgDiv.textContent = '⏳ Envoi de l\'invitation...';

    const email = document.getElementById('new-email').value;
    const expiresAt = document.getElementById('new-expires').value + 'T23:59:59Z';
    const randomPassword = Math.random().toString(36).slice(-10) + 'A1!' + Math.random().toString(36).slice(-10);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: randomPassword
    });

    if (error) {
      msgDiv.style.color = '#dc3545';
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

      msgDiv.style.color = '#28a745';
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
    tbody.innerHTML = `<tr><td colspan="5" style="color:red">Erreur : ${error.message}</td></tr>`;
    return;
  }

  document.getElementById('user-count').textContent = profiles.length;
  tbody.innerHTML = '';

  const now = new Date();

  profiles.forEach(p => {
    const expDate = new Date(p.expires_at);
    const isExpired = expDate < now;
    const isAdmin = p.role === 'admin';
    
    let statusBadge = '<span class="badge-active">Actif</span>';
    if (!p.is_active) {
      statusBadge = '<span class="badge-inactive">Inactif</span>';
    } else if (isExpired && !isAdmin) {
      statusBadge = '<span class="badge-expired">Expiré</span>';
    }

    let expirationCell = `<input type="date" value="${p.expires_at ? p.expires_at.split('T')[0] : ''}" onchange="updateExpiration('${p.id}', this.value)">`;
    
    if (isAdmin) {
      expirationCell = '<span style="font-weight: bold; color: #007bff;">Illimité ♾️ (Admin)</span>';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${p.email || 'N/A'}</strong> ${isAdmin ? '👑' : ''}</td>
      <td>${statusBadge}</td>
      <td>${expirationCell}</td>
      <td>${formatSeconds(p.total_time_seconds)}</td>
      <td>
        ${isAdmin ? '<em>Aucune action</em>' : `
          <button class="action-btn btn-toggle" onclick="toggleActive('${p.id}', ${p.is_active})">
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
