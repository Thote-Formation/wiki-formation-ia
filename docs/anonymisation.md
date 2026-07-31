# Template — Anonymisation avant usage IA

La protection des données personnelles et confidentielles est un prérequis absolu avant tout usage de l’IA générative. Ce template fournit une méthode pas à pas pour nettoyer les textes, masquer les variables sensibles et garantir la conformité RGPD avant d’envoyer la moindre requête à un modèle d’IA.

<div class="summary-box">
  <h3>🎯 Objectifs du template</h3>
  <ul>
    <li><strong>Protéger les données personnelles :</strong> supprimer ou remplacer tout élément identifiable (RGPD).</li>
    <li><strong>Préserver le secret des affaires :</strong> masquer les informations financières, stratégiques ou contractuelles.</li>
    <li><strong>Conserver le contexte :</strong> anonymiser sans perdre le sens du texte pour permettre à l’IA d’apporter une réponse pertinente.</li>
  </ul>
</div>

---

## 📌 Règle de remplacement des données

Avant de soumettre un document ou un message à l’IA, appliquez la **technique du masque** en utilisant ce tableau de correspondance :

| Type de donnée réelle | Exemple réel | Remplacement conseillé |
| :--- | :--- | :--- |
| **Nom d’une personne** | *Marie Dupont, Jean Martin* | `[Personne A]`, `[Client B]`, `[Salarié C]` |
| **Adresse email** | *m.dupont@entreprise.com* | `email@example.com` ou `[Email]` |
| **Numéro de téléphone** | *06 12 34 56 78* | `00 00 00 00 00` ou `[Téléphone]` |
| **Adresse postale** | *12 rue de la Paix, Paris* | `[Ville]` ou `[Région]` uniquement |
| **Nom d’entreprise** | *Acme Corporation* | `[Entreprise A]`, `[Société X]` |
| **Montant financier** | *42 350 € HT* | `[Montant du devis]` ou fourchette neutre |
| **Référence contractuelle** | *Contrat n°2026-89A* | `[Référence contrat]` |
| **Donnée de santé** | *Arrêt maladie pour burn-out* | 🛑 À supprimer totalement |
| **Salaire / paie** | *3 800 € brut/mois* | `[Niveau de rémunération]` ou supprimer |
| **Conflit / sanction** | *Litige avec M. X pour faute* | Description neutre, factuelle et générale |

---

## 🧪 Testeur interactif d'anonymisation

Entraînez-vous à transformer un texte confidentiel avant de le transmettre à un modèle d'IA :

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="masker-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--md-typeset-color, #333);">1. Collez votre texte brut ou confidentiel :</label>
  <textarea id="masker-input" rows="4" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Ex: Contacter M. Jean DUPONT (jean.dupont@entreprise.com / 06 12 34 56 78) pour valider le devis n°450 de 12 500 € HT..."></textarea>
  
  <button type="button" id="masker-btn" onclick="executerAnonymisation()" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">🎭 Masquer automatiquement les données</button>

  <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--md-typeset-color, #333);">2. Résultat anonymisé prêt pour l'IA :</label>
  <textarea id="masker-output" rows="4" readonly style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #222);" placeholder="Le texte anonymisé apparaîtra ici..."></textarea>
</div>

<script>
function executerAnonymisation() {
  const textarea = document.getElementById('masker-input');
  const output = document.getElementById('masker-output');
  if (!textarea || !output) return;

  let txt = textarea.value;
  if (!txt.trim()) return;

  // 1. SIRET / SIREN / TVA / numéros longs
  txt = txt.replace(/(?:SIRET|SIREN|TVA|RCS)?\s*:?\s*\b(?:\d[\s\u00a0\u202f.-]*){9,14}\b/gi, '[SIRET_ANONYMISÉ]');

  // 2. Adresses postales
  txt = txt.replace(/\b\d+\s*(?:er|ème|e)?\s+(?:rue|avenue|boulevard|bd|allée|place|chemin|impasse|route|square|quai|cours)\s+[^,\.\n\r]+,\s*\d{5}\s+[A-ZÀ-ÖØ-ßa-zà-öø-ÿ\s-]+/gi, '[ADRESSE_ANONYMISÉE]');

  // 3. Montants financiers
  txt = txt.replace(/\b\d+[\d\s\u00a0\u202f.,]*(?:\s*€|\s*euros?|\s*EUR)\b(?:\s*(?:HT|TTC))?/gi, '[MONTANT_ANONYMISÉ]');

  // 4. Sociétés / Entreprises
  txt = txt.replace(/(?:la\s+société|l'entreprise|le\s+groupe)\s+([A-ZÀ-ÖØ-ß0-9_\-]+(?:\s+[A-ZÀ-ÖØ-ß0-9_\-]+)*\s*(?:SARL|SAS|SASU|EURL|SA|SNC|INC|LTD|GIE)?)/gi, 'la société [ENTREPRISE_ANONYMISÉE]');
  txt = txt.replace(/\b[A-ZÀ-ÖØ-ß0-9_\-]+\s+(?:SARL|SAS|SASU|EURL|SA|SNC|INC|LTD|GIE)\b/gi, '[ENTREPRISE_ANONYMISÉE]');

  // 5. Civilité + Prénom + Nom
  txt = txt.replace(/\b(Monsieur|M\.|Madame|Mme|Mademoiselle|Mlle|Dr|Pr)\s+([A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+(?:\s+[A-ZÀ-ÖØ-ß[a-zà-öø-ÿ-]+)+)/gi, '$1 [PERSONNE_ANONYMISÉE]');

  // 6. Emails
  txt = txt.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_ANONYMISÉ]');

  // 7. Téléphones
  txt = txt.replace(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, '[TÉLÉPHONE_ANONYMISÉ]');

  output.value = txt;
}

document.getElementById('masker-btn')?.addEventListener('click', executerAnonymisation);
</script>

---

## 🛠️ Prompt modèle : Traitement d'un texte anonymisé

Une fois votre texte **strictement anonymisé** via l'outil ci-dessus, utilisez ce prompt pour demander à l'IA de le retravailler ou de le synthétiser en toute sécurité :

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-anon-dpo" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le prompt</button>
  <pre id="prompt-anon-dpo" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
Le texte fourni ci-dessous a déjà été préalablement anonymisé (les noms, montants et références sensibles ont été remplacés par des balises entre crochets `[...]`).

RÔLE :
Rédacteur et assistant professionnel.

OBJECTIF :
[Reformuler / Synthesiser / Corriger le ton de] ce texte tout en CONSERVANT STRICTEMENT les balises d'anonymisation entre crochets `[...]` à leur emplacement d'origine.

DIRECTIVES :
1. Ne cherche pas à deviner ni à remplacer ce qui se trouve à l'intérieur des balises `[...]`.
2. Conserve l'intégralité du contexte métier.
3. Ne modifie pas la structure générale sauf instruction contraire.

TEXTE SÉCURISÉ À TRAITER :
"[Coller ici votre texte préalablement anonymisé]"
  </pre>
</div>

---

## ⚠️ Vigilance et bon réflexe

<div class="warning-practice-box">
  <h3>🛑 À éviter absolument</h3>
  <p>Si une information ne doit pas être accessible à l’ensemble des collaborateurs ou au grand public, ne l’insérez jamais dans un outil d’IA grand public.</p>
  <p>Ne vous reposez pas uniquement sur les options de suppression ou de confidentialité annoncées : une donnée partagée dans un modèle non sécurisé peut être conservée ou utilisée pour le réentraînement.</p>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : la règle du double coup d’œil</h3>
  <ul>
    <li><strong>Étape 1 :</strong> masquer les données directement dans votre outil interactif avant de copier la note.</li>
    <li><strong>Étape 2 :</strong> relire uniquement les variables entre crochets <code>[...]</code> juste avant de cliquer sur « Envoyer ».</li>
    <li><strong>Étape 3 :</strong> après la génération de l’IA, réinjecter les vraies données dans le document final sur votre poste local.</li>
  </ul>
</div>

---

## 🚀 Checklist de validation avant envoi

<div class="summary-box">
  <h3>Checklist « Zéro fuite de données »</h3>
  <ul>
    <li>[ ] Tous les noms et prénoms ont été retirés ou remplacés par des balises (ex: <code>[PERSONNE_ANONYMISÉE]</code>).</li>
    <li>[ ] Les adresses emails et numéros de téléphone ont été masqués.</li>
    <li>[ ] Les adresses postales précises ont été réduites à la région ou au pays.</li>
    <li>[ ] Les données relatives à la santé ou à la vie privée ont été supprimées.</li>
    <li>[ ] Les montants chiffrés et références de devis/contrats ont été anonymisés.</li>
    <li>[ ] Les informations RH sensibles (sanctions, évaluations, conflits) ont été neutralisées.</li>
    <li>[ ] Le prompt final a été relu pour vérifier qu’aucune donnée d’entreprise sensible n’est visible.</li>
  </ul>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button primary" href="../prompt-croft/">Template suivant : Prompt CROFT ➔</a>
  <a class="wiki-button" href="../">Vue d’ensemble des ressources</a>
</div>
