const scenarios = {
  travel: [
    { type: 'thought', text: "💭 **Pensée :** L'utilisateur veut aller à Lyon. Je dois trouver un billet de train pour demain matin." },
    { type: 'action', text: "🛠️ **Action :** Ouverture de l'outil *API SNCF Connect*..." },
    { type: 'observation', text: "👁️ **Observation :** Train de 08h02 trouvé à 45 €. Siège disponible." },
    { type: 'thought', text: "💭 **Pensée :** Le trajet est trouvé. Je demande la validation humaine avant de payer avec la carte de l'entreprise." },
    { type: 'human-in-the-loop', text: "⚠️ **PAUSE DE SÉCURITÉ :** L'Agent souhaite réserver le billet de train (45 €) pour Lyon demain à 08h02.", actionName: "Réserver et payer le billet" }
  ],
  invoice: [
    { type: 'thought', text: "💭 **Pensée :** L'utilisateur veut vérifier la facture #8892. Je vais utiliser la base RAG des factures." },
    { type: 'action', text: "🛠️ **Action :** Recherche RAG du fichier *Facture_8892.pdf* dans les archives..." },
    { type: 'observation', text: "👁️ **Observation :** Le montant est de 1 200 €, mais le RIB du fournisseur ne correspond pas à la fiche officielle." },
    { type: 'thought', text: "💭 **Pensée :** Risque de fraude détecté. Il faut bloquer le paiement et prévenir le service comptable." },
    { type: 'human-in-the-loop', text: "⚠️ **PAUSE DE SÉCURITÉ :** L'Agent recommande de bloquer le paiement de 1 200 € et d'envoyer une alerte sécurité.", actionName: "Bloquer le paiement et alerter" }
  ],
  summary: [
    { type: 'thought', text: "💭 **Pensée :** Je dois résumer les notes brutes de la réunion RH de ce matin." },
    { type: 'action', text: "🛠️ **Action :** Lecture du fichier *CR_RH_ProjetX.docx* via l'outil de traitement de texte..." },
    { type: 'observation', text: "👁️ **Observation :** 5 points clés identifiés : budget validé, recrutement de 2 profils, report du projet." },
    { type: 'thought', text: "💭 **Pensée :** La synthèse est rédigée. Je dois demander confirmation avant d'envoyer l'e-mail à toute l'équipe." },
    { type: 'human-in-the-loop', text: "⚠️ **PAUSE DE SÉCURITÉ :** L'Agent souhaite diffuser cette synthèse par e-mail aux 12 membres du projet RH.", actionName: "Envoyer l'e-mail collectif" }
  ]
};

let currentStep = 0;
let selectedScenario = [];

function runSimulation() {
  const task = document.getElementById('agent-task-select').value;
  selectedScenario = scenarios[task];
  currentStep = 0;
  
  const container = document.getElementById('agent-simulation-container');
  container.innerHTML = '';
  
  document.getElementById('start-agent-btn').disabled = true;
  executeNextStep();
}

function executeNextStep() {
  if (currentStep >= selectedScenario.length) {
    document.getElementById('start-agent-btn').disabled = false;
    return;
  }

  const step = selectedScenario[currentStep];
  const container = document.getElementById('agent-simulation-container');
  const stepDiv = document.createElement('div');
  stepDiv.className = 'summary-box';
  stepDiv.style.margin = '0';
  stepDiv.style.animation = 'fadeIn 0.4s ease-in-out';

  if (step.type === 'human-in-the-loop') {
    stepDiv.className = 'warning-practice-box';
    stepDiv.innerHTML = `
      <p style="margin-bottom: 10px;">${step.text}</p>
      <div class="wiki-actions" style="margin-top: 8px;">
        <button onclick="userDecision(true, '${step.actionName}')" class="wiki-button primary" style="background: #16a34a; border-color: #16a34a;">✅ Approuver : ${step.actionName}</button>
        <button onclick="userDecision(false, '${step.actionName}')" class="wiki-button" style="background: #dc2626; color: white; border-color: #dc2626;">❌ Bloquer l'action</button>
      </div>
    `;
    container.appendChild(stepDiv);
  } else {
    stepDiv.innerHTML = step.text;
    container.appendChild(stepDiv);
    currentStep++;
    setTimeout(executeNextStep, 1400);
  }
}

function userDecision(approved, actionName) {
  const container = document.getElementById('agent-simulation-container');
  const finalDiv = document.createElement('div');
  
  if (approved) {
    finalDiv.className = 'good-reflex-box';
    finalDiv.innerHTML = `✅ **Action validée par l'humain :** "${actionName}" exécuté avec succès par l'Agent IA.`;
  } else {
    finalDiv.className = 'warning-practice-box';
    finalDiv.innerHTML = `🛑 **Action annulée par l'humain :** L'Agent IA a interrompu la procédure en toute sécurité.`;
  }
  
  container.appendChild(finalDiv);
  document.getElementById('start-agent-btn').disabled = false;
}
