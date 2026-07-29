/**
 * formation/js/h4-interactivity.js
 * Modules interactifs pour la séance H4 :
 * 1. Comparateur Visuel (Prompt Naïf vs Prompt 5 Éléments)
 * 2. Exercice "Trouvez l'élément manquant !"
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : COMPARATEUR VISUEL (PROMPT NAÏF VS STRUCTURÉ)
  // =========================================================================
  function initComparatorH4() {
    const tabs = document.querySelectorAll('.comparator-tab');
    const naivePromptEl = document.getElementById('naive-prompt-text');
    const naiveDalleEl = document.getElementById('naive-dalle-desc');
    const naiveFireflyEl = document.getElementById('naive-firefly-desc');

    const structPromptEl = document.getElementById('structured-prompt-text');
    const structDalleEl = document.getElementById('struct-dalle-desc');
    const structFireflyEl = document.getElementById('struct-firefly-desc');

    if (!naivePromptEl || !structPromptEl) return;

    const casesData = {
      house: {
        naivePrompt: '« Une maison »',
        naiveDalle: 'Maison de banlieue américaine standard, style photo 3D un peu synthétique, lumière neutre de milieu de journée.',
        naiveFirefly: 'Pavillon générique avec jardin, rendu photographique stock très impersonnel, cadrage frontal classique.',
        structPrompt: '« Villa contemporaine bioclimatique en bois. Style illustration vectorielle moderne. Ambiance crépusculaire chaleureuse. Palette : bois chaud, vert sauge et orange coucher de soleil. Format horizontal 16:9. »',
        structDalle: 'Illustration vectorielle épurée, respect exact des teintes sauge/orange, composition architecturale très graphique.',
        structFirefly: 'Rendu vectoriel d\'une précision commerciale remarquable, parfait pour un site web d\'architecture ou un magazine.'
      },
      robot: {
        naivePrompt: '« Un robot au travail »',
        naiveDalle: 'Robot humanoïde métallique générique devant un ordinateur portable, style image d\'illustration informatique basique.',
        naiveFirefly: 'Bras robotique industriel dans une usine floue, photo réaliste grise et froide, sans originalité.',
        structPrompt: '« Petit robot collaboratif amical assistant une équipe humaine dans une agence de design. Style rendu 3D Pixar / claymation. Éclairage doux et lumineux de matinée. Palette : bleu pastel, blanc pur et touche de jaune canari. Cadrage plan moyen 16:9. »',
        structDalle: 'Personnage 3D attachant, texture mate soignée, ambiance très humaine et positive, respect fidèle des couleurs pastel.',
        structFirefly: 'Rendu 3D digne d\'un studio d\'animation, lighting chaleureux, intégration idéale pour un support de communication interne.'
      },
      coffee: {
        naivePrompt: '« Une tasse de café »',
        naiveDalle: 'Simple tasse blanche de café noir vue du dessus sur fond blanc, style catalogue produit neutre.',
        naiveFirefly: 'Tasse à café en céramique sur une table, lumière artificielle neutre, rendu photo ordinaire.',
        structPrompt: '« Une tasse de café latte avec un art latte en forme de feuille, posée sur une table en bois brut à côté d\'un carnet ouvert. Style photo macro professionnelle avec faible profondeur de champ. Ambiance cozy du matin, lumière dorée traversant la fenêtre. Palette : marron expresso, crème, bois chaud. Format carré 1:1. »',
        structDalle: 'Photographie culinaire haute définition, vapeur subtile, flou d\'arrière-plan parfait, cadrage instagrammable.',
        structFirefly: 'Lumière naturelle sublime (golden hour), grain photo naturel, ambiance chaleureuse prête pour une campagne réseaux sociaux.'
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => {
          t.classList.remove('active');
          t.style.background = 'var(--md-default-bg-color, #fff)';
          t.style.color = 'var(--md-typeset-color, #000)';
          t.style.borderColor = 'var(--md-default-fg-color--light, #ccc)';
        });

        this.classList.add('active');
        this.style.background = '#1a5fb4';
        this.style.color = '#fff';
        this.style.borderColor = '#1a5fb4';

        const caseKey = this.getAttribute('data-case');
        const data = casesData[caseKey];

        if (data) {
          naivePromptEl.textContent = data.naivePrompt;
          naiveDalleEl.textContent = data.naiveDalle;
          naiveFireflyEl.textContent = data.naiveFirefly;

          structPromptEl.textContent = data.structPrompt;
          structDalleEl.textContent = data.structDalle;
          structFireflyEl.textContent = data.structFirefly;
        }
      });
    });
  }

  // =========================================================================
  // 2. MODULE : EXERCICE "TROUVEZ L'ÉLÉMENT MANQUANT !"
  // =========================================================================
  function initFindElementGame() {
    const allElements = [
      "Sujet principal",
      "Style artistique",
      "Ambiance / Lumière",
      "Palette de couleurs",
      "Composition / Format"
    ];

    const questions = [
      {
        prompt: "Un chat noir assis sur un rebord de fenêtre, la nuit, palette bleu nuit et argent, format carré 1:1.",
        correct: "Style artistique",
        explain: "Aucun style n'est précisé (photo réaliste, aquarelle, vectoriel, 3D...)."
      },
      {
        prompt: "Portrait d'un artisan dans son atelier, style photo réaliste, ambiance chaleureuse et intime, format portrait 4:5.",
        correct: "Palette de couleurs",
        explain: "Aucune indication de couleurs ou de tonalités dominantes."
      },
      {
        prompt: "Une maison contemporaine en bord de mer, style aquarelle douce, palette bleu ciel et beige, composition centrée.",
        correct: "Ambiance / Lumière",
        explain: "L'éclairage et l'atmosphère ne sont pas décrits (matinal, tempétueux, néon, apaisant...)."
      },
      {
        prompt: "Illustration flat design d'un espace de coworking, ambiance dynamique, palette jaune et turquoise.",
        correct: "Composition / Format",
        explain: "Ni le ratio (16:9, carré, vertical) ni le cadrage ne sont stipulés."
      },
      {
        prompt: "Style vectoriel minimaliste, ambiance calme et zen, palette vert d'eau et blanc, format paysage 16:9.",
        correct: "Sujet principal",
        explain: "Le prompt décrit l'enrobage, mais on ignore totalement ce qui doit être dessiné !"
      }
    ];

    let idx = 0;
    let scoreCount = 0;

    const progress = document.getElementById('find-element-progress');
    const promptBox = document.getElementById('find-element-prompt-box');
    const choicesEl = document.getElementById('find-element-choices');
    const feedback = document.getElementById('find-element-feedback');
    const nextBtn = document.getElementById('find-element-next');
    const resetBtn = document.getElementById('find-element-reset');
    const scoreEl = document.getElementById('find-element-score');

    if (!promptBox || !choicesEl) return;

    function render() {
      feedback.style.display = 'none';
      nextBtn.style.display = 'none';
      resetBtn.style.display = 'none';
      scoreEl.style.display = 'none';

      progress.textContent = `Question ${idx + 1} sur ${questions.length}`;
      promptBox.textContent = `« ${questions[idx].prompt} »`;
      choicesEl.innerHTML = '';

      allElements.forEach(el => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.cssText = `
          text-align: center;
          padding: 10px;
          border: 1px solid var(--md-default-fg-color--lightest, #d5d5d5);
          border-radius: 6px;
          background: var(--md-default-bg-color, #fff);
          cursor: pointer;
          font-size: 13px;
          color: var(--md-typeset-color, #1a1a1a);
          width: 100%;
          transition: background 0.2s, border-color 0.2s;
        `;
        btn.textContent = el;
        btn.addEventListener('click', () => answer(el, btn));
        choicesEl.appendChild(btn);
      });
    }

    function answer(chosen, btn) {
      const q = questions[idx];
      const allBtns = choicesEl.querySelectorAll('button');

      allBtns.forEach(b => {
        b.disabled = true;
        if (b.textContent === q.correct) {
          b.style.background = "rgba(74, 155, 94, 0.2)";
          b.style.borderColor = "#4a9b5e";
        }
      });

      if (chosen === q.correct) {
        feedback.style.background = "rgba(74, 155, 94, 0.15)";
        feedback.style.border = "1px solid #4a9b5e";
        feedback.style.color = "var(--md-typeset-color, #1a1a1a)";
        feedback.innerHTML = `✅ <strong>Exact !</strong> ${q.explain}`;
        scoreCount++;
      } else {
        btn.style.background = "rgba(201, 86, 74, 0.2)";
        btn.style.borderColor = "#c9564a";
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
        scoreEl.textContent = `Résultat final : ${scoreCount} / ${questions.length}`;
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
        scoreCount = 0;
        render();
      });
    }

    render();
  }

  // Initialisation compatible MkDocs Material (Instant loading)
  function initAllH4Modules() {
    initComparatorH4();
    initFindElementGame();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initAllH4Modules();
    });
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllH4Modules);
    } else {
      initAllH4Modules();
    }
  }
})();
