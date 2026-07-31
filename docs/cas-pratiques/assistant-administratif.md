# Cas pratique — Assistant administratif

Dans une PME, la gestion administrative au quotidien exige réactivité, rigueur et professionnalisme. Ce cas pratique montre comment utiliser l’IA comme un copilote d’organisation pour traiter les tâches chronophages, tout en protégeant les données sensibles.

<div class="summary-box">
  <h3>🎯 Objectifs opérationnels</h3>
  <ul>
    <li><strong>Accélérer la gestion documentaire :</strong> rédiger, synthétiser et reformuler les écrits en quelques secondes.</li>
    <li><strong>Conserver un ton irréprochable :</strong> adapter le niveau de langage selon les interlocuteurs (clients, fournisseurs, direction).</li>
    <li><strong>Garantir la confidentialité :</strong> appliquer des règles strictes d’anonymisation avant tout envoi de prompt.</li>
  </ul>
</div>

---

## Situation de départ

Dans une PME dynamique, l’assistant administratif jongle entre la boîte de réception, les comptes rendus de réunion, la remise au propre de documents internes et le traitement des sollicitations clients.

<div class="real-life-box">
  <h3>💼 Dans la vraie vie</h3>
  <p>L’IA ne remplace pas l’assistant administratif.<br>
  Elle sert à générer une première version propre en 30 secondes, puis l’humain garde le contrôle stratégique et valide le message final.</p>
</div>

---

## Tâches ciblées et opportunités IA

<div class="wiki-grid">

  <div class="wiki-card">
    <div class="wiki-card-icon">✉️</div>
    <h3>Emails courants</h3>
    <p>Proposer des réponses claires, structurées et adaptées aux demandes répétitives.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : très élevé</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">📝</div>
    <h3>Comptes rendus</h3>
    <p>Mettre en forme des notes brutes sous forme de synthèses avec décisions et actions.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : élevé</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">✏️</div>
    <h3>Reformulation</h3>
    <p>Clarifier le style, corriger les fautes et adapter le ton d’une note ou d’une procédure.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge">Gain de temps : moyen</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">📋</div>
    <h3>Plans d’action</h3>
    <p>Extraire rapidement les tâches à exécuter et les responsables depuis un texte long.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : élevé</span></div>
  </div>

</div>

---

## 🛠️ Prompt modèle (Framework CROFT)

Ce modèle de prompt sert à reformuler ou préparer une communication client de façon rapide et structurée.

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-croft-admin" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le prompt</button>
  <pre id="prompt-croft-admin" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
Je suis assistant administratif dans une PME du secteur [indiquer le secteur].
Je dois répondre à un client concernant une demande d’information ou un retard.

RÔLE :
Agis comme un assistant administratif expérimenté, courtois et rigoureux.

OBJECTIF :
Reformule et enrichis le brouillon de message ci-dessous pour le rendre clair,
professionnel et chaleureux.

FORMAT :
- Propose 2 options d’objet d’email clairs.
- Corps du message en 2 paragraphes maximum.
- Une formule de politesse adaptée.

TON :
Professionnel, bienveillant, direct, sans jargon inutile.

TEXTE À REFORMULER (ANONYMISÉ) :
"[Coller ici le texte anonymisé]"
  </pre>
</div>

---

## 🛡️ Vigilance sur les données sensibles

<div class="warning-practice-box">
  <h3>🛑 À éviter absolument</h3>
  <p>Ne jamais coller directement dans un modèle d’IA un email ou un document contenant :</p>
  <ul>
    <li>Des noms complets de clients, collaborateurs ou fournisseurs.</li>
    <li>Des adresses email, numéros de téléphone ou coordonnées personnelles.</li>
    <li>Des montants financiers précis (devis, factures, salaires).</li>
    <li>Des références contractuelles ou des clauses de confidentialité.</li>
  </ul>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : la technique du masque</h3>
  <p>Avant d’envoyer un texte à l’IA, remplacer systématiquement les informations confidentielles par des éléments génériques :</p>
  <ul>
    <li><code>Marie DUPONT</code> ➔ <code>[Client A]</code></li>
    <li><code>12 500 € HT</code> ➔ <code>[Montant du devis]</code></li>
    <li><code>Contrat signé le 14 mai</code> ➔ <code>[Date du contrat]</code></li>
    <li><code>Société ACME Corp</code> ➔ <code>[Entreprise X]</code></li>
  </ul>
</div>

---

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
---

## 📋 Checklist de validation administrative

<div class="summary-box">
  <h3>Avant d’envoyer le document généré par l’IA</h3>
  <ol>
    <li><strong>Absence d'hallucination :</strong> L’IA a-t-elle inventé des faits, des dates ou des engagements non prévus ?</li>
    <li><strong>Tonalité :</strong> Le ton correspond-il exactement à la culture de l’entreprise et à la relation client ?</li>
    <li><strong>Réintégration des vraies données :</strong> Les variables masquées (comme <code>[Client A]</code>) ont-elles été correctement réintroduites avec les vraies informations ?</li>
  </ol>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button primary" href="../communication/">Cas pratique suivant : Communication ➔</a>
  <a class="wiki-button" href="../">Vue d’ensemble des cas pratiques</a>
</div>
