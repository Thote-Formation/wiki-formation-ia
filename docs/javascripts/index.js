/**
 * Gestion du quiz d'échauffement sur la page d'accueil
 */
function checkHeroQuiz(option) {
  const feedback = document.getElementById('quiz-hero-feedback');
  if (!feedback) return;

  feedback.style.display = 'block';

  if (option === 2) {
    feedback.className = 'good-reflex-box';
    feedback.innerHTML = '<strong>✅ Exact !</strong> L’anonymisation préalable est indispensable avant d’injecter tout contenu confidentiel dans un LLM (Compétence clé RS6776).';
  } else if (option === 1) {
    feedback.className = 'warning-practice-box';
    feedback.innerHTML = '<strong>⚠️ Attention :</strong> Copier des données brutes peut entraîner une fuite d’informations confidentielles et violer le RGPD.';
  } else {
    feedback.className = 'warning-practice-box';
    feedback.innerHTML = '<strong>⚠️ Attention :</strong> Une consigne donnée dans un prompt ne garantit pas la confidentialité technique ni le non-entraînement des modèles.';
  }
}
