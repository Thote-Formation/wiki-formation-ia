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

## 🧪 Testeur interactif d'anonymisation

Testez la transformation d'un texte avant de le transmettre à un LLM :

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="masker-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">1. Collez un brouillon de message brut :</label>
  <textarea id="masker-input" rows="3" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Ex: Bonjour Madame Dupont (m.dupont@email.com), suite à notre devis de 4 500 € HT pour la société ACME..."></textarea>
  
  <button type="button" id="masker-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">🎭 Appliquer le masque de sécurité</button>

  <label style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">2. Résultat anonymisé prêt pour l'IA :</label>
  <div id="masker-output" style="padding: 12px; background: var(--md-default-bg-color, #fff); border: 1px solid #d5d9de; border-radius: 6px; font-style: italic; font-size: 13px; min-height: 45px; color: var(--md-typeset-color, #333);">Le texte anonymisé apparaîtra ici...</div>
</div>

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
