document.addEventListener("DOMContentLoaded", function () {
  // Liste des identifiants uniques des modules de formation
  const formationPages = ["h0", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "quiz"];

  // Fonction utilitaire pour normaliser les URL
  function normalizePath(str) {
    if (!str) return "";
    return decodeURIComponent(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/\s+/g, "-");          // Remplace les espaces par des tirets
  }

  let viewedPages = JSON.parse(localStorage.getItem("wiki_viewed_pages") || "[]");
  const currentPath = normalizePath(window.location.pathname);

  // Détection de la page actuelle dans le parcours de formation
  const currentPageKey = formationPages.find(key => currentPath.includes(key));

  const article = document.querySelector(".md-content__inner");

  // 1. TEMPS DE LECTURE ESTIMÉ (Appliqué à TOUTES les pages du Wiki)
  if (article) {
    const text = article.innerText || "";
    const wordCount = text.trim().split(/\s+/).length;
    
    // Vitesse adaptée à de la formation/technique (~35 mots/minute avec exercices/réflexion)
    const readingTimeMinutes = Math.max(2, Math.ceil(wordCount / 35));

    const h1 = article.querySelector("h1");
    if (h1 && !article.querySelector(".reading-time-badge")) {
      const timeBadge = document.createElement("div");
      timeBadge.className = "reading-time-badge";
      timeBadge.style.cssText = "display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #1a5fb4; background: #eef4fb; padding: 4px 10px; border-radius: 12px; margin-top: 8px; margin-bottom: 16px;";
      timeBadge.innerHTML = `⏱️ Temps estimé : ~${readingTimeMinutes} min (${wordCount} mots)`;
      h1.insertAdjacentElement('afterend', timeBadge);
    }
  }

  // 2. BOUTON BASCULE (Uniquement sur les pages de Formation H0-H7 + Quiz)
  if (article && currentPageKey) {
    let btnContainer = document.getElementById("lesson-completion-container");
    if (!btnContainer) {
      btnContainer = document.createElement("div");
      btnContainer.id = "lesson-completion-container";
      btnContainer.style.cssText = "margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;";

      const statusText = document.createElement("span");
      statusText.id = "lesson-status-text";
      statusText.style.cssText = "font-size: 13px; color: #666; font-weight: 500;";

      const btn = document.createElement("button");
      btn.id = "lesson-toggle-btn";
      btn.className = "md-button md-button--primary";
      btn.style.cssText = "cursor: pointer; font-size: 13px; transition: all 0.2s ease;";

      function updateButtonUI() {
        const isAlreadyViewed = viewedPages.includes(currentPageKey);
        if (isAlreadyViewed) {
          btn.textContent = "✅ Leçon terminée (Cliquer pour décocher)";
          statusText.textContent = "Statut : Leçon validée ✅";
          btn.style.background = "#2e7d32";
          btn.style.borderColor = "#2e7d32";
        } else {
          btn.textContent = "⚪ Marquer comme lue";
          statusText.textContent = "Statut : Non terminée ⚪";
          btn.style.background = "";
          btn.style.borderColor = "";
        }
      }

      btn.addEventListener("click", function () {
        const index = viewedPages.indexOf(currentPageKey);
        if (index > -1) {
          viewedPages.splice(index, 1);
        } else {
          viewedPages.push(currentPageKey);
        }
        localStorage.setItem("wiki_viewed_pages", JSON.stringify(viewedPages));
        updateButtonUI();
        updateAll();
      });

      updateButtonUI();
      btnContainer.appendChild(statusText);
      btnContainer.appendChild(btn);
      article.appendChild(btnContainer);
    }
  }

  // 3. BARRE DE PROGRESSION GLOBALE (Dédiée aux parcours de formation)
  function renderProgressBar() {
    let progressBox = document.getElementById("global-progress-box");
    
    if (!progressBox) {
      const nav = document.querySelector(".md-sidebar--primary .md-sidebar__scrollwrap") || document.querySelector(".md-nav");
      if (nav) {
        progressBox = document.createElement("div");
        progressBox.id = "global-progress-box";
        progressBox.style.cssText = "padding: 12px 16px; margin: 12px; background: #f5f7fa; border: 1px solid #d5d9de; border-radius: 8px;";
        
        progressBox.innerHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #444; margin-bottom: 6px;">
            <span>Progression Formation</span>
            <span id="progress-percent">0%</span>
          </div>
          <div style="width: 100%; background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
            <div id="global-progress-bar" style="width: 0%; height: 100%; background: #4a9b5e; transition: width 0.3s ease;"></div>
          </div>
        `;
        nav.insertBefore(progressBox, nav.firstChild);
      }
    }

    const percent = Math.round((viewedPages.length / formationPages.length) * 100);
    const percentEl = document.getElementById("progress-percent");
    const barEl = document.getElementById("global-progress-bar");

    if (percentEl) percentEl.textContent = `${percent}%`;
    if (barEl) barEl.style.width = `${percent}%`;
  }

  // 4. MISE À JOUR DES COCHES DANS LE MENU LATÉRAL
  function markMenuLinks() {
    document.querySelectorAll(".md-nav__link").forEach(link => {
      const href = normalizePath(link.getAttribute("href") || "");
      
      formationPages.forEach(key => {
        if (href.includes(key)) {
          const existingCheck = link.querySelector(".check-mark");
          if (viewedPages.includes(key)) {
            if (!existingCheck) {
              const check = document.createElement("span");
              check.className = "check-mark";
              check.style.cssText = "margin-left: auto; color: #4a9b5e; font-weight: bold; font-size: 13px;";
              check.textContent = " ✓";
              link.appendChild(check);
            }
          } else {
            if (existingCheck) {
              existingCheck.remove();
            }
          }
        }
      });
    });
  }

  function updateAll() {
    renderProgressBar();
    markMenuLinks();
  }

  updateAll();
});
