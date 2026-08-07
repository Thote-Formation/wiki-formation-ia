/* ==================================================== */
/* H7 INTERACTIVITY SCRIPT                             */
/* ==================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* --- 1. JEU DE CLASSIFICATION DES RISQUES AI ACT --- */
  initRiskIaGame();

  /* --- 2. GENERATEUR DE MENTION DE TRANSPARENCE --- */
  initTransparencyGen();
});

/* --- FUNCTION 1: RISK CLASSIFICATION GAME --- */
function initRiskIaGame() {
  const levels = [
    { name: "Inacceptable", color: "rgba(201, 86, 74, 0.15)", border: "#c9564a" },
    { name: "Haut risque", color: "rgba(217, 164, 65, 0.15)", border: "#d9a441" },
    { name: "Risque limité", color: "rgba(26, 95, 180, 0.15)", border: "#1a5fb4" },
    { name: "Risque minimal", color: "rgba(74, 155, 94, 0.15)", border: "#4a9b5e" }
  ];

  const questions = [
    { situation: "Un système de notation sociale attribue un score de confiance aux citoyens à partir de leurs habitudes d'achat.", correct: "Inacceptable", explain: "La notation sociale publique ou privée est formellement interdite par l'IA Act." },
    { situation: "Une IA trie les CV et rejette automatiquement 80% des candidatures féminines sans explication.", correct: "Haut risque", explain: "L'usage de l'IA pour le recrutement relève du Haut Risque (Annexe III) et impose une supervision humaine." },
    { situation: "Un chatbot d'assistance client répond aux questions fréquentes sur les horaires d'un magasin.", correct: "Risque minimal", explain: "Usage simple sans impact direct sur les droits fondamentaux." },
    { situation: "Un assistant IA rédige des articles de blog et doit indiquer qu'ils ont été générés automatiquement.", correct: "Risque limité", explain: "Les LLM et outils de génération de contenu sont soumis à une obligation de transparence." },
    { situation: "Une banque utilise une IA qui accorde ou refuse seule des prêts bancaires aux particuliers.", correct: "Haut risque", explain: "L'évaluation de la solvabilité financière est classée Haut Risque : explicabilité et recours humain obligatoires." },
    { situation: "Un correcteur orthographique et grammatical automatique intégré dans un logiciel de traitement de texte.", correct: "Risque minimal", explain: "Aucun risque sur les droits des personnes, exempté de contraintes réglementaires." }
  ];

  let i = 0;
  let scoreCount = 0;

  const progress = document.getElementById('risk-ia-progress');
  const situationEl = document.getElementById('risk-ia-situation');
  const choicesEl = document.getElementById('risk-ia-choices');
  const feedback = document.getElementById('risk-ia-feedback');
  const nextBtn = document.getElementById('risk-ia-next');
  const restartBtn = document.getElementById('risk-ia-restart');
  const scoreEl = document.getElementById('risk-ia-score');

  if (!situationEl || !choicesEl) return;

  function render() {
    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    scoreEl.style.display = 'none';

    progress.textContent = "Question " + (i + 1) + " sur " + questions.length;
    situationEl.textContent = questions[i].situation;
    choicesEl.innerHTML = '';

    levels.forEach(lvl => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `text-align: center; padding: 12px 10px; border: 1px solid ${lvl.border}; border-radius: 8px; background: ${lvl.color}; cursor: pointer; font-size: 13px; color: var(--md-typeset-color, #1a1a1a); font-weight: 600; width: 100%; transition: transform 0.1s, filter 0.2s;`;
      btn.textContent = lvl.name;
      
      btn.addEventListener('mouseenter', () => btn.style.filter = "brightness(0.95)");
      btn.addEventListener('mouseleave', () => btn.style.filter = "brightness(1)");
      btn.addEventListener('click', () => answer(lvl.name, btn));
      
      choicesEl.appendChild(btn);
    });
  }

  function answer(chosen, btn) {
    const q = questions[i];
    const allBtns = choicesEl.querySelectorAll('button');
    
    allBtns.forEach(b => {
      b.disabled = true;
      b.style.cursor = "default";
      b.style.filter = "none";
      if (b.textContent === q.correct) {
        b.style.background = "rgba(74, 155, 94, 0.25)";
        b.style.borderColor = "#4a9b5e";
      }
    });

    if (chosen === q.correct) {
      feedback.style.background = "rgba(74, 155, 94, 0.15)";
      feedback.style.border = "1px solid #4a9b5e";
      feedback.textContent = "✅ Exact. " + q.explain;
      scoreCount++;
    } else {
      btn.style.background = "rgba(201, 86, 74, 0.25)";
      btn.style.borderColor = "#c9564a";
      
      feedback.style.background = "rgba(201, 86, 74, 0.15)";
      feedback.style.border = "1px solid #c9564a";
      feedback.textContent = "❌ Incorrect. " + q.explain;
    }

    feedback.style.display = 'block';

    if (i < questions.length - 1) {
      nextBtn.style.display = 'inline-block';
    } else {
      scoreEl.style.display = 'block';
      scoreEl.textContent = "Score final : " + scoreCount + " / " + questions.length;
      restartBtn.style.display = 'inline-block';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      i++;
      render();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      i = 0;
      scoreCount = 0;
      render();
    });
  }

  render();
}

/* --- FUNCTION 2: TRANSPARENCY STATEMENT GENERATOR --- */
function initTransparencyGen() {
  const typeSelect = document.getElementById('transparency-type');
  const resultBox = document.getElementById('transparency-result');
  const copyBtn = document.getElementById('transparency-copy-btn');

  if (!typeSelect || !resultBox) return;

  const templates = {
    text: "« Remarque de transparence (AI Act Art. 50) : Ce document/article a été partiellement rédigé et structuré avec l'assistance d'une intelligence artificielle générative. L'intégralité du contenu a été revue, vérifiée et validée par notre équipe éditoriale humaine. »",
    image: "« Visuel généré par IA (AI Act Art. 50) : Cette illustration a été créée à l'aide d'un outil d'IA générative d'images (DALL-E / Firefly). »",
    bot: "« Assistant virtuel : Vous échangez actuellement avec un agent conversationnel automatisé propulsé par l'IA. Si vous souhaitez parler à un conseiller humain, cliquez sur le bouton dédié. »"
  };

  function update() {
    const val = typeSelect.value;
    resultBox.textContent = templates[val] || "";
  }

  typeSelect.addEventListener('change', update);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(resultBox.textContent).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = "✅ Mention copiée !";
        setTimeout(() => { copyBtn.textContent = orig; }, 2000);
      });
    });
  }

  update();
}
