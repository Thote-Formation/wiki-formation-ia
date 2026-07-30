# Template — Prompt visuel

Générer des visuels percutants via une IA de création d’images (DALL·E, Midjourney, Adobe Firefly, etc.) nécessite une description structurée et précise. Ce template aide à cadrer les demandes pour obtenir des illustrations, photos ou graphismes professionnels, cohérents et exploitables pour les supports de communication.

<div class="summary-box">
  <h3>🎯 Les 6 piliers d’un prompt visuel</h3>
  <ul>
    <li><strong>Sujet principal :</strong> scène, objet ou action centrale à représenter.</li>
    <li><strong>Style artistique :</strong> rendu visuel (photo, illustration vectorielle, 3D, aquarelle).</li>
    <li><strong>Ambiance et éclairage :</strong> ressenti (lumineux, chaleureux, moderne, épuré).</li>
    <li><strong>Palette de couleurs :</strong> teintes prédominantes ou charte graphique à respecter.</li>
    <li><strong>Composition et cadrage :</strong> angle de vue et disposition dans l’image.</li>
    <li><strong>Format et ratio :</strong> proportions adaptées au canal (16:9, 1:1, 4:5).</li>
  </ul>
</div>

---

## 🛠️ Modèle universel à copier-coller

Utilisez cette trame structurée pour rédiger les prompts de génération d’images :

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-visuel-blank" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier le modèle</button>
  <pre id="prompt-visuel-blank" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
SUJET PRINCIPAL :
[Décrivez précisément ce qui doit apparaître dans l’image : personnes, objets, action, décor.]

STYLE ARTISTIQUE :
[Photo réaliste, illustration vectorielle, flat design, rendu 3D, peinture aquarelle, papier découpé.]

AMBIANCE & ÉCLAIRAGE :
[Professionnelle, chaleureuse, dynamique, apaisante, moderne, lumière naturelle du jour.]

PALETTE DE COULEURS :
[Indiquez 2 à 3 couleurs principales : ex. Bleu roi, blanc, touches d’orange doux.]

COMPOSITION & CADRAGE :
[Plan large, gros plan, vue de face, vue du dessus (flat lay), centré, règle des tiers.]

FORMAT & RATIO :
[Carré 1:1, paysage 16:9, portrait 4:5, bannière 3:1.]

CONTRAINTES & EXCLUSIONS :
- Aucun texte ni écriture lisible dans l’image.
- Aucun logo ou marque réelle représentée.
- Aucun visage d’une personne réelle identifiable.
- Style sobre et adapté à une communication d’entreprise.
  </pre>
</div>

---

## 🎨 Générateur interactif de Prompt Visuel

Composez rapidement la description de votre image avant de l'envoyer à votre outil IA :

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

---

## 💡 Exemple concret d’application

<div class="wiki-grid">
  <div class="wiki-card">
    <div class="wiki-card-icon">🎨</div>
    <h3>Cas d’usage : Illustration d’article</h3>
    <p>Visuel d’en-tête pour un article sur le travail collaboratif et l’innovation.</p>
  </div>
</div>

<div style="position: relative; margin: 16px 0;">
  <button type="button" class="prompt-copy-btn" data-target="prompt-visuel-ex" style="position: absolute; top: 10px; right: 10px; padding: 6px 12px; font-size: 12px; font-weight: 600; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;">📋 Copier cet exemple</button>
  <pre id="prompt-visuel-ex" style="background: var(--md-code-bg-color, #f8f9fa); padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; font-size: 13px; line-height: 1.5;">
SUJET PRINCIPAL :
Une équipe professionnelle diversifiée travaillant de manière collaborative autour d’un grand tableau blanc interactif dans un espace de travail ouvert et moderne.

STYLE ARTISTIQUE :
Illustration vectorielle moderne et épurée (style flat design B2B).

AMBIANCE & ÉCLAIRAGE :
Lumineuse, positive, collaborative et technologique.

PALETTE DE COULEURS :
Bleu entreprise, blanc épuré, avec des accents orange chaud et vert menthe.

COMPOSITION & CADRAGE :
Plan moyen en perspective, personnages positionnés au centre, avec un arrière-plan légèrement flouté.

FORMAT & RATIO :
Paysage 16:9 (optimisé pour bannière web et LinkedIn).

CONTRAINTES & EXCLUSIONS :
- Pas de texte ni de fausse typographie sur le tableau.
- Pas de logos sur les ordinateurs ou les vêtements.
- Pas de styles déformés ou hyperréalistes dérangeants.
  </pre>
</div>

---

## ⚠️ Vigilance et droits d’auteur

<div class="warning-practice-box">
  <h3>🛑 À éviter absolument</h3>
  <p>Pour un usage professionnel ou commercial de visuels générés par IA :</p>
  <ul>
    <li>Ne pas inclure de noms de personnalités publiques ou d’artistes protégés (ex: <code>in the style of [Artiste vivant]</code>).</li>
    <li>Ne pas demander la représentation de produits, mascottes ou logos déposés par d’autres marques.</li>
    <li>Éviter de générer directement du texte dans l’image (les IA produisent souvent des caractères déformés). Privilégiez l’ajout de texte dans vos outils de PAO (Canva, Photoshop, etc.).</li>
  </ul>
</div>

<div class="good-reflex-box">
  <h3>✅ Le bon réflexe : décliner plutôt que tout refaire</h3>
  <ul>
    <li><strong>Réutiliser les prompts performants :</strong> conservez la structure d’un prompt qui fonctionne et ajustez uniquement le format ou le ratio (ex: <code>16:9</code> vers <code>1:1</code>).</li>
    <li><strong>Utiliser la retouche ciblé (Inpainting) :</strong> profitez des fonctions d'édition par zones quand l’outil le permet pour corriger un détail sans régénérer toute la composition.</li>
  </ul>
</div>

---

## 🚀 Checklist de validation du visuel

<div class="summary-box">
  <h3>Avant de publier ou d’intégrer une image générée</h3>
  <ul>
    <li>[ ] Le sujet principal est immédiatement compréhensible.</li>
    <li>[ ] Le style graphique est en harmonie avec la charte visuelle de l’entreprise.</li>
    <li>[ ] L’image est exempte d’anomalies anatomiques ou d’artefacts visuels étranges (mains, doigts, objets déformés).</li>
    <li>[ ] Le format (ratio) correspond parfaitement à l’emplacement final (réseaux sociaux, site web, slide).</li>
    <li>[ ] Aucun logo protégé ni marque n’apparaît involontairement dans le décor.</li>
  </ul>
</div>

---

<div class="wiki-actions">
  <a class="wiki-button" href="../prompt-croft/">⬅️ Template précédent : Prompt CROFT</a>
  <a class="wiki-button primary" href="../audit-biais/">Template suivant : Audit de biais ➔</a>
</div>
