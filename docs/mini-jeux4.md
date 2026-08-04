# 🧠 Memory : les paires de l'IA

Un classique revisité : retrouvez les paires **terme ↔ définition**. Un bon moyen de mémoriser en douceur le vocabulaire vu pendant la formation.

---

<div class="wiki-card" style="max-width: 760px; margin: 0 auto;">

  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
    <span class="wiki-badge">Paires trouvées : <span id="pairs-found">0</span> / 6</span>
    <span class="wiki-badge">Coups joués : <span id="moves-count">0</span></span>
  </div>

  <div id="memory-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;"></div>

  <div id="memory-debrief" style="display:none; margin-top:20px;">
    <div class="summary-box">
      <h3>🎉 Bravo, toutes les paires sont trouvées !</h3>
      <p id="memory-result"></p>
    </div>
    <div class="wiki-actions">
      <button class="wiki-button primary" onclick="restartMemory()">🔄 Rejouer</button>
    </div>
  </div>

</div>

<style>
#memory-grid {
  grid-auto-rows: 130px;
}
.memory-card {
  height: 100%;
  width: 100%;
  border-radius: 12px;
  display:flex; align-items:center; justify-content:center;
  text-align:center;
  padding:8px;
  box-sizing: border-box;
  font-size:0.8rem;
  line-height:1.25;
  font-weight:600;
  cursor:pointer;
  overflow:hidden;
  border: 2px solid var(--md-default-fg-color--lightest, #cbd5e1);
  transition: transform 0.15s ease, background 0.15s ease;
  user-select:none;
}
.memory-card.hidden-face {
  background: var(--md-primary-fg-color);
  color:#ffffff;
  font-size:1.5rem;
}
.memory-card.revealed {
  background: var(--md-default-bg-color, #ffffff);
  color: var(--md-typeset-color, #1e293b);
}
.memory-card.matched {
  background: #dcfce7;
  color:#14532d;
  border-color:#86efac;
  cursor:default;
}
[data-md-color-scheme="slate"] .memory-card.matched {
  background:#142e1b; color:#86efac; border-color:#4ade80;
}
@media (max-width: 640px) {
  #memory-grid { grid-template-columns: repeat(3, 1fr) !important; grid-auto-rows: 120px; }
}
</style>

<script>
const pairsData = [
  { id: "prompt", term: "Prompt", def: "L'instruction donnée à l'IA pour obtenir une réponse." },
  { id: "token", term: "Token", def: "Unité de texte (mot ou fragment) traitée par un modèle de langage." },
  { id: "halluc", term: "Hallucination", def: "Réponse inventée par l'IA, donnée avec assurance." },
  { id: "rag", term: "RAG", def: "Technique qui va chercher des documents pour enrichir la réponse de l'IA." },
  { id: "biais", term: "Biais", def: "Déséquilibre involontaire reflété dans les réponses d'une IA." },
  { id: "rgpd", term: "RGPD", def: "Règlement européen qui protège les données personnelles." }
];

let cards = [];
let flipped = [];
let matchedCount = 0;
let moves = 0;
let lock = false;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildCards() {
  let list = [];
  pairsData.forEach(p => {
    list.push({ pairId: p.id, label: p.term });
    list.push({ pairId: p.id, label: p.def });
  });
  return shuffle(list);
}

function renderGrid() {
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  cards.forEach((card, idx) => {
    const div = document.createElement('div');
    div.className = 'memory-card hidden-face';
    div.textContent = '?';
    div.dataset.idx = idx;
    div.onclick = () => flipCard(idx);
    grid.appendChild(div);
  });
}

function flipCard(idx) {
  if (lock) return;
  const card = cards[idx];
  if (card.matched || flipped.includes(idx)) return;

  const el = document.querySelector(`#memory-grid [data-idx="${idx}"]`);
  el.classList.remove('hidden-face');
  el.classList.add('revealed');
  el.textContent = card.label;
  el.style.fontSize = card.label.length > 55 ? '0.68rem' : (card.label.length > 35 ? '0.74rem' : (card.label.length > 18 ? '0.82rem' : '0.95rem'));
  flipped.push(idx);

  if (flipped.length === 2) {
    moves++;
    document.getElementById('moves-count').textContent = moves;
    lock = true;
    const [i1, i2] = flipped;
    if (cards[i1].pairId === cards[i2].pairId) {
      cards[i1].matched = true;
      cards[i2].matched = true;
      matchedCount++;
      document.getElementById('pairs-found').textContent = matchedCount;
      [i1, i2].forEach(i => {
        const e = document.querySelector(`#memory-grid [data-idx="${i}"]`);
        e.classList.remove('revealed');
        e.classList.add('matched');
      });
      flipped = [];
      lock = false;
      if (matchedCount === pairsData.length) {
        setTimeout(showDebrief, 500);
      }
    } else {
      setTimeout(() => {
        [i1, i2].forEach(i => {
          const e = document.querySelector(`#memory-grid [data-idx="${i}"]`);
          e.classList.remove('revealed');
          e.classList.add('hidden-face');
          e.textContent = '?';
          e.style.fontSize = '';
        });
        flipped = [];
        lock = false;
      }, 900);
    }
  }
}

function showDebrief() {
  const perfect = pairsData.length;
  let msg = `Vous avez trouvé les ${perfect} paires en ${moves} coups.`;
  if (moves <= perfect + 2) msg += " Mémoire impeccable ! 🏆";
  else if (moves <= perfect * 2) msg += " Beau score ! 👏";
  else msg += " Rejouez pour battre votre score !";
  document.getElementById('memory-result').textContent = msg;
  document.getElementById('memory-debrief').style.display = 'block';
}

function restartMemory() {
  cards = buildCards();
  flipped = [];
  matchedCount = 0;
  moves = 0;
  lock = false;
  document.getElementById('pairs-found').textContent = '0';
  document.getElementById('moves-count').textContent = '0';
  document.getElementById('memory-debrief').style.display = 'none';
  renderGrid();
}

restartMemory();
</script>
