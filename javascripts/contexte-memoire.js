document$.subscribe(() => {
  const slider = document.getElementById("pageSlider");
  const pageVal = document.getElementById("pageVal");
  const wordCalc = document.getElementById("wordCalc");
  const tokenCalc = document.getElementById("tokenCalc");
  const contextCalc = document.getElementById("contextCalc");

  function updateTokenCalc() {
    if (!slider || !pageVal || !wordCalc || !tokenCalc || !contextCalc) return;

    const pages = parseInt(slider.value, 10);
    const words = pages * 500;
    const tokens = Math.round(words * 1.33);
    const contextLimit = 128000;
    const percent = ((tokens / contextLimit) * 100).toFixed(1);

    pageVal.textContent = pages;
    wordCalc.textContent = words.toLocaleString("fr-FR");
    tokenCalc.textContent = tokens.toLocaleString("fr-FR");
    contextCalc.textContent = `${percent}% (de 128k)`;
  }

  if (slider) {
    slider.addEventListener("input", updateTokenCalc);
    updateTokenCalc();
  }

  const quizButtons = document.querySelectorAll("#quizOptions button");
  const feedback = document.getElementById("quizFeedback");

  if (quizButtons.length && feedback) {
    quizButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isCorrect = button.dataset.correct === "true";

        quizButtons.forEach((btn) => {
          btn.disabled = true;
          btn.style.opacity = "0.7";
        });

        button.style.opacity = "1";
        feedback.style.display = "block";

        if (isCorrect) {
          feedback.className = "good-reflex-box";
          feedback.innerHTML = `
            <h3>Bonne réponse</h3>
            <p>Oui. Quand la fenêtre de contexte est dépassée, l’IA peut écarter les messages les plus anciens, ce qui donne une impression de perte de mémoire.</p>
          `;
        } else {
          feedback.className = "warning-practice-box";
          feedback.innerHTML = `
            <h3>Réponse à corriger</h3>
            <p>La bonne réponse est la B. L’IA ne garde pas forcément tout l’historique : elle peut perdre les premiers éléments de la conversation quand la limite est atteinte.</p>
          `;
        }
      });
    });
  }
});
