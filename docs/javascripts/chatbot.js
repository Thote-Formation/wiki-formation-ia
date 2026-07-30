// 🤖 Widget Chatbot IA pour MkDocs RS6776 - Version Interactive
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("sitebot-widget-container")) return;

  // 1. Structure HTML du Widget
  const widgetHTML = `
    <div id="sitebot-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif;">
      <!-- Bouton Flottant -->
      <button id="sitebot-toggle-btn" aria-label="Ouvrir le chat" style="width: 56px; height: 56px; border-radius: 50%; background-color: #4f46e5; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); font-size: 24px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
        💬
      </button>

      <!-- Fenêtre de Chat -->
      <div id="sitebot-chat-window" style="display: none; position: absolute; bottom: 70px; right: 0; width: 360px; height: 500px; background: #0f172a; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); flex-direction: column; overflow: hidden; color: white;">
        
        <!-- Entête -->
        <div style="padding: 14px 16px; background: #1e1b4b; border-bottom: 1px solid #312e81; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">🤖</span>
            <div>
              <div style="font-weight: bold; font-size: 14px; color: #f8fafc;">Tuteur RS6776</div>
              <div style="font-size: 11px; color: #a5b4fc;">IA Générative</div>
            </div>
          </div>
          <button id="sitebot-close-btn" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px;">✕</button>
        </div>

        <!-- Zone de messages -->
        <div id="sitebot-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 10px; background: #0f172a;">
          <div style="background: #1e293b; color: #e2e8f0; padding: 10px 14px; border-radius: 12px 12px 12px 2px; max-width: 85%; border: 1px solid #334155;">
            Bonjour ! Je suis l'assistant pédagogique RS6776. Posez-moi vos questions sur le cours ou les outils !
          </div>
        </div>

        <!-- Formulaire d'envoi -->
        <form id="sitebot-form" style="padding: 12px; border-top: 1px solid #1e293b; display: flex; gap: 8px; background: #0f172a;">
          <input type="text" id="sitebot-input" placeholder="Posez une question sur le cours..." style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: white; font-size: 13px; outline: none;" required />
          <button type="submit" id="sitebot-send-btn" style="padding: 10px 14px; border-radius: 8px; border: none; background: #4f46e5; color: white; font-weight: bold; cursor: pointer; font-size: 13px; transition: background 0.2s;">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // 2. Éléments DOM
  const toggleBtn = document.getElementById("sitebot-toggle-btn");
  const closeBtn = document.getElementById("sitebot-close-btn");
  const chatWindow = document.getElementById("sitebot-chat-window");
  const form = document.getElementById("sitebot-form");
  const input = document.getElementById("sitebot-input");
  const messagesContainer = document.getElementById("sitebot-messages");

  // Endpoint temporaire (on le remplacera par la vraie URL backend à l'étape 5)
  const API_ENDPOINT = "http://localhost:3000/api/chat";

  // Gestion Ouverture / Fermeture
  toggleBtn.addEventListener("click", () => {
    const isHidden = chatWindow.style.display === "none";
    chatWindow.style.display = isHidden ? "flex" : "none";
    if (isHidden) input.focus();
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  // Fonction utilitaire : Ajouter un message à l'écran
  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement("div");
    msgDiv.style.padding = "10px 14px";
    msgDiv.style.borderRadius = isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px";
    msgDiv.style.maxWidth = "85%";
    msgDiv.style.fontSize = "13px";
    msgDiv.style.lineHeight = "1.4";

    if (isUser) {
      msgDiv.style.background = "#4f46e5";
      msgDiv.style.color = "#ffffff";
      msgDiv.style.alignSelf = "flex-end";
    } else {
      msgDiv.style.background = "#1e293b";
      msgDiv.style.color = "#e2e8f0";
      msgDiv.style.border = "1px solid #334155";
      msgDiv.style.alignSelf = "flex-start";
    }

    msgDiv.innerText = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
  }

  // 3. Soumission du Formulaire
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Afficher le message utilisateur
    appendMessage(userMessage, true);
    input.value = "";

    // Afficher un indicateur d'attente
    const loadingMessage = appendMessage("🤔 Gemini réfléchit...", false);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error("Erreur réseau");

      const data = await response.json();
      loadingMessage.innerText = data.reply || "Désolé, je n'ai pas pu obtenir de réponse.";
    } catch (error) {
      console.warn("Backend non encore disponible :", error);
      loadingMessage.innerText = "⚠️ Le serveur backend n'est pas encore connecté (Étape 5).";
    }
  });
});
