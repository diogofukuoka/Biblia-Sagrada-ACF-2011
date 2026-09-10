const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Padrão 7: "Texto" -> (Rótulo) - Explicação  (Padrão novo do LLM)
        const match7 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*(?:\\(([^)]+)\\)|([^:-]+))\\s*(?:[-:]\\s*(.+))?$/);
        if (match7 && match7[1].length < 350) {`;

const replace = `        // Padrão 8: [ • Texto ] -> (Rótulo: Explicação) ou [ • Texto ] -> (Rótulo)
        const match8 = line.match(/^\\[?\\s*(?:[•\\-\\*])?\\s*([^\\]]+?)\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*\\(([^:]+?)(?::\\s*(.+?))?\\)$/);
        if (match8 && match8[1].length < 350) {
          const bibleText = match8[1].trim();
          const boldText = match8[2].trim();
          const explText = match8[3] ? match8[3].trim() : "";
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}\${explText ? "." : ""}</strong>\${explText ? \` <span class="note-paren">\${escapeHtml(explText)}</span>\` : ""}</div>\`;
        }

        // Padrão 7: "Texto" -> (Rótulo) - Explicação  (Padrão novo do LLM)
        const match7 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*(?:\\(([^)]+)\\)|([^:-]+))\\s*(?:[-:]\\s*(.+))?$/);
        if (match7 && match7[1].length < 350) {`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success add match8");
