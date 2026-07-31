# Les Agents IA : contenu protégé

<div id="protected-article-container">
  <p><em>Chargement de l’article…</em></p>
</div>

<script>
(async function () {
  function getSupabaseClient() {
    if (window.supabaseClient) return window.supabaseClient;
    if (window.supabase) {
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
    return escapeHtml(md)
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^\> (.*)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^\* (.*)$/gm, '<li>$1</li>')
      .replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/<li>(.*?)<\/li>(\s*<li>)/gs, '<ul><li>$1</li>$2')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  async function loadArticle() {
    const container = document.getElementById('protected-article-container');
    const supabase = getSupabaseClient();

    if (!supabase) {
      container.innerHTML = '<p style="color:#b00020;"><strong>Erreur :</strong> Supabase non disponible.</p>';
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

    container.innerHTML = '<article><p>' + simpleMarkdownToHtml(data.content_md) + '</p></article>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArticle);
  } else {
    loadArticle();
  }
})();
</script>
