/**
 * formation/js/h1-interactivity.js
 * Gestion des modules interactifs de la séance H1 (T9 Simulator & Mythes vs Réalités)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : SIMULATEUR T9
  // =========================================================================
  function initT9Simulator() {
    const steps = [
      {
        base: "Le chat mange sa",
        options: [
          ["croquette", 62],
          ["souris", 24],
          ["photo", 9],
          ["voiture", 5]
        ]
      },
      {
        base: "Le chat mange sa croquette",
        options: [
          ["tranquillement", 55],
          ["rapidement", 20],
          ["dans", 15],
          ["hier", 10]
        ]
      },
      {
        base: "Le chat mange sa croquette tranquillement",
        options: [
          ["dans", 50],
          ["avec", 30],
          ["sous", 20]
        ]
      },
      {
        base: "Le chat mange sa croquette tranquillement dans",
        options: [
          ["sa", 58],
          ["la", 27],
          ["une", 15]
        ]
      }
    ];

    let currentStep = 0;

    const sentenceEl = document.getElementById('t9-sentence');
    const choicesEl = document.getElementById('t9-choices');
    const doneEl = document.getElementById('t9-done');
    const resetBtn = document.getElementById('t9-reset');

    if (!sentenceEl || !choicesEl) return;

    function render() {
      if (currentStep < steps.length) {
        sentenceEl.textContent = steps[currentStep].base + " ...";
        choicesEl.innerHTML = '';
        doneEl.style.display = 'none';
        resetBtn.style.display = 'none';

        steps[currentStep].options.forEach(([word, pct]) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            border: 1px solid var(--md-default-fg-color--lightest, #d5d5d5);
            border-radius: 6px;
            background: var(--md-default-bg-color, #fff);
            color: var(--md-typeset-color, #1a1a1a);
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            transition: background 0.2s, transform 0.1s;
          `;

          btn.innerHTML = `
            <span><strong>${word}</strong></span>
            <span style="font-size:12px; opacity:0.8; background:rgba(26,95,180,0.1); color:#1a5fb4; padding:2px 8px; border-radius:12px; font-weight:700;">${pct}%</span>
          `;

          btn.addEventListener('mouseenter', () => {
            btn.style.background = "rgba(26, 95, 180, 0.08)";
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.background = "var(--md-default-bg-color, #fff)";
          });

          btn.addEventListener('click', () => {
            currentStep++;
            render();
          });

          choicesEl.appendChild(btn);
        });
      } else {
        sentenceEl.textContent = steps[steps.length - 1].base + " sa gamelle.";
        choicesEl.innerHTML = '';
        doneEl.style.display = 'block';
        doneEl.innerHTML = `💡 <strong>Analyse :</strong> Ce que vous venez de faire est exactement le principe de fonctionnement d'un LLM : calculer mot après mot la suite la plus probable d'un texte, selon son contexte.`;
        resetBtn.style.display = 'inline-block';
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentStep = 0;
        render();
      });
    }

    render();
  }

  // =========================================================================
  // 2. MODULE : JEU MYTHES VS REALITES
  // =========================================================================
  function initMythsGame() {
    const questions = [
      {
        text: "L'IA comprend réellement le sens des phrases qu'elle produit.",
        isRealite: false,
        explanation: "<b>MYTHE :</b> L'IA manipule des représentations mathématiques (vecteurs/tokens). Elle ne possède ni compréhension, ni conscience du monde réel."
      },
      {
        text: "Une réponse très structurée et affirmative de l'IA peut parfois être complètement fausse.",
        isRealite: true,
        explanation: "<b>RÉALITÉ :</b> C'est ce qu'on appelle une <i>hallucination</i>. Le modèle privilégie la plausibilité linguistique sur la vérité factuelle."
      },
      {
        text: "L'IA consulte automatiquement Google ou Wikipédia à chaque fois qu'on lui pose une question.",
        isRealite: false,
        explanation: "<b>MYTHE :</b> Sans outil de recherche web activé (ex: Search/RAG), un LLM répond exclusivement à partir des associations statistiques enregistrées lors de son entraînement."
      },
      {
        text: "Ajouter des détails et du contexte dans un prompt améliore directement la pertinence de la réponse.",
        isRealite: true,
        explanation: "<b>RÉALITÉ :</b> Plus le contexte est précis, plus l'IA réduit l'éventail des probabilités et cible le vocabulaire adéquat."
      }
    ];

    const container = document.getElementById('myths-list');
    const scoreEl = document.getElementById('myths-score');

    if (!container) return;

    let userAnswers = {};

    container.innerHTML = '';

    questions.forEach((q, idx) => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: var(--md-default-bg-color, #fff);
        border: 1px solid var(--md-default-fg-color--lightest, #d5d9de);
        border-radius: 8px;
        padding: 14px 16px;
        color: var(--md-typeset-color, #1a1a1a);
      `;

      card.innerHTML = `
        <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; line-height: 1.4;">
          ${idx + 1}. ${q.text}
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 8px;">
          <button type="button" class="myth-btn-mythe" style="flex: 1; padding: 8px; border: 1px solid var(--md-default-fg-color--light, #ccc); border-radius: 6px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #333); cursor: pointer; font-size: 13px; font-weight: 600;">MYTHE</button>
          <button type="button" class="myth-btn-realite" style="flex: 1; padding: 8px; border: 1px solid var(--md-default-fg-color--light, #ccc); border-radius: 6px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #333); cursor: pointer; font-size: 13px; font-weight: 600;">RÉALITÉ</button>
        </div>
        <div class="myth-explanation" style="display: none; padding: 10px 12px; border-radius: 6px; font-size: 13px; line-height: 1.5; margin-top: 10px;"></div>
      `;

      const btnMythe = card.querySelector('.myth-btn-mythe');
      const btnRealite = card.querySelector('.myth-btn-realite');
      const explaBox = card.querySelector('.myth-explanation');

      function handleChoice(userChoiceIsRealite) {
        if (userAnswers[idx] !== undefined) return; // Déjà répondu

        userAnswers[idx] = userChoiceIsRealite;
        const isCorrect = (userChoiceIsRealite === q.isRealite);

        // Bouton sélectionné vs non sélectionné
        if (userChoiceIsRealite) {
          btnRealite.style.background = isCorrect ? "#4a9b5e" : "#c9564a";
          btnRealite.style.color = "#ffffff";
          btnRealite.style.borderColor = isCorrect ? "#4a9b5e" : "#c9564a";
        } else {
          btnMythe.style.background = isCorrect ? "#4a9b5e" : "#c9564a";
          btnMythe.style.color = "#ffffff";
          btnMythe.style.borderColor = isCorrect ? "#4a9b5e" : "#c9564a";
        }

        btnMythe.disabled = true;
        btnRealite.disabled = true;
        btnMythe.style.cursor = 'default';
        btnRealite.style.cursor = 'default';

        // Affichage explication
        explaBox.style.display = 'block';
        explaBox.style.background = isCorrect ? "rgba(74, 155, 94, 0.12)" : "rgba(201, 86, 74, 0.12)";
        explaBox.style.border = isCorrect ? "1px solid #4a9b5e" : "1px solid #c9564a";
        explaBox.innerHTML = explaBox.innerHTML = (isCorrect ? "✅ " : "❌ ") + q.explanation;

        checkTotalScore();
      }

      btnMythe.addEventListener('click', () => handleChoice(false));
      btnRealite.addEventListener('click', () => handleChoice(true));

      container.appendChild(card);
    });

    function checkTotalScore() {
      const answeredCount = Object.keys(userAnswers).length;
      if (answeredCount === questions.length) {
        let correctTotal = 0;
        questions.forEach((q, i) => {
          if (userAnswers[i] === q.isRealite) correctTotal++;
        });

        scoreEl.style.display = 'block';
        scoreEl.textContent = `🏆 Score final : ${correctTotal} / ${questions.length} bonne(s) réponse(s) !`;
      }
    }
  }

  // Initialisation au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initT9Simulator();
      initMythsGame();
    });
  } else {
    initT9Simulator();
    initMythsGame();
  }
})();
