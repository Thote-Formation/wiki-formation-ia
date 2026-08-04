# Panneau d'Administration - Gestion des Utilisateurs

<div id="admin-container" style="display:none; width: 100%;">

  <!-- BARRE D'ACTIONS : RECHERCHE + BOUTONS -->
  <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
    <input type="text" id="search-input" placeholder="🔍 Rechercher par nom, prénom ou email..." style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ccc; flex: 1; min-width: 250px;">
    
    <div style="display: flex; gap: 10px;">
      <button onclick="exportCSV()" style="padding: 8px 16px; background-color: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
        📥 Exporter en CSV
      </button>
      <button onclick="openCreateModal()" style="padding: 8px 16px; background-color: #2980b9; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
        ➕ Ajouter un utilisateur
      </button>
    </div>
  </div>

  <!-- TABLEAU AJUSTÉ -->
  <div style="max-height: 70vh; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); width: 100%;">
    <table style="width: 100%; border-collapse: collapse; font-size: 0.88em; table-layout: auto;">
      <thead>
        <tr style="background-color: #1e293b; color: white; text-align: left; position: sticky; top: 0; z-index: 10;">
          <th onclick="sortUsers('last_name')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Nom <span id="sort-last_name">↕</span>
          </th>
          <th onclick="sortUsers('first_name')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Prénom <span id="sort-first_name">↕</span>
          </th>
          <th onclick="sortUsers('email')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Email <span id="sort-email">↕</span>
          </th>
          <th onclick="sortUsers('role')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Rôle <span id="sort-role">↕</span>
          </th>
          <th onclick="sortUsers('is_active')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Statut <span id="sort-is_active">↕</span>
          </th>
          <th onclick="sortUsers('expires_at')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Expiration <span id="sort-expires_at">↕</span>
          </th>
          <th onclick="sortUsers('total_time_seconds')" style="padding: 10px 8px; cursor: pointer; user-select: none;">
            Temps passé <span id="sort-total_time_seconds">↕</span>
          </th>
          <th style="padding: 10px 8px; text-align: center; min-width: 80px;">Actions</th>
        </tr>
      </thead>
      <tbody id="users-table-body">
        <tr>
          <td colspan="8" style="text-align: center; padding: 20px;">Chargement des données...</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>

<!-- MODAL CRÉATION / ÉDITION -->
<div id="user-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); justify-content: center; align-items: center; z-index: 1000;">
  <div style="background: white; padding: 25px; border-radius: 8px; width: 400px; max-width: 90%; color: #333;">
    <h3 id="modal-title" style="margin-top: 0;">Ajouter un utilisateur</h3>
    <form id="user-form" onsubmit="handleFormSubmit(event)">
      <input type="hidden" id="form-user-id">
      
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: bold; margin-bottom: 4px;">Nom</label>
        <input type="text" id="form-last-name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: bold; margin-bottom: 4px;">Prénom</label>
        <input type="text" id="form-first-name" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: bold; margin-bottom: 4px;">Email *</label>
        <input type="email" id="form-email" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: bold; margin-bottom: 4px;">Rôle</label>
        <select id="form-role" onchange="handleRoleChange()" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-weight: bold; margin-bottom: 4px;">Date d'expiration</label>
        <input type="date" id="form-expires-at" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <small id="role-hint" style="color: #666; font-size: 0.8em;"></small>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="form-is-active" checked> Compte actif
        </label>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button type="button" onclick="closeModal()" style="padding: 8px 16px; background: #7f8c8d; color: white; border: none; border-radius: 4px; cursor: pointer;">Annuler</button>
        <button type="submit" style="padding: 8px 16px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer;">Enregistrer</button>
      </div>
    </form>
  </div>
</div>

<script>
let allUsers = [];
let filteredUsers = [];
let currentSortColumn = 'last_name';
let currentSortAsc = true;

document.addEventListener('DOMContentLoaded', async () => {
  const checkSupabase = setInterval(async () => {
    if (window.supabaseClient) {
      clearInterval(checkSupabase);
      initAdminPage();
    }
  }, 100);
});

async function initAdminPage() {
  const supabase = window.supabaseClient;
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return;

  document.getElementById('admin-container').style.display = 'block';
  document.getElementById('search-input').addEventListener('input', filterUsers);

  await loadUsers();
}

async function loadUsers() {
  const supabase = window.supabaseClient;
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error("Erreur de chargement des utilisateurs :", error);
    alert("Erreur lors de la récupération des données.");
    return;
  }

  allUsers = data || [];
  filterUsers();
}

function filterUsers() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  
  filteredUsers = allUsers.filter(user => {
    const lastName = (user.last_name || '').toLowerCase();
    const firstName = (user.first_name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    return lastName.includes(query) || firstName.includes(query) || email.includes(query);
  });

  applySortAndRender();
}

function sortUsers(column) {
  if (currentSortColumn === column) {
    currentSortAsc = !currentSortAsc;
  } else {
    currentSortColumn = column;
    currentSortAsc = true;
  }
  applySortAndRender();
}

function applySortAndRender() {
  filteredUsers.sort((a, b) => {
    let valA = a[currentSortColumn] ?? '';
    let valB = b[currentSortColumn] ?? '';

    if (currentSortColumn === 'expires_at') {
      if (a.role === 'admin' || valA.startsWith('2099')) valA = '9999-12-31';
      if (b.role === 'admin' || valB.startsWith('2099')) valB = '9999-12-31';
    }

    if (currentSortColumn === 'total_time_seconds') {
      valA = Number(valA) || 0;
      valB = Number(valB) || 0;
    } else if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return currentSortAsc ? -1 : 1;
    if (valA > valB) return currentSortAsc ? 1 : -1;
    return 0;
  });

  renderTable(filteredUsers);
}

function renderTable(users) {
  const columns = ['last_name', 'first_name', 'email', 'role', 'is_active', 'expires_at', 'total_time_seconds'];
  columns.forEach(col => {
    const el = document.getElementById(`sort-${col}`);
    if (el) {
      if (col === currentSortColumn) {
        el.textContent = currentSortAsc ? '▲' : '▼';
      } else {
        el.textContent = '↕';
      }
    }
  });

  const tbody = document.getElementById('users-table-body');
  tbody.innerHTML = '';

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">Aucun utilisateur trouvé.</td></tr>';
    return;
  }

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #eee';

    const formattedTime = formatTime(user.total_time_seconds || 0);

    const isAdmin = user.role === 'admin';
    const isFarFuture = user.expires_at && user.expires_at.startsWith('2099');
    
    const formattedDate = (isAdmin || isFarFuture) 
      ? '<span style="color: #27ae60; font-weight: bold;">∞ Illimitée</span>' 
      : (user.expires_at ? new Date(user.expires_at).toLocaleDateString('fr-FR') : 'Permanente');

    const statusBadge = user.is_active 
      ? '<span style="color: #27ae60; font-weight: bold;">Actif</span>' 
      : '<span style="color: #e74c3c; font-weight: bold;">Inactif</span>';

    tr.innerHTML = `
      <td style="padding: 6px 8px; word-break: break-word;">${escapeHtml(user.last_name || '-')}</td>
      <td style="padding: 6px 8px; word-break: break-word;">${escapeHtml(user.first_name || '-')}</td>
      <td style="padding: 6px 8px; word-break: break-all;">${escapeHtml(user.email || '-')}</td>
      <td style="padding: 6px 8px;"><span style="text-transform: capitalize; font-weight: ${isAdmin ? 'bold' : 'normal'}; color: ${isAdmin ? '#2980b9' : 'inherit'}">${escapeHtml(user.role || 'user')}</span></td>
      <td style="padding: 6px 8px;">${statusBadge}</td>
      <td style="padding: 6px 8px;">${formattedDate}</td>
      <td style="padding: 6px 8px; font-weight: 600; white-space: nowrap;">⏱️ ${formattedTime}</td>
      <td style="padding: 6px 8px; text-align: center; white-space: nowrap;">
        <button onclick="openEditModal('${user.id}')" style="padding: 4px 8px; margin-right: 4px; background: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer;" title="Modifier">✏️</button>
        <button onclick="deleteUser('${user.id}')" style="padding: 4px 8px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;" title="Supprimer">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${String(mins).padStart(2, '0')}m`;
  return `${mins} min`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function getDefaultOneYearDate() {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return nextYear.toISOString().split('T')[0];
}

function handleRoleChange() {
  const roleSelect = document.getElementById('form-role');
  const expiresInput = document.getElementById('form-expires-at');
  const hint = document.getElementById('role-hint');

  if (roleSelect.value === 'admin') {
    expiresInput.value = "2099-12-31";
    expiresInput.disabled = true;
    hint.textContent = "Accès illimité (défini au 31/12/2099).";
  } else {
    expiresInput.disabled = false;
    if (!expiresInput.value || expiresInput.value === "2099-12-31") {
      expiresInput.value = getDefaultOneYearDate();
    }
    hint.textContent = "Par défaut : 1 an à partir d'aujourd'hui.";
  }
}

// MODAL CONTROLS
function openCreateModal() {
  document.getElementById('modal-title').textContent = "Ajouter un utilisateur";
  document.getElementById('form-user-id').value = "";
  document.getElementById('form-last-name').value = "";
  document.getElementById('form-first-name').value = "";
  document.getElementById('form-email').value = "";
  document.getElementById('form-email').disabled = false;
  document.getElementById('form-role').value = "user";
  document.getElementById('form-expires-at').value = getDefaultOneYearDate();
  document.getElementById('form-is-active').checked = true;

  handleRoleChange();
  document.getElementById('user-modal').style.display = 'flex';
}

function openEditModal(userId) {
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('modal-title').textContent = "Modifier l'utilisateur";
  document.getElementById('form-user-id').value = user.id;
  document.getElementById('form-last-name').value = user.last_name || "";
  document.getElementById('form-first-name').value = user.first_name || "";
  document.getElementById('form-email').value = user.email || "";
  document.getElementById('form-email').disabled = true;
  document.getElementById('form-role').value = user.role || "user";
  
  if (user.expires_at) {
    document.getElementById('form-expires-at').value = new Date(user.expires_at).toISOString().split('T')[0];
  } else {
    document.getElementById('form-expires-at').value = user.role === 'admin' ? "2099-12-31" : "";
  }

  document.getElementById('form-is-active').checked = user.is_active;

  handleRoleChange();
  document.getElementById('user-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('user-modal').style.display = 'none';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const mainSupabase = window.supabaseClient;

  const userId = document.getElementById('form-user-id').value;
  const lastName = document.getElementById('form-last-name').value;
  const firstName = document.getElementById('form-first-name').value;
  const email = document.getElementById('form-email').value;
  const role = document.getElementById('form-role').value;
  const expiresAtVal = document.getElementById('form-expires-at').value;
  const isActive = document.getElementById('form-is-active').checked;

  // Si admin ou pas de valeur, on met par défaut le 31/12/2099
  const dateToUse = (role === 'admin' || !expiresAtVal) ? "2099-12-31" : expiresAtVal;
  const expiresAt = new Date(dateToUse).toISOString();

  if (userId) {
    // 1. MODIFICATION
    const { error } = await mainSupabase
      .from('profiles')
      .update({
        last_name: lastName,
        first_name: firstName,
        role: role,
        expires_at: expiresAt,
        is_active: isActive
      })
      .eq('id', userId);

    if (error) {
      alert("Erreur lors de la mise à jour : " + error.message);
    } else {
      closeModal();
      await loadUsers();
    }
  } else {
    // 2. CRÉATION
    // Pour ne pas déconnecter l'admin courant, on crée un client Supabase temporaire sans persistance de session !
    const tempSupabase = supabase.createClient(
      mainSupabase.supabaseUrl,
      mainSupabase.supabaseKey,
      { auth: { persistSession: false } }
    );

    const tempPassword = "Temp#" + Math.random().toString(36).substring(2, 10) + "!2026";

    const { data: signUpData, error: signUpError } = await tempSupabase.auth.signUp({
      email: email,
      password: tempPassword,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (signUpError) {
      alert("Erreur lors de la création du compte : " + signUpError.message);
      return;
    }

    if (signUpData.user) {
      // On met à jour le profil avec l'instance principale d'admin (pour garder les droits de mise à jour)
      await mainSupabase
        .from('profiles')
        .update({
          last_name: lastName,
          first_name: firstName,
          role: role,
          expires_at: expiresAt,
          is_active: isActive
        })
        .eq('id', signUpData.user.id);

      // Envoi du mail de réinitialisation via l'instance principale
      const redirectToUrl = window.location.origin + (window.location.hostname.includes('github.io') ? '/wiki-formation-ia' : '') + '/reinitialisation/';
      
      const { error: resetError } = await mainSupabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectToUrl,
      });

      if (resetError) {
        alert("Utilisateur créé, mais erreur lors de l'envoi du mail : " + resetError.message);
      } else {
        alert(`Utilisateur créé avec succès ! Un mail d'activation a été envoyé à : ${email}`);
      }

      closeModal();
      await loadUsers();
    }
  }
}

async function deleteUser(userId) {
  if (!confirm("Voulez-vous vraiment désactiver/supprimer cet utilisateur ?")) return;

  const supabase = window.supabaseClient;
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    alert("Erreur lors de la suppression : " + error.message);
  } else {
    await loadUsers();
  }
}

// EXPORT CSV
function exportCSV() {
  if (!filteredUsers || filteredUsers.length === 0) {
    alert("Aucune donnée à exporter.");
    return;
  }

  const headers = ["Nom", "Prénom", "Email", "Rôle", "Statut", "Date Expiration", "Temps Total (Secondes)", "Temps Formaté"];
  
  const rows = filteredUsers.map(user => [
    `"${(user.last_name || '').replace(/"/g, '""')}"`,
    `"${(user.first_name || '').replace(/"/g, '""')}"`,
    `"${(user.email || '').replace(/"/g, '""')}"`,
    `"${user.role || 'user'}"`,
    user.is_active ? "Actif" : "Inactif",
    (user.role === 'admin' || (user.expires_at && user.expires_at.startsWith('2099'))) ? "Illimitée" : (user.expires_at ? new Date(user.expires_at).toLocaleDateString('fr-FR') : "Permanente"),
    user.total_time_seconds || 0,
    `"${formatTime(user.total_time_seconds || 0)}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
    + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `export_utilisateurs_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
