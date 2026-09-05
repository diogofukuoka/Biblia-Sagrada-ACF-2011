const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetOpen = `      function openNotesSidebar(book, chapter, verse, text) {`;
const endOpen = `        }, 350);
      }`;

const startIndex = code.indexOf(targetOpen);
const endIndex = code.indexOf(endOpen, startIndex) + endOpen.length;

if (startIndex === -1 || code.indexOf(endOpen, startIndex) === -1) {
    console.log("Target boundaries not found");
    process.exit(1);
}

const originalOpenNotesSidebar = code.substring(startIndex, endIndex);

const replaceOpen = `      function appendNotesChapterToFeed(book, chapter, prepend = false) {
        const mobileFeed = document.getElementById("mobile-notes-feed");
        if (!mobileFeed) return;
        
        // Wrap everything for this chapter in a container
        const wrap = document.createElement("div");
        wrap.className = "notes-chapter-wrapper";
        wrap.dataset.chapter = chapter;
        
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
            feedItem.id = \`mobile-feed-item-\${chapter}-\${vNum}\`;
            feedItem.innerHTML = \`
              <div class="mobile-feed-header" data-chapter="\${chapter}" data-scroll-to="\${vNum}" title="Rolar texto bíblico até este versículo">\${book} \${chapter}:\${vNum}</div>
              <div class="mobile-feed-text">\${escapeHtml(vText)}</div>
              <div class="mobile-feed-editor" contenteditable="true" data-chapter="\${chapter}" data-verse="\${vNum}" data-placeholder="Escreva seu comentário ou cole sua análise...">\${vNote}</div>
            \`;
            
            // Evento clique no header
            feedItem.querySelector(".mobile-feed-header").addEventListener("click", () => {
              const targetVEl = document.getElementById(\`v-\${chapter}-\${vNum}\`);
              if (targetVEl) {
                targetVEl.scrollIntoView({ behavior: "smooth", block: "start" });
                document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
                targetVEl.classList.add("active-note-verse");
                if (window.innerWidth <= 768) closeNotesSidebar();
              }
            });
            
            const editor = feedItem.querySelector(".mobile-feed-editor");
            editor.addEventListener("paste", (e) => {
              const clipboardData = e.clipboardData || window.clipboardData;
              if (!clipboardData) return;
              const pastedText = clipboardData.getData("text/plain");
              if (!pastedText) return;
              e.preventDefault();
              
              const currentText = (editor.innerText || editor.textContent || "").trim();
              const sel = window.getSelection();
              const isAllSelected = sel && sel.toString().trim().length > 0 && sel.toString().trim() === currentText;
              
              let formattedHtml = pastedText;
              if (typeof formatCommentToHtml === 'function') {
                 formattedHtml = formatCommentToHtml(pastedText);
              }
              
              if (!currentText || isAllSelected) {
                editor.innerHTML = formattedHtml;
              } else {
                document.execCommand("insertHTML", false, formattedHtml);
              }
              editor.dispatchEvent(new Event('blur'));
            });
            
            editor.addEventListener("blur", (e) => {
               const vKey = \`\${book}_\${chapter}_\${vNum}\`;
               const noteHtml = editor.innerHTML.trim() === "<br>" ? "" : editor.innerHTML;
               if (noteHtml !== (userNotes[vKey] || "")) {
                 saveLocalNote(vKey, noteHtml);
                 userNotes[vKey] = noteHtml;
                 if (typeof updateVerseNoteIndicators === 'function') updateVerseNoteIndicators();
                 if (isAdmin && window.firebaseApp && noteHtml) {
                    const { db, doc, setDoc } = window.firebaseApp;
                    setDoc(doc(db, "comments", vKey), { text: noteHtml, updatedAt: Date.now() });
                 } else if (isAdmin && window.firebaseApp && !noteHtml) {
                    const { db, doc, deleteDoc } = window.firebaseApp;
                    deleteDoc(doc(db, "comments", vKey));
                 }
               }
            });
            
            editor.addEventListener("focus", () => {
               currentNoteContext = { book, chapter, verse: vNum, text: vText };
            });
            
            wrap.appendChild(feedItem);
          });
        }
        
        const topSentinel = document.getElementById("notes-sentinel-top");
        const bottomSentinel = document.getElementById("notes-sentinel-bottom");
        
        if (prepend && topSentinel) {
           mobileFeed.insertBefore(wrap, topSentinel.nextSibling);
        } else if (bottomSentinel) {
           mobileFeed.insertBefore(wrap, bottomSentinel);
        } else {
           mobileFeed.appendChild(wrap);
        }
      }

      function openNotesSidebar(book, chapter, verse, text) {
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
        }
        
        elNotesSidebar.classList.add("open");
        elNotesSidebar.setAttribute("aria-hidden", "false");
        
        if (window.innerWidth <= 768) {
          el.sidebarOverlay.classList.add("active");
        }
        
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                     document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);
        if (vEl) {
          vEl.classList.add("active-note-verse");
        }
        
        setTimeout(() => {
          if (mobileFeed) {
            const target = document.getElementById(\`mobile-feed-item-\${chapter}-\${verse}\`);
            if (target) {
              target.scrollIntoView({ behavior: "auto", block: "start" });
              const ed = target.querySelector('.mobile-feed-editor');
              if (ed) ed.focus({preventScroll: true});
            }
          }
        }, 350);
      }`;

code = code.replace(originalOpenNotesSidebar, replaceOpen);
fs.writeFileSync('index.html', code);
console.log("Success");
