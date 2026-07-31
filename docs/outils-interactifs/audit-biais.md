# 🔍 Audit Rapide de Biais & Inclusivité

Générez une grille d'évaluation ou un prompt d'analyse pour détecter les stéréotypes, termes exclusifs ou biais de genre/culture dans vos écrits.

<div class="prompt-generator">
  <div style="margin-bottom: 16px;">
    <label for="bias-type">1. Type de contenu à analyser :</label>
    <select id="bias-type" style="width: 100%; padding: 10px 12px; border: 1px solid #94a3b8; border-radius: 8px; background: var(--md-code-bg-color); color: var(--md-typeset-color); font: inherit;">
      <option value="job-offer">Offre d'emploi ou fiche de poste (Genre, âge, compétences implicites)</option>
      <option value="internal-note">Communication interne & Procédure (Lisibilité, inclusivité, ton)</option>
      <option value="marketing">Support commercial ou marketing (Stéréotypes, représentations)</option>
    </select>
  </div>

  <div class="wiki-actions">
    <button type="button" id="bias-generate-btn" class="wiki-button primary">⚙️ Générer la consigne d'audit de biais</button>
  </div>

  <div style="position: relative; margin-top: 16px;">
    <button type="button" id="bias-copy-btn" class="wiki-button" style="position: absolute; top: 10px; right: 10px; padding: 4px 10px; font-size: 0.75rem; border-radius: 6px;">📋 Copier</button>
    <pre id="bias-generated-output" style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 0.85em; min-height: 80px; white-space: pre-wrap; color: var(--md-typeset-color);">Sélectionnez une option et cliquez sur "Générer la consigne d'audit"...</pre>
  </div>
</div>

<script>
(function() {
  function initBiasAudit() {
    const btnGen = document.getElementById('bias-generate-btn');
    const btnCopy = document.getElementById('bias-copy-btn');
    const output = document.getElementById('bias-generated-output');
    const typeSelect = document.getElementById('bias-type');

    if (!btnGen || !output || !typeSelect) return;

    const templates = {
      'job-offer': 
`[CONSIGNE D'AUDIT : OFFRE D'EMPLOI ET FICHE DE POSTE]
Analyse le texte suivant afin d'identifier d'éventuels biais discriminatoires ou exclusifs.

GRILLE D'ANALYSE :
1. Équilibre de genre : Vérifie l'usage de la rédaction épicène, des doublons ou du masculin neutre.
2. Biais d'âge et d'expérience : Repère les termes ciblant implicitement une tranche d'âge (ex: "dynamique", "digital native").
3. Langage d'exclusion : Signale le jargon excessif ou les critères surdimensionnés non essentiels.
4. Restitution : Propose une version corrigée et neutre du texte.`,

      'internal-note': 
`[CONSIGNE D'AUDIT : COMMUNICATION INTERNE & PROCÉDURE]
Analyse le texte suivant afin de garantir son inclusivité et sa lisibilité globale.

GRILLE D'ANALYSE :
1. Accessibilité du langage (FALC) : Repère les phrases trop complexes, la voix passive inutile ou le jargon non expliqué.
2. Inclusivité des formules : Identifie les expressions genrées ou corporatistes excluantes.
3. Ton et respect : S'assure d'un ton bienveillant, clair et respectueux de la diversité des équipes.
4. Restitution : Fournis une liste d'ajustements et une reformulation plus claire.`,

      'marketing': 
`[CONSIGNE D'AUDIT : SUPPORT commercial ET MARKETING]
Analyse le contenu suivant pour vérifier la présence de stéréotypes ou de représentations biaisées.

GRILLE D'ANALYSE :
1. Stéréotypes de rôles : Vérifie si le texte associe certains rôles, métiers ou comportements à un genre ou une culture.
2. Représentativité : Évalue si le message s'adresse à un public large sans présupposés exclusifs.
3. Analyse d'impact : Identifie les termes pouvant être perçus comme stigmatisants ou dévalorisants.
4. Restitution : Propose des alternatives neutres et valorisantes pour l'ensemble des audiences.`
    };

    btnGen.addEventListener('click', function() {
      const typeVal = typeSelect.value;
      output.textContent = templates[typeVal] || templates['job-offer'];
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
    document.addEventListener("DOMContentLoaded", initBiasAudit);
  } else {
    initBiasAudit();
  }
})();
</script>
