const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        bibleReader.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');
          if (window.innerWidth < 768) return; 
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;`;

const replace1 = `        bibleReader.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');
          
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;`;

const target2 = `        notesFeed.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');
          if (window.innerWidth < 768) return;
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;`;

const replace2 = `        notesFeed.addEventListener('scroll', () => {
          const syncToggle = document.getElementById('sync-scroll-toggle');
          
          if (!elNotesSidebar || !elNotesSidebar.classList.contains("open")) return;`;

code = code.replace(target1, replace1).replace(target2, replace2);
fs.writeFileSync('index.html', code);
console.log("Success patch mobile sync");
