document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("home-orientation-app");
  if (!container) return;

  const options = [
    {
      label: "🚀 Je commence le parcours de formation (Séance H0)",
      link: "./formation/h0/",
      btnText: "Aller au module H0"
    },
    {
      label: "📝 Je veux évaluer mes connaissances actuelles",
      link: "./evaluation-entree/",
      btnText: "Démarrer l'évaluation"
    },
    {
      label: "🧩 Je cherche un template de prompt opérationnel",
      link: "./prompt-croft/",
      btnText: "Voir les templates CROFT"
    },
    {
      label: "🎓 Je souhaite comprendre le référentiel de certification RS6776",
      link: "./certification-rs6776/",
      btnText: "Consulter la fiche RS6776"
    }
  ];

  let html = `
    <div style="background: var(--md-code-bg-color); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--md-default-foreground--tile);">
      <label for="orientation-select" style="font-weight: bold; display: block; margin-bottom: 0.5rem;">Sélectionnez votre objectif :</label>
      <select id="orientation-select" style="width: 100%; padding: 0.6rem; border-radius: 4px; border: 1px solid #ccc; font-size: 1rem; margin-bottom: 1rem; background-color: var(--md-default-bg-color); color: var(--md-default-foreground);">
  `;

  options.forEach((opt, index) => {
    html += `<option value="${index}">${opt.label}</option>`;
  });

  html += `
      </select>
      <div style="text-align: right;">
        <a id="orientation-btn" href="${options[0].link}" class="md-button md-button--primary" style="text-decoration: none;">${options[0].btnText}</a>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const selectEl = document.getElementById("orientation-select");
  const btnEl = document.getElementById("orientation-btn");

  selectEl.addEventListener("change", function (e) {
    const selectedIndex = e.target.value;
    const selectedOpt = options[selectedIndex];
    btnEl.href = selectedOpt.link;
    btnEl.textContent = selectedOpt.btnText;
  });
});
