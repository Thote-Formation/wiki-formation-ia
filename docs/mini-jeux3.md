# 🧑‍🍳 Le Chef Prompteur : Construisez le Prompt Parfait

Un bon prompt, ce n'est pas de la magie : c'est une **recette avec des ingrédients précis**. Dans ce jeu, vous allez construire un prompt étape par étape, en choisissant le meilleur ingrédient à chaque fois, et voir en direct comment la **qualité de la réponse de l'IA** s'améliore.

La recette du jour : demander à une IA de **rédiger une annonce de recrutement pour un poste de comptable**.

---

<style>
  /* Extensions CSS pour l'interactivité spécifique du Chef Prompteur */
  .chef-quality-bg {
    width: 140px;
    height: 12px;
    background: #cbd5e1;
    border-radius: 6px;
    overflow: hidden;
  }

  [data-md-color-scheme="slate"] .chef-quality-bg {
    background: #475569;
  }

  .chef-quality-fill {
    height: 100%;
    width: 0%;
    background: #dc2626;
    transition: all 0.4s ease;
  }

  .chef-prompt-preview {
    background: var(--md-code-bg-color, #f8fafc);
    border: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
    border-radius: 12px;
    padding: 16px;
    font-family: 'Roboto Mono', monospace !important;
    font-size: 0.9rem;
    line-height: 1.6;
    color: var(--md-typeset-color);
    white-space: pre-wrap;
  }

  [data-md-color-scheme="slate"] .chef-prompt-preview {
    background: #1e293b;
    border-color: #475569;
  }

  .chef-option-btn {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    white-space: normal;
    height: auto;
    padding: 12px 16px;
    font-size: 0.95rem;
    font-weight: 500;
  }
</style>

<!-- INTERFACE DU JEU -->
<div id="chef-container" class="prompt-generator">

  <!-- En-tête -->
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--md-default-fg-color--lightest, #cbd5e1); padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
    <span id="step-indicator" class="wiki-badge warning">INGRÉDIENT 1 / 5</span>
    <div style="text-align: right;">
      <span style="font-size: 0.8rem; font-weight: 600; opacity: 0.8;">Qualité du prompt</span>
      <div class="chef-quality-bg" style="margin-top: 4px;">
        <div id="quality-bar" class="chef-quality-fill"></div>
      </div>
    </div>
  </div>

  <h3 id="step-title" style="margin-top: 0;"></h3>
  <p id="step-desc" style="opacity: 0.8; font-size: 0.95rem; margin-bottom: 16px;"></p>

  <div id="options-container" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;"></div>

  <!-- Prompt en construction -->
  <div style="margin-bottom: 20px;">
    <div style="font-size: 0.8rem; font-weight: 700; opacity: 0.8; margin-bottom: 8px;">📝 VOTRE PROMPT EN CONSTRUCTION :</div>
    <div id="prompt-preview" class="chef-prompt-preview">(vide)</div>
  </div>

  <!-- Bilan final -->
  <div id="debrief-box" class="good-reflex-box" style="display: none; margin-top: 20px;">
    <h3 style="margin-top: 0;">🍽️ VOTRE PROMPT EST PRÊT !</h3>
    <p id="final-quality" style="font-weight: 700; font-size: 1.1rem;"></p>

    <div style="display: flex; flex-direction: column; gap: 14px; margin: 16px 0;">
      <div class="wiki-card">
        <strong style="color: #dc2626;">❌ Un prompt faible aurait donné :</strong><br>
        <small style="opacity: 0.8;">"Écris une annonce pour un comptable." → Une réponse générique, sans ton, sans structure, à retravailler entièrement.</small>
      </div>
      <div class="wiki-card">
        <strong style="color: #16a34a;">✅ Votre prompt CROFT donnerait :</strong><br>
        <small id="good-result" style="opacity: 0.8;"></small>
      </div>
    </div>

    <p>La méthode <strong>CROFT</strong> (Contexte, Rôle, Objectif, Format, Ton) permet de structurer n'importe quel prompt :</p>

    <div style="display: flex; flex-direction: column; gap: 10px; margin: 12px 0;">
      <div class="wiki-card"><strong>C</strong>ontexte : la situation, les infos de fond nécessaires.</div>
      <div class="wiki-card"><strong>R</strong>ôle : qui l'IA doit incarner pour répondre.</div>
      <div class="wiki-card"><strong>O</strong>bjectif : ce que vous voulez concrètement obtenir.</div>
      <div class="wiki-card"><strong>F</strong>ormat : la structure attendue de la réponse.</div>
      <div class="wiki-card"><strong>T</strong>on : le style et le registre de langage.</div>
    </div>

    <button onclick="restartGame()" class="wiki-button primary" style="margin-top: 10px;">
      🔄 Recommencer la recette
    </button>
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
    btn.className = 'wiki-button chef-option-btn';
    btn.textContent = opt.label;
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
  
  // Changement dynamique de la couleur de la barre selon la qualité
  if (pct > 70) {
    bar.style.background = '#16a34a';
  } else if (pct > 35) {
    bar.style.background = '#d97706';
  } else {
    bar.style.background = '#dc2626';
  }

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
