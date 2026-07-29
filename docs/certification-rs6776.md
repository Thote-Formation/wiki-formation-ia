# Certification RS6776

Cette page vous aide à comprendre le lien direct entre la formation, le parcours du wiki et l'examen de certification **RS6776**.

La certification RS6776 valide votre capacité à utiliser l’intelligence artificielle générative pour créer des contenus rédactionnels et visuels de manière efficace, sécurisée, inclusive et conforme aux règles en vigueur.

<div class="summary-box">
  <h3>Source officielle France Compétences</h3>
  <p>Fiche officielle RS6776 : <a href="https://www.francecompetences.fr/recherche/rs/6776/" target="_blank" rel="noopener">Création de contenus rédactionnels et visuels par l’usage responsable de l’intelligence artificielle générative</a></p>
</div>

---

## Ce que la certification valide

La certification vérifie vos compétences opérationnelles en situation professionnelle.

Elle évalue notamment votre capacité à :

* **Choisir** les bons outils d'IA générative selon un besoin métier défini ;
* **Rédiger** des prompts structurés, précis et efficaces (méthodes CROFT, Few-Shot) ;
* **Produire** des contenus rédactionnels et visuels professionnels ;
* **Protéger** les données sensibles de votre organisation (RGPD, anonymisation) ;
* **Rendre** les contenus accessibles, lisibles et inclusifs (FALC, WCAG) ;
* **Détecter** les biais, stéréotypes, hallucinations et risques éthiques ;
* **Appliquer** les exigences réglementaires européennes (IA Act).

---

## Alignement : Exercices RS6776 & Modules de Formation

```mermaid
graph TD
    subgraph RS ["🎓 Épreuves de Certification RS6776"]
        direction TB
        E1["Exercice 1 : Stratégie d'implémentation IA"]
        E2["Exercice 2 : Prompt rédactionnel & visuel"]
        E3["Exercice 3 : Confidentialité & Données sensibles"]
        E4["Exercices 4 & 5 : Accessibilité & Simplification FALC"]
        E6["Exercice 6 : Éthique, Biais & IA Act"]
    end

    subgraph MOD ["📚 Modules de Formation (Wiki)"]
        direction TB
        H2["Module H2 — Stratégie IA"]
        H34["Modules H3 & H4 — Prompting & Visuels"]
        H5["Module H5 — Confidentialité & Sécurité"]
        H6["Module H6 — Accessibilité & Inclusivité"]
        H7["Module H7 — Éthique, Biais & IA Act"]
    end

    E1 ==> H2
    E2 ==> H34
    E3 ==> H5
    E4 ==> H6
    E6 ==> H7

    style RS fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0f172a
    style MOD fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#0f172a
```

---

## Détail des 6 exercices de la certification

| Exercice | Objet d'évaluation | Module utile |
| :--- | :--- | :---: |
| **Exercice 1** | Stratégie d’implémentation et choix des outils d'IA | **[H2 — Stratégie](formation/h2.md)** |
| **Exercice 2** | Prompting rédactionnel (CROFT) et création de visuels | **[H3 — Prompt](formation/h3.md)** & **[H4 — Visuels](formation/h4.md)** |
| **Exercice 3** | Anonymisation et protection des données sensibles | **[H5 — Confidentialité](formation/h5.md)** |
| **Exercice 4** | Accessibilité numérique et inclusion des contenus | **[H6 — Accessibilité](formation/h6.md)** |
| **Exercice 5** | Simplification de texte et rédaction FALC | **[H6 — Accessibilité](formation/h6.md)** |
| **Exercice 6** | Audit éthique, détection des biais et conformité IA Act | **[H7 — Éthique](formation/h7.md)** |

---

## Checklist d'auto-évaluation RS6776

<div class="wiki-card" style="border: 2px solid var(--md-primary-fg-color); margin: 24px 0;">
  <h3>📊 Auto-évaluez votre niveau de préparation</h3>
  <p>Cochez les compétences que vous maîtrisez déjà pour mesurer votre préparation à l'examen :</p>

  <div style="display: flex; flex-direction: column; gap: 10px; margin: 16px 0;">
    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 1 :</strong> Je sais choisir le LLM adapté à une problématique métier.</span>
    </label>

    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 2 :</strong> Je sais structurer un prompt complet (méthode CROFT) et générer une image ciblée.</span>
    </label>

    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 3 :</strong> Je sais identifier et anonymiser systématiquement les données sensibles (RGPD).</span>
    </label>

    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 4 :</strong> Je sais vérifier les critères d'accessibilité (alternative textuelle, lisibilité).</span>
    </label>

    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 5 :</strong> Je sais adapter et vulgariser un texte complexe en langage simple / FALC.</span>
    </label>

    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
      <input type="checkbox" class="rs-check-item" onchange="updateRs6776Score()" style="width: 18px; height: 18px;">
      <span><strong>Exercice 6 :</strong> Je sais repérer un biais algorithmique et citer les principes de l'IA Act.</span>
    </label>
  </div>

  <div id="rs6776-score-box" class="summary-box" style="margin-top: 15px; display: block;">
    <strong>Progression : <span id="rs6776-score-count">0</span> / 6 compétences validées</strong>
    <p id="rs6776-score-message" style="margin-top: 5px; font-size: 0.9rem;">Commencez par consulter le module H0 ou faites l'évaluation d'entrée.</p>
  </div>
</div>

---

## Les 6 réflexes du candidat

<div class="wiki-grid">

  <div class="wiki-card">
    <div class="wiki-card-icon">🎯</div>
    <h3>1. Objectif</h3>
    <p>Définir le rôle, le livrable et la cible précise avant tout prompt.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">📌</div>
    <h3>2. Contexte</h3>
    <p>Fournir le contexte métier et les contraintes de format à l'IA.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🔒</div>
    <h3>3. Sécurité</h3>
    <p>Purger toutes les données personnelles ou confidentielles avant envoi.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🔎</div>
    <h3>4. Contrôle</h3>
    <p>Vérifier chaque fait, chiffre ou assertion générée (anti-hallucination).</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">👁️</div>
    <h3>5. Accessibilité</h3>
    <p>Assurer la lisibilité, le contraste et les textes alternatifs visuels.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">⚖️</div>
    <h3>6. Éthique</h3>
    <p>Garantir l'absence de biais et la conformité à la réglementation.</p>
  </div>

</div>

---

## À retenir

<div class="good-reflex-box">
  <h3>Le principe d'évaluation RS6776</h3>
  <p>L’évaluation n'évalue pas votre capacité à copier-coller du texte généré, mais votre <strong>posture critique</strong> : cadrer l'outil, sécuriser les flux de données, contrôler les livrables et adapter le résultat aux contraintes réglementaires.</p>
</div>

---

## Suite du parcours

<div class="wiki-actions">
  <a class="wiki-button primary" href="evaluation-entree.md">Passer l'évaluation d'entrée</a>
  <a class="wiki-button" href="formation/h0.md">Démarrer le module H0</a>
</div>
