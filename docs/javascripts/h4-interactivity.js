/**
 * formation/js/h4-interactivity.js
 * Interactive visual comparator with REAL images + Quiz module
 */

(function () {
  'use strict';

  function initComparatorH4() {
    const tabs = document.querySelectorAll('.comparator-tab');
    
    const naivePromptEl = document.getElementById('naive-prompt-text');
    const naiveImgEl = document.getElementById('naive-image-preview');
    const naiveDescEl = document.getElementById('naive-desc');

    const structPromptEl = document.getElementById('structured-prompt-text');
    const structImgEl = document.getElementById('struct-image-preview');
    const structDescEl = document.getElementById('struct-desc');

    if (!naivePromptEl || !structPromptEl) return;

    const casesData = {
      house: {
        naivePrompt: '« Une maison »',
        naiveImg: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
        naiveDesc: 'Photo de pavillon générique sans identité. L\'IA a choisi arbitrairement le style, la météo, la couleur et le cadrage.',
        structPrompt: '« Villa contemporaine bioclimatique en bois. Style illustration vectorielle moderne. Ambiance crépusculaire chaleureuse. Palette : bois chaud, vert sauge et orange. Format 16:9. »',
        structImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        structDesc: 'Rendu d\'architecte cadré, respectant les teintes exogènes, le style moderne et la lumière tombante demandée.'
      },
      robot: {
        naivePrompt: '« Un robot au travail »',
        naiveImg: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
        naiveDesc: 'Robot métallique froid d\'aspect industriel classique sur fond sombre. Effet vu et revu.',
        structPrompt: '« Petit robot collaboratif amical assistant une équipe en agence design. Style 3D Pixar. Éclairage doux du matin. Palette pastel bleu et jaune. Format 16:9. »',
        structImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        structDesc: 'Illustration 3D vivante et chaleureuse, couleurs douces, parfaite pour illustrer un article sur le futur du travail.'
      },
      coffee: {
        naivePrompt: '« Une tasse de café »',
        naiveImg: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        naiveDesc: 'Tasse ordinaire posée au hasard. Aucune recherche de composition ou d\'émotion.',
        structPrompt: '« Tasse de café latte art posée sur une table en bois brut à côté d\'un carnet. Style photo macro. Ambiance cozy, lumière dorée du matin. Palette terreuse & crème. »',
        structImg: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
        structDesc: 'Photographie professionnelle style Instagram/magazine, profondeur de champ travaillée et lumière cocooning parfaite.'
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
          naiveImgEl.src = data.naiveImg;
          naiveDescEl.textContent = data.naiveDesc;

          structPromptEl.textContent = data.structPrompt;
          structImgEl.src = data.structImg;
          structDescEl.textContent = data.structDesc;
        }
      });
    });
  }

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
