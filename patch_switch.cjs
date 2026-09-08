const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. ADD CSS
const targetCss = `    .notes-content {`;
const replaceCss = `    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
    }
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #2196F3;
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }
    .sync-toggle-container {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 10px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    .notes-content {`;
code = code.replace(targetCss, replaceCss);

// 2. Add HTML
const targetHtml = `          <button class="btn-close-notes" id="btn-close-notes" aria-label="Fechar anotações" title="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <div class="notes-editor-wrapper">`;
const replaceHtml = `          <button class="btn-close-notes" id="btn-close-notes" aria-label="Fechar anotações" title="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <div class="sync-toggle-container">
            <label class="switch">
              <input type="checkbox" id="sync-scroll-toggle" checked>
              <span class="slider"></span>
            </label>
            <span>Sincronizar Rolagem</span>
          </div>
          <div class="notes-editor-wrapper">`;
code = code.replace(targetHtml, replaceHtml);

// 3. IDs and target scroll
const targetIds = `          const p = document.createElement("p");
          p.className = "verse-paragraph";
          p.id = \`v-\${chapterNum}-\${verseNum}\`;`;
const replaceIds = `          const p = document.createElement("p");
          p.className = "verse-paragraph";
          p.id = \`verse-\${bookName.toLowerCase().replace(/\\s+/g, '-')}-\${chapterNum}-\${verseNum}\`;`;
code = code.replace(targetIds, replaceIds);

const targetScroll = `            const targetEl = document.getElementById(\`v-\${state.currentChapter}-\${state.targetVerse}\`);
            if (targetEl) {`;
const replaceScroll = `            const formattedBook = state.currentBook.toLowerCase().replace(/\\s+/g, '-');
            const targetEl = document.getElementById(\`verse-\${formattedBook}-\${state.currentChapter}-\${state.targetVerse}\`);
            if (targetEl) {`;
code = code.replace(targetScroll, replaceScroll);

const targetSidebarId = `        const vEl = document.getElementById(\`v-\${chapter}-\${verse}\`) || 
                     document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);`;
const replaceSidebarId = `        const formattedBook = book.toLowerCase().replace(/\\s+/g, '-');
        const vEl = document.getElementById(\`verse-\${formattedBook}-\${chapter}-\${verse}\`) || 
                     document.querySelector(\`.verse-paragraph[data-chapter="\${chapter}"][data-verse="\${verse}"]\`);`;
code = code.replace(targetSidebarId, replaceSidebarId);


// 4. Update bidirectional logic
const targetLogic = `        bibleReader.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return; 
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          
          if (isSyncingNotes) return; // Trava contra loop infinito`;
const replaceLogic = `        const syncToggle = document.getElementById('sync-scroll-toggle');
        
        bibleReader.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return; 
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          if (syncToggle && !syncToggle.checked) return;
          
          if (isSyncingNotes) return; // Trava contra loop infinito`;
code = code.replace(targetLogic, replaceLogic);

const targetLogic2 = `        notesFeed.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          
          if (isSyncingBible) return; // Trava contra loop infinito`;
const replaceLogic2 = `        notesFeed.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          if (syncToggle && !syncToggle.checked) return;
          
          if (isSyncingBible) return; // Trava contra loop infinito`;
code = code.replace(targetLogic2, replaceLogic2);

// Make sure target verse waits for layout
const targetTimeout = `          setTimeout(() => {
            const targetEl`;
const replaceTimeout = `          requestAnimationFrame(() => {
            setTimeout(() => {
            const formattedBook`;
code = code.replace(targetTimeout, replaceTimeout);

// Close requestAnimationFrame block
const targetEndTimeout = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);`;
const replaceEndTimeout = `            setTimeout(loadNextChapterScroll, 300);
            state.targetVerse = 0;
            setTimeout(updateTopVisibleVerseReference, 350);
          }, 400);
          });`;
code = code.replace(targetEndTimeout, replaceEndTimeout);


fs.writeFileSync('index.html', code);
console.log("Success patch switch");
