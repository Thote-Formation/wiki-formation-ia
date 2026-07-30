// Widget Chatbot IA pour MkDocs RS6776
document.addEventListener("DOMContentLoaded", function () {
  // Éviter d'injecter deux fois le widget lors des navigations MkDocs
  if (document.getElementById("sitebot-widget-container")) return;

  // 1. Création du HTML du widget
  const widgetHTML = `
    <div id="sitebot-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif;">
      <!-- Bouton Flottant -->
      <button id="sitebot-toggle-btn" style="width: 56px; height: 56px; border-radius: 50%; background-color: #4f46e5; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-size: 24px; display: flex; align-items: center; justify-content: center;">
        💬
      </button>

      <!-- Fenêtre de Chat (Masquée par défaut) -->
      <div id="sitebot-chat-window" style="display: none; position: absolute; bottom: 70px; right: 0; width: 350px; height: 480px; background: #0f172a; border-radius: 16px; border: 1px solid #1e293b; box-shadow: 0 10px 25px rgba(0,0,0,0.3); flex-direction: column; overflow: hidden; color: white;">
        <!-- Entête -->
        <div style="padding: 12px 16px; background: #1e1b4b; border-bottom: 1px solid #312e81; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: bold; font-size: 14px;">🤖 Assistant RS6776</span>
          <button id="sitebot-close-btn" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 16px;">✕</button>
        </div>

        <!-- Zone de messages -->
        <div id="sitebot-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 8px;">
          <div style="background: #1e293b; padding: 8px 12px; border-radius: 8px; max-width: 85%;">
            Bonjour ! Une question sur les cours d'IA Générative ?
          </div>
        </div>

        <!-- Zone de saisie -->
        <form id="sitebot-form" style="padding: 10px; border-t: 1px solid #1e293b; display: flex; gap: 6px; background: #0f172a;">
          <input type="text" id="sitebot-input" placeholder="Posez votre question..." style="flex: 1; padding: 8px 12px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: white; font-size: 12px; outline: none;" required />
          <button type="submit" style="padding: 8px 12px; border-radius: 8px; border: none; background: #4f46e5; color: white; cursor: pointer; font-size: 12px;">Envoyer</button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // 2. Événements Ouverture / Fermeture
  const toggleBtn = document.getElementById("sitebot-toggle-btn");
  const closeBtn = document.getElementById("sitebot-close-btn");
  const chatWindow = document.getElementById("sitebot-chat-window");

  toggleBtn.addEventListener("click", () => {
    chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });
});
