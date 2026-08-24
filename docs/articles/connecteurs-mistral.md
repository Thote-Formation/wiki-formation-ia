# Maîtriser les Connecteurs Mistral : Brancher l'IA sur le Monde Réel

Cette séance technique complète votre maîtrise de l'écosystème **Mistral Vibe** (*Le Chat*). Après les Agents, place aux **Connecteurs** : les modules qui permettent à un Agent de ne plus se contenter de "savoir", mais d'**agir** — chercher sur le web, exécuter du code, lire une image ou générer un visuel, en temps réel et à la demande.

<div class="summary-box">
  <h3>Objectifs de la séance</h3>
  <ul>
    <li>Comprendre ce qu'est un <strong>Connecteur</strong> et en quoi il diffère d'une simple Base de Connaissances (RAG)</li>
    <li>Passer en revue les connecteurs natifs de Mistral Vibe : <em>Recherche Web</em>, <em>Interpréteur de Code</em>, <em>Génération d'Image</em>, <em>Vision Documentaire</em></li>
    <li>Savoir quand activer (ou désactiver) un connecteur selon le cas d'usage métier</li>
    <li>Réaliser un <strong>exercice pratique autonome</strong> : Créer un Agent "Veilleur & Analyste" combinant Web + Code pour produire une note de synthèse chiffrée</li>
  </ul>
</div>

---

## Qu'est-ce qu'un Connecteur Mistral Vibe ?

Un **Agent** définit *qui* répond (son rôle, ses règles, son ton). Un **Connecteur** définit *ce que l'Agent peut faire* au-delà de générer du texte à partir de ce qu'il a appris à l'entraînement. C'est la différence entre un expert qui répond de mémoire et un expert qui, en pleine conversation, ouvre son navigateur, lance un calcul ou consulte un document.

<div class="workflow-steps">
  <div class="step-card">
    <div class="step-num">1. Déclenchement</div>
    <div class="step-desc">L'agent détecte qu'un outil externe est nécessaire</div>
  </div>
  <div class="step-arrow">➔</div>
  <div class="step-card">
    <div class="step-num">2. Appel du Connecteur</div>
    <div class="step-desc">Web, Code, Image ou Document selon le besoin</div>
  </div>
  <div class="step-arrow">➔</div>
  <div class="step-card">
    <div class="step-num">3. Synthèse Enrichie</div>
    <div class="step-desc">La réponse intègre les données fraîches obtenues</div>
  </div>
</div>

<div class="real-life-box">
  <h3>Pourquoi les Connecteurs changent la donne</h3>
  <ul>
    <li><strong>Fraîcheur de l'information :</strong> Le modèle seul est figé à sa date d'entraînement ; le connecteur Web lui donne accès à l'instant présent.</li>
    <li><strong>Fiabilité du calcul :</strong> Un LLM peut se tromper en calcul mental complexe ; l'Interpréteur de Code exécute du vrai Python et renvoie un résultat exact.</li>
    <li><strong>Souveraineté conservée :</strong> Même connectés à des outils externes, les traitements et l'orchestration restent opérés dans l'environnement Mistral, hébergé en Europe.</li>
  </ul>
</div>

---

## Panorama des connecteurs natifs disponibles

| Connecteur | Fonction principale | Cas d'usage typique |
| :--- | :--- | :--- |
| **Recherche Web** | Interroge le web en temps réel et cite ses sources | Veille concurrentielle, actualité, vérification de faits récents |
| **Interpréteur de Code** | Exécute du code Python dans un environnement isolé (sandbox) | Calculs, statistiques, génération de graphiques, traitement de fichiers CSV/Excel |
| **Génération d'Image** | Crée une image à partir d'une description texte | Illustrations de supports pédagogiques, moodboards, visuels de présentation |
| **Vision Documentaire** | Lit et analyse le contenu d'images, PDF ou photos de documents | OCR de factures, relecture de scans, extraction de tableaux |

<div class="warning-practice-box">
  <h3>Attention à la sur-activation !</h3>
  <p>Activer tous les connecteurs "par défaut" peut nuire à la prévisibilité de l'agent : il peut se mettre à chercher sur le web une information qu'il connaît déjà, ou halluciner un besoin de calcul là où une réponse directe suffisait. Réservez chaque connecteur à un déclencheur métier clair, précisé explicitement dans le System Prompt.</p>
</div>

---

## Les blocs d'une configuration de connecteur efficace

Pour cadrer l'usage d'un connecteur dans les instructions de votre agent, suivez la structure **DECI** :

1. **D - Déclencheur :** Dans quelle situation précise l'agent doit-il faire appel au connecteur ?
2. **E - Étendue :** Quel périmètre de recherche ou de calcul est autorisé (sources fiables, format de données) ?
3. **C - Citation :** Comment l'agent doit-il sourcer ou signaler l'origine externe de l'information ?
4. **I - Interdiction :** Dans quels cas l'agent doit rester silencieux ou refuser d'utiliser le connecteur (ex : données confidentielles, sources non fiables) ?

---

## Exercice Pratique — Créer un Agent "Veilleur & Analyste IA"

Dans cet exercice guidé, vous allez créer un Agent sur Mistral Vibe combinant le connecteur **Recherche Web** et le connecteur **Interpréteur de Code**, capable de produire une note de veille chiffrée et sourcée sur un sujet donné.

<span class="wiki-badge warning">Niveau : Intermédiaire</span>
<span class="wiki-badge success">Temps estimé : 15 min</span>
<span class="wiki-badge">Outil : Mistral Vibe / Le Chat</span>

---

### Étape 1 : Création de l'Agent dans l'interface

1. Ouvrez **Mistral Vibe** (*Le Chat*).
2. Dans le menu latéral, cliquez sur **Agents** puis sur **Créer un Agent**.
3. Renseignez les informations de base :
   * **Nom :** `Veilleur & Analyste IA`
   * **Description :** `Recherche des informations récentes sur le web et produit une synthèse chiffrée sourcée.`
4. Dans la section **Connecteurs**, activez uniquement :
   * ✅ **Recherche Web**
   * ✅ **Interpréteur de Code**
   * ❌ Génération d'Image (non nécessaire ici)
   * ❌ Vision Documentaire (non nécessaire ici)

---

### Étape 2 : Configuration du System Prompt (Instructions)

Copiez-collez le prompt structuré ci-dessous dans la zone **Instructions** de votre agent :

```text
[RÔLE & MISSION]
Tu es un Veilleur Analyste spécialisé en actualités technologiques et IA.
Ta mission est de produire, pour chaque sujet soumis par l'utilisateur, une note de synthèse factuelle, récente et chiffrée.

[USAGE DES CONNECTEURS]
1. Utilise systématiquement le connecteur Recherche Web pour ce sujet : ne réponds jamais uniquement à partir de tes connaissances internes si le sujet concerne une actualité ou une donnée datée.
2. Privilégie les sources primaires (sites officiels, communiqués, presse spécialisée reconnue) plutôt que les forums ou blogs non signés.
3. Si la note nécessite un calcul, une comparaison chiffrée ou un graphique (ex: évolution d'un marché, comparaison de prix), utilise le connecteur Interpréteur de Code pour produire un résultat exact plutôt qu'une estimation.
4. N'active jamais un connecteur si l'information demandée est intemporelle et déjà fiable (ex: définition d'un concept technique stable).

[FORMAT DE RÉPONSE OBLIGATOIRE]
Présente toujours ta note sous la structure suivante :

---
### 🔎 Synthèse de Veille
[2 à 3 phrases résumant l'essentiel du sujet]

### 📊 Données Clés
[Liste à puces ou tableau des chiffres/faits marquants, avec leur source entre parenthèses]

### 📚 Sources Consultées
[Liste des sources utilisées, avec date de publication si disponible]

---

[INTERDICTIONS STRICTES]
- N'invente JAMAIS un chiffre, une date ou une source si le connecteur n'a rien retourné de fiable ; indique-le explicitement.
- Ne présente pas une information de plus de 12 mois comme "récente" sans le préciser.
- Reste neutre : ne prends pas parti sur des sujets controversés, présente les différents points de vue si le sujet est clivant.
```

---

### Étape 3 : Test pratique de l'Agent

Utilisez l'un des exemples ci-dessous dans la zone de chat de votre nouvel agent pour vérifier son bon fonctionnement.

=== "Donnée de test 1 : Sujet de veille"
    **Copiez ce texte dans votre Agent :**
    > *"Fais-moi une note de veille sur l'adoption des agents IA en entreprise en France en 2026, avec les principaux chiffres du marché."*

=== "Résultat attendu de l'Agent"
    <div class="good-reflex-box">
      <h3>Résultat généré par l'Agent Mistral</h3>
      <p><strong>🔎 Synthèse de Veille</strong></p>
      <p>L'agent interroge le connecteur Recherche Web, identifie plusieurs sources récentes sur l'adoption des agents IA en France, puis résume la tendance générale en 2 à 3 phrases.</p>
      <p><strong>📊 Données Clés :</strong></p>
      <ul>
        <li>Chiffres de croissance ou de taux d'adoption, chacun assorti de sa source entre parenthèses</li>
        <li>Le cas échéant, un tableau comparatif généré via l'Interpréteur de Code si plusieurs données chiffrées doivent être croisées</li>
      </ul>
      <p><strong>📚 Sources Consultées :</strong> Liste des pages web réellement consultées par le connecteur, avec leur date.</p>
    </div>

---

<div class="good-reflex-box">
  <h3>À retenir</h3>
  <ul>
    <li>Les **Connecteurs** transforment un Agent "qui sait" en Agent "qui agit" : ils sont le complément indispensable d'un bon System Prompt.</li>
    <li>Chaque connecteur doit être activé avec un **déclencheur métier explicite** (méthode DECI) pour rester prévisible et fiable.</li>
    <li>Combiner Recherche Web et Interpréteur de Code permet de produire des synthèses à la fois **à jour** et **chiffrées avec exactitude**.</li>
  </ul>
</div>

---

## Prêt à créer vos propres Agents connectés ?
