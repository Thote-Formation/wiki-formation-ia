# 🎭 Masqueur & Anonymiseur RGPD

Collez votre texte brut pour nettoyer et masquer automatiquement les données sensibles (emails, téléphones, montants) avant tout envoi à une IA.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="masker-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">1. Collez votre texte brut ou confidentiel :</label>
  <textarea id="masker-input" rows="4" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Ex: Contacter M. Jean DUPONT (jean.dupont@entreprise.com / 06 12 34 56 78) pour valider le devis n°450 de 12 500 € HT..."></textarea>
  
  <button type="button" id="masker-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">🎭 Masquer les données sensibles</button>

  <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">2. Résultat anonymisé prêt pour l'IA :</label>
  <div id="masker-output" style="padding: 12px; background: var(--md-default-bg-color, #fff); border: 1px solid #d5d9de; border-radius: 6px; font-style: italic; font-size: 13px; min-height: 45px; color: var(--md-typeset-color, #333);">Le texte anonymisé apparaîtra ici...</div>
</div>
