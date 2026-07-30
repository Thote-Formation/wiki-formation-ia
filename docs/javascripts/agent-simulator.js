document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-agent-btn');
  const container = document.getElementById('agent-simulation-container');
  const taskSelect = document.getElementById('agent-task-select');

  if (!startBtn || !container) return;

  const scenarios = {
    travel: [
      { type: 'thought', text: '🧠 **Pensée :** L\'utilisateur veut aller à Lyon. Je dois chercher un billet de train et un hôtel disponible.' },
      { type: 'action', text: '🛠️ **Action :** Interrogation de l\'API SNCF pour un trajet Paris-Lyon demain à 08h00.' },
      { type: 'observation', text: '👁️ **Observation :** TGV n°6601 disponible à 45 €.' },
      { type: 'thought', text: '🧠 **Pensée :** Le train est trouvé. Je vais maintenant chercher un hôtel proche de la gare Part-Dieu.' },
      { type: 'action', text: '🛠️ **Action :** Recherche RAG dans la base des hôtels partenaires d\'entreprise.' },
      { type: 'observation', text: '👁️ **Observation :** Hôtel Novotel Part-Dieu disponible à 90 €/nuit.' },
      { type: 'final', text: '✅ **Réponse Finale :** Billet de TGV réservable à 45 € (8h00) et chambre disponible au Novotel Part-Dieu (90 €). Voulez-vous valider le paiement ?' }
    ],
    invoice: [
      { type: 'thought', text: '🧠 **Pensée :** Je dois vérifier la facture n°402. Je vais d\'abord la lire dans la base documentaire.' },
      { type: 'action', text: '🛠️ **Action (RAG) :** Extraction du texte de la Facture_402.pdf.' },
      { type: 'observation', text: '👁️ **Observation :** Montant = 4 500 € HT. Fournisseur = TechCorp.' },
      { type: 'thought', text: '🧠 **Pensée :** Je dois comparer ce montant avec le bon de commande signé.' },
      { type: 'action', text: '🛠️ **Action :** Reconstitution et recherche du Bon_de_Commande_BC88.pdf.' },
      { type: 'observation', text: '👁️ **Observation :** Le bon de commande était de 3 500 € HT.' },
      { type: 'final', text: '⚠️ **Alerte Finale :** Anomalie détectée ! La facture est supérieure de 1 000 € au bon de commande initial. Validation bloquée.' }
    ],
    summary: [
      { type: 'thought', text: '🧠 **Pensée :** Je dois résumer les décisions de la réunion RH de ce matin.' },
      { type: 'action', text: '🛠️ **Action (RAG) :** Lecture du fichier de transcription automatique Reag_RH_12.txt.' },
      { type: 'observation', text: '👁️ **Observation :** 3 sujets abordés : Télétravail, Prime transport, Formations IA.' },
      { type: 'thought', text: '🧠 **Pensée :** Je vais synthétiser chaque point sous forme de tableau Markdown.' },
      { type: 'final', text: '✅ **Synthèse prête :** 1. Télétravail : 2j/semaine validés. 2. Prime transport : Hausse de 10%. 3. Formations IA : Lancement prévu le mois prochain.' }
    ]
  };

  startBtn.addEventListener('click', () => {
    const selectedTask = taskSelect.value;
    const steps = scenarios[selectedTask];
    container.innerHTML = '';
    startBtn.disabled = true;
    startBtn.style.opacity = '0.6';

    steps.forEach((step, index) => {
      setTimeout(() => {
        const stepDiv = document.createElement('div');
        stepDiv.style.padding = '10px 14px';
        stepDiv.style.borderRadius = '6px';
        stepDiv.style.fontSize = '13px';
        stepDiv.style.lineHeight = '1.4';
        stepDiv.style.borderLeft = '4px solid #1a5fb4';
        stepDiv.style.background = 'var(--md-default-bg-color, #fff)';

        if (step.type === 'thought') {
          stepDiv.style.borderLeftColor = '#e5a50a'; // Jaune/Orange
        } else if (step.type === 'action') {
          stepDiv.style.borderLeftColor = '#1a5fb4'; // Bleu
        } else if (step.type === 'observation') {
          stepDiv.style.borderLeftColor = '#613583'; // Violet
        } else if (step.type === 'final') {
          stepDiv.style.borderLeftColor = '#2ec4b6'; // Vert
          stepDiv.style.fontWeight = 'bold';
        }

        stepDiv.innerHTML = step.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        container.appendChild(stepDiv);

        if (index === steps.length - 1) {
          startBtn.disabled = false;
          startBtn.style.opacity = '1';
        }
      }, index * 1000); // Défilement progressif toutes les secondes
    });
  });
});
