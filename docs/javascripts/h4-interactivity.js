// --- 1. GESTION DU COMPARATEUR VISUEL (ONGLETS) ---
function switchH4Case(caseId, btn) {
  var panels = document.querySelectorAll('.h4-case-panel');
  var btns = document.querySelectorAll('.h4-tab-btn');
  
  panels.forEach(function(p) { p.style.display = 'none'; });
  
  btns.forEach(function(b) {
    b.style.background = 'var(--md-default-bg-color, #fff)';
    b.style.color = 'var(--md-typeset-color, #000)';
    b.style.borderColor = 'var(--md-default-fg-color--light, #ccc)';
  });
  
  var targetPanel = document.getElementById('h4-case-' + caseId);
  if (targetPanel) {
    targetPanel.style.display = 'grid';
  }
  
  btn.style.background = '#1a5fb4';
  btn.style.color = '#fff';
  btn.style.borderColor = '#1a5fb4';
}

// --- 2. JEU "TROUVEZ L'ÉLÉMENT MANQUANT" ---
document.addEventListener('DOMContentLoaded', function() {
  const questions = [
    {
      prompt: "« Un chat persan endormi sur un coussin en velours. Style photo macro. Palette de tons chauds beige et crème. Format carré 1:1. »",
      missing: "Ambiance & Lumière",
      explanation: "Il manque l'éclairage et l'atmosphère (ex: lumière dorée du matin, néon, cozy...).",
      options: ["Sujet principal", "Style artistique", "Ambiance & Lumière", "Palette de couleurs", "Composition & Format"]
    },
    {
      prompt: "« Un bureau de travail moderne. Éclairage néon cyberpunk bleu et rose, ambiance futuriste. Palette bleu nuit et magenta. Format horizontal 16:9. »",
      missing: "Style artistique",
      explanation: "On ne sait pas s'il s'agit d'une photo réaliste, d'une illustration 3D, d'un dessin vectoriel ou d'une aquarelle.",
      options: ["Sujet principal", "Style artistique", "Ambiance & Lumière", "Palette de couleurs", "Composition & Format"]
    },
    {
      prompt: "« Style rendu 3D Isométrique. Éclairage doux d'après-midi ensoleillé. Palette de vert sauge, bois blond et blanc. Format vertical 9:16. »",
      missing: "Sujet principal",
      explanation: "On sait comment dessiner et dans quel style, mais on a oublié de préciser QUOI représenter !",
      options: ["Sujet principal", "Style artistique", "Ambiance & Lumière", "Palette de couleurs", "Composition & Format"]
    },
    {
      prompt: "« Un bol de rāmen fumant. Style illustration pop art rétro. Ambiance dynamique et lumineuse. Vue du dessus en plan serré (close-up). »",
      missing: "Palette de couleurs",
      explanation: "Il manque l'indication des 3 à 4 teintes dominantes (ex: rouge vif, jaune, noir profond).",
      options: ["Sujet principal", "Style artistique", "Ambiance & Lumière", "Palette de couleurs", "Composition & Format"]
    },
    {
      prompt: "« Une forêt enchantée avec des champignons luminescents. Style aquarelle délicate. Ambiance mystérieuse et nocturne. Palette de violet, bleu nuit et vert émeraude. »",
      missing: "Composition & Format",
      explanation: "Il manque le cadrage (plan large, vue panoramique) et le ratio d'aspect (16:9, 1:1, etc.).",
      options: ["Sujet principal", "Style artistique", "Ambiance & Lumière", "Palette de couleurs", "Composition & Format"]
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const progressEl = document.getElementById('find-element-progress');
  const promptBoxEl = document.getElementById('find-element-prompt-box');
  const choicesEl = document.getElementById('find-element-choices');
  const feedbackEl = document.getElementById('find-element-feedback');
  const nextBtn = document.getElementById('find-element-next');
  const resetBtn = document.getElementById('find-element-reset');
  const scoreEl = document.getElementById('find-element-score');

  if (!promptBoxEl || !choicesEl) return; // Sécurité si les éléments n'existent pas dans la page

  function loadQuestion() {
    feedbackEl.style.display = 'none';
    nextBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    scoreEl.style.display = 'none';

    progressEl.textContent = `Question ${currentIdx + 1} sur ${questions.length}`;
    promptBoxEl.textContent = questions[currentIdx].prompt;

    choicesEl.innerHTML = '';
    questions[currentIdx].options.forEach(option => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = option;
      btn.style.cssText = 'padding: 10px 14px; border: 1px solid var(--md-default-fg-color--light, #ccc); background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000); border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; text-align: center; transition: all 0.2s;';
      
      btn.addEventListener('click', () => checkAnswer(option, btn));
      choicesEl.appendChild(btn);
    });
  }

  function checkAnswer(selectedOption, clickedBtn) {
    const q = questions[currentIdx];
    const buttons = choicesEl.querySelectorAll('button');
    buttons.forEach(b => b.disabled = true);

    if (selectedOption === q.missing) {
      score++;
      clickedBtn.style.background = '#28a745';
      clickedBtn.style.color = '#fff';
      clickedBtn.style.borderColor = '#28a745';
      feedbackEl.style.background = 'rgba(40, 167, 69, 0.15)';
      feedbackEl.style.border = '1px solid #28a745';
      feedbackEl.style.color = 'var(--md-typeset-color, #000)';
      feedbackEl.innerHTML = `<strong>Bravo !</strong> C'est bien <em>${q.missing}</em> qui manque. <br><small>${q.explanation}</small>`;
    } else {
      clickedBtn.style.background = '#dc3545';
      clickedBtn.style.color = '#fff';
      clickedBtn.style.borderColor = '#dc3545';
      feedbackEl.style.background = 'rgba(220, 53, 69, 0.15)';
      feedbackEl.style.border = '1px solid #dc3545';
      feedbackEl.style.color = 'var(--md-typeset-color, #000)';
      feedbackEl.innerHTML = `<strong>Incorrect.</strong> L'élément manquant était <strong>${q.missing}</strong>. <br><small>${q.explanation}</small>`;
    }

    feedbackEl.style.display = 'block';

    if (currentIdx < questions.length - 1) {
      nextBtn.style.display = 'inline-block';
    } else {
      showFinalScore();
    }
  }

  function showFinalScore() {
    scoreEl.style.display = 'block';
    scoreEl.innerHTML = `🎉 Exercice terminé ! Votre score : <strong>${score} / ${questions.length}</strong>`;
    resetBtn.style.display = 'inline-block';
  }

  nextBtn.addEventListener('click', () => {
    currentIdx++;
    loadQuestion();
  });

  resetBtn.addEventListener('click', () => {
    currentIdx = 0;
    score = 0;
    loadQuestion();
  });

  // Démarrage du jeu
  loadQuestion();
});
