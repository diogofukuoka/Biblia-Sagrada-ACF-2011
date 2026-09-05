const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetBooks = `        const booksWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
            if (match) booksWithNotes.add(match[1]);
          });
        }`;

const replaceBooks = `        const booksWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const rawNote = userNotes[key];
            const textContent = (rawNote || "").replace(/<[^>]*>?/gm, '').trim();
            if (textContent !== "") {
               const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
               if (match) booksWithNotes.add(match[1]);
            }
          });
        }`;


const targetChapters = `        // Descobre quais capítulos deste livro têm notas
        const chaptersWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
            if (match && match[1] === bookObj.name) {
              chaptersWithNotes.add(parseInt(match[2], 10));
            }
          });
        }`;
        
const replaceChapters = `        // Descobre quais capítulos deste livro têm notas
        const chaptersWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const rawNote = userNotes[key];
            const textContent = (rawNote || "").replace(/<[^>]*>?/gm, '').trim();
            if (textContent !== "") {
               const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
               if (match && match[1] === bookObj.name) {
                 chaptersWithNotes.add(parseInt(match[2], 10));
               }
            }
          });
        }`;

const targetVerses = `        // Descobre quais versículos deste capítulo têm notas
        const versesWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
            if (match && match[1] === bookObj.name && parseInt(match[2], 10) === chapterNum) {
              versesWithNotes.add(parseInt(match[3], 10));
            }
          });
        }`;

const replaceVerses = `        // Descobre quais versículos deste capítulo têm notas
        const versesWithNotes = new Set();
        if (userNotes) {
          Object.keys(userNotes).forEach(key => {
            const rawNote = userNotes[key];
            const textContent = (rawNote || "").replace(/<[^>]*>?/gm, '').trim();
            if (textContent !== "") {
               const match = key.match(/^(.*)_(\\d+)_(\\d+)$/);
               if (match && match[1] === bookObj.name && parseInt(match[2], 10) === chapterNum) {
                 versesWithNotes.add(parseInt(match[3], 10));
               }
            }
          });
        }`;

if (code.includes(targetBooks) && code.includes(targetChapters) && code.includes(targetVerses)) {
    code = code.replace(targetBooks, replaceBooks);
    code = code.replace(targetChapters, replaceChapters);
    code = code.replace(targetVerses, replaceVerses);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
    if (!code.includes(targetBooks)) console.log("Missing targetBooks");
    if (!code.includes(targetChapters)) console.log("Missing targetChapters");
    if (!code.includes(targetVerses)) console.log("Missing targetVerses");
}
