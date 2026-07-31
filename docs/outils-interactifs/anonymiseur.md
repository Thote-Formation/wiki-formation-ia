# 🎭 Masqueur & Anonymiseur RGPD

Collez votre texte brut pour nettoyer et masquer automatiquement les données sensibles (emails, téléphones, montants, adresses, SIRET, noms) avant tout envoi à une IA.

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="masker-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px; color: #333;">1. Collez votre texte brut ou confidentiel :</label>
  <textarea id="masker-input" rows="5" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: #fff; color: #000;" placeholder="Ex: Contacter M. Jean DUPONT (jean.dupont@entreprise.com / 06 12 34 56 78) pour valider le devis n°450 de 12 500 € HT..."></textarea>
  
  <button type="button" id="masker-btn" onclick="executerAnonymisation()" style="padding: 10px 18px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">🎭 Masquer les données sensibles</button>

  <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px; color: #333;">2. Résultat anonymisé prêt pour l'IA :</label>
  <textarea id="masker-output" rows="5" readonly style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 13px; background: #ffffff; color: #222;" placeholder="Le texte anonymisé apparaîtra ici..."></textarea>
</div>

<script>
function executerAnonymisation() {
  const textarea = document.getElementById('masker-input');
  const output = document.getElementById('masker-output');
  if (!textarea || !output) return;

  let txt = textarea.value;
  if (!txt.trim()) return;

  // 1. SIRET / SIREN / Numéros à 9-14 chiffres séparés par des espaces/points (ex: 123 456 789 00012)
  txt = txt.replace(/(?:SIRET|SIREN|TVA|RCS)?\s*:?\s*\b(?:\d[\s\u00a0\u202f.-]*){9,14}\b/gi, '[SIRET_ANONYMISÉ]');

  // 2. Adresses postales (ex: 12 avenue des Start-ups, 69003 Lyon)
  txt = txt.replace(/\b\d+\s*(?:er|ème|e)?\s+(?:rue|avenue|boulevard|bd|allée|place|chemin|impasse|route|square|quai|cours)\s+[^,\.\n\r]+,\s*\d{5}\s+[A-ZÀ-ÖØ-ßa-zà-öø-ÿ\s-]+/gi, '[ADRESSE_ANONYMISÉE]');

  // 3. Montants financiers (ex: 25 000 euros, 25000€, 12,50 € HT)
  txt = txt.replace(/\b\d+[\d\s\u00a0\u202f.,]*(?:\s*€|\s*euros?|\s*EUR)\b(?:\s*(?:HT|TTC))?/gi, '[MONTANT_ANONYMISÉ]');

  // 4. Sociétés / Entreprises (ex: Innovatech SARL, société Acme)
  txt = txt.replace(/(?:la\s+société|l'entreprise|le\s+groupe)\s+([A-ZÀ-ÖØ-ß0-9_\-]+(?:\s+[A-ZÀ-ÖØ-ß0-9_\-]+)*\s*(?:SARL|SAS|SASU|EURL|SA|SNC|INC|LTD|GIE)?)/gi, 'la société [ENTREPRISE_ANONYMISÉE]');
  txt = txt.replace(/\b[A-ZÀ-ÖØ-ß0-9_\-]+\s+(?:SARL|SAS|SASU|EURL|SA|SNC|INC|LTD|GIE)\b/gi, '[ENTREPRISE_ANONYMISÉE]');

  // 5. Civilité + Prénom + Nom (ex: Madame Clara Duval, M. Jean DUPONT)
  txt = txt.replace(/\b(Monsieur|M\.|Madame|Mme|Mademoiselle|Mlle|Dr|Pr)\s+([A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+(?:\s+[A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+)+)/gi, '$1 [PERSONNE_ANONYMISÉE]');

  // 6. Emails
  txt = txt.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_ANONYMISÉ]');

  // 7. Téléphones
  txt = txt.replace(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, '[TÉLÉPHONE_ANONYMISÉ]');

  output.value = txt;
}

// Sécurité supplémentaire au cas où le bouton est cliqué via événement JS classique
document.getElementById('masker-btn')?.addEventListener('click', executerAnonymisation);
</script>
