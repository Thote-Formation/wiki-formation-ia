# 📑 Formateur de Données Brutes (JSON / CSV / MD)

Générez la consigne stricte imposant à l'IA de répondre uniquement dans un format de données structuré, sans texte superflu ni bavardage.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <div style="margin-bottom: 16px;">
    <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">1. Format de sortie requis :</label>
    <select id="format-target" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
      <option value="json">JSON strict (Objet ou Tableau d'objets)</option>
      <option value="csv">CSV (Délimité par des virgules ou points-virgules)</option>
      <option value="markdown-table">Tableau Markdown propre</option>
    </select>
  </div>

  <div style="margin-bottom: 16px;">
    <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 4px;">2. Structure ou champs attendus :</label>
    <input type="text" id="format-fields" placeholder="Ex: nom, email, rôle, statut" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
  </div>

  <button type="button" id="format-generate-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">⚙️ Générer l'instruction de formatage</button>

  <div style="position: relative;">
    <button type="button" class="prompt-copy-btn" data-target="format-generated-output" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 11px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier</button>
    <pre id="format-generated-output" style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 12px; min-height: 80px; white-space: pre-wrap;">Renseignez les champs et cliquez sur "Générer l'instruction de formatage"...</pre>
  </div>
</div>
