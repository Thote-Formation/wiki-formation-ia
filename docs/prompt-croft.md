# Template — Framework CROFT

Le framework **CROFT** est une méthode pour structurer des instructions (prompts) claires, précises et performantes. En guidant l’IA à travers ces 5 piliers, on réduit les risques d’incompréhension, d’hallucinations et de réponses hors sujet.

<div class="summary-box">
  <h3>🎯 Les 5 piliers du framework CROFT</h3>
  <ul>
    <li><strong>C — Contexte :</strong> planter le décor, la situation et le secteur d’activité.</li>
    <li><strong>R — Rôle :</strong> donner une posture ou une expertise spécifique à l’IA.</li>
    <li><strong>O — Objectif :</strong> décrire avec précision la tâche à accomplir et le résultat attendu.</li>
    <li><strong>F — Format :</strong> imposer la structure de la réponse (tableau, liste, e-mail, plan).</li>
    <li><strong>T — Ton :</strong> définir le niveau de langage, la posture et le style de rédaction.</li>
  </ul>
</div>

---

## 🛠️ Modèle universel à copier-coller

Utilisez cette trame vierge pour vos demandes du quotidien avec un modèle d’IA :

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-croft-blank" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le modèle</button>
  <pre id="prompt-croft-blank" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
[Expliquez la situation globale, le secteur et le public cible en 2 ou 3 phrases.]

RÔLE :
Tu es [Préciser la posture : expert RH, assistant administratif, copywriter B2B, formateur, etc.].

OBJECTIF :
[Expliquez précisément et clairement ce que vous voulez obtenir.]

FORMAT :
- [Indiquez la structure : e-mail, tableau à 3 colonnes, synthèse, liste à puces de 5 points.]
- [Précisez la longueur max : ex. 200 mots, 2 paragraphes.]

TON :
[Indiquez le style : professionnel, bienveillant, pédagogique, direct, enthousiaste, etc.]

CONTRAINTES :
- [Contrainte 1 : ex. Ne pas utiliser de jargon technique]
- [Contrainte 2 : ex. Rester neutre sur le plan juridique]
- [Contrainte 3 : ex. Ne pas inventer de faits ou de chiffres]

AVANT DE RÉPONDRE :
Si une information essentielle manque pour accomplir parfaitement la tâche, pose-moi jusqu’à 3 questions de clarification avant de générer le contenu.
  </pre>
</div>

---

## ⚡ Générateur interactif de Prompt CROFT

Concevez votre prompt sur-mesure directement en remplissant les champs ci-dessous :

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

---

## 💡 Exemple concret d’application

<div class="wiki-grid">
  <div class="wiki-card">
    <div class="wiki-card-icon">✉️</div>
    <h3>Cas d’usage : Communication client</h3>
    <p>Annonce d’un changement d’horaires d’accueil dans une PME de services.</p>
  </div>
</div>

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-croft-ex" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier cet exemple</button>
  <pre id="prompt-croft-ex" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
Je travaille dans une PME de services. Nous devons annoncer à nos clients un changement d’horaires d’ouverture de l’accueil physique à partir du mois prochain.

RÔLE :
Tu es chargé de communication client senior, expert en relation client et gestion de crise douce.

OBJECTIF :
Rédige un e-mail clair et bienveillant pour informer nos clients du changement d’horaires sans générer d’insatisfaction.

FORMAT :
- 2 propositions d’objets d’e-mail incitatifs.
- Corps de message avec formule d’accueil, 3 paragraphes courts et conclusion.
- Un encadré rappelant les nouveaux horaires (Lundi–Vendredi : 8h30–17h00).

TON :
Professionnel, transparent, chaleureux et rassurant.

CONTRAINTES :
- Maximum 150 mots pour le corps de texte.
- Aucun jargon administratif.
- Ne pas inventer de justifications internes complexes.
  </pre>
</div>

---

## ⚠️ Vigilance et bon réflexe

<div class="warning-practice-box">
  <h3>🛑 À éviter absolument</h3>
  <p>Ne pas confondre contexte précis et divulgation de données sensibles.<br>
  On peut décrire une situation de façon détaillée sans jamais mentionner de noms propres, de chiffres confidentiels ou d’informations stratégiques internes.</p>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : la question de clarification</h3>
  <p>Inclure la clause : <code>AVANT DE RÉPONDRE : Pose-moi des questions si besoin</code>.</p>
  <p>Cette simple instruction pousse l’IA à demander des précisions plutôt qu’à combler les manques par des suppositions ou des hallucinations.</p>
</div>

---

## 🚀 Checklist de validation du prompt CROFT

<div class="summary-box">
  <h3>Checklist d’un prompt efficace</h3>
  <ul>
    <li>[ ] Le décor et le secteur d’activité sont posés (Contexte).</li>
    <li>[ ] Une expertise ou un métier précis est assigné à l’IA (Rôle).</li>
    <li>[ ] Le résultat attendu est mesurable et précis (Objectif).</li>
    <li>[ ] La forme finale du livrable est explicitement décrite (Format).</li>
    <li>[ ] Le style rédactionnel est clairement cadré (Ton).</li>
    <li>[ ] Les données confidentielles ont été préalablement masquées.</li>
  </ul>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button" href="../anonymisation/">⬅️ Template précédent : Anonymisation</a>
  <a class="wiki-button primary" href="../prompt-visuel/">Template suivant : Prompt visuel ➔</a>
</div>
