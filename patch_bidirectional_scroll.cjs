const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetInit = `      function init() {
        applyTheme(state.theme);
        applyFontSize(state.fontSize);
        applyLineHeight(state.lineHeight);
        applyFontFamily(state.fontFamily);
        renderSidebarBooks();
        initEventListeners();
        initGlobalTooltips();
        renderCurrentChapter();
      }`;

const replaceInit = `      // Sincronização de Scroll
      let isSyncingBible = false;
      let isSyncingNotes = false;
      let syncBibleTimeout = null;
      let syncNotesTimeout = null;

      function initBidirectionalScroll() {
        const bibleReader = document.getElementById("bible-reader");
        const notesFeed = document.getElementById("mobile-notes-feed");
        
        if (!bibleReader || !notesFeed) return;
        
        bibleReader.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return; 
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          
          if (isSyncingNotes) return; // Trava contra loop infinito
          
          isSyncingBible = true;
          
          const maxBibleScroll = bibleReader.scrollHeight - bibleReader.clientHeight;
          const maxNotesScroll = notesFeed.scrollHeight - notesFeed.clientHeight;
          
          if (maxBibleScroll <= 0 || maxNotesScroll <= 0) return;
          
          const percentage = bibleReader.scrollTop / maxBibleScroll;
          notesFeed.scrollTop = percentage * maxNotesScroll;
          
          clearTimeout(syncBibleTimeout);
          syncBibleTimeout = setTimeout(() => {
            isSyncingBible = false;
          }, 50);
        }, { passive: true });
        
        notesFeed.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          
          if (isSyncingBible) return; // Trava contra loop infinito
          
          isSyncingNotes = true;
          
          const maxBibleScroll = bibleReader.scrollHeight - bibleReader.clientHeight;
          const maxNotesScroll = notesFeed.scrollHeight - notesFeed.clientHeight;
          
          if (maxBibleScroll <= 0 || maxNotesScroll <= 0) return;
          
          const percentage = notesFeed.scrollTop / maxNotesScroll;
          bibleReader.scrollTop = percentage * maxBibleScroll;
          
          clearTimeout(syncNotesTimeout);
          syncNotesTimeout = setTimeout(() => {
            isSyncingNotes = false;
          }, 50);
        }, { passive: true });
      }

      function init() {
        applyTheme(state.theme);
        applyFontSize(state.fontSize);
        applyLineHeight(state.lineHeight);
        applyFontFamily(state.fontFamily);
        renderSidebarBooks();
        initEventListeners();
        initGlobalTooltips();
        initBidirectionalScroll();
        renderCurrentChapter();
      }`;

code = code.replace(targetInit, replaceInit);
fs.writeFileSync('index.html', code);
console.log("Success patch bidirectional scroll");
