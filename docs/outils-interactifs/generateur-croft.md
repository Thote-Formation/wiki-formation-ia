# ⚙️ Générateur de Prompt CROFT

Remplissez les 5 piliers du framework CROFT pour générer instantanément un prompt structuré et optimisé.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 16px;">
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">C — Contexte :</label>
      <input type="text" id="croft-c" placeholder="Ex: PME de courtage, réorganisation de l'accueil téléphonique" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">R — Rôle :</label>
      <input type="text" id="croft-r" placeholder="Ex: Expert en relation client et organisation d'entreprise" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">O — Objectif :</label>
      <input type="text" id="croft-o" placeholder="Ex: Rédiger une procédure claire pour les appels entrants" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">F — Format :</label>
      <input type="text" id="croft-f" placeholder="Ex: Liste à puces numérotée avec titres en gras, max 1 page" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">T — Ton :</label>
      <input type="text" id="croft-t" placeholder="Ex: Professionnel, direct, bienveillant" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
  </div>

  <button type="button" id="croft-generate-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 12px;">⚙️ Générer le prompt</button>

  <div style="position: relative;">
    <button type="button" class="prompt-copy-btn" data-target="croft-generated-output" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 11px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier</button>
    <pre id="croft-generated-output" style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 12px; min-height: 80px; white-space: pre-wrap;">Remplissez les champs ci-dessus et cliquez sur "Générer le prompt"...</pre>
  </div>
</div>
