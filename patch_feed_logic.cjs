const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        // Carrega nota existente (do Firebase ou cache local)
        const savedNote = userNotes[key] || getLocalNote(key) || "";
        setNoteContent(savedNote);
        
        if (savedNote) {
          elBtnDeleteNote.classList.add("show");
        } else {
          elBtnDeleteNote.classList.remove("show");
        }
        
        elNotesSidebar.classList.add("open");
        elNotesSidebar.setAttribute("aria-hidden", "false");
        
        // Ativa o overlay caso não esteja ativo e a tela for pequena
        if (window.innerWidth <= 768) {
          el.sidebarOverlay.classList.add("active");
        }
        
        // Destaque visual do versículo selecionado
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                    document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);
        if (vEl) {
          vEl.classList.add("active-note-verse");
        }
        
        setTimeout(() => {
          if (elNoteEditor) {
            elNoteEditor.focus({ preventScroll: true });
          }
        }, 200);
      }`;

const replace = `      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        const isMobileFeed = window.innerWidth <= 1024;
        const mobileFeed = document.getElementById("mobile-notes-feed");
        const actionsBox = document.querySelector(".notes-actions");
        
        if (isMobileFeed && mobileFeed) {
          if (elNoteEditor) elNoteEditor.style.display = "none";
          if (elNoteTextarea) elNoteTextarea.style.display = "none";
          if (actionsBox) actionsBox.style.display = "none";
          mobileFeed.style.display = "block";
          
          mobileFeed.innerHTML = "";
          
          const verseEls = document.querySelectorAll(".verse-paragraph");
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
                <div class="mobile-feed-header">\${book} \${chapter}:\${vNum}</div>
                <div class="mobile-feed-text">\${escapeHtml(vText)}</div>
                <div class="mobile-feed-editor" contenteditable="true" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>
              \`;
              mobileFeed.appendChild(feedItem);
            });
          }
          
          // Adiciona lógica de paste e save para o feed mobile
          mobileFeed.querySelectorAll(".mobile-feed-editor").forEach(editor => {
            editor.addEventListener("paste", (e) => {
              const clipboardData = e.clipboardData || window.clipboardData;
              if (!clipboardData) return;
              const pastedText = clipboardData.getData("text/plain");
              if (!pastedText) return;
              e.preventDefault();
              const formattedHtml = formatCommentToHtml(pastedText);
              const currentText = (editor.innerText || editor.textContent || "").trim();
              const sel = window.getSelection();
              const isAllSelected = sel && sel.toString().trim().length > 0 && sel.toString().trim() === currentText;
              if (!currentText || isAllSelected) {
                editor.innerHTML = formattedHtml;
              } else {
                document.execCommand("insertHTML", false, formattedHtml);
              }
              // Save on paste immediately
              editor.dispatchEvent(new Event('blur'));
            });
            
            editor.addEventListener("blur", (e) => {
               const vNum = editor.dataset.verse;
               const vKey = \`\${book}_\${chapter}_\${vNum}\`;
               const noteHtml = editor.innerHTML.trim() === "<br>" ? "" : editor.innerHTML;
               
               if (noteHtml !== (userNotes[vKey] || "")) {
                 saveLocalNote(vKey, noteHtml);
                 userNotes[vKey] = noteHtml;
                 updateVerseNoteIndicators();
                 
                 if (isAdmin && window.firebaseApp && noteHtml) {
                    const { db, doc, setDoc } = window.firebaseApp;
                    setDoc(doc(db, "comments", vKey), { text: noteHtml, updatedAt: Date.now() });
                 } else if (isAdmin && window.firebaseApp && !noteHtml) {
                    const { db, doc, deleteDoc } = window.firebaseApp;
                    deleteDoc(doc(db, "comments", vKey));
                 }
               }
            });
          });
          
        } else {
          if (mobileFeed) mobileFeed.style.display = "none";
          if (elNoteEditor) elNoteEditor.style.display = "block";
          if (actionsBox) actionsBox.style.display = "flex";
          
          const savedNote = userNotes[key] || getLocalNote(key) || "";
          setNoteContent(savedNote);
          if (savedNote) {
            elBtnDeleteNote.classList.add("show");
          } else {
            elBtnDeleteNote.classList.remove("show");
          }
        }
        
        elNotesSidebar.classList.add("open");
        elNotesSidebar.setAttribute("aria-hidden", "false");
        
        // Ativa o overlay caso não esteja ativo e a tela for pequena
        if (window.innerWidth <= 768) {
          el.sidebarOverlay.classList.add("active");
        }
        
        // Destaque visual do versículo selecionado
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                    document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);
        if (vEl) {
          vEl.classList.add("active-note-verse");
        }
        
        setTimeout(() => {
          if (isMobileFeed && mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${verse}\`);
            if (target) {
              mobileFeed.scrollTo({ top: target.offsetTop - 10, behavior: 'smooth' });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          } else if (elNoteEditor) {
            elNoteEditor.focus({ preventScroll: true });
          }
        }, 200);
      }`;

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
