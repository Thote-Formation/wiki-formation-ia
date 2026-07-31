# 📑 Formateur de Données Brutes (JSON / CSV / MD / YAML)

Générez la consigne stricte imposant à l'IA de répondre uniquement dans un format de données structuré, sans texte superflu ni bavardage.

<div class="prompt-generator">
  <div style="margin-bottom: 16px;">
    <label for="format-target">1. Format de sortie requis :</label>
    <select id="format-target" style="width: 100%; padding: 10px 12px; border: 1px solid #94a3b8; border-radius: 8px; background: var(--md-code-bg-color); color: var(--md-typeset-color); font: inherit;">
      <option value="json">JSON strict (Objet ou Tableau d'objets)</option>
      <option value="csv">CSV (Délimité par des points-virgules pour Excel FR)</option>
      <option value="markdown-table">Tableau Markdown propre</option>
      <option value="yaml">YAML (Configuration / Structure lisible)</option>
      <option value="html-table">Tableau HTML semi-stylisé (&lt;table&gt;)</option>
      <option value="xml">XML / Key-Value (Pour système d'information ou API)</option>
    </select>
  </div>

  <div style="margin-bottom: 16px;">
    <label for="format-fields">2. Structure ou champs attendus :</label>
    <input type="text" id="format-fields" placeholder="Ex: nom, email, rôle, statut" style="width: 100%; padding: 10px 12px; border: 1px solid #94a3b8; border-radius: 8px; background: var(--md-code-bg-color); color: var(--md-typeset-color); font: inherit;">
  </div>

  <div class="wiki-actions">
    <button type="button" id="format-generate-btn" class="wiki-button primary">⚙️ Générer l'instruction de formatage</button>
  </div>

  <div style="position: relative; margin-top: 16px;">
    <button type="button" id="format-copy-btn" class="wiki-button" style="position: absolute; top: 10px; right: 10px; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">📋 Copier</button>
    <pre id="format-generated-output" style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85em; min-height: 80px; white-space: pre-wrap; color: var(--md-typeset-color);">Renseignez les champs et cliquez sur "Générer l'instruction de formatage"...</pre>
  </div>
</div>

<script>
(function() {
  function initDataFormatter() {
    const btnGen = document.getElementById('format-generate-btn');
    const btnCopy = document.getElementById('format-copy-btn');
    const output = document.getElementById('format-generated-output');
    const targetSelect = document.getElementById('format-target');

    if (!btnGen || !output || !targetSelect) return;

    const templates = {
      'json': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - JSON]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Tu dois répondre EXCLUSIVEMENT sous la forme d'un objet JSON valide.
2. N'ajoute AUCUN texte d'introduction, AUCUNE explication et AUCUN texte après le code JSON.
3. Ne mets pas le code dans des blocs markdown (pas de \`\`\`json).

STRUCTURE DES CHAMPS REQUIS :
${fields}

EXEMPLE DE FORMAT ATTENDU :
{
  "donnees": [
    { ... }
  ]
}`,

      'csv': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - CSV]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Tu dois répondre EXCLUSIVEMENT au format CSV brut.
2. Utilise le point-virgule (;) comme séparateur de colonnes (compatibilité Excel FR).
3. La première ligne doit impérativement contenir les en-têtes exacts.
4. N'ajoute AUCUN texte, commentaire ou politesse avant ou après le CSV.

EN-TÊTES ET COLONNES REQUISES :
${fields}`,

      'markdown-table': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - TABLEAU MARKDOWN]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Réponds EXCLUSIVEMENT sous la forme d'un tableau Markdown bien aligné.
2. N'ajoute aucun commentaire, introduction ou conclusion en dehors du tableau.

COLONNES ET STRUCTURE REQUISES :
${fields}`,

      'yaml': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - YAML]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Tu dois répondre EXCLUSIVEMENT avec du code YAML valide.
2. Respecte strictement l'indentation de 2 espaces.
3. N'ajoute AUCUN texte de présentation ni salutation.

STRUCTURE DES CLÉS REQUISES :
${fields}`,

      'html-table': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - TABLEAU HTML]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Génère uniquement le code HTML d'un tableau (balise <table>...</table>).
2. Utilise des balises <thead> pour les en-têtes et <tbody> pour le contenu.
3. Ne génère pas de structure de page complète (pas de <html> ou <body>).
4. Aucun texte explicatif en dehors du code HTML.

COLONNES ET EN-TÊTES SOUHAITÉS :
${fields}`,

      'xml': (fields) =>
`[CONSIGNE STRICTE DE FORMATAGE - XML]
RÈGLES IMPÉRATIVES DE SORTIE :
1. Tu dois répondre EXCLUSIVEMENT en XML valide et bien formé.
2. Utilise une balise racine <donnees> contenant une liste d'éléments <item>.
3. N'ajoute aucun texte en dehors des balises XML.

BALISE ET STRUCTURES ATTENDUES :
${fields}`
    };

    btnGen.addEventListener('click', function() {
      const typeVal = targetSelect.value;
      const fieldsInput = document.getElementById('format-fields')?.value.trim() || "champ1, champ2, champ3";
      
      const builder = templates[typeVal] || templates['json'];
      output.textContent = builder(fieldsInput);
    });

    if (btnCopy) {
      btnCopy.addEventListener('click', function() {
        if (!output.textContent || output.textContent.startsWith("Renseignez")) return;

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
    document.addEventListener("DOMContentLoaded", initDataFormatter);
  } else {
    initDataFormatter();
  }
})();
</script>
