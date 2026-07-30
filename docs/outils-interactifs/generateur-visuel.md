# 🎨 Assistant Prompt Visuel

Spécifiez les caractéristiques esthétiques de votre image pour générer une consigne précise adaptée à Midjourney, DALL·E ou Adobe Firefly.

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <div style="display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 16px;">
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">1. Sujet principal :</label>
      <input type="text" id="visuel-sujet" placeholder="Ex: Une équipe d'experts analysant des données sur tablette" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">2. Style artistique :</label>
      <input type="text" id="visuel-style" placeholder="Ex: Illustration vectorielle flat design moderne" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">3. Ambiance & Éclairage :</label>
      <input type="text" id="visuel-ambiance" placeholder="Ex: Lumineuse, dynamique et technologique" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">4. Palette de couleurs :</label>
      <input type="text" id="visuel-couleurs" placeholder="Ex: Bleu marine, blanc et touches de vert menthe" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
    <div>
      <label style="font-weight: 700; font-size: 12px; display: block; margin-bottom: 4px;">5. Cadrage & Format :</label>
      <input type="text" id="visuel-format" placeholder="Ex: Plan moyen, format paysage 16:9" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px;">
    </div>
  </div>

  <button type="button" id="visuel-generate-btn" style="padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 12px;">⚙️ Générer le prompt visuel</button>

  <div style="position: relative;">
    <button type="button" class="prompt-copy-btn" data-target="visuel-generated-output" style="position: absolute; top: 10px; right: 10px; padding: 4px 8px; font-size: 11px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier</button>
    <pre id="visuel-generated-output" style="background: var(--md-default-bg-color, #fff); padding: 14px; border-radius: 6px; border: 1px solid #d5d9de; font-size: 12px; min-height: 80px; white-space: pre-wrap;">Remplissez les champs ci-dessus et cliquez sur "Générer le prompt visuel"...</pre>
  </div>
</div>
