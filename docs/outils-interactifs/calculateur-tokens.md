# 🧮 Calculateur de Tokens, Coûts & Volume

> 💡 **C'est quoi un "Token" ?**  
> Les IA ne lisent pas en mots mais en "tokens" (des morceaux de mots ou de ponctuation). En français, **100 mots ≈ 130 à 140 tokens**. Les tokens déterminent la **limite de mémoire de l'IA** et la **facturation** si vous utilisez l'API.

---

## 🧪 Votre outil de mesure en temps réel

Collez ou tapez votre texte ci-dessous pour analyser instantanément son volume, son coût et sa saturation de contexte :

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  
  <label for="token-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px; color: var(--md-typeset-color, #333);">1. Votre texte ou prompt :</label>
  <textarea id="token-input" rows="5" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 16px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Collez votre document, note ou prompt ici pour calculer sa taille..."></textarea>

  <!-- MÉTROLOGIE DE BASE -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px;">
    
    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 700; display: block; text-transform: uppercase;">Mots</span>
      <strong id="token-words-count" style="font-size: 22px; color: #1a5fb4;">0</strong>
    </div>

    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 700; display: block; text-transform: uppercase;">Tokens estimé(s)</span>
      <strong id="token-estimated-count" style="font-size: 22px; color: #1a5fb4;">0</strong>
    </div>

    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 700; display: block; text-transform: uppercase;">Volume équivalent</span>
      <strong id="token-page-equiv" style="font-size: 15px; color: #333; display: block; margin-top: 5px;">0 page(s) A4</strong>
    </div>

  </div>

  <!-- COMPARATEUR DE COÛTS PAR MODÈLE -->
  <div style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; margin-bottom: 16px;">
    <span style="font-size: 12px; font-weight: 700; color: #333; display: block; margin-bottom: 10px;">📊 Estimation du coût de lecture (Entrée API) :</span>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; font-size: 12px;">
      <div style="padding: 8px; background: #f0f4f9; border-radius: 4px;">
        <span style="font-weight: 600; display: block;">GPT-4o (Standard)</span>
        <span id="cost-gpt4o" style="font-weight: 700; color: #1a5fb4;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: #f0f4f9; border-radius: 4px;">
        <span style="font-weight: 600; display: block;">GPT-4o Mini (Éco)</span>
        <span id="cost-gpt4o-mini" style="font-weight: 700; color: #2e6939;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: #f0f4f9; border-radius: 4px;">
        <span style="font-weight: 600; display: block;">Claude 3.5 Sonnet</span>
        <span id="cost-claude-sonnet" style="font-weight: 700; color: #1a5fb4;">0.0000 €</span>
      </div>
      <div style="padding: 8px; background: #f0f4f9; border-radius: 4px;">
        <span style="font-weight: 600; display: block;">Claude 3.5 Haiku</span>
        <span id="cost-claude-haiku" style="font-weight: 700; color: #2e6939;">0.0000 €</span>
      </div>
    </div>
  </div>

  <!-- JAUGE D'INCLU DE CONTEXTE -->
  <div>
    <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; margin-bottom: 4px; color: #555;">
      <span>Remplissage de la mémoire standard (Fenêtre de 128k tokens)</span>
      <span id="jauge-percent">0%</span>
    </div>
    <div style="width: 100%; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden;">
      <div id="jauge-fill" style="width: 0%; height: 100%; background: #1a5fb4; transition: width 0.3s;"></div>
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
        jaugeFill.style.background = "#c9564a"; // Alerte rouge si on dépasse 80% du contexte
      } else {
        jaugeFill.style.background = "#1a5fb4";
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
