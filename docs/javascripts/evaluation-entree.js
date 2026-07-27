function initEvaluationEntree() {
  const root = document.getElementById("evaluation-entree");
  if (!root) return;

  const questions = [
    {
      theme: "Bases de l’IA",
      question: "Dans un usage professionnel, quelle description de l’IA générative est la plus juste ?",
      options: [
        "Un outil qui garantit automatiquement la conformité des contenus",
        "Un outil qui produit des contenus à partir de consignes, mais dont les réponses doivent être vérifiées",
        "Un moteur de recherche qui cite toujours ses sources",
        "Un logiciel qui applique uniquement des règles fixes programmées à l’avance"
      ],
      correct: 1,
      explain: "L’IA générative produit des contenus à partir de prompts, mais elle peut se tromper. La vérification humaine reste indispensable."
    },
    {
      theme: "Bases de l’IA",
      question: "Vous demandez à une IA de résumer un document. Quel est le principal risque si le document source n’est pas fourni ?",
      options: [
        "L’IA peut compléter avec des informations plausibles mais non vérifiées",
        "L’IA refusera toujours de répondre",
        "L’IA produira forcément un résumé exact",
        "L’IA supprimera automatiquement les données sensibles"
      ],
      correct: 0,
      explain: "Sans source fiable, l’IA peut inventer ou généraliser des informations."
    },
    {
      theme: "Bases de l’IA",
      question: "Quelle attitude est la plus adaptée face à une réponse IA très bien rédigée ?",
      options: [
        "La publier directement si le style est professionnel",
        "La considérer comme fiable si elle contient des chiffres",
        "La relire, vérifier les informations importantes et l’adapter au contexte",
        "La reformuler automatiquement avec une autre IA"
      ],
      correct: 2,
      explain: "Une réponse bien écrite peut contenir des erreurs. Le style ne garantit pas la fiabilité."
    },
    {
      theme: "Bases de l’IA",
      question: "Pourquoi une IA peut-elle produire deux réponses différentes à une même demande ?",
      options: [
        "Parce qu’elle refuse les demandes répétées",
        "Parce qu’elle ne fonctionne que de façon aléatoire",
        "Parce qu’elle ne garde jamais le contexte",
        "Parce qu’elle génère une réponse probable selon le contexte, le modèle et les paramètres"
      ],
      correct: 3,
      explain: "Les modèles génératifs produisent des réponses probables, qui peuvent varier selon le contexte et les paramètres."
    },
    {
      theme: "Bases de l’IA",
      question: "Dans quel cas l’usage de l’IA est-il le plus pertinent ?",
      options: [
        "Produire un premier brouillon à relire et améliorer",
        "Prendre seule une décision RH sensible",
        "Remplacer une validation juridique obligatoire",
        "Publier une information chiffrée sans source"
      ],
      correct: 0,
      explain: "L’IA est très utile pour produire un brouillon, structurer une idée ou reformuler, mais l’humain doit valider."
    },
    {
      theme: "Prompting",
      question: "Quel élément manque le plus dans ce prompt : “Fais-moi un texte sur notre nouveau service” ?",
      options: [
        "La ponctuation",
        "Le contexte, la cible, le format et le ton",
        "Le nom exact du logiciel utilisé",
        "Une demande de traduction"
      ],
      correct: 1,
      explain: "Le prompt est trop vague : il manque le contexte, l’objectif précis, le public, le format et le ton."
    },
    {
      theme: "Prompting",
      question: "Quel prompt est le plus exploitable pour un usage professionnel ?",
      options: [
        "Écris mieux ce texte.",
        "Fais plus professionnel.",
        "Tu es chargé de relation client. Reformule ce message pour un client mécontent, avec un ton calme, clair et empathique, en moins de 120 mots.",
        "Rends ça bien."
      ],
      correct: 2,
      explain: "Le troisième prompt précise le rôle, l’objectif, le public, le ton et la contrainte de longueur."
    },
    {
      theme: "Prompting",
      question: "Quand est-il utile de demander à l’IA de poser des questions avant de répondre ?",
      options: [
        "Quand la demande est urgente mais très simple",
        "Quand la demande est complexe, floue ou à enjeu",
        "Uniquement pour générer des images",
        "Jamais, car cela ralentit toujours le travail"
      ],
      correct: 1,
      explain: "Pour une demande complexe ou sensible, les questions de clarification réduisent les malentendus."
    },
    {
      theme: "Prompting",
      question: "Dans la méthode CROFT, le “C” sert surtout à...",
      options: [
        "corriger automatiquement les fautes",
        "choisir le modèle d’IA",
        "donner la situation, les contraintes et les informations utiles",
        "citer des sources officielles"
      ],
      correct: 2,
      explain: "Le contexte aide l’IA à produire une réponse adaptée à la situation réelle."
    },
    {
      theme: "Prompting",
      question: "Vous obtenez une réponse trop générale. Quelle action est la plus pertinente ?",
      options: [
        "Supprimer le contexte du prompt",
        "Demander une réponse plus longue sans autre précision",
        "Changer la police du texte",
        "Ajouter des contraintes, un exemple attendu et le public cible"
      ],
      correct: 3,
      explain: "Une réponse générale vient souvent d’un prompt trop vague. Il faut ajouter contexte, contraintes et exemples."
    },
    {
      theme: "Outils IA",
      question: "Pour choisir un outil IA, quelle démarche est la plus professionnelle ?",
      options: [
        "Choisir l’outil le plus populaire",
        "Identifier la tâche, le niveau de risque, les données utilisées et le résultat attendu",
        "Utiliser systématiquement le même outil pour tous les besoins",
        "Choisir uniquement l’outil gratuit"
      ],
      correct: 1,
      explain: "Le bon choix dépend du besoin métier, du risque, des données et du niveau de qualité attendu."
    },
    {
      theme: "Outils IA",
      question: "Un assistant documentaire est surtout utile pour...",
      options: [
        "créer un logo à partir d’une image",
        "remplacer un logiciel de paie",
        "interroger et synthétiser des documents fournis",
        "publier automatiquement sur les réseaux sociaux"
      ],
      correct: 2,
      explain: "Un assistant documentaire sert à travailler à partir de documents donnés par l’utilisateur."
    },
    {
      theme: "Outils IA",
      question: "Pourquoi faut-il rester prudent avec les outils IA gratuits grand public ?",
      options: [
        "Parce qu’ils ne savent jamais rédiger",
        "Parce que leurs conditions d’utilisation et de traitement des données peuvent varier",
        "Parce qu’ils sont toujours interdits",
        "Parce qu’ils ne fonctionnent que pour les images"
      ],
      correct: 1,
      explain: "Les outils gratuits peuvent avoir des politiques différentes sur la conservation ou l’utilisation des données."
    },
    {
      theme: "Outils IA",
      question: "Quel exemple montre une bonne adéquation entre besoin et outil ?",
      options: [
        "Utiliser un générateur d’image pour analyser un contrat confidentiel",
        "Utiliser un outil de détourage pour rédiger une note RH",
        "Utiliser un chatbot public pour stocker des données de santé",
        "Utiliser un LLM pour reformuler un email non sensible, puis relire avant envoi"
      ],
      correct: 3,
      explain: "Un LLM est adapté à la reformulation d’un contenu non sensible, avec relecture humaine."
    },
    {
      theme: "Données sensibles",
      question: "Quel prompt présente le risque le plus élevé ?",
      options: [
        "Résume ce texte fictif pour un public débutant.",
        "Reformule cet email en supprimant le jargon.",
        "Analyse l’arrêt maladie de Sophie Martin et propose une réponse RH.",
        "Propose trois titres pour un article sur l’IA."
      ],
      correct: 2,
      explain: "Le prompt contient une donnée de santé et une personne identifiable. C’est un risque important."
    },
    {
      theme: "Données sensibles",
      question: "Quelle anonymisation est la plus correcte ?",
      options: [
        "Remplacer “Marie Dupont, salariée absente pour dépression” par “Salariée A, situation personnelle sensible supprimée”",
        "Remplacer seulement le prénom",
        "Garder le nom mais supprimer la date",
        "Changer la ponctuation du texte"
      ],
      correct: 0,
      explain: "Il faut supprimer ou neutraliser les éléments permettant d’identifier la personne et la donnée sensible."
    },
    {
      theme: "Données sensibles",
      question: "Quel type d’information doit déclencher une vigilance particulière avant usage dans une IA ?",
      options: [
        "Un slogan public déjà publié",
        "Un exemple inventé",
        "Une information RH, médicale, financière ou contractuelle",
        "Une consigne pédagogique générale"
      ],
      correct: 2,
      explain: "Les informations RH, médicales, financières ou contractuelles peuvent être sensibles ou confidentielles."
    },
    {
      theme: "Données sensibles",
      question: "Quelle est la meilleure pratique avant d’utiliser un outil IA avec des données professionnelles ?",
      options: [
        "Vérifier les règles internes, les paramètres de confidentialité et la nature des données",
        "Copier-coller le document complet pour gagner du temps",
        "Tester d’abord avec des données réelles",
        "Envoyer les mêmes données à plusieurs outils pour comparer"
      ],
      correct: 0,
      explain: "Il faut vérifier les règles internes, les paramètres de l’outil et éviter d’exposer des données sensibles."
    },
    {
      theme: "Données sensibles",
      question: "Pourquoi une donnée même “professionnelle” peut-elle poser problème ?",
      options: [
        "Parce qu’une donnée professionnelle est toujours publique",
        "Parce qu’elle peut identifier une personne, révéler une information confidentielle ou exposer l’entreprise",
        "Parce qu’elle empêche toujours l’IA de répondre",
        "Parce qu’elle doit toujours être publiée"
      ],
      correct: 1,
      explain: "Une donnée professionnelle peut aussi être personnelle, confidentielle ou stratégique."
    },
    {
      theme: "Accessibilité",
      question: "Quel texte est le plus accessible ?",
      options: [
        "Veuillez procéder à l’exécution diligente des modalités subséquentes.",
        "Merci de suivre les prochaines étapes indiquées ci-dessous.",
        "Les modalités opérationnelles seront implémentées ultérieurement.",
        "Il conviendra d’envisager les paramètres afférents."
      ],
      correct: 1,
      explain: "La deuxième phrase est plus simple, directe et compréhensible."
    },
    {
      theme: "Accessibilité",
      question: "Pourquoi faut-il éviter de transmettre une information uniquement par la couleur ?",
      options: [
        "Parce que la couleur augmente toujours le poids du fichier",
        "Parce que certaines personnes peuvent ne pas percevoir ou distinguer les couleurs",
        "Parce que le noir et blanc est obligatoire",
        "Parce que les lecteurs d’écran lisent toutes les couleurs"
      ],
      correct: 1,
      explain: "Une information importante doit aussi être portée par du texte, une icône ou une structure claire."
    },
    {
      theme: "Accessibilité",
      question: "Quel prompt est le plus adapté pour simplifier un texte sans infantiliser le lecteur ?",
      options: [
        "Rends ce texte plus bébé.",
        "Supprime tous les détails.",
        "Réécris ce texte avec des phrases courtes, un vocabulaire simple, un ton professionnel et sans perdre le sens initial.",
        "Fais un résumé drôle."
      ],
      correct: 2,
      explain: "Il faut simplifier sans déformer le sens ni adopter un ton infantilisant."
    },
    {
      theme: "Accessibilité",
      question: "Dans une note interne, quel choix améliore le plus la lisibilité ?",
      options: [
        "Un bloc de texte long sans titres",
        "Des titres clairs, des listes à puces et une idée par paragraphe",
        "Des acronymes non expliqués",
        "Une phrase unique très détaillée"
      ],
      correct: 1,
      explain: "La structure facilite la compréhension et la navigation dans le contenu."
    },
    {
      theme: "Éthique et biais",
      question: "Quel exemple contient le plus clairement un biais à corriger ?",
      options: [
        "Les candidats doivent avoir une expérience en gestion de projet.",
        "Le poste nécessite une bonne capacité d’organisation.",
        "Nous recherchons une assistante naturellement patiente et souriante.",
        "La mission implique des échanges réguliers avec les clients."
      ],
      correct: 2,
      explain: "Cette formulation associe un métier et des qualités à un stéréotype de genre."
    },
    {
      theme: "Éthique et biais",
      question: "Quelle est la meilleure réaction face à une réponse IA qui généralise un groupe de personnes ?",
      options: [
        "La publier si elle est bien écrite",
        "Demander une reformulation plus neutre, inclusive et justifiée",
        "Ajouter des adjectifs plus forts",
        "Supprimer uniquement les accents"
      ],
      correct: 1,
      explain: "Il faut corriger les généralisations et demander une formulation plus neutre."
    },
    {
      theme: "Éthique et biais",
      question: "Dans quel cas la supervision humaine est-elle la plus importante ?",
      options: [
        "Choisir une icône décorative",
        "Corriger une faute de frappe",
        "Trier automatiquement des candidatures ou évaluer des personnes",
        "Proposer trois titres d’article"
      ],
      correct: 2,
      explain: "Les décisions qui affectent des personnes nécessitent une supervision humaine forte."
    },
    {
      theme: "Éthique et biais",
      question: "Quel réflexe est le plus responsable avant de diffuser un contenu généré par IA ?",
      options: [
        "Vérifier les faits, le ton, les biais possibles et l’adéquation avec le public",
        "Publier rapidement pour gagner du temps",
        "Conserver les erreurs si le texte est fluide",
        "Masquer que le contenu concerne des personnes"
      ],
      correct: 0,
      explain: "Un contenu généré doit être relu, vérifié et adapté avant diffusion."
    },
    {
      theme: "Éthique et biais",
      question: "Quel usage est le plus sensible au regard des risques éthiques et réglementaires ?",
      options: [
        "Réécrire une phrase trop longue",
        "Créer un brouillon de post LinkedIn",
        "Générer une idée de titre",
        "Utiliser une IA pour influencer une décision d’accès à un emploi, un service ou un droit"
      ],
      correct: 3,
      explain: "Les usages qui influencent l’accès à un emploi, un service ou un droit sont particulièrement sensibles."
    },
    {
      theme: "Vérification",
      question: "L’IA fournit une statistique précise sans source. Que faire ?",
      options: [
        "La garder si elle semble crédible",
        "La mettre en gras pour renforcer la confiance",
        "Demander ou rechercher une source fiable avant utilisation",
        "La traduire en anglais"
      ],
      correct: 2,
      explain: "Une donnée chiffrée doit être vérifiée avec une source fiable avant diffusion."
    },
    {
      theme: "Vérification",
      question: "Quelle consigne améliore le plus la fiabilité d’une réponse IA ?",
      options: [
        "Réponds vite.",
        "Donne une réponse certaine même si tu n’es pas sûr.",
        "Ajoute plus de style.",
        "Indique les points incertains, les hypothèses et les éléments à vérifier."
      ],
      correct: 3,
      explain: "Demander les incertitudes et les éléments à vérifier aide à mieux contrôler la réponse."
    }
  ];

  let currentQuestion = 0;
  const answers = new Array(questions.length).fill(null);

  const introBox = root.querySelector("#eval-intro");
  const form = root.querySelector("#eval-form");
  const startBtn = root.querySelector("#eval-start");
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
    !introBox || !form || !startBtn || !quizBox ||
    !container || !resultBox || !correctionBox ||
    !submitBtn || !showAnswersBtn || !printBtn || !resetBtn ||
    !dateInput || !nameInput
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

      if (answers[qIndex] === optionIndex) {
        input.checked = true;
      }

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
    if (score <= 10) {
      return {
        label: "Niveau débutant",
        message: "Vous allez surtout consolider les bases de l’IA générative, du prompting et des bons réflexes de sécurité."
      };
    }
    if (score <= 20) {
      return {
        label: "Niveau intermédiaire",
        message: "Vous avez déjà des repères. La formation va vous aider à structurer vos usages et à sécuriser vos pratiques."
      };
    }
    if (score <= 26) {
      return {
        label: "Niveau avancé",
        message: "Vous avez de bonnes bases. L’objectif sera d’aller vers plus de méthode, de précision et de responsabilité."
      };
    }
    return {
      label: "Niveau très avancé",
      message: "Vous maîtrisez déjà beaucoup de notions. La formation servira à renforcer vos réflexes professionnels et votre préparation à la certification."
    };
  }

  function calculateScore() {
    let score = 0;
    answers.forEach(function (answer, index) {
      if (answer === questions[index].correct) score += 1;
    });
    return { score: score, answers: answers };
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

  startBtn.onclick = null;
  startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    startEvaluation();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    startEvaluation();
  });

  submitBtn.addEventListener("click", renderResult);
  showAnswersBtn.addEventListener("click", renderCorrection);

  printBtn.addEventListener("click", function () {
    if (resultBox.style.display === "none") renderResult();
    if (correctionBox.style.display === "none") renderCorrection();
    window.print();
  });

  resetBtn.addEventListener("click", function () {
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
