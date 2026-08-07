/* Thotie Quest V2 — socle partagé (navigation).
   À inclure sur CHAQUE page, après le script Tailwind CDN + config :
   <script src="[chemin vers assets]/shared.js"></script>
   Le chemin exact importe peu : ce script se repère tout seul (voir detectBase ci-dessous),
   donc il fonctionne autant depuis docs/v2/index.html que depuis docs/v2/formation/h0.html. */

(function () {
  // --- Repérage automatique de la racine docs/v2/, quelle que soit la profondeur de la page ---
  // On retrouve la balise <script> qui a chargé ce fichier, et on déduit le chemin vers docs/v2/.
  function detectBase() {
    const scripts = document.getElementsByTagName("script");
    for (const s of scripts) {
      if (s.src && s.src.indexOf("assets/shared.js") !== -1) {
        return s.src.slice(0, s.src.indexOf("assets/shared.js"));
      }
    }
    return "./";
  }

  const V2_BASE = detectBase(); // ex: https://.../wiki-formation-ia/v2/  (ou .../v2/formation/../ si sous-dossier)
  const SITE_ROOT = V2_BASE + "../"; // racine du site mkdocs actuel (docs/)
  const JEU_URL = V2_BASE + "../jeux/index.html"; // Thotie Quest (docs/jeux/)

  // Onglets du site, dans l'ordre du mkdocs.yml actuel.
  // "built: false" = page pas encore portée en V2 → affichée grisée avec "Bientôt" au lieu d'un lien.
  // Passe à true + ajuste "href" au fur et à mesure que chaque section est construite.
  const NAV = [
    { id: "accueil", label: "Accueil", href: "index.html", built: true },
    { id: "certification", label: "Certification RS6776", href: "certification/index.html", built: false },
    { id: "formation", label: "Parcours de formation", href: "formation/h0.html", built: false },
    { id: "outils", label: "Outils", href: "outils/index.html", built: false },
    { id: "ressources", label: "Ressources", href: "ressources/index.html", built: false },
    { id: "glossaire", label: "Glossaire", href: "glossaire.html", built: false },
  ];

  function renderNav(activeId) {
    const mount = document.getElementById("tq-nav");
    if (!mount) return;

    mount.innerHTML = `
      <div class="flex items-center justify-between px-4 md:px-8 h-16 max-w-[1400px] mx-auto">
        <a href="${V2_BASE}index.html" class="flex items-center gap-2 font-headline-md text-lg text-primary shrink-0">
          <span class="material-symbols-outlined">hub</span> Thotie Formation
        </a>

        <nav class="hidden lg:flex items-center gap-1 overflow-x-auto">
          ${NAV.map((item) => {
            const isActive = item.id === activeId;
            if (!item.built) {
              return `<span class="px-3 py-2 rounded-lg text-sm text-outline opacity-50 cursor-not-allowed whitespace-nowrap" title="Bientôt disponible en V2">${item.label}</span>`;
            }
            return `<a href="${V2_BASE}${item.href}" class="px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              isActive
                ? "bg-primary-container text-on-primary-container font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }">${item.label}</a>`;
          }).join("")}
        </nav>

        <a href="${JEU_URL}" class="flex items-center gap-2 bg-secondary-container text-on-secondary-container text-sm font-semibold px-4 py-2 rounded-xl neo-bevel shrink-0">
          <span class="material-symbols-outlined text-[18px]">stadia_controller</span>
          <span class="hidden sm:inline">Thotie Quest</span>
        </a>
      </div>
      <div class="lg:hidden flex gap-1 px-4 pb-3 overflow-x-auto max-w-[1400px] mx-auto">
        ${NAV.map((item) => {
          const isActive = item.id === activeId;
          if (!item.built) {
            return `<span class="px-3 py-1.5 rounded-lg text-xs text-outline opacity-50 whitespace-nowrap">${item.label}</span>`;
          }
          return `<a href="${V2_BASE}${item.href}" class="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
            isActive ? "bg-primary-container text-on-primary-container font-semibold" : "text-on-surface-variant"
          }">${item.label}</a>`;
        }).join("")}
      </div>
    `;
  }

  function renderFooter() {
    const mount = document.getElementById("tq-footer");
    if (!mount) return;
    mount.innerHTML = `
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant">
        <p>Assistance IA (IA Act) &amp; données hébergées en UE (RGPD).</p>
        <a href="${SITE_ROOT}" class="hover:text-secondary flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">history</span> Voir l'ancien site
        </a>
      </div>
    `;
  }

  window.TQ = {
    V2_BASE,
    SITE_ROOT,
    JEU_URL,
    NAV,
    init(activeId) {
      renderNav(activeId);
      renderFooter();
    },
  };
})();
