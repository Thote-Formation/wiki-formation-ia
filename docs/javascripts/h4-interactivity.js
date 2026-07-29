## 🖼️ Comparateur visuel interactif : Prompt Naïf vs Prompt Structuré

Expérimentez ci-dessous l'impact direct entre un prompt générique et un prompt professionnel structuré selon les 5 éléments, comparés sur **DALL-E 3** et **Adobe Firefly** :

<div class="prompt-comparator-box" style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); margin: 24px 0;">
  
  <!-- Sélecteur de sujet -->
  <div style="margin-bottom: 16px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
    <span style="font-weight: 700; font-size: 14px;">Choisissez un cas d'étude :</span>
    <button type="button" class="comparator-tab active" data-case="house" style="padding: 6px 14px; border-radius: 6px; border: 1px solid #1a5fb4; background: #1a5fb4; color: #fff; cursor: pointer; font-size: 13px; font-weight: 600;">🏠 Une maison</button>
    <button type="button" class="comparator-tab" data-case="robot" style="padding: 6px 14px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--light, #ccc); background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000); cursor: pointer; font-size: 13px; font-weight: 600;">🤖 Un robot au travail</button>
    <button type="button" class="comparator-tab" data-case="coffee" style="padding: 6px 14px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--light, #ccc); background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000); cursor: pointer; font-size: 13px; font-weight: 600;">☕ Une tasse de café</button>
  </div>

  <!-- Conteneur de comparaison -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
    
    <!-- CARTE PROMPT NAÏF -->
    <div style="background: var(--md-default-bg-color, #fff); border: 1px solid rgba(201, 86, 74, 0.4); border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify: space-between;">
      <div>
        <div style="background: rgba(201, 86, 74, 0.1); color: #c9564a; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">❌ Prompt Naïf / Simpliste</div>
        <div id="naive-prompt-text" style="font-style: italic; font-size: 13px; margin-bottom: 12px; color: var(--md-typeset-color, #333); background: rgba(0,0,0,0.02); padding: 8px; border-radius: 4px;">« Une maison »</div>
        
        <!-- Aperçu Visuel Naïf -->
        <div style="position: relative; border-radius: 6px; overflow: hidden; margin-bottom: 12px; aspect-ratio: 16/9; background: #eee;">
          <img id="naive-image-preview" src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80" alt="Rendu prompt naïf" style="width: 100%; height: 100%; object-fit: cover;">
          <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.7); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px;">Rendu impersonnel</span>
        </div>

        <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px;">Résultat :</div>
        <p id="naive-desc" style="font-size: 12px; line-height: 1.4; color: #555; margin: 0 0 10px 0;">
          L'IA génère un pavillon standard très classique. Le résultat est imprévisible d'un essai à l'autre et manque totalement de style propre.
        </p>
      </div>
      <div style="margin-top: 10px; font-size: 11px; color: #c9564a; font-weight: 600; padding-top: 8px; border-top: 1px dashed rgba(201, 86, 74, 0.3);">
        ⚠️ Diagnostic : Flou créatif, inutilisable pour une charte graphique d'entreprise.
      </div>
    </div>

    <!-- CARTE PROMPT STRUCTURÉ -->
    <div style="background: var(--md-default-bg-color, #fff); border: 1px solid rgba(74, 155, 94, 0.4); border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify: space-between;">
      <div>
        <div style="background: rgba(74, 155, 94, 0.1); color: #4a9b5e; font-weight: 700; font-size: 12px; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">✅ Prompt Structuré (5 Éléments)</div>
        <div id="structured-prompt-text" style="font-style: italic; font-size: 12px; margin-bottom: 12px; color: var(--md-typeset-color, #333); background: rgba(0,0,0,0.02); padding: 8px; border-radius: 4px;">« Villa contemporaine bioclimatique en bois. Style illustration vectorielle. Ambiance crépusculaire. Palette : bois, vert sauge, orange. Format 16:9. »</div>
        
        <!-- Aperçu Visuel Structuré -->
        <div style="position: relative; border-radius: 6px; overflow: hidden; margin-bottom: 12px; aspect-ratio: 16/9; background: #eee;">
          <img id="struct-image-preview" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Rendu prompt structuré" style="width: 100%; height: 100%; object-fit: cover;">
          <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(26, 95, 180, 0.85); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px;">Rendu 100% maîtrisé</span>
        </div>

        <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px;">Résultat :</div>
        <p id="struct-desc" style="font-size: 12px; line-height: 1.4; color: #555; margin: 0 0 10px 0;">
          L'IA respecte au pixel près le style vectoriel, les matériaux (bois), l'éclairage de fin de journée et la palette chromatique exigée.
        </p>
      </div>
      <div style="margin-top: 10px; font-size: 11px; color: #4a9b5e; font-weight: 600; padding-top: 8px; border-top: 1px dashed rgba(74, 155, 94, 0.3);">
        🎯 Diagnostic : Résultat ciblé, esthétique constante, immédiatement publiable.
      </div>
    </div>

  </div>
</div>
