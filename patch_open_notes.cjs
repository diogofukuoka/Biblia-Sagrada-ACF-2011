const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetOpen = `      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        const isMobileFeed = true; // Forçado para todas as resoluções
        const mobileFeed = document.getElementById("mobile-notes-feed");
        const actionsBox = document.querySelector(".notes-actions");
        
        if (isMobileFeed && mobileFeed) {
          if (elNoteEditor) elNoteEditor.style.display = "none";
          if (elNoteTextarea) elNoteTextarea.style.display = "none";
          if (actionsBox) actionsBox.style.display = "none";
          mobileFeed.style.display = "block";
          
          mobileFeed.innerHTML = "";
          
          const verseEls = document.querySelectorAll(\`.verse-paragraph[data-chapter="\${chapter}"]\`);
          if (verseEls.length > 0) {
            verseEls.forEach(vEl => {
              const vNum = vEl.dataset.verse;
              let vText = "";
              const textSpan = vEl.querySelector(".verse-text");
              if (textSpan) vText = textSpan.textContent;
              
              const vKey = \`\${book}_\${chapter}_\${vNum}\`;
              const vNote = userNotes[vKey] || getLocalNote(vKey) || "";
              
              const feedItem = document.createElement("div");
              feedItem.className = "mobile-feed-item";
              feedItem.id = \`mobile-feed-item-\${vNum}\`;
              feedItem.innerHTML = \`
                <div class="mobile-feed-header" data-scroll-to="\${vNum}" title="Rolar texto bíblico até este versículo">\${book} \${chapter}:\${vNum}</div>
                <div class="mobile-feed-text">\${escapeHtml(vText)}</div>
                <div class="mobile-feed-editor" contenteditable="true" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>
              \`;
              mobileFeed.appendChild(feedItem);
            });
          }
          
          // Adiciona evento de clique no header para rolar a Bíblia
          mobileFeed.querySelectorAll(".mobile-feed-header").forEach(header => {
            header.addEventListener("click", () => {
              const targetVNum = header.getAttribute("data-scroll-to");
              const targetVEl = document.getElementById(\`v-\${chapter}-\${targetVNum}\`) || 
                                 document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${targetVNum}"]\`);
              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: "smooth", block: "start" });
                // Atualiza o realce visual permanente
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
                
                // No celular/tablet, a barra de notas cobre 100% da tela,
                // então precisamos fechar a barra para o usuário conseguir ver o versículo
                if (window.innerWidth <= 768) {
                  closeNotesSidebar();
                }
              }
            });
          });
          
          // Adiciona lógica de paste e save para o feed mobile
          mobileFeed.querySelectorAll(".mobile-feed-editor").forEach(editor => {
            editor.addEventListener("paste", (e) => {
              const clipboardData = e.clipboardData || window.clipboardData;
              if (!clipboardData) return;
              const pastedText = clipboardData.getData("text/plain");
              if (!pastedText) return;
              e.preventDefault();
              document.execCommand("insertText", false, pastedText);
            });
            editor.addEventListener("input", (e) => {
               const vNum = e.target.getAttribute("data-verse");
               const vText = e.target.previousElementSibling.textContent;
               currentNoteContext = { book, chapter, verse: vNum, text: vText };
               saveCurrentNote();
            });
            editor.addEventListener("focus", (e) => {
               const vNum = e.target.getAttribute("data-verse");
               const vText = e.target.previousElementSibling.textContent;
               currentNoteContext = { book, chapter, verse: vNum, text: vText };
            });
          });
        } else {
          // Fallback legacy, caso precisasse... (não entraremos aqui pois isMobileFeed = true)
        }`;

const replaceOpen = `      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        const mobileFeed = document.getElementById("mobile-notes-feed");
        const actionsBox = document.querySelector(".notes-actions");
        
        if (mobileFeed) {
          if (elNoteEditor) elNoteEditor.style.display = "none";
          if (elNoteTextarea) elNoteTextarea.style.display = "none";
          if (actionsBox) actionsBox.style.display = "none";
          mobileFeed.style.display = "block";
          
          mobileFeed.innerHTML = \`
            <div id="notes-sentinel-top" class="scroll-sentinel" style="height: 1px; width: 100%;"></div>
            <div id="notes-sentinel-bottom" class="scroll-sentinel" style="height: 1px; width: 100%;"></div>
          \`;
          
          const sortedChapters = Array.from(loadedChapters).sort((a,b)=>a-b);
          for(let chap of sortedChapters) {
             appendNotesChapterToFeed(book, chap, false);
          }
          
          // Observar os sentinelas do notes feed se quisermos rolar o próprio feed
          // Na verdade, basta rolar o feed de notas junto com a página
          // Mas como o mobile-feed tem overflow-y: auto, precisaria de um observer.
          const topSentinel = document.getElementById("notes-sentinel-top");
          const bottomSentinel = document.getElementById("notes-sentinel-bottom");
          
          if (!window.notesScrollObserver) {
             window.notesScrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                   if (entry.isIntersecting) {
                      if (entry.target.id === 'notes-sentinel-bottom') {
                         loadNextChapterScroll();
                      } else if (entry.target.id === 'notes-sentinel-top') {
                         loadPrevChapterScroll();
                      }
                   }
                });
             }, { root: mobileFeed, rootMargin: "200px", threshold: 0 });
          }
          window.notesScrollObserver.disconnect();
          if (topSentinel) window.notesScrollObserver.observe(topSentinel);
          if (bottomSentinel) window.notesScrollObserver.observe(bottomSentinel);
        }`;

if (code.includes(targetOpen)) {
    code = code.replace(targetOpen, replaceOpen);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
