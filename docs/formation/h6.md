# H6 — Accessibilité & inclusivité dans l'IA

Cette sixième séance vous aide à produire des contenus compréhensibles, accessibles et respectueux pour l'ensemble de vos publics en tirant parti de l'IA générative.

<div class="summary-box">
  <h3>Objectifs de la séance</h3>
  <ul>
    <li><strong>Définir accessibilité et inclusivité :</strong> comprendre les enjeux dans le contexte des contenus générés par l'IA.</li>
    <li><strong>Identifier les barrières d'accès :</strong> repérer les obstacles majeurs (vision, audition, compréhension, motricité).</li>
    <li><strong>Appliquer les bonnes pratiques :</strong> produire du contenu conforme aux référentiels RGAA / WCAG.</li>
    <li><strong>Utiliser l'IA comme levier :</strong> transformer l'IA en moteur d'inclusion numérique plutôt qu'en facteur d'exclusion.</li>
  </ul>
</div>

---

## Accessibilité vs Inclusivité : de quoi parle-t-on ?

### 1. Accessibilité (Technique & Ergonomie)
> **Définition :** Rendre les contenus et outils utilisables par le plus grand nombre, y compris les personnes en situation de handicap ou en difficulté d'apprentissage.

| Dimension | Exigences concrètes | Impact |
| :--- | :--- | :--- |
| **Vision** | Contraste suffisant, texte redimensionnable, compatibilité lecteurs d'écran | Dégage l'information pour les malvoyants et écrans en plein soleil |
| **Audition** | Sous-titres, transcriptions textuelles, audiodescriptions | Indispensable pour les sourds/malentendants et vidéos en milieu bruyant |
| **Compréhension** | Phrases courtes, niveau Facile À Lire et à Comprendre (FALC / B1) | Aide les dyslexiques, apprenants FLE, personnes âgées |
| **Motricité** | Navigation 100% au clavier, zones cliquables larges (44x44px min.) | Permet la navigation sans souris ou sur mobile en déplacement |

### 2. Inclusivité (Humain & Représentation)
> **Définition :** Créer un environnement où chacun se sent bienvenu, valorisé et représenté, indépendamment de ses caractéristiques (genre, âge, origine, handicap...).

- **Langage** : Neutre, non-stigmatisant, respectueux des identités.
- **Diversité** : Représentation équilibrée dans les exemples, cas d'usage et visuels.
- **Absence de biais** : Refus des stéréotypes de genre, d'âge ou de rôle social.

---

## 🏠 L'analogie de la maison

| Concept | Accessibilité (La structure) | Inclusivité (L'accueil) |
| :--- | :--- | :--- |
| **En monde physique** | Une rampe d'accès et des portes larges permettant à tous de **rentrer**. | Un accueil bienveillant où chacun se **sent bien** et à sa place. |
| **Dans l'IA** | Code propre, balises `alt`, typographie lisible, navigation clavier. | Vocabulaire neutre, données d'entraînement représentatives, absence de biais. |

---

## ⚠️ Les 3 risques majeurs avec l'IA générative

1. **La réplication des biais sexistes et sociaux** :  
   Les LLM apprennent sur le Web. Un prompt simple comme *"Génère 5 profils de secrétaires"* produira majoritairement des profils féminins. Ce n'est pas un bogue technique, c'est un reflet des données historiques : **c'est à l'humain d'orienter le prompt**.
2. **Le langage excluant ou stigmatisant** :  
   Les modèles de base peuvent utiliser des tournures dépassées (*« Les handicapés... »*, *« Les séniors résistent au changement »*).
3. **La surcharge cognitive** :  
   Par défaut, une IA produit souvent des pavés de texte denses, du jargon et des phrases à rallonge, illisibles pour les lecteurs d'écran ou les personnes DYS.

---

## 🎛️ Comparateur interactif : Avant / Après la relecture IA

Choisissez un cas d'étude puis basculez le bouton pour observer la réécriture :

<div class="before-after-widget" style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); margin: 24px 0; color: var(--md-typeset-color, #1a1a1a);">

  <!-- SÉLECTEUR DE SCÉNARIO -->
  <label for="before-after-scenario" style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px;">Sélectionnez un scénario à analyser :</label>
  <select id="before-after-scenario" style="width: 100%; padding: 8px 10px; border: 1px solid var(--md-default-fg-color--light, #ccc); border-radius: 6px; font-size: 14px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000); margin-bottom: 16px;">
    <option value="0">Cas 1 : Inclusion & Stéréotypes d'âge (Seniors & Tech)</option>
    <option value="1">Cas 2 : Inclusivité & Situation de Handicap</option>
    <option value="2">Cas 3 : Communication Neutre & Égalité Professionnelle</option>
  </select>

  <!-- TOGGLE SWITCH DISCRET -->
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; background: var(--md-default-bg-color, #fff); padding: 8px 14px; border-radius: 20px; border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); width: fit-content;">
    <span id="label-before" style="font-size: 13px; font-weight: 700; color: #c9564a; transition: opacity 0.2s;">❌ Avant (Brut)</span>
    
    <label class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px; margin: 0;">
      <input type="checkbox" id="toggle-before-after" style="opacity: 0; width: 0; height: 0;">
      <span class="slider round" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #c9564a; transition: .3s; border-radius: 24px;"></span>
    </label>
    
    <span id="label-after" style="font-size: 13px; font-weight: 700; color: #4a9b5e; opacity: 0.4; transition: opacity 0.2s;">✅ Après (IA Accessible)</span>
  </div>

  <!-- ZONE D'AFFICHAGE DU TEXTE -->
  <div id="before-after-stage" style="padding: 16px; background: var(--md-default-bg-color, #fff); border: 1px solid var(--md-default-fg-color--lightest, #d5d9de); border-radius: 8px; font-size: 14px; line-height: 1.6; min-height: 90px;">
    <!-- Injecté en JS -->
  </div>

  <!-- CHECKLIST DE CRITÈRES -->
  <div id="before-after-checklist" style="margin-top: 16px; border-top: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); padding-top: 14px;"></div>

  <!-- ACTION COPIER -->
  <div style="margin-top: 16px; text-align: right;">
    <button type="button" id="before-after-copy-btn" style="padding: 8px 14px; font-size: 13px; font-weight: 600; border: 1px solid var(--md-default-fg-color--light, #ccc); border-radius: 6px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #333); cursor: pointer;">
      📋 Copier la version optimisée (Après)
    </button>
  </div>
</div>

<style>
  .switch .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .3s;
    border-radius: 50%;
  }
  .switch input:checked + .slider {
    background-color: #4a9b5e !important;
  }
  .switch input:checked + .slider:before {
    transform: translateX(20px);
  }
</style>

---

## 🎯 Quiz Flash : Détecteur de Biais & Barrières

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); margin: 24px 0;">
  <div id="h6-quiz-question" style="font-weight: 700; font-size: 14px; margin-bottom: 12px; color: var(--md-typeset-color, #1a1a1a);"></div>
  <div id="h6-quiz-options" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;"></div>
  <div id="h6-quiz-feedback" style="display: none; padding: 12px; border-radius: 6px; font-size: 13px; margin-bottom: 12px;"></div>
  <button type="button" id="h6-quiz-next" style="display: none; padding: 8px 16px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px;">Question suivante ➔</button>
</div>

---

## 🛠️ Générateur de Prompts d'Inclusion & Simplification

Choisissez le public ou l'objectif ciblé pour obtenir le prompt d'adaptation adéquat :

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0); margin: 24px 0;">
  <label for="gen-target" style="display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px; color: var(--md-typeset-color, #333);">Public ou objectif spécifique :</label>
  <select id="gen-target" style="width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid var(--md-default-fg-color--light, #ccc); background: var(--md-default-bg-color, #fff); font-size: 14px; margin-bottom: 14px; color: var(--md-typeset-color, #000);">
    <option value="dys">Troubles DYS / TDAH (Lisibilité maximale)</option>
    <option value="falc">FALC / FLE (Facile à Lire et à Comprendre)</option>
    <option value="inclusive">Réécriture Inclusive & Anti-Biais</option>
  </select>

  <textarea id="gen-prompt-result" rows="3" readonly style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #d5d9de; border-left: 4px solid #1a5fb4; font-size: 13px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #222); margin-bottom: 12px; font-family: inherit;"></textarea>
  
  <button type="button" id="gen-copy-btn" style="padding: 8px 14px; font-size: 13px; font-weight: 600; border: 1px solid #1a5fb4; border-radius: 6px; background: #1a5fb4; color: #fff; cursor: pointer;">
    📋 Copier ce prompt d'adaptation
  </button>
</div>

---

## 🛠️ Les 2 Checklists réflexes

### Checklist 1 : Accessibilité du contenu
- [ ] **Phrases courtes** : 1 seule idée par phrase (15 à 20 mots max).
- [ ] **Vocabulaire simple** : Niveau Facile À Lire et à Comprendre (FALC / B1).
- [ ] **Structure claire** : Titres hiérarchisés (`H1`, `H2`, `H3`), paragraphes aérés, listes à puces.
- [ ] **Compatibilité lecteurs d'écran** : Balises `alt` informatives sur toutes les images.
- [ ] **Pas de couleur unique** : Une information importante ne doit pas reposer uniquement sur la couleur (ajouter un symbole, du texte ou du gras).

### Checklist 2 : Inclusivité du contenu
- [ ] **Terminologie neutre** : Préférer *"les personnes en situation de handicap"* à *"les handicapés"*.
- [ ] **Représentation équilibrée** : Alterner les genres, prénoms et rôles dans les exemples professionnels.
- [ ] **Absence de jugement** : Éviter le ton infantilisant ou condescendant.
- [ ] **Données personnelles anonymisées** : Pas de mention inutile d'âge, d'origine ou d'état de santé.

---

<div class="good-reflex-box">
  <h3>Dans la vraie vie</h3>
  <p>Quand vous demandez à l’IA de simplifier un texte, précisez toujours le public cible :</p>
  <ul>
    <li>nouveaux salariés ;</li>
    <li>clients non spécialistes ;</li>
    <li>personnes peu à l’aise avec le numérique ;</li>
    <li>personnes avec troubles DYS ;</li>
    <li>public FLE (Français Langue Étrangère).</li>
  </ul>
  <p><em>Un texte simple n’est pas un texte pauvre. C’est un texte plus facile à comprendre pour tous.</em></p>
</div>

---

<div class="summary-box">
  <h3>Bilan de la séance H6</h3>
  <ul>
    <li><strong>Le réflexe d'audit :</strong> Utiliser l'IA pour relire et simplifier ses propres écrits.</li>
    <li><strong>La règle du Facile à Lire :</strong> Réduire la complexité pour augmenter l'impact.</li>
    <li><strong>La question clé :</strong> <em>« Si je recevais ce texte, est-ce que je me sentirais inclus, respecté et capable de le comprendre sans effort ? »</em></li>
  </ul>
</div>

---

## Prêt pour la suite ?

<div class="wiki-actions">
  <a class="wiki-button primary" href="../h7/">Passer à la séance H7 — Éthique, IA Act, encadrement juridique et biais</a>
  <a class="wiki-button" href="../h5/">Revoir la séance H5 — Confidentialité, sécurité et sobriété</a>
</div>

<script src="../../javascripts/h6-interactivity.js"></script>
