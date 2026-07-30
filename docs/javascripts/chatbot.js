// 🤖 Widget Chatbot IA - Version Proxy Cloudflare + Rendu Markdown Pro
(function () {
  // Chargement dynamique de la bibliothèque Marked.js pour interpréter le Markdown
  if (!window.marked) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    document.head.appendChild(script);
  }

  function initChatbot() {
    if (document.getElementById("sitebot-widget-container")) return;

    // Styles CSS injectés pour le rendu propre du Markdown (tableaux, listes, code)
    const customStyles = `
      <style>
        #sitebot-messages table {
          border-collapse: collapse;
          width: 100%;
          margin: 8px 0;
          font-size: 11px;
        }
        #sitebot-messages th, #sitebot-messages td {
          border: 1px solid #334155;
          padding: 4px 6px;
          text-align: left;
        }
        #sitebot-messages th {
          background-color: #334155;
          color: #f8fafc;
        }
        #sitebot-messages p {
          margin: 4px 0;
        }
        #sitebot-messages ul, #sitebot-messages ol {
          padding-left: 18px;
          margin: 4px 0;
        }
        #sitebot-messages a {
          color: #818cf8;
          text-decoration: underline;
        }
        #sitebot-messages code {
          background: #0f172a;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 11px;
        }
      </style>
    `;
    document.head.insertAdjacentHTML("beforeend", customStyles);

    const widgetHTML = `
      <div id="sitebot-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif;">
        <!-- Bouton Flottant -->
        <button id="sitebot-toggle-btn" aria-label="Ouvrir le chat" style="width: 56px; height: 56px; border-radius: 50%; background-color: #4f46e5; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); font-size: 24px; display: flex; align-items: center; justify-content: center;">
          💬
        </button>

        <!-- Fenêtre de Chat -->
        <div id="sitebot-chat-window" style="display: none; position: absolute; bottom: 70px; right: 0; width: 380px; height: 520px; background: #0f172a; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); flex-direction: column; overflow: hidden; color: white;">
          
          <!-- Entête -->
          <div style="padding: 14px 16px; background: #4051B5; border-bottom: 1px solid #312e81; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">🤖</span>
              <div>
                <div style="font-weight: bold; font-size: 14px; color: #f8fafc;">Thotie IA</div>
                <div style="font-size: 11px; color: #a5b4fc;">IA Générative</div>
              </div>
            </div>
            <button id="sitebot-close-btn" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px;">✕</button>
          </div>

          <!-- Zone de messages -->
          <div id="sitebot-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 10px; background: #0f172a;">
            <div style="background: #1e293b; color: #e2e8f0; padding: 10px 14px; border-radius: 12px 12px 12px 2px; max-width: 90%; border: 1px solid #334155;">
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
      msgDiv.style.maxWidth = "90%";
      msgDiv.style.fontSize = "13px";
      msgDiv.style.lineHeight = "1.4";
      msgDiv.style.wordBreak = "break-word";

      if (isUser) {
        msgDiv.style.background = "#4f46e5";
        msgDiv.style.color = "#ffffff";
        msgDiv.style.alignSelf = "flex-end";
        msgDiv.innerText = text; // Texte brut pour l'utilisateur
      } else {
        msgDiv.style.background = "#1e293b";
        msgDiv.style.color = "#e2e8f0";
        msgDiv.style.border = "1px solid #334155";
        msgDiv.style.alignSelf = "flex-start";

        // Traitement Markdown pour l'assistant IA
        if (window.marked) {
          msgDiv.innerHTML = window.marked.parse(text);
        } else {
          msgDiv.innerText = text;
        }
      }

      messagesContainer.appendChild(msgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return msgDiv;
    }

    async function handleSend() {
      const userMessage = input.value.trim();
      if (!userMessage) return;

      appendMessage(userMessage, true);
      input.value = "";

      const loadingMessage = appendMessage("🤖 Thotie réfléchit...", false);

      try {
        const WORKER_URL = "https://tuteur-gemini.pierre-l.workers.dev/";

        const response = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: userMessage })
        });

        const data = await response.json();

        if (data.error) {
          const errorMessage = typeof data.error === "object"
            ? (data.error.message || JSON.stringify(data.error))
            : data.error;
          throw new Error(errorMessage);
        }

        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        // Remplacement du message d'attente par la réponse formatée
        if (replyText) {
          loadingMessage.innerHTML = window.marked ? window.marked.parse(replyText) : replyText;
        } else {
          loadingMessage.innerText = "Désolé, je n'ai pas pu obtenir de réponse.";
        }

      } catch (error) {
        console.error("Erreur Chatbot :", error);
        loadingMessage.innerText = `⚠️ Erreur : ${error.message}`;
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

  // Support MkDocs Material et chargement classique
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initChatbot();
    });
  } else {
    document.addEventListener("DOMContentLoaded", initChatbot);
  }
})();
