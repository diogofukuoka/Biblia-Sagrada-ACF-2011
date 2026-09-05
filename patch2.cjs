const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `        if (Array.isArray(data)) {
          // Formato padrão: [{ abbrev, chapters: [[...]] }]
          normalized = data.map(item => {
            const bookInfo = getBookInfo(item.abbrev || item.name);
            return {
              name: bookInfo ? bookInfo.name : (item.name || item.abbrev),
              abbrev: item.abbrev,
              chapters: item.chapters
            };
          });
        } else if (data.books && Array.isArray(data.books)) {`;

const replace1 = `        if (Array.isArray(data)) {
          // Detecta formato marcossancal (livro, capitulo, versiculos)
          if (data.length > 0 && data[0].livro && data[0].capitulo && data[0].versiculos) {
            const bookMap = {};
            normalized = [];
            for (const entry of data) {
              if (entry.livro && entry.capitulo && entry.versiculos) {
                const abbrev = entry.livro;
                if (!bookMap[abbrev]) {
                  const bookInfo = getBookInfo(abbrev);
                  bookMap[abbrev] = { 
                    name: bookInfo ? bookInfo.name : abbrev, 
                    abbrev: abbrev, 
                    chapters: [] 
                  };
                  normalized.push(bookMap[abbrev]);
                }
                const capIdx = entry.capitulo - 1;
                while (bookMap[abbrev].chapters.length <= capIdx) {
                  bookMap[abbrev].chapters.push([]);
                }
                // Remove the verse number prefix like "1 ", "2 "
                bookMap[abbrev].chapters[capIdx] = entry.versiculos.map(v => v.replace(/^\\d+\\s+/, ''));
              }
            }
          } else {
            // Formato padrão: [{ abbrev, chapters: [[...]] }]
            normalized = data.map(item => {
              const bookInfo = getBookInfo(item.abbrev || item.name);
              return {
                name: bookInfo ? bookInfo.name : (item.name || item.abbrev),
                abbrev: item.abbrev,
                chapters: item.chapters
              };
            });
          }
        } else if (data.books && Array.isArray(data.books)) {`;

const target2 = `https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json`;
const replace2 = `https://raw.githubusercontent.com/marcossancal/Biblias-em-JSON/master/json/biblia-almeida-corrigida-fiel.json`;

if (code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replace1);
    code = code.replaceAll(target2, replace2); // Use replaceAll because it appears twice
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    if (!code.includes(target1)) console.log("Target 1 not found");
    if (!code.includes(target2)) console.log("Target 2 not found");
}
