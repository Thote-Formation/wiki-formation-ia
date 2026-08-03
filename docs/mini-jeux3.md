# 🧑‍🍳 Le Chef Prompteur : Construisez le Prompt Parfait

Un bon prompt, ce n'est pas de la magie : c'est une **recette avec des ingrédients précis**. Dans ce jeu, vous allez construire un prompt étape par étape, en choisissant le meilleur ingrédient à chaque fois, et voir en direct comment la **qualité de la réponse de l'IA** s'améliore.

La recette du jour : demander à une IA de **rédiger une annonce de recrutement pour un poste de comptable**.

---

<div id="chef-container" style="background:#1e1e2e; color:#cdd6f4; border-radius:12px; padding:24px; box-shadow:0 8px 24px rgba(0,0,0,0.3); font-family: system-ui, -apple-system, sans-serif;">

  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #313244; padding-bottom:12px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
    <span id="step-indicator" style="background:#fab387; color:#11111b; font-weight:bold; padding:4px 12px; border-radius:12px; font-size:0.85em;">INGRÉDIENT 1 / 5</span>
    <div style="text-align:right;">
      <span style="font-size:0.8em; color:#a6adc8;">Qualité du prompt</span>
      <div style="width:140px; height:12px; background:#313244; border-radius:6px; overflow:hidden; margin-top:4px;">
        <div id="quality-bar" style="width:0%; height:100%; background:#f38ba8; transition: all 0.4s;"></div>
      </div>
    </div>
  </div>

  <h3 id="step-title" style="margin-top:0; color:#fff;"></h3>
  <p id="step-desc" style="color:#a6adc8; font-size:0.9em;"></p>

  <div id="options-container" style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;"></div>

  <!-- Prompt en construction -->
  <div style="background:#181825; border-radius:8px; padding:16px;">
    <div style="font-size:0.8em; color:#a6adc8; margin-bottom:6px;">📝 VOTRE PROMPT EN CONSTRUCTION :</div>
    <div id="prompt-preview" style="font-family: 'Roboto Mono', monospace; font-size:0.9em; line-height:1.6; color:#f9e2af; white-space:pre-wrap;">(vide)</div>
  </div>

  <div id="debrief-box" style="display:none; background:#232634; border:2px solid #a6e3a1; border-radius:8px; padding:20px; margin-top:20px;">
    <h3 style="color:#a6e3a1; margin-top:0;">🍽️ VOTRE PROMPT EST PRÊT !</h3>
    <p id="final-quality" style="font-weight:bold;"></p>

    <div style="display:flex; flex-direction:column; gap:14px; margin:16px 0;">
      <div style="background:#181825; padding:12px; border-radius:6px;">
        <strong style="color:#f38ba8;">❌ Un prompt faible aurait donné :</strong><br>
        <small style="color:#a6adc8;">"Écris une annonce pour un comptable." → Une réponse générique, sans ton, sans structure, à retravailler entièrement.</small>
      </div>
      <div style="background:#181825; padding:12px; border-radius:6px;">
        <strong style="color:#a6e3a1;">✅ Votre prompt CROFT donnerait :</strong><br>
        <small id="good-result" style="color:#a6adc8;"></small>
      </div>
    </div>

    <p>La méthode <strong>CROFT</strong> (Contexte, Rôle, Objectif, Format, Ton) permet de structurer n'importe quel prompt :</p>
    <div style="display:flex; flex-direction:column; gap:10px; margin:12px 0;">
      <div style="background:#181825; padding:10px; border-radius:6px;"><strong>C</strong>ontexte : la situation, les infos de fond nécessaires.</div>
      <div style="background:#181825; padding:10px; border-radius:6px;"><strong>R</strong>ôle : qui l'IA doit incarner pour répondre.</div>
      <div style="background:#181825; padding:10px; border-radius:6px;"><strong>O</strong>bjectif : ce que vous voulez concrètement obtenir.</div>
      <div style="background:#181825; padding:10px; border-radius:6px;"><strong>F</strong>ormat : la structure attendue de la réponse.</div>
      <div style="background:#181825; padding:10px; border-radius:6px;"><strong>T</strong>on : le style et le registre de langage.</div>
    </div>

    <button onclick="restartGame()" style="background:#a6e3a1; color:#11111b; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; margin-top:10px;">🔄 Recommencer la recette</button>
  </div>
</div>

<script>
const steps = [
  { key: "Contexte", title: "Ingrédient 1 : le Contexte", desc: "Quelles informations de fond l'IA doit-elle connaître avant de commencer ?",
    options: [
      { label: "Rien de spécial, elle devinera.", points: 0, text: "" },
      { label: "Notre entreprise est une PME de 20 salariés dans le secteur du bâtiment, en croissance.", points: 20, text: "Contexte : notre entreprise est une PME de 20 salariés dans le secteur du bâtiment, en croissance." },
      { label: "Une entreprise quelconque cherche quelqu'un.", points: 5, text: "Contexte : une entreprise cherche un employé." }
    ]},
  { key: "Rôle", title: "Ingrédient 2 : le Rôle", desc: "Quel rôle ou quelle expertise l'IA doit-elle endosser pour bien répondre ?",
    options: [
      { label: "Tu es une IA.", points: 0, text: "" },
      { label: "Tu es un assistant quelconque.", points: 5, text: "Rôle : tu es un assistant." },
      { label: "Tu es un responsable RH expérimenté, spécialisé dans le recrutement de profils comptables.", points: 20, text: "Rôle : tu es un responsable RH expérimenté, spécialisé dans le recrutement de profils comptables." }
    ]},
  { key: "Objectif", title: "Ingrédient 3 : l'Objectif", desc: "Que voulez-vous précisément obtenir comme résultat ?",
    options: [
      { label: "Fais quelque chose sur le recrutement.", points: 0, text: "" },
      { label: "Rédige une annonce.", points: 8, text: "Objectif : rédiger une annonce de recrutement." },
      { label: "Rédige une annonce de recrutement complète, attractive, incluant missions, profil recherché et avantages, pour un poste de comptable en CDI.", points: 20, text: "Objectif : rédiger une annonce de recrutement complète et attractive pour un poste de comptable en CDI, incluant missions, profil recherché et avantages." }
    ]},
  { key: "Format", title: "Ingrédient 4 : le Format", desc: "Sous quelle structure voulez-vous recevoir la réponse ?",
    options: [
      { label: "Peu importe la forme.", points: 0, text: "" },
      { label: "Un texte classique.", points: 8, text: "Format : un texte simple." },
      { label: "Structuré en 4 sections avec titres : Présentation de l'entreprise / Missions / Profil recherché / Avantages, avec des listes à puces.", points: 20, text: "Format : structuré en 4 sections (Présentation de l'entreprise, Missions, Profil recherché, Avantages), avec des listes à puces." }
    ]},
  { key: "Ton", title: "Ingrédient 5 : le Ton", desc: "Quel style et quel registre de langage attendez-vous ?",
    options: [
      { label: "N'importe quel ton.", points: 0, text: "" },
      { label: "Un ton correct.", points: 8, text: "Ton : professionnel." },
      { label: "Un ton professionnel mais chaleureux et dynamique, qui donne envie de postuler sans être trop familier.", points: 20, text: "Ton : professionnel, chaleureux et dynamique, sans être trop familier." }
    ]}
];

let currentStep = 0;
let quality = 0;
let promptParts = [];

function loadStep() {
  const s = steps[currentStep];
  document.getElementById('step-indicator').textContent = `INGRÉDIENT ${currentStep + 1} / ${steps.length}`;
  document.getElementById('step-title').textContent = s.title;
  document.getElementById('step-desc').textContent = s.desc;

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  s.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.style.cssText = "background:#313244; color:#cdd6f4; border:1px solid #45475a; padding:12px 16px; border-radius:8px; text-align:left; cursor:pointer; font-size:0.95em; line-height:1.4;";
    btn.textContent = opt.label;
    btn.onmouseover = () => btn.style.background = '#45475a';
    btn.onmouseout = () => btn.style.background = '#313244';
    btn.onclick = () => chooseOption(opt);
    container.appendChild(btn);
  });
}

function chooseOption(opt) {
  quality += opt.points;
  const maxQuality = steps.length * 20;
  const pct = Math.round((quality / maxQuality) * 100);
  const bar = document.getElementById('quality-bar');
  bar.style.width = pct + '%';
  bar.style.background = pct > 70 ? '#a6e3a1' : (pct > 35 ? '#f9e2af' : '#f38ba8');

  if (opt.text) promptParts.push(opt.text);
  document.getElementById('prompt-preview').textContent = promptParts.length ? promptParts.join('\n') : '(vide)';

  currentStep++;
  if (currentStep < steps.length) {
    loadStep();
  } else {
    document.getElementById('options-container').style.display = 'none';
    document.getElementById('final-quality').textContent = `Qualité finale du prompt : ${pct}%`;
    document.getElementById('good-result').textContent = promptParts.length >= 4
      ? "Une annonce complète, structurée en sections claires, adaptée à votre entreprise et à son secteur, avec un ton qui donne envie de postuler — exploitable presque telle quelle."
      : "Une réponse plus correcte que le prompt faible, mais encore incomplète : il manque des ingrédients clés pour un résultat vraiment exploitable.";
    document.getElementById('debrief-box').style.display = 'block';
  }
}

function restartGame() {
  currentStep = 0;
  quality = 0;
  promptParts = [];
  document.getElementById('quality-bar').style.width = '0%';
  document.getElementById('prompt-preview').textContent = '(vide)';
  document.getElementById('options-container').style.display = 'flex';
  document.getElementById('debrief-box').style.display = 'none';
  loadStep();
}

loadStep();
</script>
