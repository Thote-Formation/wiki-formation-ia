# 🔍 Le Détective des Hallucinations

Une IA générative peut répondre avec **beaucoup d'assurance... et pourtant se tromper complètement**. C'est ce qu'on appelle une **hallucination** : l'IA invente une information plausible, sans le signaler.

Votre mission : passer en revue 8 réponses données par une IA fictive, et déterminer pour chacune si elle est **✅ Fiable** ou **⚠️ Hallucinée**. Un vrai détective, dans la vraie vie, vérifierait toujours ses sources !

---

<div id="detective-container" style="background: #1e1e2e; color: #cdd6f4; border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); font-family: system-ui, -apple-system, sans-serif;">

  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #313244; padding-bottom:12px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
    <span id="case-indicator" style="background:#89b4fa; color:#11111b; font-weight:bold; padding:4px 12px; border-radius:12px; font-size:0.85em;">DOSSIER 1 / 8</span>
    <div style="text-align:right;">
      <span style="font-size:0.8em; color:#a6adc8;">Bonnes déductions</span>
      <div id="score-display" style="font-weight:bold; font-size:1.1em; color:#f9e2af;">0 / 8</div>
    </div>
  </div>

  <div id="claim-card" style="background:#181825; border-radius:8px; padding:20px; margin-bottom:20px; min-height:100px;">
    <div style="font-size:0.8em; color:#a6adc8; margin-bottom:8px;">🤖 RÉPONSE DE L'IA :</div>
    <div id="claim-text" style="font-size:1.05em; line-height:1.5;"></div>
  </div>

  <div id="choices-container" style="display:flex; gap:12px; margin-bottom:16px;">
    <button id="btn-fiable" style="flex:1; background:#a6e3a1; color:#11111b; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:1em;">✅ Fiable</button>
    <button id="btn-halluc" style="flex:1; background:#f38ba8; color:#11111b; border:none; padding:14px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:1em;">⚠️ Hallucinée</button>
  </div>

  <div id="feedback-box" style="display:none; border-radius:8px; padding:14px; margin-bottom:16px; font-size:0.95em;"></div>

  <button id="next-btn" style="display:none; background:#cba6f7; color:#11111b; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">Dossier suivant →</button>

  <div id="debrief-box" style="display:none; background:#232634; border:2px solid #a6e3a1; border-radius:8px; padding:20px; margin-top:10px;">
    <h3 style="color:#a6e3a1; margin-top:0;">🕵️ ENQUÊTE TERMINÉE</h3>
    <p id="debrief-score" style="font-weight:bold;"></p>
    <p>Pourquoi une IA hallucine-t-elle ?</p>
    <div style="display:flex; flex-direction:column; gap:12px; margin:16px 0;">
      <div style="background:#181825; padding:12px; border-radius:6px;">
        📊 <strong>1. L'IA prédit du texte, elle ne consulte pas une base de faits :</strong><br>
        <small style="color:#a6adc8;">Un modèle de langage génère le mot le plus probable suivant, sans vérifier automatiquement l'exactitude de ce qu'il écrit.</small>
      </div>
      <div style="background:#181825; padding:12px; border-radius:6px;">
        🎯 <strong>2. Plus le sujet est précis ou rare, plus le risque augmente :</strong><br>
        <small style="color:#a6adc8;">Dates exactes, chiffres précis, références juridiques, citations d'articles : ce sont les zones à haut risque d'invention.</small>
      </div>
      <div style="background:#181825; padding:12px; border-radius:6px;">
        😎 <strong>3. Le ton confiant ne prouve rien :</strong><br>
        <small style="color:#a6adc8;">Une IA formule ses inventions avec la même assurance que ses réponses correctes. La confiance affichée n'est pas un indicateur de fiabilité.</small>
      </div>
      <div style="background:#181825; padding:12px; border-radius:6px;">
        🛠️ <strong>4. Comment se protéger :</strong><br>
        <small style="color:#a6adc8;">Toujours vérifier les chiffres, dates, citations et sources auprès d'une référence fiable. Demander à l'IA ses sources et croiser avec une recherche indépendante.</small>
      </div>
    </div>
    <button onclick="restartGame()" style="background:#a6e3a1; color:#11111b; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">🔄 Rouvrir l'enquête</button>
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
  fb.style.background = correct ? 'rgba(166,227,161,0.15)' : 'rgba(243,139,168,0.15)';
  fb.style.border = correct ? '1px solid #a6e3a1' : '1px solid #f38ba8';
  fb.innerHTML = (correct ? '<strong>Bonne déduction !</strong><br>' : '<strong>Raté !</strong><br>') + c.explain;

  document.getElementById('choices-container').style.display = 'none';
  document.getElementById('next-btn').style.display = 'inline-block';
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
