function initEvaluationEntree() {
  const startBtn = document.getElementById("eval-start");
  const introBox = document.getElementById("eval-intro");
  const quizBox = document.getElementById("eval-quiz");
  const nameInput = document.getElementById("eval-nom");
  const dateInput = document.getElementById("eval-date");

  if (!startBtn || !introBox || !quizBox || !nameInput || !dateInput) {
    console.log("Éléments introuvables");
    return;
  }

  console.log("Init OK");

  startBtn.onclick = function () {
    console.log("clic détecté");

    if (!nameInput.checkValidity()) {
      nameInput.reportValidity();
      nameInput.focus();
      return;
    }

    if (!dateInput.checkValidity()) {
      dateInput.reportValidity();
      dateInput.focus();
      return;
    }

    introBox.style.display = "none";
    quizBox.style.display = "block";
    quizBox.innerHTML = "<p>Le clic fonctionne.</p>";
  };
}

if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    initEvaluationEntree();
  });
} else if (document.readyState !== "loading") {
  initEvaluationEntree();
} else {
  document.addEventListener("DOMContentLoaded", initEvaluationEntree);
}
