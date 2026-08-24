# Maîtriser les Agents Mistral Vibe : Automatisations et Exercice Pratique

Cette séance technique vous plonge au cœur de la fonctionnalité **Agent** de Mistral AI (intégrée dans *Le Chat* et l'écosystème *Mistral Vibe*). Vous apprendrez à dépasser le simple échange conversationnel pour configurer des agents autonomes, experts et sur-mesure.

<div class="summary-box">
  <h3>Objectifs de la séance</h3>
  <ul>
    <li>Comprendre l'architecture et l'intérêt d'un <strong>Agent Mistral</strong> par rapport à un prompt classique</li>
    <li>Maîtriser la configuration avancée : <em>Instructions (System Prompt)</em>, <em>Contexte (RAG)</em> et <em>Température</em></li>
    <li>Concevoir et déployer un Agent pas à pas via une méthode structurée</li>
    <li>Réaliser un <strong>exercice pratique autonome</strong> : Créer un Agent "Auditeur & Optimisateur RGPD" pour vos contenus</li>
  </ul>
</div>

---

## Qu'est-ce qu'un Agent Mistral Vibe ?

Si un prompt classique est une consigne ponctuelle, un **Agent Mistral** est un assistant virtuel persistant. Il associe un modèle de langage puissant (comme *Mistral Large* ou *Codestral*), une identité stricte, des connaissances spécifiques et des consignes d'exécution réutilisables à l'infini.

<div class="workflow-steps">
  <div class="step-card">
    <div class="step-num">1. Instructions Clés</div>
    <div class="step-desc">Rôle, règles et contraintes système</div>
  </div>
  <div class="step-arrow">➔</div>
  <div class="step-card">
    <div class="step-num">2. Base de Connaissances</div>
    <div class="step-desc">Documents & fichiers de référence</div>
  </div>
  <div class="step-arrow">➔</div>
  <div class="step-card">
    <div class="step-num">3. Exécution Autonome</div>
    <div class="step-desc">Réponses formatées & reproductibles</div>
  </div>
</div>

<style>
.workflow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 24px 0;
  flex-wrap: wrap;
}
.step-card {
  flex: 1;
  min-width: 180px;
  padding: 14px 16px;
  border: 1px solid var(--md-default-fg-color--lightest, #cbd5e1);
  border-radius: 10px;
  background: var(--md-code-bg-color, #f8fafc);
  text-align: center;
}
.step-num {
  font-weight: 700;
  color: var(--md-typeset-color, #0d47a1);
  margin-bottom: 4px;
}
.step-desc {
  font-size: 13px;
  opacity: 0.85;
}
.step-arrow {
  font-size: 20px;
  color: var(--md-typeset-color, #0d47a1);
  font-weight: bold;
}
@media (max-width: 600px) {
  .workflow-steps { flex-direction: column; }
  .step-arrow { transform: rotate(90deg); }
}
</style>

<div class="real-life-box">
  <h3>Pourquoi passer aux Agents au quotidien ?</h3>
  <ul>
    <li><strong>Gain de temps massif :</strong> Plus besoin de réécrire votre contexte à chaque nouvelle session.</li>
    <li><strong>Standardisation :</strong> Garantie d'obtenir des réponses conformes aux chartes et processus de votre organisation.</li>
    <li><strong>Souveraineté & Sécurité :</strong> L'ensemble de vos données traitées via les Agents Mistral reste hébergé en Europe, dans le respect strict du RGPD.</li>
  </ul>
</div>

---

## Anatomie d'un Agent : Les 4 piliers de configuration

Pour construire un agent performant dans Mistral Vibe, vous devez paramétrer 4 éléments fondamentaux :

| Composant | Rôle principal | Bonne pratique de paramétrage |
| :--- | :--- | :--- |
| **Nom & Avatar** | Identification visuelle et fonctionnelle | Utiliser un titre clair (*ex: "Auditeur Qualité Documentaire"*) |
| **System Prompt (Instructions)** | Cerveau de l'agent : cadre sa posture et ses règles | Appliquer une structure rigoureuse (Rôle, Tâches, Interdictions, Format) |
| **Knowledge (Connaissances / RAG)** | Documents joints servant de source de vérité | Fournir des fichiers nettoyés au format PDF, Markdown ou TXT |
| **Modèle & Température** | Choix de l'intelligence et du niveau de créativité | Température basse (0.1 à 0.3) pour l'analyse, plus haute (0.7+) pour la création |

<div class="warning-practice-box">
  <h3>Attention au sur-cadrage !</h3>
  <p>Un Agent recevant des instructions contradictoires ou trop longues risque de négliger certaines consignes. Privilégiez des règles claires sous forme de listes à puces et donnez des exemples concrets de résultats attendus (technique du <em>Few-Shot Prompting</em>).</p>
</div>

---

## Les blocs d'un System Prompt d'Agent efficace

Pour rédiger les instructions système de votre agent dans Mistral Vibe, suivez la structure **CRISP** :

1. **C - Context (Contexte) :** Qui est l'agent et dans quel cadre intervient-il ?
2. **R - Role (Rôle) :** Expertise exacte et niveau de responsabilité.
3. **I - Instructions (Consignes métier) :** Étapes pas à pas du traitement de la demande.
4. **S - Structure (Format de sortie) :** Rendu visuel obligatoire (tableau, balises Markdown, alertes).
5. **P - Prohibitions (Interdictions) :** Ce que l'agent ne doit **jamais** faire ou inventer.

---

## Exercice Pratique — Créer un Agent "Auditeur RGPD & Anonymiseur"

Dans cet exercice guidé, vous allez créer un Agent sur Mistral Vibe capable d'analyser un texte professionnel, de repérer les données personnelles sensibles (PII) et de proposer une version anonymisée prête à l'emploi.

<span class="wiki-badge warning">Niveau : Intermédiaire</span>
<span class="wiki-badge success">Temps estimé : 15 min</span>
<span class="wiki-badge">Outil : Mistral Vibe / Le Chat</span>

---

### Étape 1 : Création de l'Agent dans l'interface

1. Ouvrez **Mistral Vibe** (*Le Chat*).
2. Dans le menu latéral, cliquez sur **Agents** puis sur **Créer un Agent**.
3. Renseignez les informations de base :
   * **Nom :** `Auditeur & Anonymiseur RGPD`
   * **Description :** `Détecte les données personnelles et génère une version anonymisée conforme.`

---

### Étape 2 : Configuration du System Prompt (Instructions)

Copiez-collez le prompt structuré ci-dessous dans la zone **Instructions** de votre agent :

```text
[RÔLE & MISSION]
Tu es un Expert DPO et Auditeur RGPD senior.
Ta mission est d'analyser les textes fournis par l'utilisateur pour identifier les Données à Caractère Personnel (DCP) et produire une version intégralement anonymisée.

[ÉTAPES D'ANALYSE]
Pour chaque texte soumis :
1. Analyse le document et dresse le bilan des données sensibles trouvées (Noms, Prénoms, Emails, Téléphones, Adresses, Numéros de dossiers/CB).
2. Attribue un niveau de risque global au document : [FAIBLE], [MODÉRÉ] ou [CRITIQUE].
3. Génère une version anonymisée du texte en remplaçant chaque donnée personnelle par une balise anonyme entre crochets (ex: [NOM_CLIENT_1], [EMAIL_1], [TÉLÉPHONE_1]).

[FORMAT DE RÉPONSE OBLIGATOIRE]
Présente toujours ton analyse sous la structure suivante :

---
### 🛡️ Diagnostic RGPD
- **Niveau de Risque :** [Insérer le badge de risque]
- **Données détectées :** [Liste à puces des éléments identifiés]

### 📋 Recommandations DPO
[1 à 2 phrases courtes sur les préconisations]

### 📝 Version Anonymisée Complète

[Insérer le texte intégralement anonymisé ici]

---

[INTERDICTIONS STRICTES]
- Ne conserve JAMAIS une donnée nominative ou une adresse email réelle dans la version anonymisée.
- Ne modifie PAS le sens, la structure ni le ton général du texte original.
- Si le texte ne contient aucune donnée personnelle, indique "Aucune donnée personnelle détectée" et restitue le texte intact.
```

---

### Étape 3 : Test pratique de l'Agent

Utilisez l'un des exemples ci-dessous dans la zone de chat de votre nouvel agent pour vérifier son bon fonctionnement.

=== "Donnée de test 1 : Courriel client (Cas Critique)"
    **Copiez ce texte dans votre Agent :**
    > *"Bonjour, je vous contacte suite au litige sur le compte de M. Jean Dupont (j.dupont@email.fr - 06 12 34 56 78). Il réside au 12 rue des Lilas à Lille. Son numéro de dossier est le REF-98745. Merci de procéder au remboursement de 450€ dans les plus brefs délais."*

=== "Résultat attendu de l'Agent"
    <div class="good-reflex-box">
      <h3>Résultat généré par l'Agent Mistral</h3>
      <p><strong>🛡️ Diagnostic RGPD</strong></p>
      <ul>
        <li><strong>Niveau de Risque :</strong> <span class="wiki-badge danger">CRITIQUE</span></li>
        <li><strong>Données détectées :</strong> Nom/Prénom (Jean Dupont), Adresse email, Numéro de téléphone, Adresse postale, Numéro de dossier réf.</li>
      </ul>
      <p><strong>📋 Recommandations DPO :</strong> Le courriel contient de multiples données directement identifiantes. Il ne doit pas être transmis à des tiers non autorisés sans masquage préalable.</p>
      <p><strong>📝 Version Anonymisée Complète :</strong></p>
      <pre><code>Bonjour, je vous contacte suite au litige sur le compte de M. [NOM_CLIENT_1] ([EMAIL_1] - [TÉLÉPHONE_1]). Il réside au [ADRESSE_1]. Son numéro de dossier est le [RÉF_DOSSIER_1]. Merci de procéder au remboursement de 450€ dans les plus brefs délais.</code></pre>
    </div>

---

<div class="good-reflex-box">
  <h3>À retenir</h3>
  <ul>
    <li>Les **Agents Mistral** permettent d'industrialiser vos tâches récurrentes en figeant un comportement et des consignes expertes.</li>
    <li>La qualité des résultats dépend de la clarté du **System Prompt** (utilisez la méthode CRISP).</li>
    <li>L'écosystème européen Mistral garantit la **confidentialité** et la conformité RGPD de vos processus automatisés.</li>
  </ul>
</div>

---

## Prêt à créer vos propres Agents ?
