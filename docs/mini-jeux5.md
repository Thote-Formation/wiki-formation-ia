# 🔤 Mots mêlés : le vocabulaire de l'IA

Retrouvez les **8 mots liés à l'IA** cachés dans la grille — une nouvelle grille est générée à chaque partie ! Cliquez sur la première lettre du mot, puis sur sa dernière lettre (le mot peut être horizontal, vertical ou en diagonale, dans les deux sens).

---

<div class="wiki-card" style="max-width: 760px; margin: 0 auto;">

  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
    <span class="wiki-badge">Mots trouvés : <span id="ws-found">0</span> / 8</span>
  </div>

  <div style="display:flex; gap:24px; flex-wrap:wrap;">
    <div id="ws-grid" style="display:grid; grid-template-columns: repeat(12, minmax(24px, 1fr)); gap:3px; max-width:420px;"></div>

    <div style="flex:1; min-width:180px;">
      <h4 style="margin-top:0;">À trouver :</h4>
      <ul id="ws-wordlist" style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px;"></ul>
    </div>
  </div>

  <div id="ws-debrief" style="display:none; margin-top:20px;">
    <div class="summary-box">
      <h3>🎉 Grille terminée !</h3>
      <p>Vous avez retrouvé les 8 mots. Un bon réflexe : reformuler chacun d'eux dans vos propres mots pour vérifier que vous les maîtrisez.</p>
    </div>
    <div class="wiki-actions">
      <button class="wiki-button primary" onclick="restartWordSearch()">🔄 Nouvelle grille</button>
    </div>
  </div>

</div>

<style>
.ws-cell {
  aspect-ratio: 1 / 1;
  display:flex; align-items:center; justify-content:center;
  font-family: 'Roboto Mono', monospace;
  font-weight:700;
  font-size:0.78rem;
  border-radius:4px;
  border: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
  background: var(--md-default-bg-color, #ffffff);
  color: var(--md-typeset-color, #1e293b);
  cursor:pointer;
  user-select:none;
}
.ws-cell.selected {
  background: #fef3c7 !important;
  border-color:#fbbf24 !important;
}
.ws-cell.found {
  background: #dcfce7 !important;
  color:#14532d !important;
  border-color:#86efac !important;
}
[data-md-color-scheme="slate"] .ws-cell.found {
  background:#142e1b !important; color:#86efac !important; border-color:#4ade80 !important;
}
.ws-word-item.done {
  text-decoration: line-through;
  opacity:0.55;
}
</style>

<script>
const WS_SIZE = 12;
const wsWordDefs = {
  "PROMPT": "L'instruction donnée à l'IA",
  "TOKEN":  "Unité de texte traitée par le modèle",
  "BIAIS":  "Déséquilibre involontaire dans les réponses",
  "AGENT":  "IA capable d'agir de façon autonome",
  "RGPD":   "Règlement européen sur les données",
  "LLM":    "Grand modèle de langage",
  "IA":     "Intelligence artificielle",
  "RAG":    "Recherche augmentée par récupération"
};

// 8 directions possibles : [dr, dc]
const DIRECTIONS = [
  [0,1], [0,-1], [1,0], [-1,0],
  [1,1], [1,-1], [-1,1], [-1,-1]
];

let wsGridLetters = [];
let wsWords = {}; // { WORD: { def, coords: [[r,c], ...] } }
let selection = [];
let foundWords = new Set();

function tryGenerateGrid() {
  const grid = Array.from({ length: WS_SIZE }, () => Array(WS_SIZE).fill(null));
  const words = {};
  const wordList = Object.keys(wsWordDefs).sort((a, b) => b.length - a.length);

  for (const word of wordList) {
    let placed = false;
    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const maxR = dr === 1 ? WS_SIZE - word.length : (dr === -1 ? word.length - 1 : WS_SIZE - 1);
      const minR = dr === 1 ? 0 : (dr === -1 ? word.length - 1 : 0);
      const maxC = dc === 1 ? WS_SIZE - word.length : (dc === -1 ? word.length - 1 : WS_SIZE - 1);
      const minC = dc === 1 ? 0 : (dc === -1 ? word.length - 1 : 0);
      if (maxR < minR || maxC < minC) continue;

      const r0 = minR + Math.floor(Math.random() * (maxR - minR + 1));
      const c0 = minC + Math.floor(Math.random() * (maxC - minC + 1));

      const coords = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        if (r < 0 || r >= WS_SIZE || c < 0 || c >= WS_SIZE) { ok = false; break; }
        const existing = grid[r][c];
        if (existing !== null && existing !== word[i]) { ok = false; break; }
        coords.push([r, c]);
      }
      if (!ok) continue;

      coords.forEach(([r, c], i) => { grid[r][c] = word[i]; });
      words[word] = { def: wsWordDefs[word], coords };
      placed = true;
    }
    if (!placed) return null; // échec : on relance une génération complète
  }

  const letters = "AEIOULNRSTDCMGP";
  for (let r = 0; r < WS_SIZE; r++) {
    for (let c = 0; c < WS_SIZE; c++) {
      if (grid[r][c] === null) grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
    }
  }

  return { grid: grid.map(row => row.join('')), words };
}

function generatePuzzle() {
  let result = null;
  for (let i = 0; i < 10 && !result; i++) result = tryGenerateGrid();
  if (!result) result = tryGenerateGrid(); // dernier essai, cas extrêmement rare
  wsGridLetters = result.grid;
  wsWords = result.words;
}

function renderWordList() {
  const ul = document.getElementById('ws-wordlist');
  ul.innerHTML = '';
  Object.keys(wsWords).forEach(w => {
    const li = document.createElement('li');
    li.className = 'ws-word-item';
    li.id = 'wsword-' + w;
    li.innerHTML = `<strong>${w}</strong><br><small style="color:var(--md-default-fg-color--light,#64748b);">${wsWords[w].def}</small>`;
    ul.appendChild(li);
  });
}

function renderGrid() {
  const grid = document.getElementById('ws-grid');
  grid.innerHTML = '';
  for (let r = 0; r < WS_SIZE; r++) {
    for (let c = 0; c < WS_SIZE; c++) {
      const div = document.createElement('div');
      div.className = 'ws-cell';
      div.textContent = wsGridLetters[r][c];
      div.dataset.r = r;
      div.dataset.c = c;
      div.onclick = () => cellClick(r, c, div);
      grid.appendChild(div);
    }
  }
}

function cellClick(r, c, el) {
  if (el.classList.contains('found')) return;

  if (selection.length === 0) {
    selection.push({ r, c, el });
    el.classList.add('selected');
    return;
  }

  const start = selection[0];
  selection.push({ r, c, el });
  const end = selection[1];

  const path = computeLine(start.r, start.c, end.r, end.c);
  checkWord(path);

  selection.forEach(s => s.el.classList.remove('selected'));
  selection = [];
}

function computeLine(r1, c1, r2, c2) {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const steps = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
  const path = [];
  for (let i = 0; i <= steps; i++) {
    path.push([r1 + dr * i, c1 + dc * i]);
  }
  return path;
}

function samePath(a, b) {
  if (a.length !== b.length) return false;
  const straight = a.every((cell, i) => cell[0] === b[i][0] && cell[1] === b[i][1]);
  const reversed = a.every((cell, i) => cell[0] === b[b.length - 1 - i][0] && cell[1] === b[b.length - 1 - i][1]);
  return straight || reversed;
}

function checkWord(path) {
  for (const [word, data] of Object.entries(wsWords)) {
    if (foundWords.has(word)) continue;
    if (samePath(path, data.coords)) {
      foundWords.add(word);
      data.coords.forEach(([r, c]) => {
        document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`).classList.add('found');
      });
      document.getElementById('wsword-' + word).classList.add('done');
      document.getElementById('ws-found').textContent = foundWords.size;
      if (foundWords.size === Object.keys(wsWords).length) {
        document.getElementById('ws-debrief').style.display = 'block';
      }
      return;
    }
  }
}

function restartWordSearch() {
  foundWords = new Set();
  selection = [];
  document.getElementById('ws-found').textContent = '0';
  document.getElementById('ws-debrief').style.display = 'none';
  generatePuzzle();
  renderGrid();
  renderWordList();
}

restartWordSearch();
</script>
