/* ==================================================== */
/* CAS PRATIQUES INTERACTIVITY SCRIPT                   */
/* ==================================================== */

document.addEventListener("DOMContentLoaded", function () {
  initDataMasker();
  initPromptCopy();
});

/* --- 1. MASQUEUR DE DONNÉES SENSIBLES --- */
function initDataMasker() {
  const inputEl = document.getElementById('masker-input');
  const outputEl = document.getElementById('masker-output');
  const btnEl = document.getElementById('masker-btn');

  if (!inputEl || !outputEl || !btnEl) return;

  btnEl.addEventListener('click', function () {
    let text = inputEl.value;

    if (!text.trim()) {
      outputEl.textContent = "Veuillez coller un texte à anonymiser ci-dessus.";
      return;
    }

    // Expressions régulières simples pour la démonstration
    text = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
    text = text.replace(/(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, '[TÉLÉPHONE]');
    text = text.replace(/\b\d{1,3}(?:\s?\d{3})*(?:,\d{2})?\s?€\b/g, '[MONTANT]');
    text = text.replace(/\b(Monsieur|Madame|M\.|Mme)\s+[A-ZÀ-Ÿ][a-zà-ÿ]+\s+[A-ZÀ-Ÿ]+/g, '[CIVILITÉ NOM]');

    outputEl.textContent = text;
  });
}

/* --- 2. COPIE RAPIDE DES PROMPTS --- */
function initPromptCopy() {
  const copyBtns = document.querySelectorAll('.prompt-copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "✅ Copié !";
          setTimeout(() => { btn.textContent = originalText; }, 2000);
        });
      }
    });
  });
}
