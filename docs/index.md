![Illustration pour une formation en IA avec deux personnes échangeant autour d'une ampoule connectée et du titre FORMATION IA](./assets/image-accueil.png){ .home-hero-image }

# Wiki Formation IA générative

Bienvenue dans votre espace de ressources dédié à l’IA générative et à la préparation de la certification **RS6776** (*Utiliser des outils d'IA générative de manière sécurisée et responsable*).

Ce wiki complète les séances de formation : il vous permet de revoir les notions clés, de télécharger des méthodes éprouvées et d'appliquer l'IA dans vos cas métiers quotidiens.

---

## Commencer ici

<div class="wiki-grid">

  <a class="wiki-card" href="./certification-rs6776/" style="text-decoration: none; color: inherit;">
    <div class="wiki-card-icon">🎓</div>
    <h3>Certification RS6776</h3>
    <p>Comprendre les objectifs, les compétences visées et le référentiel officiel.</p>
  </a>

  <a class="wiki-card" href="./formation/h0/" style="text-decoration: none; color: inherit;">
    <div class="wiki-card-icon">🚀</div>
    <h3>Démarrer la formation</h3>
    <p>Suivre le parcours guidé des séances H0 à H7 étape par étape.</p>
  </a>

  <a class="wiki-card" href="./evaluation-entree/" style="text-decoration: none; color: inherit;">
    <div class="wiki-card-icon">📝</div>
    <h3>Évaluation d’entrée</h3>
    <p>Faire le point sur vos connaissances initiales avant de vous lancer.</p>
  </a>

  <a class="wiki-card" href="./prompt-croft/" style="text-decoration: none; color: inherit;">
    <div class="wiki-card-icon">🧩</div>
    <h3>Templates pratiques</h3>
    <p>Copier des modèles de prompts (méthode CROFT) et checklists prêtes à l'emploi.</p>
  </a>

</div>

---

## Les 4 Piliers de la Formation

<div class="wiki-grid">

  <div class="wiki-card">
    <div class="wiki-card-icon">🧠</div>
    <h3>1. Prompting Structuré</h3>
    <p>Maîtriser la méthode CROFT, le Few-Shot et le Chain-of-Thought pour des réponses précises.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🛡️</div>
    <h3>2. Sécurité & RGPD</h3>
    <p>Protéger les données d'entreprise et appliquer les techniques d'anonymisation systématiques.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">⚖️</div>
    <h3>3. Éthique & IA Act</h3>
    <p>Identifier les biais, respecter la propriété intellectuelle et se conformer au cadre européen.</p>
  </div>

  <div class="wiki-card">
    <div class="wiki-card-icon">🔍</div>
    <h3>4. Contrôle Humain</h3>
    <p>Détecter les hallucinations et valider la fiabilité des productions générées.</p>
  </div>

</div>

---

## Le Processus d'Usage Responsable

```mermaid
graph TD
    A[🎯 1. Cadrage & Prompting] --> B[🤖 2. Génération par l'IA]
    B --> C[🛡️ 3. Filtre de Confidentialité & Vérification]
    C -->|Données sensibles ou erreurs| D[✏️ 4. Correction & Adaptation]
    D --> E[✅ 5. Validation Humaine Finale]
    C -->|Conforme & Exact| E
    
    style A fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0f172a
    style B fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#0f172a
    style C fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#0f172a
    style D fill:#ffedd5,stroke:#ea580c,stroke-width:2px,color:#0f172a
    style E fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#0f172a
```

---

## Le bon réflexe

<div class="real-life-box">
  <h3>Dans la vraie vie</h3>
  <p>L’IA générative est un copilote, pas un pilote automatique.</p>
  <p>Avant d’exploiter une réponse générée par l'IA, appliquez la règle des 5 piliers :</p>
  <ul>
    <li><strong>Cadrer :</strong> Détailler le contexte et le rôle attendu.</li>
    <li><strong>Protéger :</strong> Supprimer tout nom, identifiant ou donnée sensible.</li>
    <li><strong>Vérifier :</strong> Recouper les faits, calculs et sources citées.</li>
    <li><strong>Adapter :</strong> Personnaliser le ton et le style au contexte métier.</li>
    <li><strong>Valider :</strong> Conserver la responsabilité finale du livrable.</li>
  </ul>
</div>

---

## Échauffement Express

<div class="wiki-card" style="border: 2px solid var(--md-primary-fg-color); margin: 24px 0;">
  <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
    <span style="font-size: 1.5rem;">⚡</span>
    <h3 style="margin: 0;">Testez votre premier réflexe IA</h3>
  </div>
  
  <p><strong>Mise en situation :</strong> Vous devez rédiger un compte-rendu à partir d'un document interne contenant des données confidentielles. Quelle est la meilleure approche ?</p>

  <div id="quiz-hero-options" style="display: flex; flex-direction: column; gap: 8px; margin-top: 14px;">
    <button onclick="checkHeroQuiz(1)" class="home-button" style="text-align: left; cursor: pointer; width: 100%;">
      A. Copier-coller le document brut dans l'outil d'IA pour aller plus vite.
    </button>
    <button onclick="checkHeroQuiz(2)" class="home-button" style="text-align: left; cursor: pointer; width: 100%;">
      B. Anonymiser les données sensibles avant d'envoyer la demande à l'IA.
    </button>
    <button onclick="checkHeroQuiz(3)" class="home-button" style="text-align: left; cursor: pointer; width: 100%;">
      C. Demander à l'IA dans le prompt de promettre de ne pas enregistrer les données.
    </button>
  </div>

  <div id="quiz-hero-feedback" style="margin-top: 15px; display: none; padding: 12px; border-radius: 8px;"></div>
</div>

---

## Accès rapide

<div class="wiki-actions">
  <a class="wiki-button primary" href="./formation/h0/">Commencer la formation</a>
  <a class="wiki-button" href="./evaluation-entree/">Faire l’évaluation d’entrée</a>
  <a class="wiki-button" href="./prompt-croft/">Voir les templates</a>
</div>
