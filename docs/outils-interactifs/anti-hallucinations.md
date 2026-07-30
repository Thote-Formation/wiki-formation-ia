# 🛡️ Générateur Anti-Hallucinations & Ancrage factuel

Sélectionnez votre cas d'usage pour générer les garde-fous d'ancrage et forcer l'IA à restituer des réponses 100% vérifiables sans inventer de faits.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <div style="margin-bottom: 16px;">
    <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">1. Type de garde-fou souhaité :</label>
    <select id="hallu-type" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
      <option value="strict-context">Ancrage strict sur document fourni (Ne répondre qu'avec le texte joint)</option>
      <option value="uncertainty-clause">Clause d'incertitude autorisée (Dire "Je ne sais pas" plutôt qu'inventer)</option>
      <option value="source-citation">Citation systématique des sources et extraits exacts</option>
      <option value="step-verification">Raisonnement pas à pas avec vérification préalable (Chain of Thought)</option>
    </select>
  </div>

  <div style="margin-bottom: 16px;">
    <label style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 6px;">2. Votre sujet ou document d'origine (Optionnel) :</label>
    <input type="text" id="hallu-topic" placeholder="Ex: Analyse de la note de service interne n°12 sur le télétravail" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
  </div>

  <button type="button" id="hallu-generate-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 14px;">⚙️ Générer la clause anti-hallucination</button>

  <div style="position: relative;">
    <button type="button" class="prompt-copy-btn" data-target="hallu-generated-output" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 11px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier</button>
    <pre id="hallu-generated-output" style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 12px; min-height: 80px; white-space: pre-wrap;">Sélectionnez une option et cliquez sur "Générer la clause anti-hallucination"...</pre>
  </div>
</div>
