document$.subscribe(() => {
  const chk1 = document.getElementById("chk1");
  const chk2 = document.getElementById("chk2");
  const chk3 = document.getElementById("chk3");
  const riskScore = document.getElementById("riskScore");
  const riskMessage = document.getElementById("riskMessage");
  const riskBox = document.getElementById("riskBox");

  function updateRiskCalc() {
    if (!chk1 || !chk2 || !chk3 || !riskScore || !riskMessage || !riskBox) return;

    let score = 85;
    if (chk1.checked) score -= 25;
    if (chk2.checked) score -= 40;
    if (chk3.checked) score -= 15;

    if (score > 60) {
      riskBox.className = "warning-practice-box";
      riskScore.textContent = `Risque élevé (${score}%)`;
      riskMessage.textContent = "Prompt trop ouvert : l’IA risque d’inventer pour combler le manque de faits.";
    } else if (score > 25) {
      riskBox.className = "summary-box";
      riskScore.textContent = `Risque modéré (${score}%)`;
      riskMessage.textContent = "Le cadrage est meilleur, mais certains détails peuvent encore être imprécis ou incomplets.";
    } else {
      riskBox.className = "good-reflex-box";
      riskScore.textContent = `Risque très faible (${score}%)`;
      riskMessage.textContent = "Le prompt est bien sécurisé : la réponse est mieux contrainte par les sources et les consignes.";
    }
  }

  [chk1, chk2, chk3].forEach((checkbox) => {
    if (checkbox) checkbox.addEventListener("change", updateRiskCalc);
  });

  updateRiskCalc();

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
            <p>Oui. Donner une consigne de secours explicite réduit la pression qui pousse le modèle à inventer une réponse plausible.</p>
          `;
        } else {
          feedback.className = "warning-practice-box";
          feedback.innerHTML = `
            <h3>Réponse à corriger</h3>
            <p>La bonne réponse est la B. Sans porte de sortie claire, l’IA peut préférer produire une réponse vraisemblable plutôt qu’admettre une incertitude.</p>
          `;
        }
      });
    });
  }
});
