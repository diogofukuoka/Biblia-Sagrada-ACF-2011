const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const t3 = `        // Padrão 3: Rótulo: "Texto Bíblico"
        // Ex: Condição Negativa: "Todo aquele que prevarica"
        const match3 = line.match(/^([^:]+?):\\s*"(.+)"\\s*$/);`;

const r3 = `        // Padrão 3: Rótulo: "Texto Bíblico" ou "Texto Bíblico" (Rótulo) com aspas
        const match3 = line.match(/^([^:]+?):\\s*"(.+)"\\s*$/);
        const match4 = line.match(/^"(.+?)"\\s*\\((.+?)\\)\\.?$/);`;

const t4 = `        if (match3 && match3[2].length < 350) {
          const boldText = match3[1].trim();
          const bibleText = match3[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;

const r4 = `        if (match3 && match3[2].length < 350) {
          const boldText = match3[1].trim();
          const bibleText = match3[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }
        
        if (match4 && match4[1].length < 350) {
          const bibleText = match4[1].trim();
          const boldText = match4[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }`;

code = code.replace(t3, r3).replace(t4, r4);
fs.writeFileSync('index.html', code);
console.log("Success fix parsing headers 2");
