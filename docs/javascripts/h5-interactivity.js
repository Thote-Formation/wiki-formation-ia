/**
 * formation/js/h5-interactivity.js
 * Modules interactifs pour la séance H5 :
 * 1. Traque aux données sensibles (Jeu de détection RGPD & Sécurité)
 * 2. Simulateur d'empreinte environnementale (Sobriété numérique)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. MODULE : TRAQUE AUX DONNÉES SENSIBLES
  // =========================================================================
  function initSensitiveGameH5() {
    const scenarios = [
      {
        tokens: [
          { text: "Rédige un mail de relance pour le client ", sensitive: false },
          { text: "Mairie de Loos", sensitive: true, type: "Donnée client / institutionnelle confidentielle" },
          { text: " (contrat ", sensitive: false },
          { text: "250k€/an", sensitive: true, type: "Donnée financière / montant de marché" },
          { text: ", responsable ", sensitive: false },
          { text: "Marie Dubois", sensitive: true, type: "Donnée personnelle nominative (RGPD)" },
          { text: ", ", sensitive: false },
          { text: "marie.dubois@example.fr", sensitive: true, type: "Email professionnel (risque de phishing / RGPD)" },
          { text: "). Le fournisseur est en retard de paiement depuis ", sensitive: false },
          { text: "3 semaines", sensitive: true, type: "Information confidentielle sur un litige" },
          { text: ". Merci de préparer une réponse ferme mais courtoise.", sensitive: false }
        ]
      },
      {
        tokens: [
          { text: "Synthétise le CV du candidat ", sensitive: false },
          { text: "Thomas Bernard", sensitive: true, type: "Donnée personnelle nominative (RGPD)" },
          { text: " (NIR : ", sensitive: false },
          { text: "1 85 04 75 112 012", sensitive: true, type: "Numéro de Sécurité Sociale (Hautement sensible)" },
          { text: ") postulant pour le poste de comptable. Il demande un salaire de ", sensitive: false },
          { text: "45k€/an", sensitive: true, type: "Prétention salariale individuelle" },
          { text: " et mentionne un arrêt maladie récent de ", sensitive: false },
          { text: "2 mois", sensitive: true, type: "Donnée de santé protégée" },
          { text: ".", sensitive: false }
        ]
      },
      {
        tokens: [
          { text: "Analyse les résultats de l'étude sur le ", sensitive: false },
          { text: "Projet Alpha-X", sensitive: true, type: "Nom de code R&D (Secret industriel)" },
          { text: ". Le patient ", sensitive: false },
          { text: "P-402 (M. Durand)", sensitive: true, type: "Identité de patient combinée à son identifiant" },
          { text: " a montré des effets secondaires légers après administration de la dose de ", sensitive: false },
          { text: "50mg", sensitive: false },
          { text: ". Merci de proposer un résumé clinique.", sensitive: false }
        ]
      }
    ];

    let currentScenario = 0;
    const selected = new Set();
    let verified = false;

    const scenarioSelect = document.getElementById('sensitive-scenario');
    const textBox = document.getElementById('sensitive-text-box');
    const verifyBtn = document.getElementById('sensitive-verify');
    const resetBtn = document.getElementById('sensitive-reset');
    const results = document.getElementById('sensitive-results');
    const summary = document.getElementById('sensitive-summary');

    if (!textBox || !verifyBtn) return;

    function render() {
      textBox.innerHTML = '';
      verified = false;
      selected.clear();

      const tokens = scenarios[currentScenario].tokens;

      tokens.forEach((tok, idx) => {
        const span = document.createElement('span');
        span.textContent = tok.text;
        span.style.cssText = "padding: 3px 6px; border-radius: 4px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; display: inline-block; margin: 1px 0;";

        span.addEventListener('mouseenter', () => {
          if (!verified && !selected.has(idx)) span.style.background = "rgba(26, 95, 180, 0.1)";
        });
        span.addEventListener('mouseleave', () => {
          if (!verified && !selected.has(idx)) span.style.background = "transparent";
        });

        span.addEventListener('click', () => toggle(idx, span));
        textBox.appendChild(span);
      });
    }

    function toggle(idx, span) {
      if (verified) return;
      if (selected.has(idx)) {
        selected.delete(idx);
        span.style.background = "transparent";
        span.style.borderColor = "transparent";
      } else {
        selected.add(idx);
        span.style.background = "rgba(217, 164, 65, 0.3)";
        span.style.borderColor = "#d9a441";
      }
    }

    verifyBtn.addEventListener('click', () => {
      verified = true;
      const tokens = scenarios[currentScenario].tokens;
      const spans = textBox.querySelectorAll('span');

      let correctCount = 0;
      let sensitiveTotal = 0;
      let falsePositives = 0;

      tokens.forEach((tok, idx) => {
        if (tok.sensitive) {
          sensitiveTotal++;
          if (selected.has(idx)) {
            spans[idx].style.background = "rgba(74, 155, 94, 0.3)";
            spans[idx].style.borderColor = "#4a9b5e";
            correctCount++;
          } else {
            spans[idx].style.background = "rgba(201, 86, 74, 0.2)";
            spans[idx].style.border = "1px dashed #c9564a";
          }
        } else {
          if (selected.has(idx)) {
            spans[idx].style.background = "rgba(201, 86, 74, 0.3)";
            spans[idx].style.borderColor = "#c9564a";
            falsePositives++;
          }
        }
      });

      results.innerHTML = '';
      tokens.forEach(tok => {
        if (tok.sensitive) {
          const div = document.createElement('div');
          div.style.cssText = "padding: 10px 14px; border-radius: 6px; background: var(--md-default-bg-color, #fff); border: 1px solid var(--md-default-fg-color--lightest, #d5d9de); margin-bottom: 8px; font-size: 13px; color: var(--md-typeset-color, #333);";
          div.innerHTML = `<strong style="color: #1a5fb4;">${tok.text}</strong> — ${tok.type}`;
          results.appendChild(div);
        }
      });

      results.style.display = 'block';
      summary.style.display = 'block';

      let summaryText = `Résultat : Vous avez identifié ${correctCount} sur ${sensitiveTotal} donnée(s) sensible(s).`;
      if (falsePositives > 0) {
        summaryText += ` (Attention : ${falsePositives} élément(s) non sensible(s) sélectionné(s))`;
      }
      summary.textContent = summaryText;

      verifyBtn.style.display = 'none';
      resetBtn.style.display = 'inline-block';
    });

    resetBtn.addEventListener('click', () => {
      results.style.display = 'none';
      summary.style.display = 'none';
      verifyBtn.style.display = 'inline-block';
      resetBtn.style.display = 'none';
      render();
    });

    if (scenarioSelect) {
      scenarioSelect.addEventListener('change', (e) => {
        currentScenario = parseInt(e.target.value, 10);
        results.style.display = 'none';
        summary.style.display = 'none';
        verifyBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
        render();
      });
    }

    render();
  }

  // =========================================================================
  // 2. MODULE : CALCULATEUR DE SOBRIÉTÉ NUMÉRIQUE
  // =========================================================================
  function initEcoCalculatorH5() {
    const lengthInput = document.getElementById('eco-length');
    const countInput = document.getElementById('eco-count');
    const modelInput = document.getElementById('eco-model');

    const lengthVal = document.getElementById('eco-length-val');
    const countVal = document.getElementById('eco-count-val');

    const resWater = document.getElementById('res-water');
    const resElec = document.getElementById('res-elec');
    const resCo2 = document.getElementById('res-co2');
    const ecoTip = document.getElementById('eco-tip');

    if (!lengthInput || !countInput || !modelInput) return;

    function calculate() {
      const len = parseInt(lengthInput.value, 10);
      const count = parseInt(countInput.value, 10);
      const factor = parseFloat(modelInput.value);

      if (lengthVal) lengthVal.textContent = len;
      if (countVal) countVal.textContent = count;

      // Calculs de base pour 1 prompt moyen (50 tokens = ~200 chars)
      const tokensRatio = (len / 200);
      const annualPrompts = count * 365;

      const waterLiters = ((annualPrompts * 0.005 * tokensRatio * factor)).toFixed(1);
      const elecKwh = ((annualPrompts * 0.0003 * tokensRatio * factor)).toFixed(2);
      const co2Kg = ((annualPrompts * 0.0001 * tokensRatio * factor)).toFixed(2);

      if (resWater) resWater.textContent = waterLiters + " L";
      if (resElec) resElec.textContent = elecKwh + " kWh";
      if (resCo2) resCo2.textContent = co2Kg + " kg";

      if (ecoTip) {
        if (factor > 2) {
          ecoTip.innerHTML = "💡 <strong>Conseil sobriété :</strong> Pour des tâches simples (correction, résumé), préférez un modèle standard ou local afin de réduire par 3 l'impact énergétique.";
        } else if (count > 20) {
          ecoTip.innerHTML = "💡 <strong>Conseil sobriété :</strong> Pensez à regrouper vos demandes (batching) dans un seul prompt structuré plutôt que de multiplier les micro-requêtes.";
        } else {
          ecoTip.innerHTML = "🌱 <strong>Bonne pratique :</strong> Votre usage est modéré. Préférez les réponses courtes et synthétiques pour maintenir cet impact très bas.";
        }
      }
    }

    lengthInput.addEventListener('input', calculate);
    countInput.addEventListener('input', calculate);
    modelInput.addEventListener('change', calculate);

    calculate();
  }

  // Initialisation compatible MkDocs Material (Instant loading)
  function initAllH5Modules() {
    initSensitiveGameH5();
    initEcoCalculatorH5();
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initAllH5Modules();
    });
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllH5Modules);
    } else {
      initAllH5Modules();
    }
  }
})();
