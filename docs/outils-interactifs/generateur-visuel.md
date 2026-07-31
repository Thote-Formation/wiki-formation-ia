# 🎨 Assistant Prompt Visuel

Spécifiez les caractéristiques esthétiques de votre image pour générer une consigne précise adaptée à Midjourney, DALL·E ou Adobe Firefly.

<div class="prompt-generator">
  <div class="prompt-generator-grid">
    <div>
      <label for="visuel-sujet">1. Sujet principal :</label>
      <input type="text" id="visuel-sujet" placeholder="Ex: Une équipe d'experts analysant des données sur tablette">
    </div>
    <div>
      <label for="visuel-style">2. Style artistique :</label>
      <input type="text" id="visuel-style" placeholder="Ex: Illustration vectorielle flat design moderne">
    </div>
    <div>
      <label for="visuel-ambiance">3. Ambiance & Éclairage :</label>
      <input type="text" id="visuel-ambiance" placeholder="Ex: Lumineuse, dynamique et technologique">
    </div>
    <div>
      <label for="visuel-couleurs">4. Palette de couleurs :</label>
      <input type="text" id="visuel-couleurs" placeholder="Ex: Bleu marine, blanc et touches de vert menthe">
    </div>
    <div>
      <label for="visuel-format">5. Cadrage & Format :</label>
      <input type="text" id="visuel-format" placeholder="Ex: Plan moyen, format paysage 16:9">
    </div>
  </div>

  <div class="wiki-actions">
    <button type="button" id="visuel-generate-btn" class="wiki-button primary">⚙️ Générer le prompt visuel</button>
  </div>

  <div style="position: relative; margin-top: 16px;">
    <button type="button" id="visuel-copy-btn" class="wiki-button" style="position: absolute; top: 10px; right: 10px; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">📋 Copier</button>
    <pre id="visuel-generated-output" style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85em; min-height: 80px; white-space: pre-wrap; color: var(--md-typeset-color); font-family: var(--md-code-font-family, monospace);">Remplissez les champs ci-dessus et cliquez sur "Générer le prompt visuel"...</pre>
  </div>
</div>

<script>
(function() {
  function initPromptVisuel() {
    const btnGen = document.getElementById('visuel-generate-btn');
    const btnCopy = document.getElementById('visuel-copy-btn');
    const output = document.getElementById('visuel-generated-output');

    if (!btnGen || !output) return;

    btnGen.addEventListener('click', function() {
      const sujet = document.getElementById('visuel-sujet')?.value.trim() || "Une équipe professionnelle au travail";
      const style = document.getElementById('visuel-style')?.value.trim() || "Illustration vectorielle moderne, flat design";
      const ambiance = document.getElementById('visuel-ambiance')?.value.trim() || "Lumineuse, dynamique";
      const couleurs = document.getElementById('visuel-couleurs')?.value.trim() || "Palette harmonieuse et professionnelle";
      const format = document.getElementById('visuel-format')?.value.trim() || "Format paysage 16:9, plan moyen";

      const finalPrompt = `PROMPT VISUEL GÉNÉRÉ :\n\n"${sujet}. Style : ${style}. Ambiance et éclairage : ${ambiance}. Palette de couleurs : ${couleurs}. Cadrage et composition : ${format}. Haute définition, rendu soigné, pas de texte parasites sur l'image."`;

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
    document.addEventListener("DOMContentLoaded", initPromptVisuel);
  } else {
    initPromptVisuel();
  }
})();
</script>
