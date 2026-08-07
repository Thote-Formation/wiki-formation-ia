document$.subscribe(() => {
  const c = document.getElementById("generator-c");
  const r = document.getElementById("generator-r");
  const o = document.getElementById("generator-o");
  const f = document.getElementById("generator-f");
  const t = document.getElementById("generator-t");
  const out = document.getElementById("generator-output");
  const btn = document.getElementById("generator-copy");

  if (!c || !r || !o || !f || !t || !out || !btn) return;

  function buildPrompt() {
    const parts = [];

    if (c.value.trim()) parts.push("CONTEXTE :\n" + c.value.trim());
    if (r.value.trim()) parts.push("RÔLE :\n" + r.value.trim());
    if (o.value.trim()) parts.push("OBJECTIF :\n" + o.value.trim());
    if (f.value.trim()) parts.push("FORMAT :\n" + f.value.trim());
    if (t.value.trim()) parts.push("TON :\n" + t.value.trim());

    out.value = parts.join("\n\n");
  }

  [c, r, o, f, t].forEach((input) => {
    input.addEventListener("input", buildPrompt);
  });

  btn.addEventListener("click", async () => {
    if (!out.value.trim()) return;

    const originalText = btn.textContent;

    try {
      await navigator.clipboard.writeText(out.value);
      btn.textContent = "✅ Copié";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (error) {
      btn.textContent = "❌ Copie impossible";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  });

  buildPrompt();
});
