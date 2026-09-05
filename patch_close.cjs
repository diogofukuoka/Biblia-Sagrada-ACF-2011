const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `      function closeNotesSidebar() {
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        elNotesSidebar.classList.remove("open");
        elNotesSidebar.setAttribute("aria-hidden", "true");`;

const replace = `      function closeNotesSidebar() {
        if (document.activeElement && document.activeElement.classList.contains("mobile-feed-editor")) {
          document.activeElement.blur();
        }
        document.querySelectorAll('.active-note-verse').forEach(el => el.classList.remove('active-note-verse'));
        elNotesSidebar.classList.remove("open");
        elNotesSidebar.setAttribute("aria-hidden", "true");`;

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
