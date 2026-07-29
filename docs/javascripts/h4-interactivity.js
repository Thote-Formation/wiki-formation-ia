function switchH4Case(caseId, btn) {
  var panels = document.querySelectorAll('.h4-case-panel');
  var btns = document.querySelectorAll('.h4-tab-btn');
  
  // Masque tous les panneaux
  panels.forEach(function(p) { p.style.display = 'none'; });
  
  // Réinitialise le style des boutons
  btns.forEach(function(b) {
    b.style.background = 'var(--md-default-bg-color, #fff)';
    b.style.color = 'var(--md-typeset-color, #000)';
    b.style.borderColor = 'var(--md-default-fg-color--light, #ccc)';
  });
  
  // Affiche le panneau ciblé et active le bouton
  var targetPanel = document.getElementById('h4-case-' + caseId);
  if (targetPanel) {
    targetPanel.style.display = 'grid';
  }
  
  btn.style.background = '#1a5fb4';
  btn.style.color = '#fff';
  btn.style.borderColor = '#1a5fb4';
}
