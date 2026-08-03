# 🔍 Le Détective des Hallucinations

Une IA générative peut répondre avec **beaucoup d'assurance... et pourtant se tromper complètement**. C'est ce qu'on appelle une **hallucination** : l'IA invente une information plausible, sans le signaler.

Votre mission : passer en revue 8 réponses données par une IA fictive, et déterminer pour chacune si elle est **✅ Fiable** ou **⚠️ Hallucinée**. Un vrai détective, dans la vraie vie, vérifierait toujours ses sources !

---

<style>
  /* Extensions CSS légères dédiées aux composants dynamiques du jeu */
  .detective-claim-card {
    background: var(--md-code-bg-color, #f8fafc);
    border: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    min-height: 100px;
  }

  [data-md-color-scheme="slate"] .detective-claim-card {
    background: #1e293b;
    border-color: #475569;
  }

  .detective-btn-group {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .detective-btn-group .wiki-button {
    flex: 1;
    font-size: 1rem;
    cursor: pointer;
  }

  .btn-success-style {
    background: #16a34a !important;
    color: #ffffff !important;
    border-color: #16a34a !important;
  }

  .btn-danger-style {
    background: #dc2626 !important;
    color: #ffffff !important;
    border-color: #dc2626 !important;
  }
</style>

<!-- INTERFACE DU JEU -->
<div id="detective-container" class="prompt-generator">

  <!-- En-tête -->
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--md-default-fg-color--lightest, #cbd5e1); padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
    <span id="case-indicator" class="wiki-badge primary">DOSSIER 1 / 8</span>
    <div style="text-align: right;">
      <span style="font-size: 0.8rem; font-weight: 600; opacity: 0.8;">Bonnes déductions</span>
      <div id="score-display" style="font-weight: 700; font-size: 1.15rem; color: var(--md-primary-fg-color);">0 / 8</div>
    </div>
  </div>

  <!-- Carte d'affirmation -->
  <div id="claim-card" class="detective-claim-card">
    <div style="font-size: 0.8rem; font-weight: 700; opacity: 0.8; margin-bottom: 8px;">🤖 RÉPONSE DE L'IA :</div>
    <div id="claim-text" style="font-size: 1.05rem; line-height: 1.5; font-weight: 500;"></div>
  </div>

  <!-- Choix -->
  <div id="choices-container" class="detective-btn-group">
    <button id="btn-fiable" class="wiki-button btn-success-style">✅ Fiable</button>
    <button id="btn-halluc" class="wiki-button btn-danger-style">⚠️ Hallucinée</button>
  </div>

  <!-- Feedback après réponse -->
  <div id="feedback-box" class="real-life-box" style="display: none; margin-top: 0; margin-bottom: 16px;"></div>

  <!-- Bouton suivant -->
  <button id="next-btn" class="wiki-button primary" style="display: none; margin-bottom: 16px; cursor: pointer;">
    Dossier suivant →
  </button>

  <!-- Bilan final -->
  <div id="debrief-box" class="good-reflex-box" style="display: none; margin-top: 10px;">
    <h3 style="margin-top: 0;">🕵️ ENQUÊTE TERMINÉE</h3>
    <p id="debrief-score" style="font-weight: 700; font-size: 1.1rem;"></p>
    <p>Pourquoi une IA hallucine-t-elle ?</p>
    
    <div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">
      <div class="wiki-card">
        📊 <strong>1. L'IA prédit du texte, elle ne consulte pas une base de faits :</strong><br>
        <small style="opacity: 0.8;">Un modèle de langage génère le mot le plus probable suivant, sans vérifier automatiquement l'exactitude de ce qu'il écrit.</small>
      </div>
      <div class="wiki-card">
        🎯 <strong>2. Plus le sujet est précis ou rare, plus le risque augmente :</strong><br>
        <small style="opacity: 0.8;">Dates exactes, chiffres précis, références juridiques, citations d'articles : ce sont les zones à haut risque d'invention.</small>
      </div>
      <div class="wiki-card">
        😎 <strong>3. Le ton confiant ne prouve rien :</strong><br>
        <small style="opacity: 0.8;">Une IA formule ses inventions avec la même assurance que ses réponses correctes. La confiance affichée n'est pas un indicateur de fiabilité.</small>
      </div>
      <div class="wiki-card">
        🛠️ <strong>4. Comment se protéger :</strong><br>
        <small style="opacity: 0.8;">Toujours vérifier les chiffres, dates, citations et sources auprès d'une référence fiable. Demander à l'IA ses sources et croiser avec une recherche indépendante.</small>
      </div>
    </div>

    <button onclick="restartGame()" class="wiki-button primary">🔄 Rouvrir l'enquête</button>
  </div>

</div>

<script>
const cases = [
  { text: "La Tour Eiffel a été construite pour l'Exposition universelle de 1889 et mesure environ 330 mètres avec ses antennes.", halluc: false,
    explain: "✅ Fiable : c'est une information historique bien documentée et vérifiable." },
  { text: "Selon l'article 47-bis du RGPD, toute IA générative doit obtenir une licence européenne spécifique avant tout déploiement commercial.", halluc: true,
    explain: "⚠️ Hallucinée : cet 'article 47-bis' n'existe pas dans le RGPD. L'IA a inventé une référence juridique précise et crédible, un classique de l'hallucination." },
  { text: "Paris est la capitale de la France.", halluc: false,
    explain: "✅ Fiable : fait de base largement connu et non ambigu." },
  { text: "Une étude de l'Université de Stanford publiée en 2022 démontre que 73,4% des utilisateurs préfèrent les réponses générées par IA aux réponses humaines.", halluc: true,
    explain: "⚠️ Hallucinée : le chiffre très précis (73,4%) et la source vague ('une étude de Stanford') sans lien ni référence exacte sont un signal classique d'invention statistique." },
  { text: "Le livre '1984' de George Orwell a été publié en 1949.", halluc: false,
    explain: "✅ Fiable : information factuelle correcte et facilement vérifiable." },
  { text: "Marie Curie a reçu le prix Nobel de physique en 1903 et le prix Nobel de chimie en 1911, une double distinction rare.", halluc: false,
    explain: "✅ Fiable : ces deux prix Nobel sont bien réels et correctement datés." },
  { text: "Pour citer précisément : d'après le rapport interne de l'entreprise XYZ Corp (page 12, paragraphe 3), leurs revenus 2023 ont augmenté de 128% grâce à l'IA.", halluc: true,
    explain: "⚠️ Hallucinée : une IA générative n'a pas accès à un 'rapport interne' non fourni. Cette précision de citation (page, paragraphe) sur un document qu'elle n'a jamais vu est fabriquée." },
  { text: "La fonction Python `sorted()` trie une liste et retourne une nouvelle liste, sans modifier l'originale.", halluc: false,
    explain: "✅ Fiable : c'est un comportement exact et documenté de Python." }
];

let currentCase = 0;
let score = 0;

function loadCase() {
  const c = cases[currentCase];
  document.getElementById('case-indicator').textContent = `DOSSIER ${currentCase + 1} / ${cases.length}`;
  document.getElementById('claim-text').textContent = c.text;
  document.getElementById('feedback-box').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('choices-container').style.display = 'flex';
}

function answer(userSaysHalluc) {
  const c = cases[currentCase];
  const correct = (userSaysHalluc === c.halluc);
  if (correct) score++;
  document.getElementById('score-display').textContent = `${score} / ${cases.length}`;

  const fb = document.getElementById('feedback-box');
  fb.style.display = 'block';
  
  // Bascule dynamique selon la réponse
  if (correct) {
    fb.className = "good-reflex-box";
    fb.innerHTML = `<strong>Bonne déduction !</strong><br>${c.explain}`;
  } else {
    fb.className = "warning-practice-box";
    fb.innerHTML = `<strong>Raté !</strong><br>${c.explain}`;
  }

  document.getElementById('choices-container').style.display = 'none';
  document.getElementById('next-btn').style.display = 'inline-flex';
}

function nextCase() {
  currentCase++;
  if (currentCase < cases.length) {
    loadCase();
  } else {
    document.getElementById('claim-card').style.display = 'none';
    document.getElementById('feedback-box').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('debrief-score').textContent = `Score final : ${score} / ${cases.length} bonnes déductions.`;
    document.getElementById('debrief-box').style.display = 'block';
  }
}

function restartGame() {
  currentCase = 0;
  score = 0;
  document.getElementById('score-display').textContent = `0 / ${cases.length}`;
  document.getElementById('claim-card').style.display = 'block';
  document.getElementById('debrief-box').style.display = 'none';
  loadCase();
}

document.getElementById('btn-fiable').onclick = () => answer(false);
document.getElementById('btn-halluc').onclick = () => answer(true);
document.getElementById('next-btn').onclick = nextCase;

loadCase();
</script>
