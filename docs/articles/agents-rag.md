# 🤖 Les Agents IA : Quand l'IA agit pour vous

Un **chatbot classique** sait uniquement **parler**.  
Un **Agent IA** va plus loin : il **réfléchit**, utilise des **outils** et **fait des actions** à votre place.

---

## 💡 La différence entre un Chatbot et un Agent IA

* **Le Chatbot classique (Exemple : ChatGPT de base)**  
  Vous lui demandez la météo. Il vous répond avec des phrases générales ou invente une réponse s'il ne sait pas.
* **L'Agent IA**  
  Vous lui demandez la météo. Il comprend qu'il doit vérifier. Il **ouvre un site météo**, l'analyse et vous donne la vraie température d'aujourd'hui.

---

## ⚙️ Comment fonctionne un Agent IA ? (La méthode ReAct)

Pour réussir une mission, l'Agent IA répète toujours **3 étapes simples** :

1. **💭 La Pensée (*Thought*)** : L'IA analyse votre besoin et décide de l'action à faire.
2. **🛠️ L'Action (*Action*)** : L'IA utilise un outil (une recherche Google, une calculatrice, un logiciel).
3. **👁️ L'Observation (*Observation*)** : L'IA lit le résultat de l'outil et regarde si la mission est finie.

---

## 📚 Le RAG : Donner une mémoire à l'IA

Le **RAG** (*Retrieval-Augmented Generation*, ou **Génération Améliorée par Recherche**) permet à l'IA d'utiliser vos propres documents de travail.

> **Exemple simple :**  
> Au lieu d'apprendre par cœur tout le règlement de votre entreprise, l'Agent IA cherche la **bonne page du document**, lit l'information exacte et vous la résume.

### Pourquoi le RAG est très utile ?

* 🎯 **Des réponses exactes** : L'IA s'appuie sur vos vrais documents.
* 🔒 **Sécurité** : Vos données restent privées et stockées chez vous.
* 🔄 **Mise à jour facile** : Si le document change, l'IA a immédiatement la bonne information.

---

## 🛡️ Les limites et les risques à connaître

Même si l'Agent IA est très pratique, il faut rester vigilant :

* **Les erreurs (Hallucinations)** : Une IA peut se tromper si l'outil utilisé donne une mauvaise information.
* **Le manque de contrôle** : Si vous donnez trop de pouvoirs à une IA (comme envoyer des e-mails seule), elle peut commettre une erreur.
* **Le réflexe de sécurité (Human-in-the-loop)** : Un humain doit toujours valider les actions importantes (payer une facture, supprimer un fichier, envoyer un message officiel).

---

## 🎮 Simulateur d'Agent IA en Action

Testez ce simulateur pour voir comment un Agent IA découpe une tâche complexe étape par étape — et validez son action finale !

<div id="agent-game-container" class="wiki-card">
  <div class="summary-box" style="margin-top: 0;">
    <label for="agent-task-select" style="font-weight: 700; display: block; margin-bottom: 8px;">Choisissez une mission pour l'Agent IA :</label>
    <select id="agent-task-select" class="wiki-button" style="width: 100%; margin-bottom: 12px; font-size: 0.9em;">
      <option value="travel">✈️ Organiser un déplacement professionnel à Lyon</option>
      <option value="invoice">📑 Vérifier une facture douteuse dans le système</option>
      <option value="summary">📝 Rédiger la synthèse des notes de réunion RH</option>
    </select>

    <div class="wiki-actions">
      <button type="button" id="start-agent-btn" onclick="runSimulation()" class="wiki-button primary">🚀 Lancer l'Agent IA</button>
    </div>
  </div>

  <div id="agent-simulation-container" style="margin-top: 16px; display: flex; flex-direction: column; gap: 10px;">
    <p style="font-style: italic; opacity: 0.8;">Cliquez sur "Lancer l'Agent IA" pour observer le raisonnement pas à pas...</p>
  </div>
</div>

<script src="../../javascripts/agent-simulator.js"></script>
