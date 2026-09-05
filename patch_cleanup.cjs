const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetToRemove = `      function appendNotesChapterToFeed(book, chapter, prepend = false) {
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
              document.execCommand("insertText", false, pastedText);
            });
            editor.addEventListener("input", () => {
               currentNoteContext = { book, chapter, verse: vNum, text: vText };
               saveCurrentNote();
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
        
        // Connect IntersectionObserver to the new chapter in notes to update context? Not strictly necessary.
      }`;

code = code.replace(targetToRemove, "");
fs.writeFileSync('index.html', code);
console.log("Success cleanup");
