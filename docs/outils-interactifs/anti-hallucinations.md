# 🛡️ Générateur Anti-Hallucinations & Ancrage factuel

Sélectionnez votre cas d'usage pour générer les garde-fous d'ancrage et forcer l'IA à restituer des réponses 100% vérifiables sans inventer de faits.

<div class="prompt-generator">
  <div style="margin-bottom: 16px;">
    <label for="hallu-type">1. Type de garde-fou souhaité :</label>
    <select id="hallu-type" style="width: 100%; padding: 10px 12px; border: 1px solid #94a3b8; border-radius: 8px; background: var(--md-code-bg-color); color: var(--md-typeset-color); font: inherit;">
      <option value="strict-context">Ancrage strict sur document fourni (Ne répondre qu'avec le texte joint)</option>
      <option value="uncertainty-clause">Clause d'incertitude autorisée (Dire "Je ne sais pas" plutôt qu'inventer)</option>
      <option value="source-citation">Citation systématique des sources et extraits exacts</option>
      <option value="step-verification">Raisonnement pas à pas avec vérification préalable (Chain of Thought)</option>
    </select>
  </div>

  <div style="margin-bottom: 16px;">
    <label for="hallu-topic">2. Votre sujet ou document d'origine (Optionnel) :</label>
    <input type="text" id="hallu-topic" placeholder="Ex: Analyse de la note de service interne n°12 sur le télétravail">
  </div>

  <div class="wiki-actions">
    <button type="button" id="hallu-generate-btn" class="wiki-button primary">⚙️ Générer la clause anti-hallucination</button>
  </div>

  <div style="position: relative; margin-top: 16px;">
    <button type="button" id="hallu-copy-btn" class="wiki-button" style="position: absolute; top: 10px; right: 10px; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">📋 Copier</button>
    <pre id="hallu-generated-output" style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85em; min-height: 80px; white-space: pre-wrap; color: var(--md-typeset-color); font-family: var(--md-code-font-family, monospace);">Sélectionnez une option et cliquez sur "Générer la clause anti-hallucination"...</pre>
  </div>
</div>

<script>
(function() {
  function initHalluGenerator() {
    const btnGen = document.getElementById('hallu-generate-btn');
    const btnCopy = document.getElementById('hallu-copy-btn');
    const output = document.getElementById('hallu-generated-output');
    const typeSelect = document.getElementById('hallu-type');

    if (!btnGen || !output || !typeSelect) return;

    const templates = {
      'strict-context': (topic) => 
`[CONSIGNE D'ANCRAGE STRICT - SANS HALLUCINATION]
Sujet / Contexte : ${topic}

RÈGLES D'INSTRUCTION :
1. Base exclusivement tes réponses sur le texte fourni ci-joint.
2. N'utilise AUCUNE connaissance externe ni extrapolation.
3. Si la réponse à la question ne se trouve pas explicitement dans le document, réponds exactement : "Cette information n'est pas présente dans le document fourni."`,

      'uncertainty-clause': (topic) => 
`[CONSIGNE DE TRANSPARENCE ET D'INCERTITUDE]
Sujet / Contexte : ${topic}

RÈGLES D'INSTRUCTION :
1. Réponds avec précision en te basant sur des faits vérifiables.
2. Si tu n'es pas certain(e) à 100 % d'une donnée, d'une date ou d'un chiffre, indique clairement ton degré d'incertitude.
3. Il est strictly interdit d'inventer des éléments pour combler les lacunes. Préfère dire "Information non confirmée" ou "Je ne sais pas".`,

      'source-citation': (topic) => 
`[CONSIGNE DE CITATION SYSTÉMATIQUE DES SOURCES]
Sujet / Contexte : ${topic}

RÈGLES D'INSTRUCTION :
1. Pour chaque affirmation ou fait énoncé dans ta réponse, ajoute immédiatement entre crochets le passage ou l'extrait exact du document source.
2. Format attendu : "Affirmation... [Source : « Extrait exact du texte »]".
3. Toute affirmation non adossée à une citation exacte sera considérée comme nulle.`,

      'step-verification': (topic) => 
`[CONSIGNE RAISONNEMENT PAS À PAS ET AUDIT FACTUEL]
Sujet / Contexte : ${topic}

RÈGLES D'INSTRUCTION :
1. Avant de donner ta réponse finale, détaille ton raisonnement étape par étape.
2. Étape 1 : Liste les faits bruts extraits du contexte.
3. Étape 2 : Vérifie l'absence de contradiction ou d'extrapolation.
4. Étape 3 : Rédige ta synthèse finale uniquement sur la base des faits validés à l'étape 1.`
    };

    btnGen.addEventListener('click', function() {
      const typeVal = typeSelect.value;
      const topicInput = document.getElementById('hallu-topic')?.value.trim() || "Document / Texte transmis";
      
      const builder = templates[typeVal] || templates['strict-context'];
      output.textContent = builder(topicInput);
    });

    if (btnCopy) {
      btnCopy.addEventListener('click', function() {
        if (!output.textContent || output.textContent.startsWith("Sélectionnez")) return;

        navigator.clipboard.writeText(output.textContent).then(function() {
          const txtOriginal = btnCopy.textContent;
          btnCopy.textContent = "✅ Copié !";
          setTimeout(function() {
            btnCopy.textContent = txtOriginal;
          }, 2000);
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHalluGenerator);
  } else {
    initHalluGenerator();
  }
})();
</script>
