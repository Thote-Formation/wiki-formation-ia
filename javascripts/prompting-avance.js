document$.subscribe(() => {
  const input = document.getElementById("promptInput");
  const button = document.getElementById("prompt-test-button");
  const result = document.getElementById("promptResult");

  if (!input || !button || !result) return;

  button.addEventListener("click", () => {
    const value = input.value.toLowerCase();

    const hasExamples =
      value.includes("exemple") || value.includes("sample");
    const hasCoT =
      value.includes("étape") ||
      value.includes("etape") ||
      value.includes("réfléchis") ||
      value.includes("raisonne");
    const hasFormat =
      value.includes("format") ||
      value.includes("json") ||
      value.includes("tableau");

    result.style.display = "block";

    if (hasExamples && (hasCoT || hasFormat)) {
      result.className = "summary-box";
      result.innerHTML = `
        <h3>Prompt avancé</h3>
        <p>Le prompt combine des exemples avec une logique de structuration ou de raisonnement. Le cadrage est nettement meilleur.</p>
      `;
    } else if (hasExamples || hasCoT || hasFormat) {
      result.className = "good-reflex-box";
      result.innerHTML = `
        <h3>Prompt intermédiaire</h3>
        <p>Le prompt contient déjà un bon élément de cadrage. Pour aller plus loin, combine un exemple avec une consigne de réflexion étape par étape ou un format explicite.</p>
      `;
    } else {
      result.className = "warning-practice-box";
      result.innerHTML = `
        <h3>Prompt basique</h3>
        <p>Le prompt risque de produire une réponse plus imprévisible. Ajoute un exemple, un format attendu ou une consigne de raisonnement.</p>
      `;
    }
  });
});
