const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `          let normalized = null;
          if (Array.isArray(data)) {
            normalized = data.map(item => {
              const bInfo = getBookInfo(item.abbrev || item.name);
              return {
                name: bInfo ? bInfo.name : (item.name || item.abbrev),
                abbrev: item.abbrev,
                chapters: item.chapters
              };
            });
          }`;

const replace1 = `          let normalized = null;
          if (Array.isArray(data)) {
            if (data.length > 0 && data[0].livro && data[0].capitulo && data[0].versiculos) {
              const bookMap = {};
              normalized = [];
              for (const entry of data) {
                if (entry.livro && entry.capitulo && entry.versiculos) {
                  const abbrev = entry.livro;
                  if (!bookMap[abbrev]) {
                    const bInfo = getBookInfo(abbrev);
                    bookMap[abbrev] = { 
                      name: bInfo ? bInfo.name : abbrev, 
                      abbrev: abbrev, 
                      chapters: [] 
                    };
                    normalized.push(bookMap[abbrev]);
                  }
                  const capIdx = entry.capitulo - 1;
                  while (bookMap[abbrev].chapters.length <= capIdx) {
                    bookMap[abbrev].chapters.push([]);
                  }
                  bookMap[abbrev].chapters[capIdx] = entry.versiculos.map(v => v.replace(/^\\d+\\s+/, ''));
                }
              }
            } else {
              normalized = data.map(item => {
                const bInfo = getBookInfo(item.abbrev || item.name);
                return {
                  name: bInfo ? bInfo.name : (item.name || item.abbrev),
                  abbrev: item.abbrev,
                  chapters: item.chapters
                };
              });
            }
          }`;

if (code.includes(target1)) {
    code = code.replace(target1, replace1);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target 1 not found");
}
