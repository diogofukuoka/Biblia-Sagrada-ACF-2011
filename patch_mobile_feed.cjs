const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Condicional de tela
        if (window.innerWidth < 768) {
           openMobileNoteModal(book, chapter, verse, text, key);
           return;
        }`;

code = code.replace(target, '');
fs.writeFileSync('index.html', code);
console.log("Success patch mobile feed");
