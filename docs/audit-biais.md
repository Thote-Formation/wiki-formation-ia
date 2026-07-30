# Template — Audit de biais & communication inclusive

Les modèles d’IA générative sont entraînés sur d’immenses volumes de données web qui contiennent des stéréotypes, des généralisations et des biais culturels. Ce template permet d’auditer systématiquement les contenus générés (textes, offres d’emploi, supports de communication) afin de garantir une communication éthique, neutre et inclusive.

<div class="summary-box">
  <h3>🎯 Objectifs de l’audit de biais</h3>
  <ul>
    <li><strong>Garantir l’équité :</strong> éliminer les formulations discriminatoires ou stéréotypées (genre, âge, origine, handicap).</li>
    <li><strong>Respecter la conformité légale :</strong> veiller au respect des réglementations sur le recrutement et la communication publique (IA Act, Code du travail).</li>
    <li><strong>Protéger l’image de marque :</strong> véhiculer une posture d’entreprise responsable, moderne et ouverte à la diversité.</li>
  </ul>
</div>

---

## 📌 Quand utiliser ce template ?

Appliquez cet audit de biais dès que vous produisez ou validez l’un des supports suivants :

<div class="wiki-grid">

  <div class="wiki-card">
    <div class="wiki-card-icon">📢</div>
    <h3>Recrutement & RH</h3>
    <p>Offres d’emploi, fiches de poste, critères de sélection, trames d’entretien.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">💼</div>
    <h3>Communication interne</h3>
    <p>Notes de service, chartes d’entreprise, comptes rendus, guides collaborateurs.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">📣</div>
    <h3>Marketing & vente</h3>
    <p>Fiches produits, campagnes publicitaires, posts réseaux sociaux, scripts de vente.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🖼️</div>
    <h3>Visuels & multimédia</h3>
    <p>Images générées par IA (représentativité des équipes, stéréotypes d’apparence).</p>
  </div>

</div>

---

## 🛠️ Prompt modèle : Auditeur éthique et inclusion

Utilisez ce prompt pour soumettre un texte à une analyse critique avant validation :

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-audit-biais" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le prompt</button>
  <pre id="prompt-audit-biais" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
Je souhaite vérifier un document produit pour ma structure afin de m’assurer qu’il ne comporte aucun biais discriminant ou formulation excluante.

RÔLE :
Tu es expert en éthique de l’IA, communication inclusive et conformité en matière de non-discrimination.

OBJECTIF :
Analyse le contenu ci-dessous pour repérer les biais, stéréotypes, généralisations abusives ou termes potentiellement excluants.

POINTS DE VIGILANCE À SCANNER :
- Égalité F/H et langage inclusif
- Âge et stéréotypes générationnels (ex : "Digital native", "Senior")
- Origine, culture et appartenance
- Handicap, accessibilité et santé
- Situation familiale, sociale et niveau d’études
- Apparence physique ou critères vestimentaires non pertinents

FORMAT DE RÉPONSE :
1. Tableau des points de vigilance identifiés :
   (Formulation brute | Risque/Biais associé | Remplacement conseillé)
2. Version révisée intégrale du texte, neutre, claire et professionnelle.

TEXTE À ANALYSER :
"[Coller ici votre texte]"
  </pre>
</div>

---

## ⚠️ Vigilance et bon réflexe

<div class="warning-practice-box">
  <h3>🛑 À éviter absolument</h3>
  <p>Ne pas se contenter de demander à l’IA : « <em>Rends ce texte non discriminatoire</em> ».</p>
  <p>Sans critères précis ni analyse explicite des risques, l’IA peut lisser excessivement le texte, en altérer le sens d’origine ou passer à côté de biais implicites plus subtils.</p>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : demander l’explication du risque</h3>
  <p>Exigez toujours de l’IA qu’elle explique <strong>pourquoi</strong> une formulation pose problème.</p>
  <p>Cette démarche pédagogique permet de former les équipes, de prendre des décisions éclairées et de comprendre les nuances de la communication responsable.</p>
</div>

---

## 🚀 Checklist de validation d’un contenu éthique

<div class="summary-box">
  <h3>Checklist « Zéro biais »</h3>
  <ul>
    <li>[ ] L’intitulé et le corps du texte s’adressent de manière neutre à toutes et tous.</li>
    <li>[ ] Les critères demandés (compétences, prérequis) sont strictly factuels et en lien direct avec le besoin.</li>
    <li>[ ] Aucun terme lié à l’âge, au genre ou au mode de vie n’est utilisé comme condition implicite.</li>
    <li>[ ] Les visuels associés représentent la diversité sans tomber dans le stéréotype caricatural.</li>
    <li>[ ] Une relecture humaine finale a validé les propositions de correction de l’IA.</li>
  </ul>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button" href="../prompt-visuel/">⬅️ Template précédent : Prompt visuel</a>
  <a class="wiki-button primary" href="../checklist-accessibilite/">Template suivant : Checklist accessibilité ➔</a>
</div>
