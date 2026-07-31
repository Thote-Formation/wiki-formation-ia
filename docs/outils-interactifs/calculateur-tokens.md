# 🧮 Calculateur de Tokens, Coûts & Volume

<div class="real-life-box">
  <h3>💡 C'est quoi un "Token" ?</h3>
  <p>Les IA ne lisent pas en mots mais en <strong>tokens</strong> (des morceaux de mots ou de ponctuation). En français, <strong>100 mots ≈ 130 à 140 tokens</strong>. Le nombre de tokens détermine la <strong>limite de mémoire</strong> de l'IA et le <strong>coût de traitement</strong>.</p>
</div>

---

## 🧪 Votre outil de mesure en temps réel

Collez ou tapez votre texte ci-dessous pour analyser instantanément son volume, son coût et sa saturation de mémoire :

<div class="prompt-generator">
  <label for="token-input">1. Votre texte ou prompt :</label>
  <textarea id="token-input" rows="5" placeholder="Collez votre document, note ou prompt ici pour calculer sa taille..."></textarea>

  <!-- MÉTROLOGIE DE BASE -->
  <div class="prompt-generator-grid" style="margin-top: 16px;">
    
    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Mots</span>
      <strong id="token-words-count" style="font-size: 1.4rem; color: #0d47a1;">0</strong>
    </div>

    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Tokens estimé(s)</span>
      <strong id="token-estimated-count" style="font-size: 1.4rem; color: #0d47a1;">0</strong>
    </div>

    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Volume équivalent</span>
      <strong id="token-page-equiv" style="font-size: 0.95rem; display: block; margin-top: 5px;">0 page(s) A4</strong>
    </div>

  </div>

  <!-- COMPARATEUR DE COÛTS PAR MODÈLE -->
  <div style="background: var(--md-code-bg-color); padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; margin: 16px 0;">
    <span style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 10px;">📊 Estimation du coût de lecture (Entrée API) :</span>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.82rem;">
      <div style="padding: 8px; background: var(--md-default-bg-color); border-radius: 6px; border: 1px solid #e2e8f0;">
        <span style="font-weight: 600; display: block;">GPT-4o</span>
        <span id="cost-gpt4o" style="font-weight: 700; color: #0d47a1;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: var(--md-default-bg-color); border-radius: 6px; border: 1px solid #e2e8f0;">
        <span style="font-weight: 600; display: block;">GPT-4o Mini</span>
        <span id="cost-gpt4o-mini" style="font-weight: 700; color: #15803d;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: var(--md-default-bg-color); border-radius: 6px; border: 1px solid #e2e8f0;">
        <span style="font-weight: 600; display: block;">Claude 3.5 Sonnet</span>
        <span id="cost-claude-sonnet" style="font-weight: 700; color: #0d47a1;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: var(--md-default-bg-color); border-radius: 6px; border: 1px solid #e2e8f0;">
        <span style="font-weight: 600; display: block;">Claude 3.5 Haiku</span>
        <span id="cost-claude-haiku" style="font-weight: 700; color: #15803d;">0.0000 €</span>
      </div>
    </div>
  </div>

  <!-- JAUGE D'INCLUSION DE CONTEXTE -->
  <div>
    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 6px;">
      <span>Remplissage de la mémoire standard (Fenêtre de 128k tokens)</span>
      <span id="jauge-percent">0%</span>
    </div>
    <div style="width: 100%; height: 10px; background: #cbd5e1; border-radius: 999px; overflow: hidden;">
      <div id="jauge-fill" style="width: 0%; height: 100%; background: #0d47a1; transition: width 0.3s, background 0.3s;"></div>
    </div>
  </div>

</div>

<script>
(function() {
  function initTokenCalculator() {
    const input = document.getElementById('token-input');
    const wordsEl = document.getElementById('token-words-count');
    const tokensEl = document.getElementById('token-estimated-count');
    const pageEl = document.getElementById('token-page-equiv');
    
    const costGpt4o = document.getElementById('cost-gpt4o');
    const costGpt4oMini = document.getElementById('cost-gpt4o-mini');
    const costClaudeSonnet = document.getElementById('cost-claude-sonnet');
    const costClaudeHaiku = document.getElementById('cost-claude-haiku');
    
    const jaugeFill = document.getElementById('jauge-fill');
    const jaugePercent = document.getElementById('jauge-percent');

    if (!input || !wordsEl) return;

    // Taux de conversion moyen EUR (1$ = ~0.92€) & Tarifs d'entrée par million de tokens
    const USD_TO_EUR = 0.92;
    const TARIFS_EUR_PER_1M = {
      gpt4o: 2.50 * USD_TO_EUR,         // $2.50 / 1M
      gpt4oMini: 0.15 * USD_TO_EUR,     // $0.15 / 1M
      claudeSonnet: 3.00 * USD_TO_EUR,  // $3.00 / 1M
      claudeHaiku: 0.80 * USD_TO_EUR    // $0.80 / 1M
    };

    function calculer() {
      const text = input.value.trim();
      
      if (!text) {
        wordsEl.textContent = "0";
        tokensEl.textContent = "0";
        pageEl.textContent = "0 page(s) A4";
        costGpt4o.textContent = "0.0000 €";
        costGpt4oMini.textContent = "0.0000 €";
        costClaudeSonnet.textContent = "0.0000 €";
        costClaudeHaiku.textContent = "0.0000 €";
        jaugeFill.style.width = "0%";
        jaugePercent.textContent = "0%";
        return;
      }

      // Compte les mots (séparés par espaces/sauts de ligne)
      const words = text.split(/\s+/).filter(w => w.length > 0).length;
      
      // En français, le ratio moyen est d'environ 1.35 tokens par mot
      const tokens = Math.ceil(words * 1.35);

      // Estimation des pages A4 (~500 mots par page standard)
      const pages = (words / 500).toFixed(1);

      // Calcul des coûts
      const calcCost = (rate) => {
        const cost = (tokens / 1000000) * rate;
        if (cost === 0) return "0.0000 €";
        if (cost < 0.0001) return "< 0.0001 €";
        return cost.toFixed(4) + " €";
      };

      // Taux de remplissage d'une fenêtre classique de 128 000 tokens
      const pct = Math.min(((tokens / 128000) * 100), 100).toFixed(2);

      // Ingestion des données dans le DOM
      wordsEl.textContent = words.toLocaleString('fr-FR');
      tokensEl.textContent = tokens.toLocaleString('fr-FR');
      pageEl.textContent = `~ ${pages} page(s) A4`;

      costGpt4o.textContent = calcCost(TARIFS_EUR_PER_1M.gpt4o);
      costGpt4oMini.textContent = calcCost(TARIFS_EUR_PER_1M.gpt4oMini);
      costClaudeSonnet.textContent = calcCost(TARIFS_EUR_PER_1M.claudeSonnet);
      costClaudeHaiku.textContent = calcCost(TARIFS_EUR_PER_1M.claudeHaiku);

      jaugeFill.style.width = pct + "%";
      jaugePercent.textContent = pct + "%";

      if (pct > 80) {
        jaugeFill.style.background = "#dc2626"; // Rouge d'alerte WCAG si > 80%
      } else {
        jaugeFill.style.background = "#0d47a1"; // Bleu WCAG standard
      }
    }

    input.addEventListener('input', calculer);
    calculer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTokenCalculator);
  } else {
    initTokenCalculator();
  }
})();
</script>
