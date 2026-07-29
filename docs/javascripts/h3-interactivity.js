/**
 * formation/js/h3-interactivity.js
 * Modules interactifs pour la séance H3 :
 * 1. Atelier interactif : Constructeur de prompt structuré (ROFT, CROFT, FAI, SOCRATE)
 * 2. Quiz "Maîtrise des méthodes de structuration"
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : CONSTRUCTEUR DE PROMPT STRUCTURÉ
  // =========================================================================
  function initPromptBuilder() {
    const selectMethod = document.getElementById('builder-method-select');
    const inputsContainer = document.getElementById('builder-inputs');
    const outputTextarea = document.getElementById('builder-output');
    const copyBtn = document.getElementById('builder-copy-btn');
    const copyFeedback = document.getElementById('builder-copy-feedback');

    if (!selectMethod || !inputsContainer || !outputTextarea) return;

    const fieldsConfig = {
      FAI: [
        { id: 'fai-f', label: 'Formule (Demande résumée)', placeholder: 'Ex: Je cherche des idées de sujets pour une réunion d\'équipe' },
        { id: 'fai-a', label: 'Action (Ce que l\'IA doit produire)', placeholder: 'Ex: Propose une liste de 10 sujets originaux avec une brève description' },
        { id: 'fai-i', label: 'Intention (Usage & Public visé)', placeholder: 'Ex: Pour dynamiser une équipe de 8 personnes dans le secteur événementiel' }
      ],
      ROFT: [
        { id: 'roft-r', label: 'Rôle (Posture / Expertise)', placeholder: 'Ex: Expert en communication interne et management B2B' },
        { id: 'roft-o', label: 'Objectif (Tâche exacte)', placeholder: 'Ex: Rédiger un e-mail d\'invitation à un séminaire annuel d\'entreprise' },
        { id: 'roft-f', label: 'Format (Structure & Longueur)', placeholder: 'Ex: Email structuré en 3 paragraphes, avec objet accrocheur et liste à puces' },
        { id: 'roft-t', label: 'Ton (Style & Consignes)', placeholder: 'Ex: Enthousiaste, professionnel, chaleureux, sans jargon excessif' }
      ],
      CROFT: [
        { id: 'croft-c', label: 'Contexte (Situation métier & Enjeux)', placeholder: 'Ex: PME événementielle de 20 personnes. Nous organisons un séminaire interne le 15 mars sur la cohésion d\'équipe.' },
        { id: 'croft-r', label: 'Rôle (Posture)', placeholder: 'Ex: Responsable des Ressources Humaines' },
        { id: 'croft-o', label: 'Objectif (Tâche exacte)', placeholder: 'Ex: Rédiger la convocation officielle à envoyer aux collaborateurs' },
        { id: 'croft-f', label: 'Format (Structure)', placeholder: 'Ex: Email clair avec date, lieu, ordre du jour sous forme de liste et bouton d\'action' },
        { id: 'croft-t', label: 'Ton (Style)', placeholder: 'Ex: Convivial, mobilisateur et rassurant' }
      ],
      SOCRATE: [
        { id: 'soc-s', label: 'Situation (Problème / Tensions)', placeholder: 'Ex: Un partenaire clé accuse un retard de 2 semaines sur la livraison d\'un projet client' },
        { id: 'soc-o', label: 'Objectif (Résultat attendu)', placeholder: 'Ex: Obtenir une date ferme d\'engagement sans dégrader la relation commerciale' },
        { id: 'soc-c', label: 'Contexte (Détails clés)', placeholder: 'Ex: Partenaire habituel très fiable, mais le client final commence à s\'impatienter' },
        { id: 'soc-r', label: 'Rôle (Posture)', placeholder: 'Ex: Directeur des Opérations ferme mais diplomate' },
        { id: 'soc-a', label: 'Attentes (Contraintes précises)', placeholder: 'Ex: Proposer un appel téléphonique de calage sous 24h et demander un nouveau planning' },
        { id: 'soc-t', label: 'Ton (Style d\'attitude)', placeholder: 'Ex: Professionnel, direct, courtois, orienté solution' },
        { id: 'soc-e', label: 'Exemples / Variantes', placeholder: 'Ex: Propose 2 variantes : une version ferme et une version plus souple' }
      ]
    };

    function renderFields() {
      const method = selectMethod.value;
      const fields = fieldsConfig[method] || [];

      inputsContainer.innerHTML = '';

      fields.forEach(f => {
        const div = document.createElement('div');
        div.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';
        div.innerHTML = `
          <label for="${f.id}" style="font-size: 12px; font-weight: 700; color: var(--md-typeset-color, #333);">${f.label} :</label>
          <input type="text" id="${f.id}" placeholder="${f.placeholder}" style="padding: 8px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--light, #ccc); background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000); font-size: 13px;">
        `;
        inputsContainer.appendChild(div);

        const inputEl = div.querySelector('input');
        inputEl.addEventListener('input', generatePromptText);
      });

      generatePromptText();
    }

    function generatePromptText() {
      const method = selectMethod.value;
      let promptLines = [];

      if (method === 'FAI') {
        const f = document.getElementById('fai-f')?.value.trim();
        const a = document.getElementById('fai-a')?.value.trim();
        const i = document.getElementById('fai-i')?.value.trim();

        if (f) promptLines.push(`Demande : ${f}`);
        if (a) promptLines.push(`Action attendue : ${a}`);
        if (i) promptLines.push(`Intention et public : ${i}`);
      } else if (method === 'ROFT') {
        const r = document.getElementById('roft-r')?.value.trim();
        const o = document.getElementById('roft-o')?.value.trim();
        const f = document.getElementById('roft-f')?.value.trim();
        const t = document.getElementById('roft-t')?.value.trim();

        if (r) promptLines.push(`Rôle : Agis en tant que ${r}.`);
        if (o) promptLines.push(`Objectif : ${o}.`);
        if (f) promptLines.push(`Format : ${f}.`);
        if (t) promptLines.push(`Ton : ${t}.`);
      } else if (method === 'CROFT') {
        const c = document.getElementById('croft-c')?.value.trim();
        const r = document.getElementById('croft-r')?.value.trim();
        const o = document.getElementById('croft-o')?.value.trim();
        const f = document.getElementById('croft-f')?.value.trim();
        const t = document.getElementById('croft-t')?.value.trim();

        if (c) promptLines.push(`Contexte : ${c}`);
        if (r) promptLines.push(`Rôle : Agis en tant que ${r}.`);
        if (o) promptLines.push(`Objectif : ${o}.`);
        if (f) promptLines.push(`Format : ${f}.`);
        if (t) promptLines.push(`Ton : ${t}.`);
      } else if (method === 'SOCRATE') {
        const s = document.getElementById('soc-s')?.value.trim();
        const o = document.getElementById('soc-o')?.value.trim();
        const c = document.getElementById('soc-c')?.value.trim();
        const r = document.getElementById('soc-r')?.value.trim();
        const a = document.getElementById('soc-a')?.value.trim();
        const t = document.getElementById('soc-t')?.value.trim();
        const e = document.getElementById('soc-e')?.value.trim();

        if (s) promptLines.push(`Situation : ${s}`);
        if (o) promptLines.push(`Objectif : ${o}`);
        if (c) promptLines.push(`Contexte : ${c}`);
        if (r) promptLines.push(`Rôle : Agis en tant que ${r}.`);
        if (a) promptLines.push(`Attentes : ${a}`);
        if (t) promptLines.push(`Ton : ${t}`);
        if (e) promptLines.push(`Consigne d'exemples/variantes : ${e}`);
      }

      outputTextarea.value = promptLines.length > 0 
        ? promptLines.join('\n\n') 
        : 'Saisissez des informations dans les champs ci-dessus pour générer automatiquement votre prompt structuré...';
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!outputTextarea.value || outputTextarea.value.startsWith('Saisissez des informations')) return;
        
        navigator.clipboard.writeText(outputTextarea.value).then(() => {
          copyFeedback.style.display = 'inline';
          setTimeout(() => {
            copyFeedback.style.display = 'none';
          }, 2500);
        });
      });
    }

    selectMethod.addEventListener('change', renderFields);
    renderFields();
  }

  // =========================================================================
  // 2. MODULE : QUIZ H3
  // =========================================================================
  function initQuizH3() {
    const questions = [
      {
        task: "Vous devez générer rapidement 10 idées de sujets de réunion d'équipe en 2 minutes. Quelle méthode est la plus appropriée ?",
        options: [
          "SOCRATE",
          "FAI (Formule, Action, Intention)",
          "CROFT avec un paragraphe d'historique"
        ],
        correct: 1,
        explain: "Pour un besoin ultra-rapide et direct sans contrainte lourde, la méthode FAI est idéale pour aller à l'essentiel en 2 minutes."
      },
      {
        task: "Dans la méthode CROFT, qu'apporte la lettre 'C' par rapport au simple ROFT ?",
        options: [
          "La correction automatique des fautes d'orthographe",
          "Le Contexte (situation, entreprise, secteur) pour éviter les réponses génériques",
          "La contrainte de complexité algorithmique"
        ],
        correct: 1,
        explain: "Le Contexte explique la situation métier précise, ce qui permet à l'IA d'adapter le vocabulaire et les arguments au cas réel."
      },
      {
        task: "Vous devez gérer un litige complexe avec un fournisseur en retard de paiement. Quelle méthode privilégier ?",
        options: [
          "SOCRATE (Situation, Objectif, Contexte, Rôle, Attentes, Ton, Exemples)",
          "FAI",
          "Un prompt d'un seul mot"
        ],
        correct: 0,
        explain: "SOCRATE permet de cadrer les situations sensibles ou conflictuelles en précisant le problème, le ton, l'enjeu et les contraintes."
      },
      {
        task: "En quoi consiste le 'Reverse Prompting' (rétro-ingénierie) ?",
        options: [
          "À écrire un prompt à l'envers de droite à gauche",
          "À soumettre un bon texte à l'IA pour qu'elle déduise le prompt qui a permis de le créer",
          "À refuser systématiquement les réponses fournies par l'IA"
        ],
        correct: 1,
        explain: "La rétro-ingénierie fait déduire à l'IA la structure de prompt idéale à partir d'un excellent livrable."
      }
    ];

    let idx = 0;
    let score = 0;

    const progress = document.getElementById('quiz-progress-h3');
    const taskEl = document.getElementById('quiz-task-h3');
    const choicesEl = document.getElementById('quiz-choices-h3');
    const feedback = document.getElementById('quiz-feedback-h3');
    const nextBtn = document.getElementById('quiz-next-h3');
    const resetBtn = document.getElementById('quiz-reset-h3');
    const scoreEl = document.getElementById('quiz-score-h3');

    if (!taskEl || !choicesEl) return;

    function render() {
      feedback.style.display = 'none';
      nextBtn.style.display = 'none';
      resetBtn.style.display = 'none';
      scoreEl.style.display = 'none';

      progress.textContent = `Question ${idx + 1} sur ${questions.length}`;
      taskEl.textContent = questions[idx].task;
      choicesEl.innerHTML = '';

      questions[idx].options.forEach((opt, oIdx) => {
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
        btn.addEventListener('click', () => answer(oIdx, btn));
        choicesEl.appendChild(btn);
      });
    }

    function answer(oIdx, selectedBtn) {
      const q = questions[idx];
      const allBtns = choicesEl.querySelectorAll('button');
      allBtns.forEach(b => b.disabled = true);

      if (oIdx === q.correct) {
        selectedBtn.style.background = "rgba(74, 155, 94, 0.2)";
        selectedBtn.style.borderColor = "#4a9b5e";
        feedback.style.background = "rgba(74, 155, 94, 0.15)";
        feedback.style.border = "1px solid #4a9b5e";
        feedback.style.color = "var(--md-typeset-color, #1a1a1a)";
        feedback.innerHTML = `✅ <strong>Exact !</strong> ${q.explain}`;
        score++;
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

      if (idx < questions.length - 1) {
        nextBtn.style.display = 'inline-block';
      } else {
        scoreEl.style.display = 'block';
        scoreEl.textContent = `Résultat final : ${score} / ${questions.length}`;
        resetBtn.style.display = 'inline-block';
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        idx++;
        render();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        idx = 0;
        score = 0;
        render();
      });
    }

    render();
  }

  // Initialisation compatible MkDocs Material (Instant loading)
  function initAllH3Modules() {
    initPromptBuilder();
    initQuizH3();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initAllH3Modules();
    });
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllH3Modules);
    } else {
      initAllH3Modules();
    }
  }
})();
