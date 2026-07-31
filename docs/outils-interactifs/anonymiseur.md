# 🎭 Masqueur & Anonymiseur RGPD

Collez votre texte brut pour nettoyer et masquer automatiquement les données sensibles (emails, téléphones, montants, adresses, SIRET, noms) avant tout envoi à une IA.

<div class="prompt-generator">
  <div style="margin-bottom: 16px;">
    <label for="masker-input">1. Collez votre texte brut ou confidentiel :</label>
    <textarea id="masker-input" rows="5" placeholder="Ex: Contacter M. Jean DUPONT (jean.dupont@entreprise.com / 06 12 34 56 78) pour valider le devis n°450 de 12 500 € HT..."></textarea>
  </div>
  
  <div class="wiki-actions">
    <button type="button" id="masker-btn" class="wiki-button primary">🎭 Masquer les données sensibles</button>
  </div>

  <div style="margin-top: 16px;">
    <label for="masker-output">2. Résultat anonymisé prêt pour l'IA :</label>
    <textarea id="masker-output" rows="5" readonly placeholder="Le texte anonymisé apparaîtra ici..."></textarea>
  </div>
</div>

<script>
(function() {
  function initMasker() {
    const btn = document.getElementById('masker-btn');
    const textarea = document.getElementById('masker-input');
    const output = document.getElementById('masker-output');

    if (!btn || !textarea || !output) return;

    function executerAnonymisation() {
      let txt = textarea.value;
      if (!txt.trim()) {
        output.value = "";
        return;
      }

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

    btn.addEventListener('click', executerAnonymisation);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMasker);
  } else {
    initMasker();
  }
})();
</script>
