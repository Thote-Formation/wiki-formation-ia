# Les Agents IA : contenu protégé

<div id="protected-article-container">
  <p><em>Chargement de l’article…</em></p>
</div>

<script>
(async function () {
  async function ensureSupabase() {
    if (window.supabase) return window.supabase;

    await new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-supabase-sdk="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Impossible de charger le SDK Supabase.')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.setAttribute('data-supabase-sdk', 'true');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Impossible de charger le SDK Supabase.'));
      document.head.appendChild(script);
    });

    return window.supabase;
  }

  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;
    if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
      window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
      return window.supabaseClient;
    }
    return null;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function simpleMarkdownToHtml(md) {
    return '<p>' + escapeHtml(md)
      .replace(/^### (.*)$/gm, '</p><h3>$1</h3><p>')
      .replace(/^## (.*)$/gm, '</p><h2>$1</h2><p>')
      .replace(/^# (.*)$/gm, '</p><h1>$1</h1><p>')
      .replace(/^\> (.*)$/gm, '</p><blockquote>$1</blockquote><p>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>') + '</p>';
  }

  async function loadArticle() {
    const container = document.getElementById('protected-article-container');

    try {
      await ensureSupabase();

      const supabase = getSupabaseClient();
      if (!supabase) {
        container.innerHTML = '<p style="color:#b00020;"><strong>Erreur :</strong> client Supabase introuvable.</p>';
        return;
      }

      const { data, error } = await supabase
        .from('protected_articles')
        .select('title, content_md')
        .eq('slug', 'agents-rag')
        .maybeSingle();

      if (error || !data) {
        container.innerHTML = '<p style="color:#b00020;"><strong>Erreur :</strong> impossible de charger cet article.</p>';
        return;
      }

      container.innerHTML = '<article>' + simpleMarkdownToHtml(data.content_md) + '</article>';
    } catch (e) {
      container.innerHTML = '<p style="color:#b00020;"><strong>Erreur :</strong> ' + e.message + '</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArticle);
  } else {
    loadArticle();
  }
})();
</script>
