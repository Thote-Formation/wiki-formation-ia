/**
 * Calcul dynamique du score d'auto-évaluation RS6776
 */
function updateRs6776Score() {
  const checkboxes = document.querySelectorAll('.rs-check-item');
  const scoreCount = document.getElementById('rs6776-score-count');
  const scoreMessage = document.getElementById('rs6776-score-message');

  if (!checkboxes.length || !scoreCount || !scoreMessage) return;

  let checkedCount = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) checkedCount++;
  });

  scoreCount.textContent = checkedCount;

  if (checkedCount === 0) {
    scoreMessage.innerHTML = "Commencez par effectuer l'<strong>évaluation d'entrée</strong> ou le <strong>Module H0</strong>.";
  } else if (checkedCount <= 3) {
    scoreMessage.innerHTML = "Début prometteur ! Consolidez vos acquis en explorant les modules <strong>H1 à H4</strong>.";
  } else if (checkedCount <= 5) {
    scoreMessage.innerHTML = "Très bon niveau ! Peaufinez les aspects sécurité et éthique dans les modules <strong>H5, H6 et H7</strong>.";
  } else {
    scoreMessage.innerHTML = "<strong>🎉 Excellent !</strong> Vous maîtrisez l'ensemble des compétences clés requises pour l'examen RS6776 !";
  }
}
