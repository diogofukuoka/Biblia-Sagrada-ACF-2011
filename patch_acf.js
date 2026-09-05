const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `          const safeBook = encodeURIComponent(bookName);
          // Range exato para forçar a API a trazer todos os versículos e evitar bugs de livro com 1 capítulo
          const apiQuery = \`\${safeBook}+\${chapterNumber}:1-\${expectedVerses}\`;
          const response = await fetch(\`https://bible-api.com/\${apiQuery}?translation=almeida\`);
          if (!response.ok) throw new Error("Falha na resposta da API");
          const data = await response.json();

          if (data && data.verses && data.verses.length > 0) {
            const versesText = data.verses.map(v => v.text.trim());
            await setCachedChapter(cacheKey, versesText);
            return versesText;
          }`;

const replace1 = `          // Baixa a Bíblia ACF 2011 real diretamente do GitHub (substituindo bible-api.com que usava ARC/JFA)
          const response = await fetch("https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json");
          if (!response.ok) throw new Error("Falha na resposta da API ACF do GitHub");
          const data = await response.json();
          
          let normalized = null;
          if (Array.isArray(data)) {
            normalized = data.map(item => {
              const bInfo = getBookInfo(item.abbrev || item.name);
              return {
                name: bInfo ? bInfo.name : (item.name || item.abbrev),
                abbrev: item.abbrev,
                chapters: item.chapters
              };
            });
          }
          
          if (normalized && normalized.length > 0) {
            state.fullBibleData = normalized;
            state.isFullOffline = true;
            if (typeof updateDatasourceStatus === 'function') updateDatasourceStatus(true, \`Bíblia ACF 2011 Automática Carregada\`);
            
            const bookObj = state.fullBibleData.find(b =>
              (b.name && b.name.toLowerCase() === bookName.toLowerCase()) ||
              (b.abbrev && b.abbrev.toLowerCase() === getBookInfo(bookName)?.abbrev)
            );
            
            if (bookObj && bookObj.chapters && bookObj.chapters[chapterNumber - 1]) {
              const versesText = bookObj.chapters[chapterNumber - 1];
              await setCachedChapter(cacheKey, versesText);
              return versesText;
            }
          }`;

const target2 = `const response = await fetch("https://raw.githubusercontent.com/thiagobodruk/bible/master/json/pt_acf.json");`;
const replace2 = `const response = await fetch("https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json");`;

if (code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    if (!code.includes(target1)) console.log("Target 1 not found");
    if (!code.includes(target2)) console.log("Target 2 not found");
}
