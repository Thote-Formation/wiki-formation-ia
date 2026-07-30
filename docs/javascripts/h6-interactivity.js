/* ==================================================== */
/* H6 INTERACTIVITY SCRIPT                             */
/* ==================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* --- 1. COMPARATEUR AVANT / APRÈS --- */
  initBeforeAfter();

  /* --- 2. QUIZ INTERACTIF DÉTECTEUR DE BIAIS --- */
  initH6Quiz();

  /* --- 3. GÉNÉRATEUR DE PROMPT ACCESSIBLE --- */
  initPromptGenerator();
});

/* --- FUNCTION 1: DISCRET TOGGLE SWITCH --- */
function initBeforeAfter() {
  const scenarios = [
    {
      avant: "« Les employés les plus âgés auront peut-être du mal avec les nouvelles formations numériques. Il faudra que les managers les motivent davantage, car ils ont souvent peur de la technologie et résistent aux changements. »",
      apres: "« Certaines personnes peuvent se sentir moins à l'aise avec les nouvelles technologies, quel que soit leur âge. Notre objectif : accompagner chacun avec des explications claires et progressives. Les managers peuvent proposer du temps dédié pour rassurer les équipes. »",
      criteria: ["Pas de stéréotype discriminatoire lié à l'âge", "Ton bienveillant et non infantilisant", "Suppression des généralisations abusives"]
    },
    {
      avant: "« Pour les personnes handicapées qui ne peuvent pas suivre la réunion, un compte-rendu sera envoyé pour qu'elles ne soient pas désavantagées. »",
      apres: "« Afin de garantir l'accessibilité de nos échanges, un compte-rendu écrit ainsi qu'un enregistrement sous-titré seront mis à disposition de l'ensemble des participants à l'issue de la réunion. »",
      criteria: ["Vocabulaire valorisant et centré sur l'accessibilité", "Approche universelle bénéficiant à tous", "Solutions techniques concrètes intégrées"]
    },
    {
      avant: "« Chaque commercial doit envoyer son rapport à son directeur avant vendredi. Il doit s'assurer que tous ses clients ont signé. »",
      apres: "« Chaque membre de l'équipe commerciale est invité(e) à transmettre son rapport à sa responsable ou son responsable d'ici vendredi, en vérifiant la validation de l'ensemble des contrats clients. »",
      criteria: ["Langage neutre et équilibré", "Valorisation du collectif", "Formulations professionnelles rééquilibrées"]
    }
  ];

  const scenarioSelect = document.getElementById('before-after-scenario');
  const toggleInput = document.getElementById('toggle-before-after');
  const labelBefore = document.getElementById('label-before');
  const labelAfter = document.getElementById('label-after');
  const stage = document.getElementById('before-after-stage');
  const checklist = document.getElementById('before-after-checklist');
  const copyBtn = document.getElementById('before-after-copy-btn');

  if (!toggleInput || !stage) return;

  let currentScenario = 0;

  function render() {
    const sc = scenarios[currentScenario];
    const isApres = toggleInput.checked;

    // Mise à jour du texte
    stage.textContent = isApres ? sc.apres : sc.avant;

    // Opacité dynamique sur les libellés autour du toggle
    if (labelBefore && labelAfter) {
      labelBefore.style.opacity = isApres ? '0.4' : '1';
      labelAfter.style.opacity = isApres ? '1' : '0.4';
    }

    // Mise à jour des critères
    checklist.innerHTML = '';
    sc.criteria.forEach((crit) => {
      const item = document.createElement('div');
      item.style.cssText = "display: flex; align-items: center; gap: 10px; padding: 4px 0; font-size: 13px;";
      const mark = isApres ? '✓' : '✗';
      const color = isApres ? '#4a9b5e' : '#c9564a';
      item.innerHTML = `<span style="font-weight: 700; min-width: 18px; color: ${color};">${mark}</span> <span>${crit}</span>`;
      checklist.appendChild(item);
    });
  }

  // Événements
  toggleInput.addEventListener('change', render);

  scenarioSelect.addEventListener('change', (e) => {
    currentScenario = parseInt(e.target.value, 10);
    toggleInput.checked = false; // Retour sur 'Avant' lors du changement de cas
    render();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const sc = scenarios[currentScenario];
      navigator.clipboard.writeText(sc.apres).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✅ Version optimisée copiée !";
        setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
      });
    });
  }

  render();
}
/* --- FUNCTION 2: QUIZ DETECTEUR DE BIAIS --- */
function initH6Quiz() {
  const quizData = [
    {
      q: "Un prompt demande à l'IA : « Génère une photo d'un expert en cybersécurité ». L'IA génère systématiquement un homme de 30 ans avec un sweat à capuche. De quoi s'agit-il ?",
      options: [
        "D'un bogue technique de l'algorithme.",
        "D'un biais d'entraînement reproduisant un stéréotype.",
        "D'une consigne d'accessibilité RGAA."
      ],
      correct: 1,
      explanation: "L'IA réplique les stéréotypes dominants sur le Web. C'est au concepteur d'orienter le prompt (ex: préciser le genre, l'âge, l'environnement)."
    },
    {
      q: "Quelle est la meilleure façon de rendre une image accessible aux personnes malvoyantes ?",
      options: [
        "Mettre l'image en noir et blanc.",
        "Rédiger un texte alternatif (`alt`) explicatif et descriptif.",
        "Augmenter simplement la taille de l'image."
      ],
      correct: 1,
      explanation: "La balise `alt` permet aux lecteurs d'écran de vocaliser l'image de manière précise pour les personnes déficientes visuelles."
    }
  ];

  let currentQ = 0;
  const qBox = document.getElementById('h6-quiz-question');
  const optBox = document.getElementById('h6-quiz-options');
  const feedBox = document.getElementById('h6-quiz-feedback');
  const nextBtn = document.getElementById('h6-quiz-next');

  if (!qBox || !optBox) return;

  function loadQ() {
    feedBox.style.display = 'none';
    nextBtn.style.display = 'none';
    const q = quizData[currentQ];
    qBox.textContent = `Question ${currentQ + 1}/${quizData.length} : ${q.q}`;
    optBox.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = "padding: 10px 14px; text-align: left; border: 1px solid var(--md-default-fg-color--light, #ccc); border-radius: 6px; background: var(--md-default-bg-color, #fff); cursor: pointer; font-size: 13px; font-weight: 500; color: var(--md-typeset-color, #333);";
      btn.textContent = opt;
      btn.onclick = () => checkAns(idx, btn);
      optBox.appendChild(btn);
    });
  }

  function checkAns(idx, btn) {
    const q = quizData[currentQ];
    const allBtns = optBox.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (idx === q.correct) {
      btn.style.background = "rgba(74, 155, 94, 0.2)";
      btn.style.borderColor = "#4a9b5e";
      feedBox.style.background = "rgba(74, 155, 94, 0.1)";
      feedBox.style.border = "1px solid #4a9b5e";
      feedBox.style.color = "#2e6939";
      feedBox.innerHTML = `<strong>✅ Exact !</strong> ${q.explanation}`;
    } else {
      btn.style.background = "rgba(201, 86, 74, 0.2)";
      btn.style.borderColor = "#c9564a";
      feedBox.style.background = "rgba(201, 86, 74, 0.1)";
      feedBox.style.border = "1px solid #c9564a";
      feedBox.style.color = "#a13227";
      feedBox.innerHTML = `<strong>❌ Incorrect.</strong> ${q.explanation}`;
    }
    feedBox.style.display = 'block';

    if (currentQ < quizData.length - 1) {
      nextBtn.style.display = 'inline-block';
    }
  }

  nextBtn.onclick = () => {
    currentQ++;
    loadQ();
  };

  loadQ();
}

/* --- FUNCTION 3: GENERATEUR DE PROMPT --- */
function initPromptGenerator() {
  const targetSelect = document.getElementById('gen-target');
  const resultBox = document.getElementById('gen-prompt-result');
  const copyGenBtn = document.getElementById('gen-copy-btn');

  if (!targetSelect || !resultBox) return;

  const prompts = {
    dys: "« Agis en expert en lisibilité DYS. Reformule le texte suivant en utilisant des phrases courtes (15 mots max), des paragraphes aérés, des listes à puces et un vocabulaire simple sans jargon. Enlève les doubles négations. »",
    falc: "« Rédige la version Facile À Lire et à Comprendre (FALC / Niveau B1) du texte ci-dessous. Utilise des mots simples du quotidien, une seule idée par phrase et une structure chronologique claire. »",
    inclusive: "« Réécris ce texte en adoptant un langage neutre et inclusif. Élimine tout stéréotype de genre, d'âge ou d'origine. Assure-toi que chaque groupe concerné est représenté de manière équitable et valorisante. »"
  };

  function updatePrompt() {
    const val = targetSelect.value;
    resultBox.textContent = prompts[val] || "";
  }

  targetSelect.addEventListener('change', updatePrompt);
  
  if (copyGenBtn) {
    copyGenBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(resultBox.textContent).then(() => {
        const txt = copyGenBtn.textContent;
        copyGenBtn.textContent = "✅ Prompt copié !";
        setTimeout(() => { copyGenBtn.textContent = txt; }, 2000);
      });
    });
  }

  updatePrompt();
}
