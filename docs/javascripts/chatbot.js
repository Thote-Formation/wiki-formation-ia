// 🤖 Widget Chatbot IA - Version Direct API Gemini pour GitHub Pages
(function () {
  // 🔑 REMPLACE ICI PAR TA CLÉ API GEMINI
  const GEMINI_API_KEY = "AQ.Ab8RN6KjWvAEJL75FDbqH5RT3yrUKAV_1sMBn7rg5lDxykgVCg";

  // Consignes pédagogiques données à l'IA
  const SYSTEM_INSTRUCTION = `
Tu es le tuteur pédagogique virtuel spécialisé dans la certification RS6776 (IA Générative).
Ton rôle est d'aider les apprenants en répondant à leurs questions de manière synthétique, claire et bienveillante.
Tes réponses doivent s'appuyer sur le programme du cours (Fondamentaux IA, Prompting ROFT/CROFT/SOCRATE, Confidentialité RGPD, Accessibilité, Éthique & IA Act).
Si une question sort totalement du cadre du cours ou de l'IA, réponds poliment que tu es spécialisé dans la formation RS6776.
`;

  function initChatbot() {
    if (document.getElementById("sitebot-widget-container")) return;

    const widgetHTML = `
      <div id="sitebot-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif;">
        <!-- Bouton Flottant -->
        <button id="sitebot-toggle-btn" aria-label="Ouvrir le chat" style="width: 56px; height: 56px; border-radius: 50%; background-color: #4f46e5; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); font-size: 24px; display: flex; align-items: center; justify-content: center;">
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

          <!-- Zone de Saisie -->
          <div style="padding: 12px; border-top: 1px solid #1e293b; display: flex; gap: 8px; background: #0f172a;">
            <input type="text" id="sitebot-input" placeholder="Posez une question sur le cours..." style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: white; font-size: 13px; outline: none;" />
            <button type="button" id="sitebot-send-btn" style="padding: 10px 14px; border-radius: 8px; border: none; background: #4f46e5; color: white; font-weight: bold; cursor: pointer; font-size: 13px;">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", widgetHTML);

    const toggleBtn = document.getElementById("sitebot-toggle-btn");
    const closeBtn = document.getElementById("sitebot-close-btn");
    const chatWindow = document.getElementById("sitebot-chat-window");
    const sendBtn = document.getElementById("sitebot-send-btn");
    const input = document.getElementById("sitebot-input");
    const messagesContainer = document.getElementById("sitebot-messages");

    toggleBtn.addEventListener("click", () => {
      const isHidden = chatWindow.style.display === "none";
      chatWindow.style.display = isHidden ? "flex" : "none";
      if (isHidden) input.focus();
    });

    closeBtn.addEventListener("click", () => {
      chatWindow.style.display = "none";
    });

    function appendMessage(text, isUser = false) {
      const msgDiv = document.createElement("div");
      msgDiv.style.padding = "10px 14px";
      msgDiv.style.borderRadius = isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px";
      msgDiv.style.maxWidth = "85%";
      msgDiv.style.fontSize = "13px";
      msgDiv.style.lineHeight = "1.4";
      msgDiv.style.wordBreak = "break-word";

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

    // Appel Direct à l'API Gemini REST
    async function handleSend() {
      const userMessage = input.value.trim();
      if (!userMessage) return;

      appendMessage(userMessage, true);
      input.value = "";

      const loadingMessage = appendMessage("🤔 Gemini réfléchit...", false);

      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents: [
              {
                parts: [{ text: userMessage }]
              }
            ]
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || "Erreur lors de l'appel API");
        }

        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        loadingMessage.innerText = replyText || "Désolé, je n'ai pas pu obtenir de réponse.";
      } catch (error) {
        console.error("Erreur Gemini Direct :", error);
        loadingMessage.innerText = "⚠️ Erreur : Verifiez votre clé API Gemini ou votre connexion.";
      }
    }

    sendBtn.addEventListener("click", handleSend);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initChatbot();
    });
  } else {
    document.addEventListener("DOMContentLoaded", initChatbot);
  }
})();
