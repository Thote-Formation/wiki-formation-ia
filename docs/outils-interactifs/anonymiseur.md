# 🎭 Masqueur & Anonymiseur RGPD

Collez votre texte brut pour nettoyer et masquer automatiquement les données sensibles (emails, téléphones, montants, adresses, SIRET, noms) avant tout envoi à une IA.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="masker-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">1. Collez votre texte brut ou confidentiel :</label>
  <textarea id="masker-input" rows="5" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Ex: Contacter M. Jean DUPONT (jean.dupont@entreprise.com / 06 12 34 56 78) pour valider le devis n°450 de 12 500 € HT..."></textarea>
  
  <button type="button" id="masker-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">🎭 Masquer les données sensibles</button>

  <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">2. Résultat anonymisé prêt pour l'IA :</label>
  <div id="masker-output" style="padding: 12px; background: var(--md-default-bg-color, #fff); border: 1px solid #d5d9de; border-radius: 6px; font-style: italic; font-size: 13px; min-height: 60px; color: var(--md-typeset-color, #333); white-space: pre-wrap;">Le texte anonymisé apparaîtra ici...</div>
</div>

<script>
document.getElementById('masker-btn').addEventListener('click', function() {
  const input = document.getElementById('masker-input').value;
  if (!input.trim()) return;

  let masked = input;

  // 1. SIRET / SIREN / Numéros à 9-14 chiffres avec espaces facultatifs
  // Ex: SIRET : 123 456 789 00012
  masked = masked.replace(/(?:SIRET|SIREN|TVA|RCS)?\s*:?\s*\b(\d[\s.-]*){9,14}\b/gi, '[SIRET_ANONYMISÉ]');

  // 2. Emails
  masked = masked.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_ANONYMISÉ]');

  // 3. Téléphones
  masked = masked.replace(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, '[TÉLÉPHONE_ANONYMISÉ]');

  // 4. Montants en euros (ex: 25 000 euros, 25000€, 12,50 € HT)
  masked = masked.replace(/\b\d+[\d\s\u00a0\u202f.,]*(?:\s*€|\s*euros?|\s*EUR)\b(?:\s*(?:HT|TTC))?/gi, '[MONTANT_ANONYMISÉ]');

  // 5. Noms de sociétés (ex: la société Innovatech SARL, l'entreprise Acme Corp)
  masked = masked.replace(/(?:société|entreprise|groupe|établissement)\s+([A-ZÀ-ÖØ-ß0-9_\-]+(?:\s+[A-ZÀ-ÖØ-ß0-9_\-]+)*\s+(?:SARL|SAS|SASU|EURL|SA|SNC|INC|LTD|GIE)?)/gi, 'société [ENTREPRISE_ANONYMISÉE]');
  
  // Remplacement isolé pour les entités avec leur statut juridique seul si non précédé de "société"
  masked = masked.replace(/\b([A-ZÀ-ÖØ-ß0-9_\-]+(?:\s+[A-ZÀ-ÖØ-ß0-9_\-]+)*)\s+(SARL|SAS|SASU|EURL|SA|SNC|INC|LTD)\b/g, '[ENTREPRISE_ANONYMISÉE]');

  // 6. Personnes avec Civilité (ex: Madame Clara Duval, M. Jean DUPONT)
  masked = masked.replace(/\b(Monsieur|M\.|Madame|Mme|Mademoiselle|Mlle|Dr|Pr)\s+([A-ZÀ-ÖØ-ß][a-zà-öø-ÿ]+)\s+([A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+)/g, '$1 [PERSONNE_ANONYMISÉE]');

  // 7. Adresses postales françaises (ex: 12 avenue des Start-ups, 69003 Lyon)
  masked = masked.replace(/\b\d+\s*(?:er|ème|e)?\s+(?:rue|avenue|boulevard|allée|place|chemin|impasse|route|squ|square|quai|cours)\s+[^,\.\n]+,\s*\d{5}\s+[A-ZÀ-ÖØ-ßa-zà-öø-ÿ\s-]+/gi, '[ADRESSE_ANONYMISÉE]');

  // 8. Codes postaux + Villes isolées (ex: 69003 Lyon)
  masked = masked.replace(/\b(75|77|78|91|92|93|94|95|\d{2})\d{3}\s+([A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+)/g, '[VILLE_ANONYMISÉE]');

  const outputDiv = document.getElementById('masker-output');
  outputDiv.textContent = masked;
  outputDiv.style.fontStyle = 'normal';
});
</script>
