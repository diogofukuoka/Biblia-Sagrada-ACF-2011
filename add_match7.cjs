const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Padrão 6: ["Texto"] -> Rótulo: Explicação ] -> (Extra)
        const match6 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*([^:]+?)\\s*:\\s*(.+?)\\s*(?:\\]\\s*(?:-->|—>|->|→|-)\\s*(.+))?$/);
        if (match6 && match6[1].length < 350) {`;

const replace = `        // Padrão 7: "Texto" -> (Rótulo) - Explicação  (Padrão novo do LLM)
        const match7 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*(?:\\(([^)]+)\\)|([^:-]+))\\s*(?:[-:]\\s*(.+))?$/);
        if (match7 && match7[1].length < 350) {
          const bibleText = match7[1].trim();
          const boldText = (match7[2] || match7[3]).trim();
          let explText = match7[4] ? match7[4].trim() : "";
          if (explText && !explText.endsWith('.')) {
             explText += ".";
          }
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong>\${explText ? \` <span class="note-paren">\${escapeHtml(explText)}</span>\` : ""}</div>\`;
        }

        // Padrão 6: ["Texto"] -> Rótulo: Explicação ] -> (Extra)
        const match6 = line.match(/^\\[?\\s*"([^"]+?)"\\s*(?:-->|—>|->|→|-)\\s*([^:]+?)\\s*:\\s*(.+?)\\s*(?:\\]\\s*(?:-->|—>|->|→|-)\\s*(.+))?$/);
        if (match6 && match6[1].length < 350) {`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success add match7");
