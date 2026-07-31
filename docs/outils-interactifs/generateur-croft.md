# ⚙️ Générateur de Prompt CROFT

Remplissez les 5 piliers du framework CROFT pour générer instantanément un prompt structuré et optimisé.

<div class="prompt-generator">
  <div class="prompt-generator-grid">
    <div>
      <label for="croft-c">C — Contexte :</label>
      <input type="text" id="croft-c" placeholder="Ex: PME de courtage, réorganisation de l'accueil téléphonique">
    </div>
    <div>
      <label for="croft-r">R — Rôle :</label>
      <input type="text" id="croft-r" placeholder="Ex: Expert en relation client et organisation d'entreprise">
    </div>
    <div>
      <label for="croft-o">O — Objectif :</label>
      <input type="text" id="croft-o" placeholder="Ex: Rédiger une procédure claire pour les appels entrants">
    </div>
    <div>
      <label for="croft-f">F — Format :</label>
      <input type="text" id="croft-f" placeholder="Ex: Liste à puces numérotée avec titres en gras, max 1 page">
    </div>
    <div>
      <label for="croft-t">T — Ton :</label>
      <input type="text" id="croft-t" placeholder="Ex: Professionnel, direct, bienveillant">
    </div>
  </div>

  <div class="wiki-actions">
    <button type="button" id="croft-generate-btn" class="wiki-button primary">⚙️ Générer le prompt</button>
  </div>

  <div style="position: relative; margin-top: 16px;">
    <button type="button" id="croft-copy-btn" class="wiki-button" style="position: absolute; top: 10px; right: 10px; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">📋 Copier</button>
    <pre id="croft-generated-output" style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85em; min-height: 80px; white-space: pre-wrap; color: var(--md-typeset-color);">Remplissez les champs ci-dessus et cliquez sur "Générer le prompt"...</pre>
  </div>
</div>

<script>
(function() {
  function initCroftGenerator() {
    const btnGen = document.getElementById('croft-generate-btn');
    const btnCopy = document.getElementById('croft-copy-btn');
    const output = document.getElementById('croft-generated-output');

    if (!btnGen || !output) return;

    btnGen.addEventListener('click', function() {
      const c = document.getElementById('croft-c')?.value.trim() || "Non spécifié";
      const r = document.getElementById('croft-r')?.value.trim() || "Expert dans le domaine concerné";
      const o = document.getElementById('croft-o')?.value.trim() || "Atteindre l'objectif décrit";
      const f = document.getElementById('croft-f')?.value.trim() || "Réponse claire et structurée";
      const t = document.getElementById('croft-t')?.value.trim() || "Professionnel et direct";

      const finalPrompt = `[PROMPT GENERÉ VIA FRAMEWORK CROFT]

CONTEXTE :
${c}

RÔLE :
Agis en tant que : ${r}.

OBJECTIF :
${o}

FORMAT ATTENDU :
${f}

TON & STYLE :
${t}`;

      output.textContent = finalPrompt;
    });

    if (btnCopy) {
      btnCopy.addEventListener('click', function() {
        if (!output.textContent || output.textContent.startsWith("Remplissez")) return;

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
    document.addEventListener("DOMContentLoaded", initCroftGenerator);
  } else {
    initCroftGenerator();
  }
})();
</script>
