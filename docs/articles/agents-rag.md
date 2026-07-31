# Les Agents IA : Quand l'IA ne fait plus que parler, elle agit !

Un chatbot classique répond à vos questions avec du texte. 
Un **Agent IA** va plus loin : il réfléchit, utilise des outils et réalise des actions à votre place.

---

## 💡 La différence entre Chatbot et Agent IA

* **Le Chatbot classique :** Vous lui demandez météo, il vous répond avec des phrases qu'il a apprises. S'il ne sait pas, il peut inventer.
* **L'Agent IA :** Vous lui demandez la météo, il comprend qu'il doit vérifier. Il ouvre une application météo, lit le résultat, et vous donne la vraie température actuelle.

---

## ⚙️ Comment fonctionne un Agent IA ? (La méthode ReAct)

L'Agent IA fonctionne toujours en 3 étapes répétées :

1. **Pensée (*Thought*) :** L'IA analyse votre demande et décide de ce qu'elle doit faire.
2. **Action (*Action*) :** L'IA utilise un outil (recherche web, calculatrice, base de données).
3. **Observation (*Observation*) :** L'IA lit le résultat de l'outil et vérifie si le travail est fini.

---

## 🛠️ Le RAG : Donner une mémoire à l'Agent

Le **RAG** (*Retrieval-Augmented Generation*) permet à l'IA d'accéder à **vos propres documents**.

> **Exemple simple :**  
> Au lieu d'apprendre par cœur tout le règlement intérieur de votre entreprise, l'Agent IA va chercher la page exacte du document quand vous lui posez une question, puis il vous la résume.

---

## 🎮 Simulateur d'Agent IA en Action

Testez ce simulateur pour voir comment un Agent IA découpe une tâche complexe étape par étape :

<div style="background: var(--md-code-bg-color, #f8f9fa); padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
  <label for="agent-task-select" style="font-weight: 700; font-size: 13px; display: block; margin-bottom: 8px;">Choisissez une mission pour l'Agent IA :</label>
  <select id="agent-task-select" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; margin-bottom: 12px; background: var(--md-default-bg-color, #fff); color: var(--md-typeset-color, #000);">
    <option value="travel">Organiser un déplacement professionnel à Lyon</option>
    <option value="invoice">Vérifier une facture douteuse dans le système</option>
    <option value="summary">Rédiger la synthèse des notes de réunion RH</option>
  </select>

  <button type="button" id="start-agent-btn" style="padding: 10px 18px; background: #1a5fb4; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 16px;">🚀 Lancer l'Agent IA</button>

  <div id="agent-simulation-container" style="display: flex; flex-direction: column; gap: 10px;">
    <!-- Les étapes s'afficheront ici en JS -->
    <p style="font-style: italic; color: #666; font-size: 13px;">Cliquez sur "Lancer l'Agent IA" pour observer le raisonnement pas à pas...</p>
  </div>
</div>

<script src="../../javascripts/agent-simulator.js"></script>
