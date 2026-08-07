/**
 * formation/js/h1-interactivity.js
 * Mini-jeu interactif : Prédiction du mot (Mécanisme T9 / LLM)
 */

function initPredictionGame() {
  const sentenceEl = document.getElementById('sentence');
  const choicesEl = document.getElementById('choices');
  const doneEl = document.getElementById('done');
  const resetBtn = document.getElementById('reset');

  // Si on n'est pas sur la page H1, on s'arrête gentiment
  if (!sentenceEl || !choicesEl) return;

  const steps = [
    { base: "Le chat mange sa", options: [["croquette", 62], ["souris", 24], ["photo", 9], ["voiture", 5]] },
    { base: "Le chat mange sa croquette", options: [["tranquillement", 55], ["rapidement", 20], ["dans", 15], ["hier", 10]] },
    { base: "Le chat mange sa croquette tranquillement", options: [["dans", 50], ["avec", 30], ["sous", 20]] },
    { base: "Le chat mange sa croquette tranquillement dans", options: [["sa", 58], ["la", 27], ["une", 15]] }
  ];

  let i = 0;

  function render() {
    sentenceEl.textContent = steps[i].base + " ...";
    choicesEl.innerHTML = '';

    steps[i].options.forEach(([word, pct]) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.style.cssText = "display:flex; align-items:center; justify-content:space-between; text-align:left; padding:10px 14px; border:1px solid var(--md-default-fg-color--lightest, #d5d5d5); border-radius:6px; background:var(--md-default-bg-color, #fff); color:var(--md-typeset-color, #1a1a1a); cursor:pointer; font-size:14px; width:100%; transition: transform 0.1s ease, background 0.2s;";

      row.innerHTML = `
        <span style="font-weight:600; flex: 1;">${word}</span>
        <div style="flex:2; height:8px; background:rgba(0,0,0,0.1); border-radius:4px; overflow:hidden; margin: 0 12px;">
          <div style="height:100%; background:#1a5fb4; width:${pct}%;"></div>
        </div>
        <span style="font-size:12px; opacity: 0.8; font-weight: 500; min-width: 35px; text-align: right;">${pct}%</span>
      `;

      row.addEventListener('click', () => {
        i++;
        if (i < steps.length) {
          render();
        } else {
          sentenceEl.textContent = steps[steps.length - 1].base + " sa gamelle.";
          choicesEl.innerHTML = '';
          if (doneEl) {
            doneEl.style.display = 'block';
            doneEl.innerHTML = "💡 <strong>Ce que vous venez de faire est exactement le fonctionnement d'un LLM :</strong> calculer mot après mot la suite la plus probable d'un texte, selon son contexte.";
          }
          if (resetBtn) resetBtn.style.display = 'inline-block';
        }
      });

      choicesEl.appendChild(row);
    });
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      i = 0;
      if (doneEl) doneEl.style.display = 'none';
      resetBtn.style.display = 'none';
      render();
    };
  }

  render();
}

// 🎯 Déclencheur spécial MkDocs Material (Instant Loading) + fallback classique
if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    initPredictionGame();
  });
} else {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPredictionGame);
  } else {
    initPredictionGame();
  }
}
