const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetScrollLogic = `        // Rolagem suave para versículo alvo caso solicitado
        if (state.targetVerse > 0) {
          setTimeout(() => {
            const targetEl = document.getElementById(\`v-\${state.currentChapter}-\${state.targetVerse}\`);
            if (targetEl) {
              if (state.openNoteForTarget && window.innerWidth > 768) {
                const textSpan = targetEl.querySelector(".verse-text");
                const vText = textSpan ? textSpan.textContent : "";
                // Abre a aba primeiro
                openNotesSidebar(state.currentBook, state.currentChapter, state.targetVerse, vText);
                
                // Aguarda a animação da aba (que muda a largura do texto) terminar antes de calcular a rolagem
                setTimeout(() => {
                   safeScrollTo(targetEl, false);
                   targetEl.classList.add("highlight-target");
                }, 350);
              } else {
                safeScrollTo(targetEl, false);
                targetEl.classList.add("highlight-target");
              }
            }`;

const replaceScrollLogic = `        // Rolagem suave para versículo alvo caso solicitado
        if (state.targetVerse > 0) {
          setTimeout(() => {
            const targetEl = document.getElementById(\`v-\${state.currentChapter}-\${state.targetVerse}\`);
            if (targetEl) {
              if (window.innerWidth >= 768) {
                if (state.openNoteForTarget) {
                  const textSpan = targetEl.querySelector(".verse-text");
                  const vText = textSpan ? textSpan.textContent : "";
                  // Abre a aba no Desktop/Tablet
                  openNotesSidebar(state.currentBook, state.currentChapter, state.targetVerse, vText);
                }
                
                setTimeout(() => {
                   targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   targetEl.classList.add("highlight-target");
                }, state.openNoteForTarget ? 350 : 50);
                
              } else {
                // No celular, fecha qualquer sidebar que esteja aberta e rola para o topo
                closeNotesSidebar();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetEl.classList.add("highlight-target");
              }
            }`;

code = code.replace(targetScrollLogic, replaceScrollLogic);
fs.writeFileSync('index.html', code);
console.log("Success patch render scroll");
