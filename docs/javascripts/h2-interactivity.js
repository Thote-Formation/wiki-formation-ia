/**
 * formation/js/h2-interactivity.js
 * Modules interactifs pour la séance H2 (Prompt Builder & Quiz de sélection d'outils)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : PROMPT BUILDER (CONSTRUCTEUR DE PROMPT)
  // =========================================================================
  function initPromptBuilder() {
    const roleInput = document.getElementById('pb-role');
    const taskInput = document.getElementById('pb-task');
    const contextInput = document.getElementById('pb-context');
    const formatInput = document.getElementById('pb-format');
    const constraintsInput = document.getElementById('pb-constraints');

    const outputEl = document.getElementById('pb-output');
    const copyBtn = document.getElementById('pb-btn-copy');
    const templateBtn = document.getElementById('pb-btn-template');

    if (!roleInput || !outputEl) return;

    function generatePrompt() {
      const role = roleInput.value.trim();
      const task = taskInput.value.trim();
      const context = contextInput.value.trim();
      const format = formatInput.value.trim();
      const constraints = constraintsInput.value.trim();

      if (!role && !task && !context && !format && !constraints) {
        outputEl.textContent = "Remplissez les champs ci-dessus pour générer votre prompt...";
        return;
      }

      let parts = [];
      if (role) parts.push(`[RÔLE]\n${role}`);
      if (task) parts.push(`[TÂCHE]\n${task}`);
      if (context) parts.push(`[CONTEXTE]\n${context}`);
      if (format) parts.push(`[FORMAT DE SORTIE]\n${format}`);
      if (constraints) parts.push(`[CONTRAINTES]\n${constraints}`);

      outputEl.textContent = parts.join('\n\n');
    }

    [roleInput, taskInput, contextInput, formatInput, constraintsInput].forEach(input => {
      if (input) input.addEventListener('input', generatePrompt);
    });

    if (templateBtn) {
      templateBtn.addEventListener('click', () => {
        roleInput.value = "Tu es un chef de projet événementiel sénior spécialisé en éco-conception.";
        taskInput.value = "Rédige une checklist de contrôle pour l'organisation d'un séminaire d'entreprise de 100 personnes.";
        contextInput.value = "Le séminaire dure 2 jours en zone rurale. L'objectif est de réduire l'empreinte carbone globale de 30%.";
        formatInput.value = "Présente la checklist sous forme de tableau Markdown avec 3 colonnes : Phase, Action, Indicateur d'impact.";
        constraintsInput.value = "Pas plus de 10 actions clés au total. Ne pas inclure de jargon complexe. Ton direct et opérationnel.";
        generatePrompt();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = outputEl.textContent;
        if (!textToCopy || textToCopy.startsWith("Remplissez")) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = "✅ Copié !";
          copyBtn.style.background = "#4a9b5e";
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = "#1a5fb4";
          }, 2000);
        }).catch(() => {
          alert("Erreur lors de la copie.");
        });
      });
    }
  }

  // =========================================================================
  // 2. MODULE : QUIZ SÉLECTION D'OUTILS
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

        btn.addEventListener('mouseenter', () => {
          if (!btn.disabled) btn.style.background = "rgba(26, 95, 180, 0.08)";
        });
        btn.addEventListener('mouseleave', () => {
          if (!btn.disabled) btn.style.background = "var(--md-default-bg-color, #fff)";
        });

        btn.addEventListener('click', () => answer(idx, btn));
        choicesEl.appendChild(btn);
      });
    }

    function answer(idx, selectedBtn) {
      const q = questions[i];
      const allBtns = choicesEl.querySelectorAll('button');

      allBtns.forEach(b => {
        b.disabled = true;
        b.style.cursor = 'default';
      });

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
        scoreEl.style.display = 'inline-block';
        scoreEl.textContent = `Score : ${scoreCount} / ${questions.length}`;
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

  // Initialisation DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPromptBuilder();
      initToolQuiz();
    });
  } else {
    initPromptBuilder();
    initToolQuiz();
  }
})();
