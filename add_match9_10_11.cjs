const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target = `        // Padrão 8: [ • Texto ] -> (Rótulo: Explicação) ou [ • Texto ] -> (Rótulo)
        const match8 = line.match(/^\\[?\\s*(?:[•\\-\\*])?\\s*([^\\]]+?)\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*\\(([^:]+?)(?::\\s*(.+?))?\\)$/);
        if (match8 && match8[1].length < 350) {`;

const replace = `        // Padrão 9: [ Texto Bíblico ] -> [ Rótulo ]
        const match9 = line.match(/^\\[?\\s*([^\\]]+?)\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*\\[\\s*(.+?)\\s*\\]$/);
        if (match9 && match9[1].length < 350) {
          const bibleText = match9[1].trim();
          const boldText = match9[2].trim();
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}</strong></div>\`;
        }

        // Padrão 10: [ [ Rótulo ] : "Texto Bíblico" ] -> (Explicação)
        const match10 = line.match(/^\\[\\s*\\[\\s*(.+?)\\s*\\]\\s*:\\s*"([^"]+)"\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*\\((.+)\\)$/);
        if (match10 && match10[2].length < 350) {
          const boldText = match10[1].trim();
          const bibleText = match10[2].trim();
          let explText = match10[3].trim();
          if (explText && !explText.endsWith('.')) explText += ".";
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong> <span class="note-paren">\${escapeHtml(explText)}</span></div>\`;
        }

        // Padrão 11: [ Rótulo ] -> Extra ] : "Texto Bíblico" (Explicação)
        const match11 = line.match(/^\\[\\s*(.+?)\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*(.+?)\\s*\\]\\s*:\\s*"([^"]+)"\\s*\\((.+)\\)$/);
        if (match11 && match11[3].length < 350) {
          const boldText = match11[1].trim() + " / " + match11[2].trim();
          const bibleText = match11[3].trim();
          let explText = match11[4].trim();
          if (explText && !explText.endsWith('.')) explText += ".";
          return \`<div class="note-line note-verse-analysis">[ <em>\${escapeHtml(bibleText)}</em> ] <span class="note-arrow">→</span> <strong>\${escapeHtml(boldText)}.</strong> <span class="note-paren">\${escapeHtml(explText)}</span></div>\`;
        }

        // Padrão 8: [ • Texto ] -> (Rótulo: Explicação) ou [ • Texto ] -> (Rótulo)
        const match8 = line.match(/^\\[?\\s*(?:[•\\-\\*])?\\s*([^\\]]+?)\\s*\\]\\s*(?:-->|—>|->|→|-)\\s*\\(([^:]+?)(?::\\s*(.+?))?\\)$/);
        if (match8 && match8[1].length < 350) {`;

code = code.replace(target, replace);
fs.writeFileSync('index.html', code);
console.log("Success add match9 10 11");
