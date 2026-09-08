const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetOpenNotesSidebar = `        elNotesSidebar.classList.add("open");
        elNotesSidebar.setAttribute("aria-hidden", "false");`;

const replaceOpenNotesSidebar = `        if (elNotesSidebar) {
           elNotesSidebar.classList.add("open");
           elNotesSidebar.setAttribute("aria-hidden", "false");
        }`;

code = code.replace(targetOpenNotesSidebar, replaceOpenNotesSidebar);


const targetCloseNotesSidebar = `      function closeNotesSidebar() {
        if (document.activeElement && document.activeElement.classList.contains("mobile-feed-editor")) {
          document.activeElement.blur();
        }
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        elNotesSidebar.classList.remove("open");
        elNotesSidebar.setAttribute("aria-hidden", "true");`;

const replaceCloseNotesSidebar = `      function closeNotesSidebar() {
        if (document.activeElement && document.activeElement.classList.contains("mobile-feed-editor")) {
          document.activeElement.blur();
        }
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        if (elNotesSidebar) {
           elNotesSidebar.classList.remove("open");
           elNotesSidebar.setAttribute("aria-hidden", "true");
        }`;

code = code.replace(targetCloseNotesSidebar, replaceCloseNotesSidebar);


const targetLoadNext = `          if (elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, nextChap, false);
          }`;
          
const replaceLoadNext = `          if (elNotesSidebar && elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, nextChap, false);
          }`;

code = code.replace(targetLoadNext, replaceLoadNext);

const targetLoadPrev = `          if (elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, prevChap, true);
          }`;
          
const replaceLoadPrev = `          if (elNotesSidebar && elNotesSidebar.classList.contains("open")) {
            appendNotesChapterToFeed(bookObj.name, prevChap, true);
          }`;
code = code.replace(targetLoadPrev, replaceLoadPrev);


fs.writeFileSync('index.html', code);
console.log("Success patch elNotesSidebar");
