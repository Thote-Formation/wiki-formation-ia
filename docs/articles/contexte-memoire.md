# Fenêtre de contexte & mémoire de l’IA

*Comprendre pourquoi l’IA peut perdre le fil d’une discussion et comment limiter cet effet.*

<div class="summary-box" markdown="1">

### 🎯 Ce que cette page explique

* Ce qu’est la fenêtre de contexte ;
* Pourquoi une IA peut oublier une partie de l’échange ;
* Comment mieux structurer une session longue ;
* Comment estimer l’impact d’un document sur la mémoire de travail d’un modèle.

</div>

---

## 1. Qu’est-ce que la fenêtre de contexte ?

### La métaphorique de la mémoire à court terme

La fenêtre de contexte peut être comparée à une **mémoire de travail**.  
C’est la quantité maximale d’informations que l’IA peut garder en tête à un instant donné pour produire sa réponse.

Ces informations peuvent inclure :

* Vos prompts ;
* L’historique de la conversation ;
* Des documents transmis ;
* Du code source ;
* Des images ou formats multimédias selon le modèle.

<div class="real-life-box" markdown="1">

### 💡 Repère simple

La taille du contexte est mesurée en **tokens**.

En pratique, on retient souvent qu'**1 token représente environ 0,75 mot en français** (ou 100 mots ≈ 130 à 140 tokens).

</div>

> **Schéma du flux**  
> Entrée (prompts + documents + historique) → **fenêtre de contexte** → sortie (réponse)

Si le volume total dépasse la capacité maximale :

* L’IA écarte progressivement les messages les plus anciens ;
* Elle perd les consignes d'origine données au début ;
* Sa cohérence et sa précision chutent.

---

## 2. Comparatif des capacités

| Modèle | Fenêtre de contexte | Équivalent en texte |
| :--- | :--- | :--- |
| **GPT-4o** | ~128 000 tokens | ~300 pages de livre |
| **Claude 3.5 / 3.7** | ~200 000 tokens | ~500 pages de livre |
| **Gemini 1.5 Pro / Flash** | ~2 000 000 tokens | ~4 000 pages / 1h de vidéo |

<div class="warning-practice-box" markdown="1">

### 🛑 Point de vigilance

Ce n’est pas parce qu’un modèle accepte un très gros volume qu’il traite tout avec la même attention.

Les LLM souffrent de ce qu'on appelle l'effet "Needle in a Haystack" (*L'aiguille dans la botte de foin*) et retiennent mieux :
* Le **début** du contexte ;
* La **fin** du contexte ;
* ...et ont tendance à délaisser les informations situées **au milieu**.

</div>

---

## 3. Bonnes pratiques pour éviter la perte de mémoire

<div class="wiki-grid" markdown="1">

<div class="wiki-card" markdown="1">

### 🎯 Un chat = Une tâche

Évitez de mélanger plusieurs projets dans un même fil. Une discussion ciblée évite la pollution de contexte.

</div>

<div class="wiki-card" markdown="1">

### 📝 Résumés intermédiaires

En longue session, demandez un résumé des décisions. Utilisez ce résumé pour ouvrir un nouveau chat propre.

</div>

<div class="wiki-card" markdown="1">

### 📌 Rappel des consignes

Répétez les contraintes critiques à la fin de vos prompts (format, ton, critères d'exclusion).

</div>

</div>

<div class="good-reflex-box" markdown="1">

### ✅ Bon réflexe

Si l’IA commence à “perdre le fil”, ne tentez pas de corriger la trajectoire dans la même discussion. 

Faites faire un résumé synthétique à l'IA, puis **ouvrez une nouvelle discussion** en y réinjectant le résumé + les objectifs mis à jour.

</div>

---

## 4. Simulateur : tokens et volume de texte

<div class="prompt-generator context-window-calculator">
  <label for="pageSlider">Nombre de pages A4 de texte à injecter : <strong id="pageVal">10</strong> page(s)</label>
  <input type="range" id="pageSlider" min="1" max="300" value="10" style="width: 100%; margin: 12px 0;">

  <div class="prompt-generator-grid">
    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Mots estimés</span>
      <strong id="wordCalc" style="font-size: 1.3rem; color: #0d47a1;">5 000</strong>
    </div>

    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Tokens estimés</span>
      <strong id="tokenCalc" style="font-size: 1.3rem; color: #0d47a1;">6 666</strong>
    </div>

    <div style="background: var(--md-code-bg-color); padding: 12px; border-radius: 8px; border: 1px solid #cbd5e1; text-align: center;">
      <span style="font-size: 0.75rem; color: var(--md-typeset-color); font-weight: 700; display: block; text-transform: uppercase;">Contexte occupé (128k)</span>
      <strong id="contextCalc" style="font-size: 1.3rem; color: #15803d;">5.2%</strong>
    </div>
  </div>
</div>

---

## 5. Mini-quiz

<div class="real-life-box" markdown="1">

### ❓ Question flash

Que se passe-t-il lorsque votre discussion dépasse la taille maximale de la fenêtre de contexte de l’IA ?

</div>

<div class="prompt-generator context-quiz">
  <div id="quizOptions" style="display: flex; flex-direction: column; gap: 10px;">
    <button type="button" class="wiki-button quiz-btn" data-correct="false" style="text-align: left; justify-content: flex-start; height: auto; padding: 10px 14px; white-space: normal;">
      A) L’IA refuse de répondre et affiche un message d’erreur définitif.
    </button>

    <button type="button" class="wiki-button quiz-btn" data-correct="true" style="text-align: left; justify-content: flex-start; height: auto; padding: 10px 14px; white-space: normal;">
      B) L’IA oublie progressivement les premiers messages pour faire de la place.
    </button>

    <button type="button" class="wiki-button quiz-btn" data-correct="false" style="text-align: left; justify-content: flex-start; height: auto; padding: 10px 14px; white-space: normal;">
      C) L’IA compresse automatiquement tout le texte sans aucune perte d’information.
    </button>
  </div>

  <div id="quizFeedback" class="good-reflex-box" style="display: none; margin-top: 16px;" markdown="1"></div>
</div>

<script>
(function() {
  function initContextPage() {
    // 1. Simulateur Slider
    const slider = document.getElementById('pageSlider');
    const pageVal = document.getElementById('pageVal');
    const wordCalc = document.getElementById('wordCalc');
    const tokenCalc = document.getElementById('tokenCalc');
    const contextCalc = document.getElementById('contextCalc');

    if (slider) {
      slider.addEventListener('input', function() {
        const pages = parseInt(this.value, 10);
        const words = pages * 500; // ~500 mots / page A4
        const tokens = Math.ceil(words * 1.33); // Taux moyen FR
        const pct = ((tokens / 128000) * 100).toFixed(1);

        pageVal.textContent = pages;
        wordCalc.textContent = words.toLocaleString('fr-FR');
        tokenCalc.textContent = tokens.toLocaleString('fr-FR');
        contextCalc.textContent = pct + "%";

        if (pct > 80) {
          contextCalc.style.color = "#dc2626";
        } else {
          contextCalc.style.color = "#15803d";
        }
      });
    }

    // 2. Interactive Quiz
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const feedback = document.getElementById('quizFeedback');

    if (quizButtons.length > 0 && feedback) {
      quizButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const isCorrect = this.getAttribute('data-correct') === 'true';
          
          quizButtons.forEach(b => {
            b.style.opacity = "0.6";
            b.style.borderColor = "#cbd5e1";
          });

          this.style.opacity = "1";

          if (isCorrect) {
            this.style.borderColor = "#15803d";
            feedback.className = "good-reflex-box";
            feedback.innerHTML = "<h3>✅ Bonne réponse !</h3><p>Les LLM appliquent un système de mémoire glissante (FIFO) : les informations les plus anciennes sont tronquées pour laisser place aux nouveaux messages.</p>";
          } else {
            this.style.borderColor = "#dc2626";
            feedback.className = "warning-practice-box";
            feedback.innerHTML = "<h3>❌ Mauvaise réponse</h3><p>L'IA ne plante pas et ne sait pas tout compresser sans perte. Elle tronque et oublie le début de l'échange.</p>";
          }

          feedback.style.display = "block";
        });
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContextPage);
  } else {
    initContextPage();
  }
})();
</script>
