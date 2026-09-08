const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetLogic = `        const syncToggle = document.getElementById('sync-scroll-toggle');
        
        bibleReader.addEventListener('scroll', () => {`;

const replaceLogic = `        bibleReader.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');`;

code = code.replace(targetLogic, replaceLogic);

const targetLogic2 = `        notesFeed.addEventListener('scroll', () => {
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          if (syncToggle && !syncToggle.checked) return;`;

const replaceLogic2 = `        notesFeed.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;
          if (notesFeed.style.display === "none") return;
          if (syncToggle && !syncToggle.checked) return;`;

code = code.replace(targetLogic2, replaceLogic2);

fs.writeFileSync('index.html', code);
console.log("Success fix JS switch");
