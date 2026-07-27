function initEvaluationEntree() {
  const root = document.getElementById("evaluation-entree");
  if (!root) return;
  if (root.dataset.evalBound === "true") return;
  root.dataset.evalBound = "true";

  const questions = [/* garde ici ton tableau questions tel quel */];

  let currentQuestion = 0;
  const answers = new Array(questions.length).fill(null);

  const introBox = root.querySelector("#eval-intro");
  const form = root.querySelector("#eval-form");
  const quizBox = root.querySelector("#eval-quiz");
  const container = root.querySelector("#eval-questions");
  const resultBox = root.querySelector("#eval-resultat");
  const correctionBox = root.querySelector("#eval-correction");
  const submitBtn = root.querySelector("#eval-submit");
  const showAnswersBtn = root.querySelector("#eval-show-answers");
  const printBtn = root.querySelector("#eval-print");
  const resetBtn = root.querySelector("#eval-reset");
  const dateInput = root.querySelector("#eval-date");
  const nameInput = root.querySelector("#eval-nom");

  if (
    !introBox || !form || !quizBox || !container || !resultBox || !correctionBox ||
    !submitBtn || !showAnswersBtn || !printBtn || !resetBtn || !dateInput || !nameInput
  ) return;

  if (!dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  quizBox.style.display = "none";
  submitBtn.style.display = "none";
  showAnswersBtn.style.display = "none";
  printBtn.style.display = "none";

  function updateSubmitVisibility() {
    submitBtn.style.display = answers.every(answer => answer !== null) ? "inline-block" : "none";
  }

  function renderQuestion(qIndex) {
    const q = questions[qIndex];
    if (!q) return;

    container.innerHTML = "";

    const progress = document.createElement("div");
    progress.className = "eval-theme";
    progress.textContent = "Question " + (qIndex + 1) + " sur " + questions.length;

    const card = document.createElement("div");
    card.className = "eval-question";

    const theme = document.createElement("div");
    theme.className = "eval-theme";
    theme.textContent = q.theme;

    const title = document.createElement("h3");
    title.textContent = "Question " + (qIndex + 1);

    const questionText = document.createElement("p");
    questionText.innerHTML = "<strong>" + q.question + "</strong>";

    const options = document.createElement("div");
    options.className = "eval-options";

    q.options.forEach(function (option, optionIndex) {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = "question-" + qIndex;
      input.value = optionIndex;

      if (answers[qIndex] === optionIndex) input.checked = true;

      input.addEventListener("change", function () {
        answers[qIndex] = optionIndex;
        updateSubmitVisibility();

        setTimeout(function () {
          if (qIndex < questions.length - 1) {
            currentQuestion += 1;
            renderQuestion(currentQuestion);
          }
        }, 180);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      options.appendChild(label);
    });

    const nav = document.createElement("div");
    nav.className = "eval-actions";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.textContent = "Question précédente";
    prevBtn.style.background = "var(--md-default-bg-color, #fff)";
    prevBtn.style.color = "var(--md-primary-fg-color, #1a5fb4)";
    prevBtn.style.display = qIndex === 0 ? "none" : "inline-block";
    prevBtn.addEventListener("click", function () {
      if (currentQuestion > 0) {
        currentQuestion -= 1;
        renderQuestion(currentQuestion);
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.textContent = "Question suivante";
    nextBtn.style.display = qIndex < questions.length - 1 ? "inline-block" : "none";
    if (answers[qIndex] === null) nextBtn.disabled = true;
    nextBtn.addEventListener("click", function () {
      if (answers[qIndex] !== null && currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion(currentQuestion);
      }
    });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    card.appendChild(theme);
    card.appendChild(title);
    card.appendChild(questionText);
    card.appendChild(options);
    card.appendChild(nav);

    container.appendChild(progress);
    container.appendChild(card);
  }

  function getLevel(score) {
    if (score <= 10) return { label: "Niveau débutant", message: "Vous allez surtout consolider les bases de l’IA générative, du prompting et des bons réflexes de sécurité." };
    if (score <= 20) return { label: "Niveau intermédiaire", message: "Vous avez déjà des repères. La formation va vous aider à structurer vos usages et à sécuriser vos pratiques." };
    if (score <= 26) return { label: "Niveau avancé", message: "Vous avez de bonnes bases. L’objectif sera d’aller vers plus de méthode, de précision et de responsabilité." };
    return { label: "Niveau très avancé", message: "Vous maîtrisez déjà beaucoup de notions. La formation servira à renforcer vos réflexes professionnels et votre préparation à la certification." };
  }

  function calculateScore() {
    let score = 0;
    answers.forEach(function (answer, index) {
      if (answer === questions[index].correct) score += 1;
    });
    return { score, answers };
  }

  function renderResult() {
    const data = calculateScore();
    const score = data.score;
    const unanswered = data.answers.filter(answer => answer === null).length;
    const level = getLevel(score);

    resultBox.style.display = "block";
    showAnswersBtn.style.display = "inline-block";
    printBtn.style.display = "inline-block";

    resultBox.innerHTML =
      "<h2>Résultat</h2>" +
      "<p><strong>Participant :</strong> " + (nameInput.value || "Non renseigné") + "</p>" +
      "<p><strong>Date :</strong> " + (dateInput.value || "Non renseignée") + "</p>" +
      "<p><strong>Score :</strong> " + score + " / " + questions.length + "</p>" +
      "<p><strong>Niveau estimé :</strong> " + level.label + "</p>" +
      "<p>" + level.message + "</p>" +
      (unanswered > 0 ? "<p><strong>Questions sans réponse :</strong> " + unanswered + "</p>" : "") +
      "<p><em>Ce résultat sert uniquement à situer votre niveau de départ.</em></p>";

    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderCorrection() {
    const data = calculateScore();
    correctionBox.style.display = "block";
    correctionBox.innerHTML = "<h2>Correction détaillée</h2>";

    questions.forEach(function (q, index) {
      const userAnswer = data.answers[index];
      const isCorrect = userAnswer === q.correct;
      const item = document.createElement("div");
      item.className = "eval-correction-item";

      item.innerHTML =
        "<h3>Question " + (index + 1) + " — " + q.theme + "</h3>" +
        "<p><strong>" + q.question + "</strong></p>" +
        "<p>Votre réponse : <span class='" + (isCorrect ? "eval-ok" : "eval-ko") + "'>" + (userAnswer === null ? "Aucune réponse" : q.options[userAnswer]) + "</span></p>" +
        "<p>Bonne réponse : <strong>" + q.options[q.correct] + "</strong></p>" +
        "<p><em>" + q.explain + "</em></p>";

      correctionBox.appendChild(item);
    });

    correctionBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startEvaluation() {
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
    currentQuestion = 0;
    renderQuestion(currentQuestion);
    updateSubmitVisibility();
  }

  document.addEventListener("click", function (event) {
    const start = event.target.closest("#eval-start");
    const submit = event.target.closest("#eval-submit");
    const showAnswers = event.target.closest("#eval-show-answers");
    const print = event.target.closest("#eval-print");
    const reset = event.target.closest("#eval-reset");

    if (start && root.contains(start)) {
      event.preventDefault();
      startEvaluation();
      return;
    }

    if (submit && root.contains(submit)) {
      event.preventDefault();
      renderResult();
      return;
    }

    if (showAnswers && root.contains(showAnswers)) {
      event.preventDefault();
      renderCorrection();
      return;
    }

    if (print && root.contains(print)) {
      event.preventDefault();
      if (resultBox.style.display === "none") renderResult();
      if (correctionBox.style.display === "none") renderCorrection();
      window.print();
      return;
    }

    if (reset && root.contains(reset)) {
      event.preventDefault();

      for (let i = 0; i < answers.length; i += 1) answers[i] = null;

      currentQuestion = 0;
      nameInput.value = "";
      dateInput.value = new Date().toISOString().slice(0, 10);

      resultBox.style.display = "none";
      correctionBox.style.display = "none";
      showAnswersBtn.style.display = "none";
      printBtn.style.display = "none";
      submitBtn.style.display = "none";
      resultBox.innerHTML = "";
      correctionBox.innerHTML = "";
      container.innerHTML = "";

      introBox.style.display = "block";
      quizBox.style.display = "none";

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    startEvaluation();
  });
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
