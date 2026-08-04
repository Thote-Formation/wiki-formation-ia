# ❓ Qui suis-je ?

Un concept ou un outil de l'IA se cache derrière des indices révélés un par un. Plus vous devinez tôt, plus vous marquez de points — mais attention à ne pas répondre trop vite !

---

<div class="wiki-card" style="max-width: 700px; margin: 0 auto;">

  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
    <span class="wiki-badge">Manche <span id="qsj-round">1</span> / 5</span>
    <span class="wiki-badge">Score : <span id="qsj-score">0</span> pts</span>
  </div>

  <div id="qsj-clues" style="background: var(--md-code-bg-color, #f8fafc); border-radius:10px; padding:16px; min-height:110px; margin-bottom:14px;"></div>

  <div style="margin-bottom:16px;">
    <button class="wiki-button" id="qsj-next-clue" onclick="revealClue()">💡 Indice suivant</button>
  </div>

  <h4 style="margin-bottom:8px;">Qui suis-je ?</h4>
  <div id="qsj-options" style="display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;"></div>

  <div id="qsj-feedback" style="display:none; margin-top:16px;"></div>

  <button id="qsj-next-round" class="wiki-button primary" style="display:none; margin-top:16px;" onclick="nextRound()">Manche suivante →</button>

  <div id="qsj-debrief" style="display:none; margin-top:20px;">
    <div class="summary-box">
      <h3>🏁 Partie terminée !</h3>
      <p id="qsj-final"></p>
    </div>
    <div class="wiki-actions">
      <button class="wiki-button primary" onclick="restartQSJ()">🔄 Rejouer</button>
    </div>
  </div>

</div>

<style>
.qsj-option-btn {
  padding: 12px; border-radius:10px; border:2px solid var(--md-default-fg-color--lightest, #cbd5e1);
  background: var(--md-default-bg-color, #ffffff); color: var(--md-typeset-color, #1e293b);
  cursor:pointer; font-weight:600; text-align:center;
}
.qsj-option-btn:hover { border-color: var(--md-primary-fg-color); }
.qsj-option-btn.correct { background:#dcfce7; border-color:#86efac; color:#14532d; }
.qsj-option-btn.wrong { background:#fee2e2; border-color:#fca5a5; color:#7f1d1d; }
[data-md-color-scheme="slate"] .qsj-option-btn.correct { background:#142e1b; border-color:#4ade80; color:#86efac; }
[data-md-color-scheme="slate"] .qsj-option-btn.wrong { background:#3a1414; border-color:#f87171; color:#fca5a5; }
</style>

<script>
const qsjRounds = [
  {
    answer: "ChatGPT",
    options: ["ChatGPT", "Claude", "Gemini", "Copilot"],
    clues: [
      "Je suis un chatbot conversationnel très connu du grand public.",
      "J'ai été lancé par OpenAI fin 2022.",
      "Mon nom évoque une discussion informelle, en anglais."
    ]
  },
  {
    answer: "Midjourney",
    options: ["Midjourney", "DALL-E", "Stable Diffusion", "Canva"],
    clues: [
      "Je transforme un texte en image.",
      "On m'utilise beaucoup via l'application Discord.",
      "Mon nom évoque un voyage à mi-parcours."
    ]
  },
  {
    answer: "Hallucination",
    options: ["Hallucination", "Biais", "Token", "Prompt"],
    clues: [
      "Je ne suis pas un outil, mais un phénomène.",
      "Je désigne une information inventée par une IA.",
      "Je ressemble à un mensonge, mais sans intention de tromper."
    ]
  },
  {
    answer: "RGPD",
    options: ["RGPD", "IA Act", "CNIL", "RAG"],
    clues: [
      "Je suis un texte de loi européen.",
      "Je protège les données personnelles des citoyens.",
      "Mon sigle commence par 'Règlement Général sur...'."
    ]
  },
  {
    answer: "Token",
    options: ["Token", "Prompt", "Paramètre", "Vecteur"],
    clues: [
      "Je suis une toute petite unité de texte.",
      "Un modèle de langage me découpe pour me traiter.",
      "Un seul mot peut être composé de plusieurs comme moi."
    ]
  }
];

let round = 0;
let score = 0;
let clueIndex = 0;
let answered = false;

function loadRound() {
  answered = false;
  clueIndex = 0;
  document.getElementById('qsj-round').textContent = round + 1;
  document.getElementById('qsj-feedback').style.display = 'none';
  document.getElementById('qsj-next-round').style.display = 'none';
  document.getElementById('qsj-next-clue').disabled = false;
  renderClues();
  renderOptions();
}

function renderClues() {
  const r = qsjRounds[round];
  const box = document.getElementById('qsj-clues');
  box.innerHTML = r.clues.slice(0, clueIndex + 1).map((c, i) => `<p style="margin:6px 0;">🔎 <strong>Indice ${i+1} :</strong> ${c}</p>`).join('');
}

function revealClue() {
  const r = qsjRounds[round];
  if (clueIndex < r.clues.length - 1) {
    clueIndex++;
    renderClues();
  }
  if (clueIndex >= r.clues.length - 1) {
    document.getElementById('qsj-next-clue').disabled = true;
  }
}

function renderOptions() {
  const r = qsjRounds[round];
  const container = document.getElementById('qsj-options');
  container.innerHTML = '';
  r.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'qsj-option-btn';
    btn.textContent = opt;
    btn.onclick = () => guess(opt, btn);
    container.appendChild(btn);
  });
}

function guess(opt, btn) {
  if (answered) return;
  const r = qsjRounds[round];
  const correct = opt === r.answer;
  answered = true;

  document.querySelectorAll('.qsj-option-btn').forEach(b => {
    if (b.textContent === r.answer) b.classList.add('correct');
    else if (b === btn) b.classList.add('wrong');
  });

  let points = 0;
  if (correct) {
    points = clueIndex === 0 ? 30 : (clueIndex === 1 ? 20 : 10);
    score += points;
    document.getElementById('qsj-score').textContent = score;
  }

  const fb = document.getElementById('qsj-feedback');
  fb.style.display = 'block';
  fb.innerHTML = correct
    ? `<div class="good-reflex-box"><strong>Bien joué !</strong> C'était bien <strong>${r.answer}</strong>. +${points} pts.</div>`
    : `<div class="warning-practice-box"><strong>Raté !</strong> La bonne réponse était <strong>${r.answer}</strong>.</div>`;

  document.getElementById('qsj-next-clue').disabled = true;
  document.getElementById('qsj-next-round').style.display = 'inline-flex';
}

function nextRound() {
  round++;
  if (round < qsjRounds.length) {
    loadRound();
  } else {
    document.getElementById('qsj-clues').style.display = 'none';
    document.getElementById('qsj-next-clue').style.display = 'none';
    document.getElementById('qsj-options').style.display = 'none';
    document.getElementById('qsj-feedback').style.display = 'none';
    document.getElementById('qsj-next-round').style.display = 'none';
    const maxScore = qsjRounds.length * 30;
    document.getElementById('qsj-final').textContent = `Score final : ${score} / ${maxScore} pts.`;
    document.getElementById('qsj-debrief').style.display = 'block';
  }
}

function restartQSJ() {
  round = 0;
  score = 0;
  document.getElementById('qsj-score').textContent = '0';
  document.getElementById('qsj-clues').style.display = 'block';
  document.getElementById('qsj-next-clue').style.display = 'inline-flex';
  document.getElementById('qsj-options').style.display = 'grid';
  document.getElementById('qsj-debrief').style.display = 'none';
  loadRound();
}

restartQSJ();
</script>
