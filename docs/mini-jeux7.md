# 🎯 Bon prompt ou prompt à améliorer ?

Un bon réflexe à automatiser : reconnaître d'un coup d'œil un prompt bien construit d'un prompt trop vague. Triez les 8 prompts suivants le plus vite possible !

---

<div class="wiki-card" style="max-width: 700px; margin: 0 auto;">

  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
    <span class="wiki-badge">Prompt <span id="sort-index">1</span> / 8</span>
    <span class="wiki-badge">Série en cours : <span id="sort-streak">0</span> 🔥</span>
  </div>

  <div id="sort-card" style="background: var(--md-code-bg-color, #f8fafc); border-radius:10px; padding:18px; margin-bottom:18px; min-height:80px; font-family:'Roboto Mono', monospace; font-size:0.92rem;"></div>

  <div style="display:flex; gap:12px; margin-bottom:16px;">
    <button class="wiki-button" style="flex:1; background:#dcfce7; border-color:#86efac; color:#14532d;" onclick="sortAnswer(true)">✅ Bon prompt</button>
    <button class="wiki-button" style="flex:1; background:#fee2e2; border-color:#fca5a5; color:#7f1d1d;" onclick="sortAnswer(false)">🛠️ À améliorer</button>
  </div>

  <div id="sort-feedback" style="display:none; margin-bottom:16px;"></div>

  <button id="sort-next" class="wiki-button primary" style="display:none;" onclick="nextSort()">Prompt suivant →</button>

  <div id="sort-debrief" style="display:none; margin-top:10px;">
    <div class="summary-box">
      <h3>🏁 Tri terminé !</h3>
      <p id="sort-final"></p>
    </div>
    <p>Ce qui distingue un bon prompt d'un prompt à améliorer, c'est presque toujours la méthode <strong>CROFT</strong> (Contexte, Rôle, Objectif, Format, Ton) : plus ces ingrédients sont précis, plus la réponse de l'IA sera exploitable.</p>
    <div class="wiki-actions">
      <button class="wiki-button primary" onclick="restartSort()">🔄 Rejouer</button>
    </div>
  </div>

</div>

<script>
const sortPrompts = [
  { text: "Écris un truc sur le marketing.", good: false,
    explain: "Trop vague : aucun objectif, format ni contexte précis." },
  { text: "Tu es expert en marketing digital. Rédige 3 idées de post LinkedIn pour promouvoir une formation IA destinée aux PME, ton dynamique, chacune en 2-3 phrases.", good: true,
    explain: "Rôle, objectif, format et ton sont tous précisés : c'est exploitable directement." },
  { text: "Fais-moi un résumé.", good: false,
    explain: "Résumé de quoi ? Pour qui ? En combien de mots ? Rien n'est précisé." },
  { text: "Résume ce document RH de 5 pages en 5 points clés, destinés à des managers pressés, dans un langage simple et direct.", good: true,
    explain: "Le format (5 points), le public (managers) et le ton (simple, direct) sont clairs." },
  { text: "Aide-moi avec mon code.", good: false,
    explain: "Quel langage ? Quel bug ? Quel comportement attendu ? Impossible à traiter tel quel." },
  { text: "En Python, ma fonction de tri lève une erreur 'IndexError' sur une liste vide. Corrige le code ci-dessous et explique la cause en une phrase.", good: true,
    explain: "Contexte technique précis, objectif clair (corriger + expliquer) : l'IA peut agir directement." },
  { text: "Parle-moi de l'intelligence artificielle.", good: false,
    explain: "Sujet bien trop large : sous quel angle, pour quel usage, avec quelle longueur ?" },
  { text: "Explique en 4 phrases simples, à un enfant de 10 ans, ce qu'est un modèle de langage comme ChatGPT, sans jargon technique.", good: true,
    explain: "Public, longueur et niveau de langage sont définis : la réponse sera calibrée du premier coup." }
];

let idx = 0;
let streak = 0;
let correctCount = 0;

function loadSort() {
  document.getElementById('sort-index').textContent = idx + 1;
  document.getElementById('sort-card').textContent = '"' + sortPrompts[idx].text + '"';
  document.getElementById('sort-feedback').style.display = 'none';
  document.getElementById('sort-next').style.display = 'none';
  document.querySelectorAll('#sort-card ~ div button').forEach(b => b.disabled = false);
}

function sortAnswer(userSaysGood) {
  const p = sortPrompts[idx];
  const correct = (userSaysGood === p.good);
  if (correct) { streak++; correctCount++; } else { streak = 0; }
  document.getElementById('sort-streak').textContent = streak;

  const fb = document.getElementById('sort-feedback');
  fb.style.display = 'block';
  fb.innerHTML = correct
    ? `<div class="good-reflex-box"><strong>Exact !</strong> ${p.explain}</div>`
    : `<div class="warning-practice-box"><strong>Pas tout à fait.</strong> ${p.explain}</div>`;

  document.getElementById('sort-next').style.display = 'inline-flex';
}

function nextSort() {
  idx++;
  if (idx < sortPrompts.length) {
    loadSort();
  } else {
    document.getElementById('sort-card').style.display = 'none';
    document.getElementById('sort-next').style.display = 'none';
    document.getElementById('sort-feedback').style.display = 'none';
    document.getElementById('sort-final').textContent = `Score : ${correctCount} / ${sortPrompts.length} prompts bien triés. Meilleure série : ${Math.max(streak, correctCount > 0 ? streak : 0)} 🔥`;
    document.getElementById('sort-debrief').style.display = 'block';
  }
}

function restartSort() {
  idx = 0; streak = 0; correctCount = 0;
  document.getElementById('sort-streak').textContent = '0';
  document.getElementById('sort-card').style.display = 'block';
  document.getElementById('sort-debrief').style.display = 'none';
  loadSort();
}

restartSort();
</script>
