function initQuizFinal() {
  const root = document.getElementById("quiz-final-rs6776");
  if (!root) return;
  if (root.dataset.initialized === "true") return;

  root.dataset.initialized = "true";

  const questions = [
    {
      module: "H1",
      label: "Fondamentaux IA",
      question: "Vous demandez à une IA une information récente et chiffrée. Quel est le meilleur réflexe ?",
      options: [
        "La recopier directement si la réponse est bien formulée",
        "Demander une reformulation plus convaincante",
        "Vérifier l’information avec une source fiable ou officielle",
        "Supprimer les chiffres pour éviter la vérification"
      ],
      correct: 2,
      explain: "Une IA peut produire une réponse parfaitement crédible mais totalement fausse. Les chiffres, dates et faits importants doivent toujours être vérifiés.",
      revision: "Révisez H1 : limites de l’IA, hallucinations et vérification humaine."
    },
    {
      module: "H1",
      label: "Fondamentaux IA",
      question: "Quelle phrase décrit le mieux le rôle de l’IA dans un usage professionnel responsable ?",
      options: [
        "L’IA propose, l’humain cadre, vérifie et valide",
        "L’IA décide seule si le prompt est précis",
        "L’IA remplace la responsabilité juridique du professionnel",
        "L’IA garantit toujours la conformité du résultat produit"
      ],
      correct: 0,
      explain: "L’IA est une aide à la production. La responsabilité finale reste humaine.",
      revision: "Révisez H1 : rôle de l’humain, limites et responsabilité."
    },
    {
      module: "H1",
      label: "Fondamentaux IA",
      question: "Qu'appelle-t-on la 'fenêtre de contexte' d'un Modèle de Langage (LLM) ?",
      options: [
        "L'interface graphique dans laquelle on tape le texte",
        "La quantité maximale de texte que le modèle peut lire et retenir dans un échange",
        "La période de mise à jour des données d'entraînement de l'IA",
        "L'historique complet de toutes les conversations de l'utilisateur"
      ],
      correct: 1,
      explain: "La fenêtre de contexte correspond au volume d'informations que le modèle peut traiter en une fois.",
      revision: "Révisez H1 : mécanismes des LLM et notion de contexte."
    },
    {
      module: "H1",
      label: "Fondamentaux IA",
      question: "Pourquoi une IA peut-elle affirmer avec assurance des faits totalement fictifs ?",
      options: [
        "Parce qu'elle tente de tromper intentionnellement l'utilisateur",
        "Parce qu'elle fonctionne par prédiction statistique de mots et non par compréhension logique du réel",
        "Parce que son serveur est saturé d'informations",
        "Parce qu'elle n'a pas accès à la langue française"
      ],
      correct: 1,
      explain: "Un LLM produit des séquences probables, ce qui peut générer des erreurs plausibles mais fausses.",
      revision: "Révisez H1 : fonctionnement probabiliste des LLM."
    },

    {
      module: "H2",
      label: "Stratégie IA",
      question: "Avant de choisir un outil IA, quelle est la première question à se poser ?",
      options: [
        "Quel outil est le plus populaire ou à la mode ?",
        "Quelle tâche concrète et quel besoin métier veux-je traiter ?",
        "Quel outil possède l'interface la plus moderne ?",
        "Quel outil est utilisé par mes concurrents directs ?"
      ],
      correct: 1,
      explain: "Une stratégie IA part d’un besoin métier réel, pas d’un effet de mode.",
      revision: "Révisez H2 : cartographie des tâches et stratégie IA."
    },
    {
      module: "H2",
      label: "Stratégie IA",
      question: "Une équipe veut automatiser ses comptes-rendus de réunion. Quelle démarche est la plus professionnelle ?",
      options: [
        "Utiliser immédiatement une IA sans règles pour gagner du temps",
        "Tout interdire par principe car l’IA comporte des risques",
        "Identifier les données traitées, choisir un outil conforme et prévoir une validation humaine",
        "Publier automatiquement tous les comptes-rendus générés"
      ],
      correct: 2,
      explain: "Une démarche rigoureuse prend en compte les données, les risques et la validation humaine.",
      revision: "Révisez H2 : cartographie des risques et gouvernance."
    },
    {
      module: "H2",
      label: "Stratégie IA",
      question: "Dans le cadre d'un diagnostic d'opportunité IA, quel indicateur est prioritaire pour évaluer une tâche ?",
      options: [
        "Le niveau de technicité du vocabulaire utilisé",
        "Le rapport entre le temps gagné, la valeur ajoutée et le niveau de risque associé",
        "La quantité de texte produite à la minute",
        "La capacité de l'IA à remplacer totalement les collaborateurs"
      ],
      correct: 1,
      explain: "Le gain potentiel doit toujours être mis en balance avec le risque.",
      revision: "Révisez H2 : matrice gain/risque et choix des cas d'usage."
    },
    {
      module: "H2",
      label: "Stratégie IA",
      question: "Quel est l'un des principaux dangers du 'Shadow AI' ?",
      options: [
        "La lenteur des connexions réseau",
        "La fuite de données confidentielles et la non-conformité RGPD",
        "L'augmentation des factures d'électricité de l'entreprise",
        "Le risque de saturation du disque dur"
      ],
      correct: 1,
      explain: "Le Shadow AI peut exposer des données sensibles à des outils non validés.",
      revision: "Révisez H2 : risques du Shadow AI et cadre de gouvernance."
    },

    {
      module: "H3",
      label: "Prompting",
      question: "Quel prompt est le plus exploitable et efficace pour un usage professionnel ?",
      options: [
        "Fais-moi un texte sur le service client.",
        "Rédige un email de relance client, ton professionnel, maximum 120 mots, avec un objet clair et sans inventer d’information.",
        "Améliore la communication de notre service.",
        "Écris quelque chose de vendeur pour nos produits."
      ],
      correct: 1,
      explain: "Un bon prompt précise le rôle, l’objectif, le ton, le format et les contraintes.",
      revision: "Révisez H3 : structures de prompts et consignes."
    },
    {
      module: "H3",
      label: "Prompting",
      question: "Quand est-il particulièrement pertinent de demander à l’IA de vous poser des questions avant de répondre ?",
      options: [
        "Quand la demande est complexe, stratégique ou incomplète",
        "Uniquement pour générer une illustration",
        "Jamais, car cela ralentit inutilement le processus",
        "Seulement si le document d'entrée fait moins de 10 mots"
      ],
      correct: 0,
      explain: "Les questions de clarification améliorent fortement la qualité des réponses complexes.",
      revision: "Révisez H3 : clarification du besoin."
    },
    {
      module: "H3",
      label: "Prompting",
      question: "Dans le framework CROFT, à quoi correspond la lettre 'C' ?",
      options: [
        "Conclusion",
        "Contexte",
        "Correction",
        "Complexité"
      ],
      correct: 1,
      explain: "Le 'C' désigne le contexte.",
      revision: "Révisez H3 : composantes de la méthode CROFT."
    },
    {
      module: "H3",
      label: "Prompting",
      question: "Quelle technique de prompting consiste à donner un ou plusieurs exemples de résultats attendus ?",
      options: [
        "Zero-shot prompting",
        "Few-shot prompting",
        "Prompting négatif",
        "Chain of Thought"
      ],
      correct: 1,
      explain: "Le Few-shot prompting guide le modèle avec des exemples.",
      revision: "Révisez H3 : Zero-shot vs Few-shot prompting."
    },

    {
      module: "H4",
      label: "Prompt visuel",
      question: "Quel élément crucial manque le plus dans le prompt : 'Crée une belle image pour mon article' ?",
      options: [
        "Le nom du navigateur web utilisé",
        "Le nombre de paragraphes du texte",
        "Le sujet précis, le style, l’éclairage, les couleurs, le cadrage et le ratio",
        "Le tarif d'abonnement de l'outil"
      ],
      correct: 2,
      explain: "Un prompt visuel utile doit préciser le sujet, le style et les paramètres de composition.",
      revision: "Révisez H4 : piliers d’un prompt visuel."
    },
    {
      module: "H4",
      label: "Prompt visuel",
      question: "Pour un visuel professionnel destiné à un site d'entreprise, quelle précaution est recommandée ?",
      options: [
        "Demander d'intégrer de longs paragraphes de texte dans l'image",
        "Demander le logo d'une marque très connue sans autorisation",
        "Exiger des visages de personnalités publiques facilement identifiables",
        "Éviter les logos réels, les textes intégrés complexes et les personnes réelles identifiables"
      ],
      correct: 3,
      explain: "Cela limite les risques de qualité, de droit à l’image et de propriété intellectuelle.",
      revision: "Révisez H4 : contraintes et bonnes pratiques d'image."
    },
    {
      module: "H4",
      label: "Prompt visuel",
      question: "A quoi sert un 'prompt négatif' dans les outils de génération d'images ?",
      options: [
        "A exprimer son mécontentement",
        "A lister les éléments que l'IA ne doit pas faire apparaître",
        "A réduire la résolution de l'image",
        "A générer une image noire"
      ],
      correct: 1,
      explain: "Le prompt négatif sert à exclure les éléments indésirables.",
      revision: "Révisez H4 : prompts négatifs et paramètres avancés."
    },
    {
      module: "H4",
      label: "Prompt visuel",
      question: "Quel terme désigne le rapport entre la largeur et la hauteur d'une image ?",
      options: [
        "La définition de pixels",
        "Le ratio d'aspect",
        "La profondeur de champ",
        "La balance des blancs"
      ],
      correct: 1,
      explain: "Le ratio d’aspect définit le format géométrique du visuel.",
      revision: "Révisez H4 : formats et paramètres techniques des visuels."
    },

    {
      module: "H5",
      label: "Confidentialité",
      question: "Quel contenu ne faut-il pas insérer dans une IA générative grand public ?",
      options: [
        "Un modèle d'email totalement anonymisé",
        "Une consigne générale de rédaction administrative",
        "Un listing de clients avec noms, adresses et numéros de contrat",
        "Un extrait de texte public déjà paru sur un site officiel"
      ],
      correct: 2,
      explain: "Les données personnelles ou stratégiques ne doivent pas être exposées sans garanties adaptées.",
      revision: "Révisez H5 : données sensibles, RGPD et anonymisation."
    },
    {
      module: "H5",
      label: "Confidentialité",
      question: "Quel est le bon réflexe avant de soumettre un document interne à un outil d'IA ?",
      options: [
        "Nettoyer le document de ses données identifiables et vérifier les règles de traitement",
        "Transmettre le document complet pour maximiser la précision",
        "Multiplier les envois sur différentes plateformes",
        "Demander à l’IA elle-même si elle garantit la confidentialité"
      ],
      correct: 0,
      explain: "La sécurisation des données se fait avant l’envoi.",
      revision: "Révisez H5 : protection des données et paramètres de confidentialité."
    },
    {
      module: "H5",
      label: "Confidentialité",
      question: "Que signifie l'anonymisation par pseudonymisation ou caviardage ?",
      options: [
        "Changer la police en italique",
        "Remplacer les identifiants réels par des variables génériques",
        "Mettre le texte en majuscules",
        "Compresser le fichier en ZIP"
      ],
      correct: 1,
      explain: "Le caviardage remplace les éléments identifiants par des équivalents neutres.",
      revision: "Révisez H5 : techniques de caviardage et d'anonymisation."
    },
    {
      module: "H5",
      label: "Confidentialité",
      question: "Dans le cadre du RGPD, quel principe impose de ne traiter que les données strictement nécessaires ?",
      options: [
        "Le principe de souveraineté nationale",
        "Le principe de minimisation des données",
        "Le principe d'obsolescence programmée",
        "Le principe d'archivage permanent"
      ],
      correct: 1,
      explain: "Le RGPD impose de limiter les données au strict nécessaire.",
      revision: "Révisez H5 : principes fondamentaux du RGPD."
    },

    {
      module: "H6",
      label: "Accessibilité",
      question: "Parmi ces formulations, laquelle respecte le mieux les principes du langage clair ?",
      options: [
        "Veuillez procéder à l’exécution diligente des modalités subséquentes.",
        "Les modalités opérationnelles seront implémentées ultérieurement.",
        "Merci de suivre les étapes ci-dessous.",
        "Il conviendra d’envisager l'ensemble des paramètres afférents."
      ],
      correct: 2,
      explain: "Le langage clair privilégie les phrases simples, directes et compréhensibles.",
      revision: "Révisez H6 : langage clair et lisibilité."
    },
    {
      module: "H6",
      label: "Accessibilité",
      question: "Quelle consigne donnée à une IA est la plus adaptée pour un objectif d'inclusivité et d'accessibilité ?",
      options: [
        "Rends ce texte plus abstrait.",
        "Utilise des termes techniques plus recherchés.",
        "Supprime la ponctuation.",
        "Identifie les formulations ambiguës ou excluantes et propose une version claire, neutre et accessible."
      ],
      correct: 3,
      explain: "Cette consigne vise à la fois la clarté, la neutralité et l’accessibilité.",
      revision: "Révisez H6 : accessibilité, inclusion et prompts de réécriture."
    },
    {
      module: "H6",
      label: "Accessibilité",
      question: "Pourquoi est-il important de structurer un document avec des titres hiérarchisés ?",
      options: [
        "Pour que l'IA consomme moins d'électricité",
        "Pour aider les lecteurs d'écran et clarifier la logique du document",
        "C'est utile seulement pour imprimer",
        "Pour masquer les erreurs de grammaire"
      ],
      correct: 1,
      explain: "Une structure claire aide la lecture humaine et les technologies d’assistance.",
      revision: "Révisez H6 : structuration des contenus et normes RGAA."
    },
    {
      module: "H6",
      label: "Accessibilité",
      question: "Qu'est-ce que l'alternative textuelle d'une image ?",
      options: [
        "Le titre visible sous la photo",
        "Une description textuelle courte du contenu et de la fonction de l'image",
        "Le nom du fichier image",
        "Le lien de téléchargement"
      ],
      correct: 1,
      explain: "Le texte alternatif rend l’image accessible aux lecteurs d’écran.",
      revision: "Révisez H6 : description d'images et accessibilité numérique."
    },

    {
      module: "H7",
      label: "Éthique et biais",
      question: "Selon l’IA Act, dans quelle catégorie se situe un système d'IA utilisé pour trier automatiquement des candidatures RH ?",
      options: [
        "Risque minimal",
        "Risque limité",
        "Haut risque",
        "Inacceptable"
      ],
      correct: 2,
      explain: "Le recrutement fait partie des usages à haut risque.",
      revision: "Révisez H7 : classification IA Act et usages à haut risque."
    },
    {
      module: "H7",
      label: "Éthique et biais",
      question: "Avant de diffuser un document généré par IA à l'ensemble des collaborateurs, quelle vérification est obligatoire ?",
      options: [
        "Vérifier uniquement qu'il contient des émoticônes",
        "Vérifier uniquement qu'il dépasse 500 mots",
        "Effectuer une relecture humaine : exactitude, biais, ton et adaptation au public",
        "Vérifier la couleur de l'arrière-plan"
      ],
      correct: 2,
      explain: "La validation humaine reste indispensable avant diffusion.",
      revision: "Révisez H7 : audit de biais, éthique et validation humaine."
    },
    {
      module: "H7",
      label: "Éthique et biais",
      question: "Quel cas d'usage relève de la catégorie 'Risque Inacceptable' selon l'IA Act ?",
      options: [
        "Un système de notation sociale des citoyens",
        "Un chatbot d'assistance client",
        "Un outil de détection de spam",
        "Un correcteur grammatical"
      ],
      correct: 0,
      explain: "La notation sociale est interdite.",
      revision: "Révisez H7 : usages interdits sous l'IA Act."
    },
    {
      module: "H7",
      label: "Éthique et biais",
      question: "Comment appelle-t-on la tendance d'une IA à reproduire des stéréotypes présents dans ses données d'entraînement ?",
      options: [
        "Une erreur de syntaxe",
        "Un biais algorithmique",
        "Un problème de bande passante",
        "Une baisse d'énergie du serveur"
      ],
      correct: 1,
      explain: "Les biais algorithmiques reproduisent des déséquilibres présents dans les données.",
      revision: "Révisez H7 : origine des biais et éthique de l'IA."
    },
    {
      module: "H7",
      label: "Éthique et biais",
      question: "Quel est l'objectif d'un prompt d'audit de biais ?",
      options: [
        "Accélérer la vitesse de génération",
        "Demander au modèle de réexaminer un contenu pour détecter stéréotypes ou exclusions",
        "Traduire automatiquement le texte",
        "Changer le format du document"
      ],
      correct: 1,
      explain: "L’audit de biais sert à faire relire le contenu avec un regard critique.",
      revision: "Révisez H7 : techniques de prompts d'audit réflexif."
    },
    {
      module: "H7",
      label: "Éthique et biais",
      question: "En matière d'empreinte environnementale de l'IA, quel principe d'action est préconisé ?",
      options: [
        "Générer systématiquement 10 images HD par requête",
        "Répéter le même prompt 50 fois",
        "Adopter la sobriété numérique",
        "Ne jamais éteindre son ordinateur"
      ],
      correct: 2,
      explain: "La sobriété numérique consiste à éviter les usages inutiles et surdimensionnés.",
      revision: "Révisez H7 : sobriété numérique et impacts environnementaux."
    }
  ];

  let current = 0;
  let score = 0;
  const answersByModule = {};

  const progressEl = root.querySelector("#quizfinal-progress");
  const moduleEl = root.querySelector("#quizfinal-module");
  const questionEl = root.querySelector("#quizfinal-question");
  const choicesEl = root.querySelector("#quizfinal-choices");
  const feedbackEl = root.querySelector("#quizfinal-feedback");
  const nextBtn = root.querySelector("#quizfinal-next");
  const restartBtn = root.querySelector("#quizfinal-restart");
  const scoreEl = root.querySelector("#quizfinal-score");
  const revisionsEl = root.querySelector("#quizfinal-revisions");

  if (!progressEl || !moduleEl || !questionEl || !choicesEl || !feedbackEl || !nextBtn || !restartBtn || !scoreEl || !revisionsEl) {
    return;
  }

  function initModules() {
    questions.forEach(function (q) {
      if (!answersByModule[q.module]) {
        answersByModule[q.module] = {
          label: q.label,
          total: 0,
          correct: 0,
          revisions: []
        };
      }
      answersByModule[q.module].total += 1;
    });
  }

  function renderQuestion() {
    const q = questions[current];

    progressEl.textContent = "Question " + (current + 1) + " sur " + questions.length;
    moduleEl.textContent = q.module + " — " + q.label;
    questionEl.textContent = q.question;
    choicesEl.innerHTML = "";
    feedbackEl.style.display = "none";
    feedbackEl.className = "quizfinal-feedback";
    feedbackEl.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach(function (option, index) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = option;

      btn.addEventListener("click", function () {
        answerQuestion(index);
      });

      choicesEl.appendChild(btn);
    });
  }

  function answerQuestion(selectedIndex) {
    const q = questions[current];
    const buttons = choicesEl.querySelectorAll("button");
    const isCorrect = selectedIndex === q.correct;

    buttons.forEach(function (btn, index) {
      btn.disabled = true;

      if (index === q.correct) {
        btn.classList.add("correct");
      }

      if (index === selectedIndex && !isCorrect) {
        btn.classList.add("wrong");
      }
    });

    if (isCorrect) {
      score += 1;
      answersByModule[q.module].correct += 1;
    } else {
      answersByModule[q.module].revisions.push(q.revision);
    }

    feedbackEl.style.display = "block";
    feedbackEl.classList.add(isCorrect ? "ok" : "ko");
    feedbackEl.innerHTML =
      (isCorrect ? "<strong>Bonne réponse.</strong> " : "<strong>Réponse à revoir.</strong> ") +
      "<br>" + q.explain;

    if (current < questions.length - 1) {
      nextBtn.style.display = "inline-block";
    } else {
      showResults();
    }
  }

  function showResults() {
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    scoreEl.style.display = "block";
    revisionsEl.style.display = "block";

    const percent = Math.round((score / questions.length) * 100);

    let scoreHtml = "<h2>Résultat final</h2>";
    scoreHtml += "<p><strong>Score global :</strong> " + score + " / " + questions.length + " (" + percent + "%)</p>";

    if (percent >= 85) {
      scoreHtml += "<p><strong>Niveau :</strong> Très solide. Vous maîtrisez parfaitement l'ensemble des réflexes professionnels.</p>";
    } else if (percent >= 65) {
      scoreHtml += "<p><strong>Niveau :</strong> Bon niveau global. Quelques notions ciblées méritent une relecture.</p>";
    } else if (percent >= 45) {
      scoreHtml += "<p><strong>Niveau :</strong> Bases présentes, mais plusieurs automatismes fondamentaux doivent être renforcés.</p>";
    } else {
      scoreHtml += "<p><strong>Niveau :</strong> Reprise conseillée des modules théoriques et pratiques avant toute tentative de certification.</p>";
    }

    scoreHtml += "<h3>Détail par séance</h3>";
    scoreHtml += "<table class='quizfinal-score-table'>";
    scoreHtml += "<thead><tr><th>Séance</th><th>Thème</th><th>Score obtenu</th></tr></thead><tbody>";

    Object.keys(answersByModule).forEach(function (module) {
      const item = answersByModule[module];
      scoreHtml +=
        "<tr>" +
        "<td><strong>" + module + "</strong></td>" +
        "<td>" + item.label + "</td>" +
        "<td>" + item.correct + " / " + item.total + "</td>" +
        "</tr>";
    });

    scoreHtml += "</tbody></table>";
    scoreEl.innerHTML = scoreHtml;

    let revisionsHtml = "<h2>Recommandations de révision</h2>";
    let hasRevision = false;

    Object.keys(answersByModule).forEach(function (module) {
      const item = answersByModule[module];

      if (item.correct < item.total) {
        hasRevision = true;
        const uniqueRevisions = Array.from(new Set(item.revisions));

        revisionsHtml += "<h3>" + module + " — " + item.label + "</h3>";
        revisionsHtml += "<ul>";

        uniqueRevisions.forEach(function (revision) {
          revisionsHtml += "<li>" + revision + "</li>";
        });

        revisionsHtml += "</ul>";
      }
    });

    if (!hasRevision) {
      revisionsHtml += "<p><strong>Excellente maîtrise !</strong> Vous avez répondu correctement à l'ensemble des questions. Vous êtes prêt pour la suite.</p>";
    } else {
      revisionsHtml += "<p><em>Conseil : relisez prioritairement les séances indiquées ci-dessus, puis rejouez le quiz.</em></p>";
    }

    revisionsEl.innerHTML = revisionsHtml;
  }

  nextBtn.addEventListener("click", function () {
    current += 1;
    renderQuestion();
  });

  restartBtn.addEventListener("click", function () {
    current = 0;
    score = 0;

    Object.keys(answersByModule).forEach(function (module) {
      answersByModule[module].correct = 0;
      answersByModule[module].revisions = [];
    });

    scoreEl.style.display = "none";
    revisionsEl.style.display = "none";
    scoreEl.innerHTML = "";
    revisionsEl.innerHTML = "";
    restartBtn.style.display = "none";

    renderQuestion();
  });

  initModules();
  renderQuestion();
}

if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    initQuizFinal();
  });
} else if (document.readyState !== "loading") {
  initQuizFinal();
} else {
  document.addEventListener("DOMContentLoaded", initQuizFinal);
}
