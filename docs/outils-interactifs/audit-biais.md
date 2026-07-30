# 🔍 Audit Rapide de Biais & Inclusivité

Générez une grille d'évaluation ou un prompt d'analyse pour détecter les stéréotypes, termes exclusifs ou biais de genre/culture dans vos écrits.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <div style="margin-bottom: 16px;">
    <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">1. Type de contenu à analyser :</label>
    <select id="bias-type" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
      <option value="job-offer">Offre d'emploi ou fiche de poste (Genre, âge, compétences implicites)</option>
      <option value="internal-note">Communication interne & Procédure (Lisibilité, inclusivité, ton)</option>
      <option value="marketing">Support commercial ou marketing (Stéréotypes, représentations)</option>
    </select>
  </div>

  <button type="button" id="bias-generate-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">⚙️ Générer la consigne d'audit de biais</button>

  <div style="position: relative;">
    <button type="button" class="prompt-copy-btn" data-target="bias-generated-output" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 11px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier</button>
    <pre id="bias-generated-output" style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 12px; min-height: 80px; white-space: pre-wrap;">Sélectionnez une option et cliquez sur "Générer la consigne d'audit"...</pre>
  </div>
</div>
