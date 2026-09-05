const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetApply = `      function applySelectionAndNavigate(bookName, chapterNum, verseNum) {
        closeTopPicker();
        state.currentBook = bookName;
        state.currentChapter = chapterNum;
        state.currentVerse = verseNum || 1;
        state.targetVerse = verseNum || 1;
        renderCurrentChapter();
        showToast(\`Indo para \${bookName} \${chapterNum}:\${verseNum || 1}\`);
      }`;

const replaceApply = `      function applySelectionAndNavigate(bookName, chapterNum, verseNum) {
        closeTopPicker();
        state.currentBook = bookName;
        state.currentChapter = chapterNum;
        state.currentVerse = verseNum || 1;
        state.targetVerse = verseNum || 1;
        state.openNoteForTarget = true; // Flag para abrir a janela de notas no desktop
        renderCurrentChapter();
        showToast(\`Indo para \${bookName} \${chapterNum}:\${verseNum || 1}\`);
      }`;

const targetRender = `              targetEl.classList.add("highlight-target");
            }
            
            // Força o carregamento do próximo capítulo para garantir que "todos os seguintes" existam `;

const replaceRender = `              targetEl.classList.add("highlight-target");
              
              if (state.openNoteForTarget && window.innerWidth > 768) {
                const textSpan = targetEl.querySelector(".verse-text");
                const vText = textSpan ? textSpan.textContent : "";
                openNotesSidebar(state.currentBook, state.currentChapter, state.targetVerse, vText);
              }
            }
            
            state.openNoteForTarget = false;
            // Força o carregamento do próximo capítulo para garantir que "todos os seguintes" existam `;

if (code.includes(targetApply) && code.includes(targetRender)) {
    code = code.replace(targetApply, replaceApply);
    code = code.replace(targetRender, replaceRender);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(targetApply)) console.log("Missing targetApply");
    if (!code.includes(targetRender)) console.log("Missing targetRender");
}
