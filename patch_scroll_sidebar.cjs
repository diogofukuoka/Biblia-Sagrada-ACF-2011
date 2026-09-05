const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetStr = `            if (targetEl) {
              targetEl.scrollIntoView({ behavior: "auto", block: "start" });
              targetEl.classList.add("highlight-target");
              
              if (state.openNoteForTarget && window.innerWidth > 768) {
                const textSpan = targetEl.querySelector(".verse-text");
                const vText = textSpan ? textSpan.textContent : "";
                openNotesSidebar(state.currentBook, state.currentChapter, state.targetVerse, vText);
              }
            }`;

const replaceStr = `            if (targetEl) {
              if (state.openNoteForTarget && window.innerWidth > 768) {
                const textSpan = targetEl.querySelector(".verse-text");
                const vText = textSpan ? textSpan.textContent : "";
                // Abre a aba primeiro
                openNotesSidebar(state.currentBook, state.currentChapter, state.targetVerse, vText);
                
                // Aguarda a animação da aba (que muda a largura do texto) terminar antes de calcular a rolagem
                setTimeout(() => {
                   targetEl.scrollIntoView({ behavior: "auto", block: "start" });
                   targetEl.classList.add("highlight-target");
                }, 350);
              } else {
                targetEl.scrollIntoView({ behavior: "auto", block: "start" });
                targetEl.classList.add("highlight-target");
              }
            }`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replaceStr);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
