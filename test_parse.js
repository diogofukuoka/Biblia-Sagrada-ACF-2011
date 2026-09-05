const fs = require('fs');

const data = [{
    "livro": "gn",
    "capitulo": 1,
    "versiculos": [
      "1 No princípio criou Deus o céu e a terra.",
      "2 E a terra era sem forma e vazia;"
    ]
}, {
    "livro": "gn",
    "capitulo": 2,
    "versiculos": [
      "1 Assim os céus, a terra e todo o seu exército foram acabados."
    ]
}, {
    "livro": "ex",
    "capitulo": 1,
    "versiculos": [
      "1 Estes pois são os nomes dos filhos de Israel"
    ]
}];

let normalized = [];
const bookMap = {}; // { 'gn': { abbrev: 'gn', name: 'Gênesis', chapters: [] } }

for (const entry of data) {
    if (entry.livro && entry.capitulo && entry.versiculos) {
        const abbrev = entry.livro;
        if (!bookMap[abbrev]) {
            bookMap[abbrev] = { abbrev: abbrev, chapters: [] };
            normalized.push(bookMap[abbrev]);
        }
        
        // Ensure chapter array is large enough
        const capIdx = entry.capitulo - 1;
        while (bookMap[abbrev].chapters.length <= capIdx) {
            bookMap[abbrev].chapters.push([]);
        }
        
        // Remove verse numbers at start of each verse
        const cleanVerses = entry.versiculos.map(v => v.replace(/^\\d+\\s+/, ''));
        bookMap[abbrev].chapters[capIdx] = cleanVerses;
    }
}

console.log(JSON.stringify(normalized, null, 2));
