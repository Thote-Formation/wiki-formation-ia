/**
 * formation/js/h2-interactivity.js
 * Modules interactifs pour la séance H2 :
 * 1. Simulateur d'Audit de poste & Gain de temps (RS6776)
 * 2. Quiz "Quel outil pour quelle tâche ?"
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : SIMULATEUR D'AUDIT DE POSTE & ROI (RS6776)
  // =========================================================================
  function initRoiSimulator() {
    const taskSelect = document.getElementById('sim-task-type');
    const hoursSelect = document.getElementById('sim-hours');
    const planSelect = document.getElementById('sim-plan');
    const resultBox = document.getElementById('sim-result');

    if (!taskSelect || !resultBox) return;

    const taskData = {
      emails: {
        tool: "ChatGPT / Le Chat (LLM Généraliste)",
        savingsRate: 0.5,
        justification: "Gain de 50% du temps de saisie via des trames interactives et une reformulation rapide."
      },
      pdf: {
        tool: "NotebookLM (Analyse documentaire)",
        savingsRate: 0.7,
        justification: "Gain de 70% sur la recherche d'information dans vos PDF internes sans risque d'hallucination."
      },
      schema: {
        tool: "Napkin.ai (Générateur de schémas)",
        savingsRate: 0.65,
        justification: "Conversion quasi instantanée de texte brut en schémas et workflows lisibles."
      },
      social: {
        tool: "Gem / GPT Personnalisé sur-mesure",
        savingsRate: 0.6,
        justification: "Maintien automatique de la ligne éditoriale et diminution du temps de brouillon."
      }
    };

    function updateSimulation() {
      const taskKey = taskSelect.value;
      const hours = parseFloat(hoursSelect.value);
      const isPro = planSelect.value === 'pro';

      const data = taskData[taskKey];
      const hoursSavedWeek = (hours * data.savingsRate).toFixed(1);
      const hoursSavedMonth = (hoursSavedWeek * 4).toFixed(0);
      const cost = isPro ? "20 € / mois (Licence Pro)" : "0 € (Offre Freemium)";

      resultBox.innerHTML = `
        <div style="font-size: 13px; font-weight: 600;">🛠️ <strong>Outil préconisé :</strong> ${data.tool}</div>
        <div style="font-size: 13px; color: var(--md-typeset-color, #333);">💡 <strong>Valeur ajoutée :</strong> ${data.justification}</div>
        <div style="display: flex; gap: 12px; margin-top: 6px; flex-wrap: wrap;">
          <span style="font-size: 12px; font-weight: 700; background: rgba(74, 155, 94, 0.15); color: #2e7d32; padding: 4px 8px; border-radius: 4px;">
            ⏱️ Temps gagné : ~${hoursSavedWeek}h / sem. (${hoursSavedMonth}h / mois)
          </span>
          <span style="font-size: 12px; font-weight: 700; background: rgba(26, 95, 180, 0.15); color: #1a5fb4; padding: 4px 8px; border-radius: 4px;">
            💰 Budget estimé : ${cost}
          </span>
        </div>
      `;
    }

    taskSelect.addEventListener('change', updateSimulation);
    hoursSelect.addEventListener('change', updateSimulation);
    planSelect.addEventListener('change', updateSimulation);

    updateSimulation();
  }

  // =========================================================================
  // 2. MODULE : QUIZ "QUEL OUTIL POUR QUELLE TÂCHE ?"
  // =========================================================================
  function initToolQuiz() {
    const questions = [
      {
        task: "Répondre à un email client classique demandant un devis.",
        options: ["IA généraliste (ChatGPT / Le Chat)", "NotebookLM", "Napkin.ai", "Consensus"],
        correct: 0,
        explain: "Une tâche rédactionnelle courante : un LLM généraliste traite cela rapidement."
      },
      {
        task: "Analyser et croiser 15 documents PDF de procédures internes.",
        options: ["IA généraliste", "NotebookLM", "Remove.bg", "Consensus"],
        correct: 1,
        explain: "NotebookLM permet d'interroger vos documents de manière étanche et sans hallucination."
      },
      {
        task: "Rédiger chaque semaine un post LinkedIn en respectant une charte éditoriale stricte.",
        options: ["IA généraliste basique", "Gem / GPT personnalisé", "Napkin.ai", "Consensus"],
        correct: 1,
        explain: "Un Gem/GPT mémorise le rôle, le ton et le format pour garantir la cohérence."
      },
      {
        task: "Convertir les 5 étapes d'un projet d'événement en schéma visuel pour un client.",
        options: ["NotebookLM", "Napkin.ai", "Remove.bg", "Consensus"],
        correct: 1,
        explain: "Napkin.ai est spécialisé dans la génération automatique de schémas à partir de texte."
      },
      {
        task: "Extraire le sujet d'un produit d'une photo pour l'intégrer sur un fond neutre.",
        options: ["Remove.bg", "NotebookLM", "Gems", "Napkin.ai"],
        correct: 0,
        explain: "Remove.bg est l'outil spécialisé idéal pour le détourage rapide."
      }
    ];

    let i = 0;
    let scoreCount = 0;

    const progress = document.getElementById('quiz-progress');
    const taskEl = document.getElementById('quiz-task');
    const choicesEl = document.getElementById('quiz-choices');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next');
    const resetBtn = document.getElementById('quiz-reset');
    const scoreEl = document.getElementById('quiz-score');

    if (!taskEl || !choicesEl) return;

    function render() {
      feedback.style.display = 'none';
      nextBtn.style.display = 'none';
      resetBtn.style.display = 'none';
      scoreEl.style.display = 'none';

      progress.textContent = `Question ${i + 1} sur ${questions.length}`;
      taskEl.textContent = questions[i].task;
      choicesEl.innerHTML = '';

      questions[i].options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = `
          text-align: left;
          padding: 10px 14px;
          border: 1px solid var(--md-default-fg-color--lightest, #d5d5d5);
          border-radius: 6px;
          background: var(--md-default-bg-color, #fff);
          color: var(--md-typeset-color, #1a1a1a);
          cursor: pointer;
          font-size: 14px;
          width: 100%;
          transition: background 0.2s, border-color 0.2s;
        `;
        btn.textContent = opt;

        btn.addEventListener('click', () => answer(idx, btn));
        choicesEl.appendChild(btn);
      });
    }

    function answer(idx, selectedBtn) {
      const q = questions[i];
      const allBtns = choicesEl.querySelectorAll('button');

      allBtns.forEach(b => b.disabled = true);

      if (idx === q.correct) {
        selectedBtn.style.background = "rgba(74, 155, 94, 0.2)";
        selectedBtn.style.borderColor = "#4a9b5e";
        feedback.style.background = "rgba(74, 155, 94, 0.15)";
        feedback.style.border = "1px solid #4a9b5e";
        feedback.style.color = "var(--md-typeset-color, #1a1a1a)";
        feedback.innerHTML = `✅ <strong>Exact !</strong> ${q.explain}`;
        scoreCount++;
      } else {
        selectedBtn.style.background = "rgba(201, 86, 74, 0.2)";
        selectedBtn.style.borderColor = "#c9564a";

        allBtns[q.correct].style.background = "rgba(74, 155, 94, 0.2)";
        allBtns[q.correct].style.borderColor = "#4a9b5e";

        feedback.style.background = "rgba(201, 86, 74, 0.15)";
        feedback.style.border = "1px solid #c9564a";
        feedback.style.color = "var(--md-typeset-color, #1a1a1a)";
        feedback.innerHTML = `❌ <strong>Pas tout à fait.</strong> ${q.explain}`;
      }

      feedback.style.display = 'block';

      if (i < questions.length - 1) {
        nextBtn.style.display = 'inline-block';
      } else {
        scoreEl.style.display = 'block';
        scoreEl.textContent = `Résultat final : ${scoreCount} / ${questions.length}`;
        resetBtn.style.display = 'inline-block';
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        i++;
        render();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        i = 0;
        scoreCount = 0;
        render();
      });
    }

    render();
  }

  // Initialisation au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initRoiSimulator();
      initToolQuiz();
    });
  } else {
    initRoiSimulator();
    initToolQuiz();
  }
})();
