const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetOpenSidebar = `      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        const mobileFeed = document.getElementById("mobile-notes-feed");`;
        
const replaceOpenSidebar = `      function openMobileNoteModal(book, chapter, verse, text, key) {
        openModal("modal-note-mobile");
        document.getElementById("modal-note-title").textContent = \`\${book} \${chapter}:\${verse}\`;
        document.getElementById("mobile-note-verse-text").textContent = text;
        
        const editor = document.getElementById("mobile-note-editor");
        editor.innerHTML = userNotes[key] || getLocalNote(key) || "";
        editor.setAttribute("contenteditable", isAdmin ? "true" : "false");
        
        // Listeners
        editor.onblur = (e) => {
           const noteHtml = editor.innerHTML.trim() === "<br>" ? "" : editor.innerHTML;
           if (noteHtml !== (userNotes[key] || "")) {
             saveLocalNote(key, noteHtml);
             userNotes[key] = noteHtml;
             if (typeof updateVerseNoteIndicators === 'function') updateVerseNoteIndicators();
             if (isAdmin && window.firebaseApp && noteHtml) {
                const { db, doc, setDoc } = window.firebaseApp;
                setDoc(doc(db, "comments", key), { text: noteHtml, updatedAt: Date.now() });
             } else if (isAdmin && window.firebaseApp && !noteHtml) {
                const { db, doc, deleteDoc } = window.firebaseApp;
                deleteDoc(doc(db, "comments", key));
             }
           }
        };
        editor.onpaste = (e) => {
           // Mesma logica de paste
           const clipboardData = e.clipboardData || window.clipboardData;
           if (!clipboardData) return;
           const pastedText = clipboardData.getData("text/plain");
           if (!pastedText) return;
           e.preventDefault();
           if (typeof formatCommentToHtml === 'function') {
             const formattedHtml = formatCommentToHtml(pastedText);
             document.execCommand("insertHTML", false, formattedHtml);
           }
           editor.blur();
        };
      }

      function openNotesSidebar(book, chapter, verse, text) {
        currentNoteContext = { book, chapter, verse, text };
        const key = \`\${book}_\${chapter}_\${verse}\`;
        
        // Condicional de tela
        if (window.innerWidth < 768) {
           openMobileNoteModal(book, chapter, verse, text, key);
           return;
        }
        
        const mobileFeed = document.getElementById("mobile-notes-feed");`;

code = code.replace(targetOpenSidebar, replaceOpenSidebar);
fs.writeFileSync('index.html', code);
console.log("Success patch sidebar mobile");
