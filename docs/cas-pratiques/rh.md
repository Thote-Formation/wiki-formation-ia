# Cas pratique — Ressources humaines

Dans les ressources humaines, de nombreux documents demandent à la fois rigueur, clarté et confidentialité. Ce cas pratique montre comment utiliser l’IA comme assistant de rédaction et d’analyse pour produire des documents RH utiles, tout en respectant les règles de sécurité, de conformité et de non-discrimination.

<div class="summary-box">
  <h3>🎯 Objectifs opérationnels</h3>
  <ul>
    <li><strong>Rédiger des offres d’emploi :</strong> concevoir des annonces plus claires, attractives et inclusives.</li>
    <li><strong>Structurer les processus RH :</strong> créer des trames, grilles d’entretien et supports de communication homogènes.</li>
    <li><strong>Protéger les données sensibles :</strong> appliquer la confidentialité stricte et garantir la responsabilité décisionnelle humaine.</li>
  </ul>
</div>

---

## Situation de départ

Les équipes RH produisent régulièrement des offres d’emploi, des notes internes, des grilles d’entretien, des documents de cadrage et des supports de communication liés à la vie de l’entreprise.

<div class="real-life-box">
  <h3>💼 Dans la vraie vie</h3>
  <p>L’IA aide à rédiger, reformuler, structurer ou relire.<br>
  Elle ne décide jamais à la place des professionnels RH.<br>
  Le recrutement, l’évaluation, la promotion ou la sanction restent des décisions exclusivement humaines.</p>
</div>

---

## Tâches ciblées et opportunités IA

<div class="wiki-grid">

  <div class="wiki-card">
    <div class="wiki-card-icon">📢</div>
    <h3>Offres d’emploi</h3>
    <p>Clarifier les missions, valoriser le poste et repérer les formulations à risque ou peu inclusives.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : très élevé</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">📋</div>
    <h3>Grilles d’entretien</h3>
    <p>Construire des questions par compétence pour comparer les candidatures de façon plus homogène.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : élevé</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">✉️</div>
    <h3>Communications internes</h3>
    <p>Reformuler des notes RH ou administratives pour les rendre plus claires et plus accessibles.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge">Gain de temps : moyen</span></div>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🔍</div>
    <h3>Analyse d’inclusivité</h3>
    <p>Repérer les biais de formulation liés au genre, à l’âge, au parcours ou aux stéréotypes implicites.</p>
    <div style="margin-top: 10px;"><span class="wiki-badge success">Gain de temps : élevé</span></div>
  </div>

</div>

---

## 🛠️ Prompt modèle (Framework CROFT)

Ce modèle de prompt sert à analyser et améliorer une offre d’emploi avant publication.

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-croft-rh" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le prompt</button>
  <pre id="prompt-croft-rh" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
CONTEXTE :
Je suis responsable RH dans une entreprise du secteur [indiquer le secteur].
Je souhaite réviser une offre d’emploi pour la rendre plus claire, attractive et inclusive.

RÔLE :
Agis comme un expert en recrutement, communication RH et rédaction inclusive.

OBJECTIF :
Analyse le texte ci-dessous, signale les biais ou formulations à risque,
puis propose une version améliorée.

CONTRAINTES :
- Ne pas modifier le niveau réel d’expérience requis ni la rémunération.
- Éliminer les stéréotypes liés à l’âge, au genre ou au profil type.
- Utiliser des termes clairs et un ton engageant.
- Signaler les formulations corrigées et expliquer pourquoi.

FORMAT :
1. Liste des points de vigilance repérés.
2. Proposition d’offre révisée :
   - Intitulé
   - Missions
   - Profil recherché
   - Avantages

TEXTE DE L’OFFRE (ANONYMISÉ) :
"[Coller ici le texte de l’offre]"
  </pre>
</div>

---

## 🛑 Vigilance sur les données RH

<div class="warning-practice-box">
  <h3>À éviter absolument</h3>
  <p>Ne jamais envoyer dans une IA des données nominatives ou sensibles comme :</p>
  <ul>
    <li>Les noms, prénoms ou coordonnées de candidats ou de collaborateurs.</li>
    <li>Les montants de rémunération individuels, fiches de paie ou avantages personnalisés.</li>
    <li>Les données de santé, arrêts maladie ou informations liées au handicap.</li>
    <li>Les évaluations individuelles, comptes rendus d’entretien ou appréciations nominatives.</li>
    <li>Les dossiers disciplinaires, conflits internes ou procédures de départ.</li>
  </ul>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : anonymiser et relire</h3>
  <p>Pour tout usage RH de l’IA :</p>
  <ul>
    <li><strong>Anonymisation stricte :</strong> masquez systématiquement les données personnelles avant tout envoi.</li>
    <li><strong>Masquage neutre :</strong> remplacez les éléments identifiants par des repères neutres comme <code>[Candidat A]</code>, <code>[Collaborateur B]</code> ou <code>[Poste X]</code>.</li>
    <li><strong>Regard critique :</strong> relisez le résultat avec un regard juridique, humain et métier avant toute diffusion ou décision.</li>
  </ul>
</div>

---

## 🧩 Rendre une offre plus inclusive

<div class="real-life-box">
  <h3>Exemple de vigilance</h3>
  <p>Une offre d’emploi peut exclure sans le vouloir si elle :</p>
  <ul>
    <li>Utilise un vocabulaire stéréotypé ou trop agressif (ex: "ninja de la vente", "jeune et dynamique").</li>
    <li>Liste trop d’exigences secondaires non indispensables au poste.</li>
    <li>Emploie du jargon interne difficile à comprendre de l’extérieur.</li>
    <li>Laisse entendre un profil type lié à l’âge, au genre ou au parcours.</li>
  </ul>
  <p><em>L’IA peut aider à repérer ces signaux, mais la validation finale reste humaine.</em></p>
</div>

---

## 📋 Checklist de validation RH

<div class="summary-box">
  <h3>Avant de diffuser ou d’utiliser un document RH généré avec l’IA</h3>
  <ol>
    <li><strong>Conformité légale :</strong> Le document respecte-t-il les obligations légales et la politique interne ?</li>
    <li><strong>Protection des données :</strong> Toutes les données personnelles ou sensibles ont-elles été retirées avant l’échange avec l’IA ?</li>
    <li><strong>Responsabilité humaine :</strong> La décision finale est-elle bien prise, expliquée et assumée par un professionnel humain ?</li>
  </ol>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button" href="../communication/">⬅️ Cas précédent : Communication</a>
  <a class="wiki-button primary" href="../">Vue d’ensemble des cas pratiques ➔</a>
</div>
