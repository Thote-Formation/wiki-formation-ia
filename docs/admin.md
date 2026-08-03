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
    border: 1.5px solid #94a3b8 !important;
    border-radius: 8px !important;
    background-color: #f8fafc !important;
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
  
  .prompt-generator-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
</style>

<!-- FORMULAIRE D'INVITATION UTILISATEUR -->
<div class="wiki-card prompt-generator">

<form id="add-user-form" onsubmit="handleAddUser(event)">
  <div class="prompt-generator-grid-4">
    <div>
      <label for="new-firstname">Prénom</label>
      <input type="text" id="new-firstname" class="admin-input" placeholder="ex: Jean" required>
    </div>
    <div>
      <label for="new-lastname">Nom</label>
      <input type="text" id="new-lastname" class="admin-input" placeholder="ex: Dupont" required>
    </div>
    <div>
      <label for="new-email">Adresse E-mail</label>
      <input type="email" id="new-email" class="admin-input" placeholder="ex: utilisateur@domaine.fr" required>
    </div>
    <div>
      <label for="new-expires">Date d'expiration</label>
      <input type="date" id="new-expires" class="admin-input" required>
    </div>
  </div>
  <div class="wiki-actions" style="margin-top: 15px;">
    <button type="submit" id="submit-btn" class="wiki-button primary" style="cursor: pointer;">➕ Inviter l'utilisateur par E-mail</button>
  </div>
</form>

<div id="form-message" style="margin-top: 12px; font-weight: 700;"></div>

</div>

<!-- LISTE DES UTILISATEURS ET EXPORT -->
<div class="wiki-card">

<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
  <span style="font-weight: bold; font-size: 1.1rem;">👥 Utilisateurs enregistrés (<span id="user-count">0</span>)</span>
  <button type="button" onclick="exportUsersToCSV()" class="wiki-button" style="cursor: pointer; padding: 6px 14px; font-size: 0.9rem; background-color: #107c41; color: white; border: none; border-radius: 6px;">
    📥 Exporter en CSV (Excel)
  </button>
</div>

<div style="overflow-x: auto;">
  <table class="admin-table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>E-mail</th>
        <th>Statut</th>
        <th>Expiration</th>
        <th>Temps Passé</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="users-table-body">
      <tr>
        <td colspan="7">Chargement de la liste...</td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<!-- Charger Supabase si non présent -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<script>
const SUPABASE_URL = "https://gwitigcaweavuvspboly.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aXRpZ2Nhd2VhdnV2c3Bib2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMzgzMTIsImV4cCI6MjEwMDcxNDMxMn0.U4CpcEiRTUpH7Eop5lirMLiX7cgjkfCC0oQoL3c0Srk";

let currentProfilesList = [];

function getAdminSupabase() {
  if (window.supabaseClient) return window.supabaseClient;
  if (window.supabase) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return window.supabaseClient;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const expInput = document.getElementById('new-expires');
  if (expInput) expInput.value = nextYear.toISOString().split('T')[0];

  const checkInterval = setInterval(() => {
    const sb = getAdminSupabase();
    if (sb) {
      clearInterval(checkInterval);
      fetchUsersList(sb);
    }
  }, 200);
});

function formatSeconds(seconds) {
  if (!seconds) return '0 min';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
}

async function handleAddUser(e) {
  e.preventDefault();
  const msgDiv = document.getElementById('form-message');
  const btn = document.getElementById('submit-btn');
  const supabase = getAdminSupabase();

  if (!supabase) {
    msgDiv.style.color = '#dc2626';
    msgDiv.textContent = '❌ Erreur : Impossible de contacter Supabase. Veuillez rafraîchir la page.';
    return;
  }

  btn.disabled = true;
  msgDiv.style.color = '#0d47a1';
  msgDiv.textContent = '⏳ Envoi de l\'invitation...';

  const firstName = document.getElementById('new-firstname').value.trim();
  const lastName = document.getElementById('new-lastname').value.trim();
  const email = document.getElementById('new-email').value.trim();
  const expiresAt = document.getElementById('new-expires').value + 'T23:59:59Z';
  const randomPassword = Math.random().toString(36).slice(-10) + 'A1!' + Math.random().toString(36).slice(-10);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: randomPassword
    });

    if (error) {
      msgDiv.style.color = '#dc2626';
      msgDiv.textContent = '❌ Erreur : ' + error.message;
      btn.disabled = false;
      return;
    }

    if (data.user) {
      await supabase.from('profiles').update({
        first_name: firstName,
        last_name: lastName,
        expires_at: expiresAt,
        is_active: true
      }).eq('id', data.user.id);

      const basePath = window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '';
      const redirectUrl = window.location.origin + basePath + '/reinitialisation/';
      
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      msgDiv.style.color = '#15803d';
      msgDiv.textContent = '✅ Compte créé ! Un e-mail a été envoyé à l\'utilisateur.';
      document.getElementById('add-user-form').reset();
      
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      document.getElementById('new-expires').value = nextYear.toISOString().split('T')[0];

      await fetchUsersList(supabase);
    }
  } catch (err) {
    msgDiv.style.color = '#dc2626';
    msgDiv.textContent = '❌ Erreur inattendue : ' + err.message;
  } finally {
    btn.disabled = false;
  }
}

async function fetchUsersList(supabase) {
  const tbody = document.getElementById('users-table-body');
  if (!tbody) return;
  
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:#dc2626; font-weight:700;">Erreur : ${error.message}</td></tr>`;
    return;
  }

  currentProfilesList = profiles || [];

  const userCount = document.getElementById('user-count');
  if (userCount) userCount.textContent = profiles.length;
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
      <td><strong>${p.last_name || '-'}</strong></td>
      <td><strong>${p.first_name || '-'}</strong></td>
      <td>${p.email || 'N/A'} ${isAdmin ? '👑' : ''}</td>
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
  const supabase = getAdminSupabase();
  if (!supabase) return;
  await supabase.from('profiles').update({ is_active: !currentStatus }).eq('id', userId);
  fetchUsersList(supabase);
}

async function updateExpiration(userId, newDate) {
  if (!newDate) return;
  const supabase = getAdminSupabase();
  if (!supabase) return;
  await supabase.from('profiles').update({ expires_at: newDate + 'T23:59:59Z' }).eq('id', userId);
  alert('Date d\'expiration mise à jour !');
  fetchUsersList(supabase);
}

function exportUsersToCSV() {
  if (!currentProfilesList || currentProfilesList.length === 0) {
    alert("Aucun utilisateur à exporter.");
    return;
  }

  const headers = ["Nom", "Prénom", "E-mail", "Temps de connexion"];
  const rows = [headers];

  currentProfilesList.forEach(p => {
    let email = p.email || "";
    let firstName = p.first_name || p.prenom || "";
    let lastName = p.last_name || p.nom || "";

    // Sécurité au cas où la BDD n'a pas encore de prénom/nom renseignés pour les anciens comptes
    if (!firstName && !lastName && email.includes('@')) {
      const parts = email.split('@')[0].split('.');
      if (parts.length >= 2) {
        firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
      } else {
        firstName = parts[0];
      }
    }

    const formattedTime = formatSeconds(p.total_time_seconds);

    const cleanLastName = `"${lastName.replace(/"/g, '""')}"`;
    const cleanFirstName = `"${firstName.replace(/"/g, '""')}"`;
    const cleanEmail = `"${email.replace(/"/g, '""')}"`;
    const cleanTime = `"${formattedTime.replace(/"/g, '""')}"`;

    rows.push([cleanLastName, cleanFirstName, cleanEmail, cleanTime]);
  });

  const csvContent = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `compteurs_connexion_${dateStr}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
