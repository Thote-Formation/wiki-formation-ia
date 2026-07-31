// 🤖 Widget Chatbot IA - Version Harmoniscounter avec la charte MkDocs Material
(function () {
  // Chargement dynamique de la bibliothèque Marked.js pour interpréter le Markdown
  if (!window.marked) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    document.head.appendChild(script);
  }

  function initChatbot() {
    if (document.getElementById("sitebot-widget-container")) return;

    // Styles CSS injectés dynamiquement pour respecter le thème MkDocs Material
    const customStyles = `
      <style>
        #sitebot-widget-container {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
        }

        #sitebot-messages code {
          font-family: "Roboto Mono", monospace;
        }

        /* Variables dynamiques MkDocs (Mode Clair & Sombre automatique) */
        .sitebot-theme {
          background-color: var(--md-default-bg-color, #ffffff);
          color: var(--md-default-fg-color, #222222);
          border: 1px solid var(--md-default-fg-color--icon, #e0e0e0);
        }

        /* En-tête : Bleu Indigo du thème */
        .sitebot-header {
          background-color: var(--md-primary-fg-color, #3f51b5);
          color: var(--md-primary-bg-color, #ffffff);
        }

        /* Bulle utilisateur : Bleu Indigo */
        .sitebot-msg-user {
          background-color: var(--md-primary-fg-color, #3f51b5);
          color: #ffffff;
          align-self: flex-end;
        }

        /* Bulle assistant IA : Adaptation automatique au fond clair/sombre */
        .sitebot-msg-bot {
          background-color: var(--md-code-bg-color, #f5f5f5);
          color: var(--md-default-fg-color, #222222);
          border: 1px solid var(--md-default-fg-color--icon, #e0e0e0);
          align-self: flex-start;
        }

        /* Boutons d'action : Orange Deep Orange (Couleur Accent) */
        #sitebot-toggle-btn, #sitebot-send-btn {
          background-color: var(--md-accent-fg-color, #ff5722) !important;
          color: #ffffff !important;
          transition: transform 0.2s, opacity 0.2s;
        }

        #sitebot-toggle-btn:hover, #sitebot-send-btn:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        /* Rendu Markdown dans les messages */
        #sitebot-messages table {
          border-collapse: collapse;
          width: 100%;
          margin: 8px 0;
          font-size: 11px;
        }
        #sitebot-messages th, #sitebot-messages td {
          border: 1px solid var(--md-default-fg-color--icon, #ccc);
          padding: 4px 6px;
          text-align: left;
        }
        #sitebot-messages th {
          background-color: var(--md-code-bg-color, #eee);
          color: var(--md-default-fg-color, #000);
        }
        #sitebot-messages p { margin: 4px 0; }
        #sitebot-messages ul, #sitebot-messages ol { padding-left: 18px; margin: 4px 0; }
        #sitebot-messages a { color: var(--md-accent-fg-color, #ff5722); text-decoration: underline; }
      </style>
    `;
    document.head.insertAdjacentHTML("beforeend", customStyles);

    const widgetHTML = `
      <div id="sitebot-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
        <!-- Bouton Flottant (Couleur Accent) -->
        <button id="sitebot-toggle-btn" aria-label="Ouvrir le chat" style="width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.25); font-size: 24px; display: flex; align-items: center; justify-content: center;">
          💬
        </button>

        <!-- Fenêtre de Chat -->
        <div id="sitebot-chat-window" class="sitebot-theme" style="display: none; position: absolute; bottom: 70px; right: 0; width: 380px; height: 520px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.25); flex-direction: column; overflow: hidden;">
          
          <!-- En-tête (Couleur Primaire) -->
          <div class="sitebot-header" style="padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">🤖</span>
              <div>
                <div style="font-weight: bold; font-size: 14px;">Thotie IA</div>
                <div style="font-size: 11px; opacity: 0.85;">Assistant pédagogique RS6776</div>
              </div>
            </div>
            <button id="sitebot-close-btn" style="background: none; border: none; color: inherit; cursor: pointer; font-size: 18px; opacity: 0.8;">✕</button>
          </div>

          <!-- Zone de messages -->
          <div id="sitebot-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 10px;">
            <div class="sitebot-msg-bot" style="padding: 10px 14px; border-radius: 12px 12px 12px 2px; max-width: 90%;">
              Bonjour ! Je suis l'assistant pédagogique RS6776. Posez-moi vos questions sur le cours ou les outils !
            </div>
          </div>

          <!-- Zone de Saisie -->
          <div style="padding: 12px; border-top: 1px solid var(--md-default-fg-color--icon, #e0e0e0); display: flex; gap: 8px;">
            <input type="text" id="sitebot-input" placeholder="Posez une question sur le cours..." style="flex: 1; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--md-default-fg-color--icon, #ccc); background: var(--md-code-bg-color, #fff); color: var(--md-default-fg-color, #000); font-size: 13px; outline: none;" />
            <button type="button" id="sitebot-send-btn" style="padding: 10px 14px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; font-size: 13px;">
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
        msgDiv.className = "sitebot-msg-user";
        msgDiv.innerText = text; // Texte brut pour l'utilisateur
      } else {
        msgDiv.className = "sitebot-msg-bot";
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

  // Support MkDocs Material (navigation sans rechargement) et chargement classique
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      initChatbot();
    });
  } else {
    document.addEventListener("DOMContentLoaded", initChatbot);
  }
})();
