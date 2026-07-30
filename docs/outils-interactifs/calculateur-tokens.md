# 🧮 Calculateur de Tokens & Estimation de Coûts

Collez votre texte pour estimer instantanément le volume de tokens et le coût approximatif de traitement selon les principaux modèles d'IA.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="token-input" style="display: block; font-weight: 700; font-size: 13px; margin-bottom: 8px;">1. Collez votre texte ou prompt :</label>
  <textarea id="token-input" rows="4" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);" placeholder="Collez votre texte ici pour calculer son volume..."></textarea>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 14px;">
    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 600; display: block;">MOTS COMPTÉS</span>
      <strong id="token-words-count" style="font-size: 20px; color: #1a5fb4;">0</strong>
    </div>
    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 600; display: block;">ESTIMATION TOKENS (~1.3/mot)</span>
      <strong id="token-estimated-count" style="font-size: 20px; color: #1a5fb4;">0</strong>
    </div>
    <div style="background: var(--md-default-bg-color, #fff); padding: 12px; border-radius: 6px; border: 1px solid #d5d9de; text-align: center;">
      <span style="font-size: 11px; color: #666; font-weight: 600; display: block;">COÛT ENTRÉE (GPT-4o)</span>
      <strong id="token-cost-gpt4" style="font-size: 20px; color: #2ec4b6;">0.000 $</strong>
    </div>
  </div>
</div>
